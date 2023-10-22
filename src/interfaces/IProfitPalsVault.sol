// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/interfaces/IERC4626.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@safe-contracts/GnosisSafeL2.sol";

/**
    @title ProfitPalsVault
    @notice ProfitPalsVault acts as the primary vault for the ProfitPals project, holding and managing all assets.
    @notice The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
    @notice It filters operator interactions using predefined contracts list and allowed tokens.
    @dev Inherits OZ ERC4626, uses UniswapV3 position value estimates in `mint`, `redeem` and other functions
    @dev where it's required to know total assets value
    @author Gene A. Tsvigun - <gene@chainhackers.xyz>
    @author Denise Epstein - <denise31337@gmail.com>
*/
interface IProfitPalsVault is IERC4626 {
    event PositionAcquired(uint256 indexed tokenId);

    function safe() external view returns (GnosisSafeL2);

    function operator() external view returns (address);

    function operatorFee() external view returns (uint256);

    function anchorCurrency() external view returns (IERC20);

    function allowedTokens(uint256 index) external view returns (address);

    function allowedTokensList() external view returns (address[] memory);

    function allowedTokensCount() external view returns (uint256);

    function pause() external;

    function unpause() external;
}
