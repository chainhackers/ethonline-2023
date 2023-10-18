// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@safe-contracts/base/GuardManager.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "./Constants.sol";

contract UniswapOnlyGuard is Guard {
    mapping(address => bool) allowedTokens;
    mapping(address => bool) uniswapContracts;
// https://docs.uniswap.org/contracts/v3/reference/deployments
// 0x1F98431c8aD98523631AE4a59f267346ea31F984
// 0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696
// 0xC36442b4a4522E871399CD717aBDD847Ab11FE88
// 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
// 0x000000000022D473030F116dDEE9F6B43aC78BA3
// 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD

    constructor(
        IERC20[] memory allowedTokens_
    ){
        for (uint i = 0; i < allowedTokens_.length; i++) {
            allowedTokens[address(allowedTokens_[i])] = true;
        }

        uniswapContracts[0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2] = true; // sign message lib https://polygonscan.com/address/0xa65387f16b013cf2af4605ad8aa5ec25a2cba3a2#writeContract

        uniswapContracts[0x1F98431c8aD98523631AE4a59f267346ea31F984] = true;
        uniswapContracts[0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696] = true;
        uniswapContracts[0xC36442b4a4522E871399CD717aBDD847Ab11FE88] = true;
        uniswapContracts[0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45] = true;
        uniswapContracts[0x000000000022D473030F116dDEE9F6B43aC78BA3] = true;
        uniswapContracts[0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD] = true;
    }

    // TODO not sure, experimenting, consider removing this
    // solhint-disable-next-line payable-fallback
    fallback() external {
        // We don't revert on fallback to avoid issues in case of a Safe upgrade
        // E.g. The expected check method might change and then the Safe would be locked.
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
        require(uniswapContracts[to] || allowedTokens[to], "Only approvals of allowed tokens to Uniswap and Uniswap contracts allowed"); //TODO iterate over allowed tokens
        //TODO keep record of mint txs
        //TODO keep record of burn ( decrease liquidity ) txs
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        //TODO get minted position IDs
    }
}
