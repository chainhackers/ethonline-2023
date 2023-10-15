pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {ProfitPalsVault} from "../src/ProfitPalsVault.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";
import "../src/ProfitPalsVaultFactory.sol";

contract ProfitPalsVaultDeploy is Script {
    IERC20[] public allowedTokens;

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddr = vm.addr(deployerPrivateKey);


        allowedTokens.push(IERC20(USDC_POLYGON));
        allowedTokens.push(IERC20(WBTC_POLYGON));

        vm.startBroadcast(deployerPrivateKey);

        ProfitPalsVaultFactory factory = new ProfitPalsVaultFactory(
            SAFE_LOGIC_SINGLETON_POLYGON,
            SAFE_PROXY_FACTORY_130_POLYGON
        );

        factory.createVault(
            IERC20(USDC_POLYGON),
            allowedTokens,
            100,
            "PP_USD_BTC_VAULT",
            "PPV"
        );

        vm.stopBroadcast();
    }
}