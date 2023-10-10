// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVault.sol";
import "@openzeppelin/token/ERC20/extensions/ERC4626.sol";
import "@safe-contracts/GnosisSafe.sol";
import "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";

/**
 * @title ProfitPalsVault
 * @dev This contract acts as the primary vault for the ProfitPals project, holding and managing all assets.
 * The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
 */
contract ProfitPalsVault is IProfitPalsVault, ERC4626 {
    IERC20 public immutable anchorCurrency;

    /**
     * @param anchorCurrency_ - The main or anchor ERC20 token that the vault will manage.
     * @param name_ - Name of the shares token
     * @param symbol_ - Symbol of the shares token
     */
    constructor(
        address safeProxyFactory,
        address safeLogicSingleton,
        IERC20 anchorCurrency_,
        string memory name_,
        string memory symbol_
    )
    ERC4626(anchorCurrency_) ERC20(name_, symbol_){
        //TODO init safe account
        address[] memory owners = new address[](1);
        owners[0] = address(this);


        bytes memory safeAccountSetupData = abi.encodeCall(
            GnosisSafe.setup,
            (owners,
                1,
                address(0),
                "",
                address(0),
                address(0),
                0,
                payable(0))
        );
        GnosisSafeProxyFactory(safeProxyFactory).createProxyWithNonce(
            safeLogicSingleton,
            safeAccountSetupData,
            6661489
        );

        anchorCurrency = anchorCurrency_;
    }

    function totalAssets() public view override(IERC4626, ERC4626) returns (uint256) {
        //TODO add overall Uniswap positions here
        return anchorCurrency.balanceOf(address(this));
    }
}
