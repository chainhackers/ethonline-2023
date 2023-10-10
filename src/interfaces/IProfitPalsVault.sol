// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/interfaces/IERC4626.sol";

interface IProfitPalsVault is IERC4626 {
    function anchorCurrency() external view returns (IERC20);
}
