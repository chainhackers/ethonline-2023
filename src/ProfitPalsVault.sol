// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/proxy/utils/Initializable.sol";

import "@safe-contracts/GnosisSafeL2.sol";
import "@safe-contracts/proxies/GnosisSafeProxyFactory.sol";
import {Guard} from "@safe-contracts/base/GuardManager.sol";

import "./Constants.sol";
import "./interfaces/IProfitPalsVault.sol";

/**
    @title ProfitPalsVault
    @notice ProfitPalsVault acts as the primary vault for the ProfitPals project, holding and managing all assets.
    @notice The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
    @notice It filters operator interactions using predefined contracts list and allowed tokens.
    @dev Inherits OZ ERC4626, uses UniswapV3 position value estimates in `mint`, `redeem` and other functions
    @dev where it's required to know total assets value
    @author Gene A. Tsvigun - <gene@chainhackers.xyz>
    @author Denise Epstein - <denise31337@gmail.com>
*/
contract ProfitPalsVault is IProfitPalsVault, ERC4626, Guard, Initializable {
    address[17] ALLOWED_CONTRACTS = [ //TODO make this list shorter, not all of thesea addresses are necessary
    UV3_UNISWAP_V3_FACTORY,
    UV3_MULTICALL2,
    UV3_PROXY_ADMIN,
    UV3_TICK_LENS,
    UV3_QUOTER,
    UV3_SWAP_ROUTER,
    UV3_NFT_DESCRIPTOR,
    UV3_NONFUNGIBLE_TOKEN_POSITION_DESCRIPTOR,
    UV3_TRANSPARENT_UPGRADEABLE_PROXY,
    UV3_NONFUNGIBLE_POSITION_MANAGER,
    UV3_V3_MIGRATOR,
    UV3_QUOTER_V2,
    UV3_SWAP_ROUTER_V2,
    UV3_PERMIT2,
    UV3_UNIVERSAL_ROUTER,
    UNIVERSAL_ROUTER2,
    SAFE_SIGN_MESSAGE_LIB
    ];

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

    IERC20 public immutable anchorCurrency;
    address public immutable operator;
    uint256 public immutable operatorFee;
    address[] public allowedTokens;
    GnosisSafeL2 public safe;

    mapping(address => bool) isTokenAllowed;
    mapping(address => bool) isContractAllowed;

    /**
     * @param anchorCurrency_ - The main or anchor ERC20 token that the vault will manage.
     * @param name_ - Name of the shares token
     * @param symbol_ - Symbol of the shares token
     */
    constructor(
        IERC20 anchorCurrency_,
        address[] memory tokens,
        uint256 operatorFee_,
        string memory name_,
        string memory symbol_
    )
    ERC4626(anchorCurrency_) ERC20(name_, symbol_){
        operator = tx.origin; //TODO think about this
        anchorCurrency = anchorCurrency_;
        operatorFee = operatorFee_;
        allowedTokens = tokens;

        for (uint i = 0; i < ALLOWED_CONTRACTS.length; i++) {
            isContractAllowed[address(ALLOWED_CONTRACTS[i])] = true;
        }

        for (uint i = 0; i < tokens.length; i++) {
            isTokenAllowed[address(tokens[i])] = true;
        }
        isTokenAllowed[address(anchorCurrency)] = true;
        isTokenAllowed[0x0000000000000000000000000000000000001010] = true; // MATIC //TODO
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

    function allowedTokensList() external view override returns (address[] memory) {
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
        if (!isContractAllowed[to] && !isTokenAllowed[to]) {
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
        //TODO keep record of mint txs
        //TODO keep record of burn ( decrease liquidity ) txs
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        //TODO get minted position IDs
    }

}
