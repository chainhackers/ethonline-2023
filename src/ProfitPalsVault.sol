// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVault.sol";
import "@openzeppelin/token/ERC20/extensions/ERC4626.sol";
import "@safe-contracts/GnosisSafeL2.sol";
import "@safe-contracts/base/GuardManager.sol";
import "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import "@openzeppelin/proxy/utils/Initializable.sol";

/**
 * @title ProfitPalsVault
 * @dev This contract acts as the primary vault for the ProfitPals project, holding and managing all assets.
 * The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
 */
contract ProfitPalsVault is IProfitPalsVault, ERC4626, Initializable {
    IERC20 public immutable anchorCurrency;
    address public immutable operator;
    uint256 public immutable operatorFee;
    IERC20[] public allowedTokens;
    GnosisSafeL2 public safe;
    /**
     * @param anchorCurrency_ - The main or anchor ERC20 token that the vault will manage.
     * @param name_ - Name of the shares token
     * @param symbol_ - Symbol of the shares token
     */
    constructor(
        IERC20 anchorCurrency_,
        IERC20[] memory tokens,
        uint256 operatorFee_,
        string memory name_,
        string memory symbol_
    )
    ERC4626(anchorCurrency_) ERC20(name_, symbol_){
        operator = tx.origin; //TODO think about this
        anchorCurrency = anchorCurrency_;
        operatorFee = operatorFee_;
        allowedTokens = tokens;
    }

    function initialize(
        GnosisSafeL2 safe_
    ) public initializer {
        safe = safe_;
    }

    function totalAssets() public view override(IERC4626, ERC4626) returns (uint256) {
        //TODO add overall Uniswap positions here
        return anchorCurrency.balanceOf(address(this));
    }

    function deposit(uint256 amount) external {

    }

    function withdraw(uint256 amount) external {

    }

    function pause() external {

    }

    function unpause() external {

    }

    function allowedTokensList() external view override returns (IERC20[] memory) {
        return allowedTokens;
    }

    function allowedTokensCount() external view override returns (uint256) {
        return allowedTokens.length;
    }
}
