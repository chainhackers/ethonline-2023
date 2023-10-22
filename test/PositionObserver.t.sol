pragma solidity ^0.8.0;

import {Test, console2} from "forge-std/Test.sol";
import {PositionObserver} from "../src/PositionObserver.sol";

contract PositionObserverTest is Test {
    PositionObserver observer;

    address constant SAFE_ADDRESS = 0xD4928171A52f420855Bf59bcaF3C7077F42298D5;

    function setUp() public {
        observer = new PositionObserver(address(SAFE_ADDRESS));
    }

    function testPositionCount() public {
        assertEq(observer.positionCount(), 2);
    }

    function testTokenIdByIndex() public {
        assertEq(observer.tokenIdByIndex(0), 1071846);
        assertEq(observer.tokenIdByIndex(1), 1081648);
    }

    function testPoolAddress() public {
        assertEq(observer.poolAddress(1071846), 0x0e44cEb592AcFC5D3F09D996302eB4C499ff8c10);
        assertEq(observer.poolAddress(1081648), 0x8Fc5e02d85891BA2855af1904dfc5cf1d82e4a44);
    }

    function testPositionPrice() public {
        console2.log("price", observer.positionPriceByTokenId(1071846));
        console2.log("price", observer.positionPriceByTokenId(1081648));
//        assertEq(observer.positionPriceByTokenId(1071846), 1000000000000000000);
//        assertEq(observer.positionPriceByTokenId(1081648), 1000000000000000000);
    }
}