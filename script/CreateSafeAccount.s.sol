pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Safe}

address constant SAFE_PROXY_FACTORY = 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2;

contract CreateSafeAccountScript is Script {
    function setUp() public {
        //createProxyWithNonce
        /**
36372b07000000000000000000000000a6b71e26c5e0845f74c812102ca7114b6a896ab20000000
         */
    }

    function run() public {
        vm.broadcast();
    }
}