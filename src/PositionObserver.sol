// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Constants.sol";
import "./interfaces/INonfungiblePositionManager.sol";
import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/IUniswapV3Pool.sol";
import "@openzeppelin/token/ERC20/extensions/IERC20Metadata.sol";

contract PositionObserver {
    address public safe;
    constructor(
        address _safe
    ){
        safe = _safe;
    }

    function positionCount() external view returns (uint256) {
        return INonfungiblePositionManager(UNISWAP_POSITION_MANAGER).balanceOf(address(safe));
    }

    function tokenIdByIndex(uint256 index) external view returns (uint256) {
        return INonfungiblePositionManager(UNISWAP_POSITION_MANAGER).tokenOfOwnerByIndex(address(safe), index);
    }

    function poolAddress(uint256 tokenId) external view returns (address) {
        (
            uint96 nonce,
            address operator,
            address token0,
            address token1,
            uint24 fee,
            int24 tickLower,
            int24 tickUpper,
            uint128 liquidity,
            uint256 feeGrowthInside0LastX128,
            uint256 feeGrowthInside1LastX128,
            uint128 tokensOwed0,
            uint128 tokensOwed1
        ) = INonfungiblePositionManager(UNISWAP_POSITION_MANAGER).positions(tokenId);
        return IUniswapV3Factory(UNISWAP_V3_FACTORY).getPool(token0, token1, fee);
    }

    function calculatePrice(int56 tick0, int56 tick1, int56 secs, uint256 decimals0, uint256 decimals1) internal pure returns (uint256) {
        int56 exponent = (tick0 - tick1) / secs;
        uint256 base = 10001;
        uint256 price = 10000;
        while (exponent > 0) {
            if (exponent & 1 == 1) {
               price = (price * base) / 10000;
            }
            base = (base * base) / 10000;
            exponent >>= 1;
        }
        price *= 10 ** 18;
        if (decimals0 > decimals1) {
            price /= 10 ** (decimals0 - decimals1);
        } else {
            price *= 10 ** (decimals1 - decimals0);
        }
        return price;
    }

    function positionPriceByTokenId(uint256 tokenId) external view returns (uint256) {
        (
            uint96 nonce,
            address operator,
            address token0,
            address token1,
            uint24 fee,
            int24 tickLower,
            int24 tickUpper,
            uint128 liquidity,
            uint256 feeGrowthInside0LastX128,
            uint256 feeGrowthInside1LastX128,
            uint128 tokensOwed0,
            uint128 tokensOwed1
        ) = INonfungiblePositionManager(UNISWAP_POSITION_MANAGER).positions(tokenId);
        uint8 token0Decimals = IERC20Metadata(token0).decimals();
        uint8 token1Decimals = IERC20Metadata(token1).decimals();
        address pool = IUniswapV3Factory(UNISWAP_V3_FACTORY).getPool(token0, token1, fee);
        uint32[] memory secondsAgos = new uint32[](2);
        secondsAgos[0] = 0;
        secondsAgos[1] = 1;
        (
            int56[] memory tickCumulatives,
            uint160[] memory secondsPerLiquidityCumulativeX128s
        ) = IUniswapV3Pool(pool).observe(secondsAgos);
        require(tickCumulatives.length == 2);
        return calculatePrice(tickCumulatives[0], tickCumulatives[1], 1, token0Decimals, token1Decimals);
    }
}
