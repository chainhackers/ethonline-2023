// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVaultFactory.sol";
import "./ProfitPalsVault.sol";
import "./Constants.sol";

import {GnosisSafeProxyFactory} from "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import {GnosisSafeProxy} from "@safe-contracts/proxies/GnosisSafeProxy.sol";
import {GnosisSafeL2} from "@safe-contracts/GnosisSafeL2.sol";
import "@safe-contracts/common/Enum.sol";
import "@safe-contracts/interfaces/ISignatureValidator.sol";

/**
    @title ProfitPalsVaultFactory
    @notice ProfitPalsVaultFactory creates a new Vault with settings that stay immutable during
    @notice the vault existence, namely Operator address, anchor currency, allowed tokens, operator fee
    @notice creates a new `GnosisSafeProxy` using `GnosisSafeProxyFactory`
    @notice approves infinite spending limit to UniswapV3 Permit2 for all allowed tokens
    @notice sets the vault as one of the new Safe owners, and the operator as the other one
    @notice It filters operator interactions using predefined contracts list and allowed tokens.
    @dev Signs every tx to Safe with an EIP1271 signature
    @author Gene A. Tsvigun - <gene@chainhackers.xyz>
    @author Denise Epstein - <denise31337@gmail.com>
*/
contract ProfitPalsVaultFactory is IProfitPalsVaultFactory, ISignatureValidator {
    address public immutable safeLogicSingleton;
    address public immutable safeProxyFactory;

//        https://docs.safe.global/safe-smart-account/signatures#contract-signature-eip-1271
//        {32-bytes signature verifier}{32-bytes data position}{1-byte signature type}
//        {32-bytes signature length}{bytes signature data}
    bytes nopSignature = bytes.concat(
        abi.encode(address(this)),
        abi.encode(uint8(65)),
        bytes1(0),    //static part ends here
        abi.encode(uint8(1)),   //signature length
        bytes1(0)     //signature data
    );

    constructor(address safeLogicSingleton_, address safeProxyFactory_){
        safeLogicSingleton = safeLogicSingleton_;
        safeProxyFactory = safeProxyFactory_;
    }

    /**
        @dev create a new ProfitPalsVault with allowlist of tokens
        @dev create a new Safe account with the ProfitPalsVault as the owner
        @dev set the vault as the guard for the safe
        @dev give the operator the ability to manage the safe
        @param anchorCurrency - The main or anchor ERC20 token that the vault will manage.
        @param tokens - The list of tokens that the vault will allow to be deposited.
        @param operatorFee - percentage of profit that will be accumulated as Operator's share of the vault
        @param name - Name of the shares token
        @param symbol - Symbol of the shares token
    */
    function createVault(
        IERC20 anchorCurrency,
        address[] calldata tokens,
        uint256 operatorFee,
        string memory name,
        string memory symbol
    ) external returns (IProfitPalsVault) {
        ProfitPalsVault vault = new ProfitPalsVault(
            anchorCurrency,
            tokens,
            operatorFee,
            name,
            symbol
        );


        address[] memory owners = new address[](3);
        owners[0] = address(vault);
        owners[1] = tx.origin; //TODO drop deployer address from vault owners
        owners[2] = address(this);

        bytes memory safeInitializerData = abi.encodeCall(
            GnosisSafe.setup,
            (owners,
                1,
                address(0),
                "",
                address(SAFE_COMPATIBILITY_FALLBACK_HANDLER),
                address(0),
                0,
                payable(0))
        );
        GnosisSafeProxy proxy = GnosisSafeProxyFactory(SAFE_PROXY_FACTORY_130_POLYGON).createProxyWithNonce(
            SAFE_LOGIC_SINGLETON_POLYGON,
            safeInitializerData,
            0 //owners[0] is always a new contract, don't need to worry about nonce
        );
        GnosisSafeL2 safe = GnosisSafeL2(payable(address(proxy)));

        for (uint256 i = 0; i < tokens.length; i++) {
            approveToken(safe, IERC20(tokens[i]));
        }

        bytes memory setGuardData = abi.encodeCall(
            GuardManager.setGuard,
            address(vault)
        );

        safe.execTransaction(
            address(safe), //to
            0, //value
            setGuardData,
            Enum.Operation.Call,
            0, // safeTxGas
            0, // baseGas
            0, // gasPrice
            address(0), // gasToken
            payable(address(this)), // refundReceiver
            nopSignature
        );

        vault.initialize(safe);

        emit ProfitPalsVaultCreated(vault, anchorCurrency, tokens, operatorFee, name, symbol, address(safe));

        return vault;
    }

    function approveToken(GnosisSafeL2 safe, IERC20 token) private {
        bytes memory approveTokenData = abi.encodeCall(
            IERC20.approve,
            (address(UV3_PERMIT2), type(uint256).max)
        );

        safe.execTransaction(
            address(token), //to
            0, //value
            approveTokenData,
            Enum.Operation.Call,
            0, // safeTxGas
            0, // baseGas
            0, // gasPrice
            address(0), // gasToken
            payable(address(this)), // refundReceiver
            nopSignature
        );
    }

    function isValidSignature(bytes memory, bytes memory _signature) public view override returns (bytes4){
        if (keccak256(_signature) == keccak256(hex"00")) {//TODO do some actual checking
            return bytes4(EIP1271_MAGIC_VALUE);
        }
        return bytes4(0);
    }
}
