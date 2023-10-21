// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "./IProfitPalsVault.sol";

interface IProfitPalsVaultFactory {
    event ProfitPalsVaultCreated(
        IProfitPalsVault indexed vault,
        IERC20 indexed anchorCurrency,
        uint256 operatorFee,
        string name,
        string symbol
    );

    function createVault(
        IERC20 anchorCurrency,
        address[] calldata tokens,
        uint256 operatorFee,
        string memory name_,
        string memory symbol_
    ) external returns (IProfitPalsVault);

    function safeLogicSingleton() external view returns (address);

    function safeProxyFactory() external view returns (address);
}
