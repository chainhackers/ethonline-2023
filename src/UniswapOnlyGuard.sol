// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@safe-contracts/base/GuardManager.sol";

contract UniswapOnlyGuard is Guard {
    constructor(){

    }

    function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external override {
        require(to == address(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D), "Only Uniswap transactions allowed");
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        // Nothing to do
    }
}
