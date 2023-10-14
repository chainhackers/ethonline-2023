// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/interfaces/IERC4626.sol";

interface IProfitPalsVault is IERC4626 {
    function operator() external view returns (address);

    function operatorFee() external view returns (uint256);

    function anchorCurrency() external view returns (IERC20);

    function allowedTokens(uint256 index) external view returns (IERC20);

    function deposit(uint256 amount) external;

    function withdraw(uint256 amount) external;

    function pause() external;

    function unpause() external;
}
