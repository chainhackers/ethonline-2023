pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {GnosisSafe} from "safe-contracts/GnosisSafe.sol";
import {GnosisSafeL2} from "safe-contracts/GnosisSafeL2.sol";
import {GnosisSafeProxyFactory} from "safe-contracts/proxies/GnosisSafeProxyFactory.sol";

address constant SINGLETON_ADDRESS = 0x3E5c63644E683549055b9Be8653de26E0B4CD36E;
address constant SAFE_PROXY_FACTORY = 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2;
address constant OWNER_ADDRESS = 0x01e36D100DbA45e62924307adf7c42c9c60d6214;

contract CreateSafeAccountScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = 0x822d559d14930eed585892d4d0b7b58f1778a74c2c0548fa518ce9fd85a08754;
//        address deployerAddr = vm.addr(deployerPrivateKey);

        address[] memory owners = new address[](1);
        owners[0] = OWNER_ADDRESS;


        vm.startBroadcast(deployerPrivateKey);

        bytes memory data = abi.encodeCall(
            GnosisSafe.setup,
        (owners,
            1,
            address(0),
            "",
            address(0),
            address(0),
            0,
            payable(0))
        );
        GnosisSafeProxyFactory(SAFE_PROXY_FACTORY).createProxyWithNonce(
            SINGLETON_ADDRESS,
            data,
            6661488
        );

        vm.stopBroadcast();
    }
}