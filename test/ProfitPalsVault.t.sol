// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console2} from "forge-std/Test.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import {GnosisSafe} from "@safe-contracts/GnosisSafe.sol";
import {GnosisSafeL2} from "@safe-contracts/GnosisSafeL2.sol";
import {GnosisSafeProxy} from "@safe-contracts/proxies/GnosisSafeProxy.sol";
import {GnosisSafeProxyFactory} from "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import {Enum} from "@safe-contracts/common/Enum.sol";
import {GuardManager} from "@safe-contracts/base/GuardManager.sol";
import "../src/Constants.sol";
import "../src/ProfitPalsVaultFactory.sol";

contract SetupSafeGuard is Test {
    address USDC_BIG_HOLDER = 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245;

    address[] public allowedTokens;
    IERC20 anchorCurrency;
    address[] owners;

    ProfitPalsVaultFactory factory;
    IProfitPalsVault vault;
    GnosisSafeProxy proxy;

    function setUp() public {
        string memory rpcURL = vm.envString("POLYGON_RPC_URL");
        uint256 forkId = vm.createFork(rpcURL);
        vm.selectFork(forkId);

        anchorCurrency = IERC20(USDC_POLYGON);

        vm.prank(USDC_BIG_HOLDER);
        anchorCurrency.transfer(address(this), 1000 * 10 ** 6);

        vm.deal(address(this), 10 ** 18);

        allowedTokens.push(WBTC_POLYGON);
        allowedTokens.push(WETH_POLYGON);

        factory = new ProfitPalsVaultFactory(
            SAFE_LOGIC_SINGLETON_POLYGON,
            SAFE_PROXY_FACTORY_130_POLYGON
        );

        vault = factory.createVault(
            IERC20(USDC_POLYGON),
            allowedTokens,
            100,
            "PP_USDC_WETH_WBTC_VAULT",
            "PPV"
        );
    }

    function test_createVault() public {
        address[] memory expectedAllowedTokens = new address[](2);
        expectedAllowedTokens[0] = WBTC_POLYGON;
        expectedAllowedTokens[1] = WETH_POLYGON;
        assertEq(vault.allowedTokensList(), expectedAllowedTokens);

        assertEq(vault.totalAssets(), 0);
        assertEq(vault.asset(), address(anchorCurrency));
    }
}
