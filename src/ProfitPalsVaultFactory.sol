// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVaultFactory.sol";
import "./ProfitPalsVault.sol";
import "./Constants.sol";
import {GnosisSafeProxyFactory} from "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import {GnosisSafeProxy} from "@safe-contracts/proxies/GnosisSafeProxy.sol";
import "./UniswapOnlyGuard.sol";
import "@safe-contracts/GnosisSafeL2.sol";
import "@safe-contracts/common/Enum.sol";
import "@safe-contracts/examples/guards/ReentrancyTransactionGuard.sol";
import "@safe-contracts/interfaces/ISignatureValidator.sol";


contract ProfitPalsVaultFactory is IProfitPalsVaultFactory, ISignatureValidator {
    address public immutable safeLogicSingleton;
    address public immutable safeProxyFactory;

    constructor(address safeLogicSingleton_, address safeProxyFactory_){
        safeLogicSingleton = safeLogicSingleton_;
        safeProxyFactory = safeProxyFactory_;
    }

    /**
        @dev create a new ProfitPalsVault
        @dev create a new Safe account with the ProfitPalsVault as the owner
        @dev create a new Guard with allowlist of tokens, and set it as the guard for the safe
        @dev give the operator the ability to manage the safe
        @param anchorCurrency - The main or anchor ERC20 token that the vault will manage.
        @param tokens - The list of tokens that the vault will allow to be deposited.
        @param operatorFee - percentage of profit that will be accumulated as Operator's share of the vault
        @param name - Name of the shares token
        @param symbol - Symbol of the shares token
    */
    function createVault(
        IERC20 anchorCurrency,
        IERC20[] calldata tokens,
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
        owners[1] = tx.origin; //TODO think about this
        owners[2] = address(this);

        //        UniswapOnlyGuard guard = new UniswapOnlyGuard(UNISWAP_PERMIT2_POLYGON, tokens);
        //        ReentrancyTransactionGuard guard = new ReentrancyTransactionGuard();

        bytes memory safeInitializerData = abi.encodeCall(
            GnosisSafe.setup,
            (owners,
                1,
                address(0), //TODO predict address of proxy to send to self
                "", //abi.encodeCall(GnosisSafe.setGuard,(guard)),
                address(0),
                address(0),
                0,
                payable(0))
        );
        GnosisSafeProxy proxy = GnosisSafeProxyFactory(SAFE_PROXY_FACTORY_130_POLYGON).createProxyWithNonce(
            SAFE_LOGIC_SINGLETON_POLYGON,
            safeInitializerData,
            983123411112131982431234 //owners[0] is always a new contract, don't need to worry about nonce
        );
        GnosisSafeL2 safe = GnosisSafeL2(payable(address(proxy)));

        bytes memory setGuardData = abi.encodeCall(
            GuardManager.setGuard,
            address(safe)
        );

//        https://docs.safe.global/safe-smart-account/signatures#contract-signature-eip-1271
//        {32-bytes signature verifier}{32-bytes data position}{1-byte signature type}
//        {32-bytes signature length}{bytes signature data}
        bytes memory signature = bytes.concat(
            abi.encode(address(this)),
            abi.encode(uint8(65)),
            bytes1(0),    //static part ends here
            abi.encode(uint8(1)),   //signature length
            bytes1(0)     //signature data
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
            signature
        );

        emit ProfitPalsVaultCreated(vault, anchorCurrency, tokens, operatorFee, name, symbol);

        return vault;
    }

    function isValidSignature(bytes memory _data, bytes memory _signature) public view override returns (bytes4){
        return bytes4(EIP1271_MAGIC_VALUE); //TODO
    }
}
