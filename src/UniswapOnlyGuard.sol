// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@safe-contracts/base/GuardManager.sol";

contract UniswapOnlyGuard is Guard {
    address immutable permit2;
    constructor(address permit2_){
        permit2 = permit2_;
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
        require(to == permit2, "Only approvals to Uniswap Permit2 allowed");
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        // Nothing to do
    }
}
