// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IProfitPalsVault.sol";
import "@openzeppelin/token/ERC20/extensions/ERC4626.sol";
import "@safe-contracts/GnosisSafeL2.sol";
import {Guard} from "@safe-contracts/base/GuardManager.sol";
import "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import "@openzeppelin/proxy/utils/Initializable.sol";

/**
 * @title ProfitPalsVault
 * @dev This contract acts as the primary vault for the ProfitPals project, holding and managing all assets.
 * The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
 */
contract ProfitPalsVault is IProfitPalsVault, ERC4626, Guard, Initializable {
    struct Action {
        address to;
        uint256 value;
        bytes data;
        Enum.Operation operation;
        uint256 safeTxGas;
        uint256 baseGas;
        uint256 gasPrice;
        address gasToken;
        address payable refundReceiver;
        bytes signatures;
        address msgSender;
    }

    event UnauthorizedActionDetected(
        address to,
        uint256 value,
        bytes data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes signatures,
        address msgSender);

    event ActionLog(Action action);

    Action[] actionLog;

    IERC20 public immutable anchorCurrency;
    address public immutable operator;
    uint256 public immutable operatorFee;
    IERC20[] public allowedTokens;
    GnosisSafeL2 public safe;

    mapping(address => bool) isTokenAllowed;
    mapping(address => bool) isUniswapContract;

    /**
     * @param anchorCurrency_ - The main or anchor ERC20 token that the vault will manage.
     * @param name_ - Name of the shares token
     * @param symbol_ - Symbol of the shares token
     */
    constructor(
        IERC20 anchorCurrency_,
        IERC20[] memory tokens,
        uint256 operatorFee_,
        string memory name_,
        string memory symbol_
    )
    ERC4626(anchorCurrency_) ERC20(name_, symbol_){
        operator = tx.origin; //TODO think about this
        anchorCurrency = anchorCurrency_;
        operatorFee = operatorFee_;
        allowedTokens = tokens;

        for (uint i = 0; i < tokens.length; i++) {
            isTokenAllowed[address(tokens[i])] = true;
        }
        isTokenAllowed[0x0000000000000000000000000000000000001010] = true; // MATIC

        //TODO allow self
//        https://docs.uniswap.org/contracts/v3/reference/deployments
        isUniswapContract[0x1F98431c8aD98523631AE4a59f267346ea31F984] = true; // UniswapV3Factory
        isUniswapContract[0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696] = true; // Multicall2
        isUniswapContract[0xB753548F6E010e7e680BA186F9Ca1BdAB2E90cf2] = true; // ProxyAdmin
        isUniswapContract[0xbfd8137f7d1516D3ea5cA83523914859ec47F573] = true; // TickLens
        isUniswapContract[0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6] = true; // Quoter
        isUniswapContract[0xE592427A0AEce92De3Edee1F18E0157C05861564] = true; // SwapRouter
        isUniswapContract[0x42B24A95702b9986e82d421cC3568932790A48Ec] = true; // NFTDescriptor
        isUniswapContract[0x91ae842A5Ffd8d12023116943e72A606179294f3] = true; // NonfungibleTokenPositionDescriptor
        isUniswapContract[0xEe6A57eC80ea46401049E92587E52f5Ec1c24785] = true; // TransparentUpgradeableProxy
        isUniswapContract[0xC36442b4a4522E871399CD717aBDD847Ab11FE88] = true; // NonfungiblePositionManager
        isUniswapContract[0xA5644E29708357803b5A882D272c41cC0dF92B34] = true; // V3Migrator
        isUniswapContract[0x61fFE014bA17989E743c5F6cB21bF9697530B21e] = true; // QuoterV2
        isUniswapContract[0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45] = true; // SwapRouter02
        isUniswapContract[0x000000000022D473030F116dDEE9F6B43aC78BA3] = true; // Permit2
        isUniswapContract[0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD] = true; // UniversalRouter

        isUniswapContract[0x643770E279d5D0733F21d6DC03A8efbABf3255B4] = true; // UniversalRouter

        isUniswapContract[0xA65387F16B013cf2Af4605Ad8aA5ec25a2cbA3a2] = true; // SignMessageLib
    }

    function initialize(
        GnosisSafeL2 safe_
    ) public initializer {
        safe = safe_;
        //TODO send unlimited approvals for all allowedTokens
    }


    function totalAssets() public view override(IERC4626, ERC4626) returns (uint256) {
        //TODO add overall Uniswap positions here
        return anchorCurrency.balanceOf(address(this));
    }

    function deposit(uint256 amount) external {

    }

    function withdraw(uint256 amount) external {

    }

    function pause() external {

    }

    function unpause() external {

    }

    function allowedTokensList() external view override returns (IERC20[] memory) {
        return allowedTokens;
    }

    function allowedTokensCount() external view override returns (uint256) {
        return allowedTokens.length;
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
//        require(isUniswapContract[to] || isTokenAllowed[to], "Only approvals of allowed tokens to Uniswap and Uniswap contracts allowed"); //TODO iterate over allowed tokens
        if (!isUniswapContract[to] && !isTokenAllowed[to]) {
            emit UnauthorizedActionDetected(to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, signatures, msgSender);
        }

        emit ActionLog(Action(
            to,
            value,
            data,
            operation,
            safeTxGas,
            baseGas,
            gasPrice,
            gasToken,
            refundReceiver,
            signatures,
            msgSender));
//        emit ActionLog(action);
        //TODO keep record of mint txs
        //TODO keep record of burn ( decrease liquidity ) txs
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        //TODO get minted position IDs
    }

}
