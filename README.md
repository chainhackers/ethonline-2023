# ProfitPals: Introducing Social Liquidity Mining

ChainHackers presents ProfitPals, our ETHOnline2023 entry, pioneering the concept of social liquidity mining in DeFi.

---

## Overview

ProfitPals aggregates liquidity via fund pools, managed by expert operators for optimized yield farming. Investors provide an anchor currency, minting share tokens as proof of stake.

### Features:

- **Fund Pools**: Managed by operators who employ best yield farming strategies using a trusted token list. Operators can also pause new investments as a safety measure.

- **Investor Interaction**: Investors mint share tokens by depositing anchor currency. These tokens enable permissionless withdrawals without the operator's intervention.

- **Protocol Control & Security**: Interactions are facilitated through the FundPool contract, ensuring predictability and a trustless environment.

Our ETHOnline2023 focus: integration with Uniswap and harnessing Safe smart wallets for the Fund Pool foundation.

## Development

Monorepo setup: smart contracts in root, frontend in its folder. We integrate Foundry/Forge with GitHub Actions for streamlined CI/CD.
### Deployed instances
* [ProfitPalsVaultFactory](https://polygonscan.com/address/0xf33096dB1f341C0249aEdd164B4DeA5E2FaBecdE#code)  
* [ProfitPalsVault(USDC, [WBTC, WETH])](https://polygonscan.com/address/0xd95556ce580e8b7f923cb739e6b0291734fef437#code)


### Clone/Checkout
Clone with submodules
```shell
git clone --recurse-submodules git@github.com:chainhackers/ethonline-2023.git
```
Update submodules when you need to
```shell
git submodule update --init --recursive
```

## Links
- **ChainHackers**: [https://chainhackers.xyz/](https://chainhackers.xyz/)
- **ProfitPals**: [https://profitpals.chainhackers.xyz/](https://profitpals.chainhackers.xyz/)

## Contribute

Feedback and pull requests are welcome. Kindly adhere to contribution guidelines.

## License

MIT License.

Thanks to the ETHOnline2023 community for the support!

---

Unearth the potential of social liquidity mining with ProfitPals!
