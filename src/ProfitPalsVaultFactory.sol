// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVaultFactory.sol";
import "./ProfitPalsVault.sol";
import "./Constants.sol";
import {GnosisSafeProxyFactory} from "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import {GnosisSafeProxy} from "@safe-contracts/proxies/GnosisSafeProxy.sol";
import "./UniswapOnlyGuard.sol";
import "@safe-contracts/GnosisSafeL2.sol";
import "@safe-contracts/examples/guards/ReentrancyTransactionGuard.sol";

contract ProfitPalsVaultFactory is IProfitPalsVaultFactory {
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


        address[] memory owners = new address[](2);
        owners[0] = address(vault);
        owners[1] = tx.origin; //TODO think about this


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

        emit ProfitPalsVaultCreated(vault, anchorCurrency, tokens, operatorFee, name, symbol);

        return vault;
    }
}
