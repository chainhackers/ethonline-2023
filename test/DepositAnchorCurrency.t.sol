// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ProfitPalsVault} from "../src/ProfitPalsVault.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "forge-std/Test.sol";
import "../src/Constants.sol";
import {Script, console2} from "forge-std/Script.sol";

contract DepositAnchorCurrencyTest is Test {


    address USDC_BIG_HOLDER = 0xF977814e90dA44bFA03b6295A0616a897441aceC;

    IERC20 usdc = IERC20(USDC_POLYGON);
    IERC20 wbtc = IERC20(WBTC_POLYGON);

    IERC20[] tokens = new IERC20[](1);
    ProfitPalsVault public profitPalsVault;

    function setUp() public {
        tokens.push(usdc);

        profitPalsVault = new ProfitPalsVault(
            usdc,
            tokens,
            2000,

            "testUSDCVault", "tUSDCv",

            SAFE_PROXY_FACTORY_130_POLYGON,
            SAFE_LOGIC_SINGLETON_POLYGON
        );

        vm.startPrank(USDC_BIG_HOLDER);
        usdc.transfer(address(this), 1000 * 10 ** 6);
        vm.stopPrank();
    }

    function test_DepositUsdAndGotShares() public {
        assertEq(profitPalsVault.balanceOf(address(this)), 0);
        usdc.approve(address(profitPalsVault), 100 * 10 ** 6);
        profitPalsVault.deposit(100 * 10 ** 6, address(this));
        assertEq(usdc.balanceOf(address(profitPalsVault)), 100 * 10 ** 6);
        assertEq(profitPalsVault.balanceOf(address(this)), 100 * 10 ** SHARE_DECIMALS);
    }
}
