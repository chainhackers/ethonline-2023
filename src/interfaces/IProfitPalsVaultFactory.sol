// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";

interface IProfitPalsVaultFactory {
    function createVault(IERC20 anchorCurrency, string memory name_, string memory symbol_) external returns (address);

    function safeLogicSingleton() external view returns (address);

    function safeProxyFactory() external view returns (address);
}
