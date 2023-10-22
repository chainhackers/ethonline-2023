// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/interfaces/IERC4626.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@safe-contracts/GnosisSafeL2.sol";

/**
    @title IProfitPalsVault
    @notice ProfitPalsVault acts as the primary vault for the ProfitPals project, holding and managing all assets.
    @notice The main asset, or anchor currency, that is managed within this vault can be any ERC20 token.
    @notice It filters operator interactions using predefined contracts list and allowed tokens.
    @dev Inherits OZ ERC4626, uses UniswapV3 position value estimates in `mint`, `redeem` and other functions
    @dev where it's required to know total assets value
    @author Gene A. Tsvigun - <gene@chainhackers.xyz>
    @author Denise Epstein - <denise31337@gmail.com>
*/
interface IProfitPalsVault is IERC4626 {
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

    // debug events: the following events are for manual testing with relaxed limitations ------------------------------
    // instead of reverting, log unauthorized operator actions
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

    //[POC limitations] https://github.com/chainhackers/ethonline-2023/issues/39
    event UnauthorizedActionOperatorMustChangeAnchorBalance(bytes32 txHash);
    event UnauthorizedActionOnlyOneOpenPositionAllowed(bytes32 txHash);
    // debug events block end: events above are for manual testing with relaxed limitations ----------------------------


    event ActionLog(Action action);

    event PositionAcquired(uint256 indexed tokenId);
    event FungibleTokenAcquired(uint256 indexed tokenId, uint amount);

    function safe() external view returns (GnosisSafeL2);

    function operator() external view returns (address);

    function operatorFee() external view returns (uint256);

    function anchorCurrency() external view returns (IERC20);

    function allowedTokens(uint256 index) external view returns (address);

    function allowedTokensList() external view returns (address[] memory);

    function allowedTokensCount() external view returns (uint256);

    function pause() external;

    function unpause() external;
}
