// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "./IProfitPalsVault.sol";

/**
    @title IProfitPalsVaultFactory
    @notice ProfitPalsVaultFactory creates a new Vault with settings that stay immutable during
    @notice the vault existence, namely Operator address, anchor currency, allowed tokens, operator fee
    @notice creates a new `GnosisSafeProxy` using `GnosisSafeProxyFactory`
    @notice approves infinite spending limit to UniswapV3 Permit2 for all allowed tokens
    @notice sets the vault as one of the new Safe owners, and the operator as the other one
    @notice It filters operator interactions using predefined contracts list and allowed tokens.
    @dev Signs every tx to Safe with an EIP1271 signature
    @author Gene A. Tsvigun - <gene@chainhackers.xyz>
    @author Denise Epstein - <denise31337@gmail.com>
*/
interface IProfitPalsVaultFactory {
    event ProfitPalsVaultCreated(
        IProfitPalsVault indexed vault,
        IERC20 indexed anchorCurrency,
        address[] allowedTokens,
        uint256 operatorFee,
        string name,
        string symbol,
        address safe
    );

    function createVault(
        IERC20 anchorCurrency,
        address[] calldata tokens,
        uint256 operatorFee,
        string memory name_,
        string memory symbol_
    ) external returns (IProfitPalsVault);

    function safeLogicSingleton() external view returns (address);

    function safeProxyFactory() external view returns (address);
}
