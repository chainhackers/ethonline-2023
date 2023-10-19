// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@safe-contracts/base/GuardManager.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "./Constants.sol";
import "./interfaces/IProfitPalsVault.sol";

contract SimpleGuard is Guard {
    address public immutable permit2;
    IERC20[] public allowedTokens;
    IERC20 usdc = IERC20(USDC_POLYGON);
    IProfitPalsVault vault;

    constructor(address permit2_, IProfitPalsVault vault_){
        permit2 = permit2_;
        vault = vault_;
        allowedTokens = vault.allowedTokensList();
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
        if (msgSender == address(vault)) {
            return;
        }
        for(uint i = 0; i < allowedTokens.length; i++) {
            if (to == address(allowedTokens[i])) {
                return;
            }
        }
        revert("Only transactions with allowed tokens allowed");
    }

    function checkAfterExecution(bytes32 txHash, bool success) external override {
        // Nothing to do
    }
}
