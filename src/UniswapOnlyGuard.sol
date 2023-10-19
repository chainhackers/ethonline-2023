// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@safe-contracts/base/GuardManager.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "./Constants.sol";

contract UniswapOnlyGuard is Guard {
    mapping(address => bool) allowedTokens;
    mapping(address => bool) uniswapContracts;

    constructor(
        IERC20[] memory allowedTokens_
    ){
        for (uint i = 0; i < allowedTokens_.length; i++) {
            allowedTokens[address(allowedTokens_[i])] = true;
        }

//        https://docs.uniswap.org/contracts/v3/reference/deployments
        uniswapContracts[0x1F98431c8aD98523631AE4a59f267346ea31F984] = true; // UniswapV3Factory
        uniswapContracts[0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696] = true; // Multicall2
        uniswapContracts[0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2] = true; // ProxyAdmin
        uniswapContracts[0xbfd8137f7d1516D3ea5cA83523914859ec47F573] = true; // TickLens
        uniswapContracts[0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6] = true; // Quoter
        uniswapContracts[0xE592427A0AEce92De3Edee1F18E0157C05861564] = true; // SwapRouter
        uniswapContracts[0x42B24A95702b9986e82d421cC3568932790A48Ec] = true; // NFTDescriptor
        uniswapContracts[0x91ae842A5Ffd8d12023116943e72A606179294f3] = true; // NonfungibleTokenPositionDescriptor
        uniswapContracts[0xEe6A57eC80ea46401049E92587E52f5Ec1c24785] = true; // TransparentUpgradeableProxy
        uniswapContracts[0xC36442b4a4522E871399CD717aBDD847Ab11FE88] = true; // NonfungiblePositionManager
        uniswapContracts[0xA5644E29708357803b5A882D272c41cC0dF92B34] = true; // V3Migrator
        uniswapContracts[0x61fFE014bA17989E743c5F6cB21bF9697530B21e] = true; // QuoterV2
        uniswapContracts[0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45] = true; // SwapRouter02
        uniswapContracts[0x000000000022D473030F116dDEE9F6B43aC78BA3] = true; // Permit2
        uniswapContracts[0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD] = true; // UniversalRouter

        uniswapContracts[0x643770E279d5D0733F21d6DC03A8efbABf3255B4] = true; // UniversalRouter

        uniswapContracts[0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2] = true; // SignMessageLib

        uniswapContracts[0x0000000000000000000000000000000000001010] = true; // MATIC
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
