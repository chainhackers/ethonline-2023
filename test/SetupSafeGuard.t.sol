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
import {UniswapOnlyGuard} from "../src/UniswapOnlyGuard.sol";

contract SetupSafeGuard is Test {

    address constant SINGLETON_ADDRESS = 0x3E5c63644E683549055b9Be8653de26E0B4CD36E;
    address constant SAFE_PROXY_FACTORY = 0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2;
    address USDC_BIG_HOLDER = 0xF977814e90dA44bFA03b6295A0616a897441aceC;
    IERC20 usdc = IERC20(USDC_POLYGON);

    GnosisSafeProxy proxy;

    function setUp() public {

        address[] memory owners = new address[](1);
        owners[0] = address(this);

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
        proxy = GnosisSafeProxyFactory(SAFE_PROXY_FACTORY).createProxyWithNonce(
            SINGLETON_ADDRESS,
            data,
            1234567
        );

        vm.startPrank(USDC_BIG_HOLDER);
        usdc.transfer(address(this), 1000 * 10 ** 6);

        payable(address(this)).transfer(10 ** 18);
        vm.stopPrank();
    }

//    function execTransaction(
//        address to,
//        uint256 value,
//        bytes calldata data,
//        Enum.Operation operation,
//        uint256 safeTxGas,
//        uint256 baseGas,
//        uint256 gasPrice,
//        address gasToken,
//        address payable refundReceiver,
//        bytes memory signatures
//    )

    function test_deploySafeAndAddGuard() public {
        UniswapOnlyGuard guard = new UniswapOnlyGuard(new IERC20[](0));
        // GuardManager.setGuard(address guard)
        bytes memory setGuardCallData = abi.encodeCall(
            GuardManager.setGuard,
            (address(guard))
        );
        bool success = GnosisSafe(payable(proxy)).execTransaction(
            address(proxy),
            0,
            setGuardCallData,
            Enum.Operation.Call,
            0,
            0,
            0,
            address(0),
            payable(0),
            ""
        );
        assertTrue(success, "setGuard should succeed");
    }
}
