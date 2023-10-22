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

contract ProfitPalsVaultTest is Test {
    address USDC_BIG_HOLDER = 0xe7804c37c13166fF0b37F5aE0BB07A3aEbb6e245;
    IERC20 usdc = IERC20(USDC_POLYGON);

    address[] public allowedTokens;
    IERC20 anchorCurrency;
    address[] owners;

    ProfitPalsVaultFactory factory;
    IProfitPalsVault vault;
    GnosisSafeProxy proxy;

    address investorA;
    address investorB;

    function setUp() public {
        string memory rpcURL = vm.envString("POLYGON_RPC_URL");
        uint256 forkId = vm.createFork(rpcURL);
        vm.selectFork(forkId);

        anchorCurrency = IERC20(USDC_POLYGON);

        vm.deal(address(this), 10 ** 18);
        vm.deal(investorA, 10 ** 18);
        vm.deal(investorB, 10 ** 18);

        investorA = vm.createWallet("investorA").addr;
        investorB = vm.createWallet("investorB").addr;

        vm.startPrank(USDC_BIG_HOLDER);
        anchorCurrency.transfer(address(this), 10000 * 10 ** 6);
        anchorCurrency.transfer(address(investorA), 10000 * 10 ** 6);
        anchorCurrency.transfer(address(investorB), 10000 * 10 ** 6);
        vm.stopPrank();

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

    function test_deposit() public {
        uint256 investment2k = 2000 * 10 ** 6;

        usdc.approve(address(vault), investment2k);
        vault.deposit(investment2k, address(this));
        assertEq(vault.balanceOf(address(this)), investment2k);
        assertEq(vault.totalAssets(), investment2k);
        assertEq(usdc.balanceOf(address(vault.safe())), investment2k);
        assertEq(usdc.balanceOf(address(vault)), 0);

        vm.startPrank(address(investorA));
        usdc.approve(address(vault), investment2k);
        vault.deposit(investment2k, investorA);
        vm.stopPrank();
        assertEq(vault.balanceOf(investorA), investment2k);
        assertEq(vault.totalAssets(), 4000 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault.safe())), 4000 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault)), 0);

        vm.startPrank(address(investorB));
        usdc.approve(address(vault), investment2k);
        vault.deposit(investment2k, investorB);
        vm.stopPrank();
        assertEq(vault.balanceOf(investorB), investment2k);
        assertEq(vault.totalAssets(), 6000 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault.safe())), 6000 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault)), 0);
    }

    function test_withdraw() public {
        uint256 investment10k = 10000 * 10 ** 6;

        usdc.approve(address(vault), investment10k);
        vault.deposit(investment10k, address(this));
        assertEq(vault.balanceOf(address(this)), investment10k);
        assertEq(vault.totalAssets(), investment10k);
        assertEq(usdc.balanceOf(address(vault.safe())), investment10k);
        assertEq(usdc.balanceOf(address(vault)), 0);

        vault.withdraw(5555 * 10 ** 6, address(this), address(this));
        assertEq(vault.balanceOf(address(this)), 4445 * 10 ** 6);
        assertEq(vault.totalAssets(), 4445 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault.safe())), 4445 * 10 ** 6);
        assertEq(usdc.balanceOf(address(vault)), 0);
        assertEq(usdc.balanceOf(address(this)), 5555 * 10 ** 6);
    }

    function test_swap() public {
        uint256 investment10k = 10000 * 10 ** 6;
        usdc.approve(address(vault), investment10k);
        vault.deposit(investment10k, address(this));
        assertEq(usdc.balanceOf(address(vault.safe())), investment10k);
        //TODO use Uniswap Universal Router SDK to send swaps
    }
}