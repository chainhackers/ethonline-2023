#!/usr/bin/env sh

forge script \
script/ProfitPalsVaultDeploy.s.sol:ProfitPalsVaultDeploy \
--rpc-url https://polygon-mainnet.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--verifier-url https://api.polygonscan.com/api/ \
--etherscan-api-key XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--broadcast --verify -v
