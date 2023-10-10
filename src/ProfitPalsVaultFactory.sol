// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfitPalsVaultFactory {
    address public immutable safeLogicSingleton;
    address public immutable safeProxyFactory;

    constructor(address safeLogicSingleton_, address safeProxyFactory_){
        safeLogicSingleton = safeLogicSingleton_;
        safeProxyFactory = safeProxyFactory_;
    }
}
