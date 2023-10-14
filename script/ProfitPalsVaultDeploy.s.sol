pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {ProfitPalsVault} from "../src/ProfitPalsVault.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

contract ProfitPalsVaultDeploy is Script {
    //Goerli
    address constant SAFE_PROXY_FACTORY = 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2;
    address constant SAFE_LOGIC_SINGLETON = 0x3E5c63644E683549055b9Be8653de26E0B4CD36E;
    address constant USDC_ADDRESS = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address constant WBTC_ADDRESS = 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6;
    address constant WETH_ADDRESS = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
    IERC20[] public allowedTokens;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddr = vm.addr(deployerPrivateKey);


        allowedTokens.push(IERC20(WBTC_ADDRESS));
        allowedTokens.push(IERC20(WETH_ADDRESS));

        vm.startBroadcast(deployerPrivateKey);

        ProfitPalsVault profitPalsVault = new ProfitPalsVault(
            IERC20(USDC_ADDRESS),
            allowedTokens,
            10,
            "TestVault",
            "testPPVault"
        );

        vm.stopBroadcast();
    }
}