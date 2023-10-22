# ProfitPals: Introducing Social Liquidity Mining

ChainHackers presents ProfitPals, our ETHOnline2023 entry, pioneering the concept of social liquidity mining in DeFi.

### Links

- **ChainHackers**: https://chainhackers.xyz/
- **ProfitPals**: https://profitpals.chainhackers.xyz/

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/1916a377-52ed-4b2c-b5ea-aa3681934a13/Untitled.png)

### OVERVIEW

ProfitPals is a DeFi solution facilitating optimized yield farming through its fund pools. Managed by DeFi mavens, these pools work with AMMs (automated market makers) to generate returns. By using a predetermined anchor currency, investors can join any fund pool, mint share tokens representing their stake, and benefit from the accumulated yield. The pools are securely managed by operators, ensuring only interactions with approved tokens, with their compensation directly tied to the success of the investors.

### KEY FEATURES

- **Fund Pools:** Curated reservoirs managed by operators, where investors deposit the anchor currency.
- **Share Tokens:** Represents the investor's stake in the fund pool. Their quantity is dependent on the amount of anchor currency provided and the pool's overall value.
- **Yield:** Income generated from AMMs, which can be reinvested or withdrawn by investors.
- **Approved Token List:** A secure list of tokens that the operator can interact with, ensuring safety and consistency.
- **Operator Reward:** Fixed percentage of yield as compensation for the pool management.
- **Deposit Pause:** Safety measure to halt new deposits while allowing yield withdrawals and investor share redemptions.

### GLOSSARY

- **Fund Pool:** A communal pool of funds managed by a single operator. Investors provide an anchor currency and receive share tokens in return.
- **Investors' Share:** Represents the stake an investor has in the fund pool, via their share tokens.
- **Yield:** Accumulated income generated from AMM fees.
- **Anchor Currency:** The designated currency used by investors to deposit into the fund pool.
- **Operator Reward Rate:** Fixed percentage of yield operators earn for managing a fund pool.
- **Approved Token List:** Preset list of tokens the operator can interact with, preventing volatile or unreliable tokens from being used.
- **Deposit Pause:** A mechanism to temporarily halt new deposits while still enabling withdrawals.

### OPERATOR ACTIONS

### Asset Management

Operators can:

1. **Swap:** Exchange tokens within the pool for other tokens from the Approved Token List.
2. **Liquidity Position Creation:** Use tokens to establish a liquidity position in an AMM, bringing it under the fund pool's management.
3. **Position Increase:** Allocate more tokens to an existing AMM position.
4. **Position Decrease/Close:** Reduce or terminate an AMM position, returning the tokens and any earned fees to the fund pool.

### INVESTOR ACTIONS

### Fund Interaction

Investors can:

1. **Deposit:** Add the anchor currency into any available fund pool and receive share tokens representing their stake.
2. **Withdraw:** Redeem their share tokens anytime to get back their portion of the anchor currency along with any accumulated yield.
3. **Review Fund Performance:** Access information of the fund pool they're invested in.

### PROTOCOL-BASED CONTROL AND SECURITY

All interactions with the funds within the fund pool are managed through the primary contract, the FundPool. This ensures:

1. **Predictability:** All actions adhere to the protocol's rules.
2. **No Direct Control:** Operators or investors can't directly access the pool's assets.
3. **Share Token Mechanism:** Investors redeem their funds by burning their share tokens.
4. **Transparency and Traceability:** Every action can be audited.

### RISK MANAGEMENT

ProfitPals is designed to address risks in the DeFi space:

- **Asset Volatility:** Uses a carefully curated token whitelist.
- **Operational Dormancy:** If operators become inactive, investors can always withdraw without requiring operator confirmation.
- **Over-liquidity:** "Deposit Pause" ensures liquidity remains manageable.

## SYSTEM OVERVIEW

![PP.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/45842b42-c514-45e0-a4dc-ac4db8db3445/PP.png)

### 1. **Pool Creation by Operator:**

- **Factory Contract**: The initiation process starts when an operator wishes to create a new investment pool. ProfitPals uses a specialized "factory" contract for this purpose, which automatically sets up a new pool contract.
- **Safe Connection**: Once the pool contract is established, the operator connects to it using Safe Wallet. This mechanism ensures secure management and operation of the pool.
- **Safety Mechanisms**: Concurrently, a corresponding smart account is set up (Guard), which is equipped with filters and validations. These safety mechanisms ensure that the pool's operations remain legitimate and are processed appropriately.

### 2. **Investor Participation:**

- Investors express their interest by investing assets in an anchor currency into the pool contract.
- As a token of acknowledgment for their contribution, the system mints and provides shares to the investors. These shares represent the investor's stake in the pool and entitle them to a proportionate share of any profits or losses.

### 3. **Liquidity and Token Swapping by Operator:**

- **Token Swapping**: Upon successful accumulation of the anchor currency tokens within the pool, the operator gains the ability to interact with decentralized exchanges like Uniswap. The operator can connect the pool contract to Uniswap by Safe Wallet, facilitating the swapping of tokens and establishing new currency pairs. This capability allows the operator to adapt the asset mix according to prevailing market conditions.
- **Liquidity Provision**: Additionally, the operator can contribute assets from the pool as liquidity on platforms like Uniswap. This not only earns fees from liquidity provision but may also offer other beneficial trading opportunities.

### 4. **Profit Accumulation:**

The smart account connected with the pool keeps track of all yield-generating activities. As assets within the pool are traded and interact with DeFi platforms, profits (or losses) are captured and accumulated in real-time.

### 5. **Withdrawals and Profit Distribution:**

When the time is right, investors can redeem their shares. The system facilitates this by burning the corresponding shares and releasing the assets, adjusted for any profits or losses earned during the period of investment.

## INTERFACE PAGES

[View the full design on Figma](https://www.figma.com/file/HlGrKifD5gwHvruseRJ0Rx/ProfitPals?type=design&node-id=54895:24457&mode=design&t=Whym9Bnez3JIyTF9-1)

### 1. Operator's Pool Creation Page

!https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/fefe0254-1c89-4e60-ad8d-31ec1dcc5e23/Group_46.png

### 2. Pool Information Pages for Operator & Investor

For viewing pool details and profits. Investors can also deposit or withdraw funds.

- Operator's Pool Page
    
    ![https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/47188587-13b5-47b1-9054-d0c357791cb5/Group_85_(1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/47188587-13b5-47b1-9054-d0c357791cb5/Group_85_(1).png)
    

- Investor's Pool Page
    
    ![https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/210fdb05-c4bd-4b30-aebf-ed493626bc3a/Group_74_(1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/210fdb05-c4bd-4b30-aebf-ed493626bc3a/Group_74_(1).png)
    

### 3. Pool Listing Pages for Investor & Operator

- My Pools
    
    ![https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/b737d976-7330-4356-b84a-3708bc00c00a/Group_69_(3).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/b737d976-7330-4356-b84a-3708bc00c00a/Group_69_(3).png)
    

- My Investments
    
    !https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/d6d8d8a9-e4e9-4cb6-99e5-21706768dc2a/Group_50.png
    

- Available Pools
    
    !https://prod-files-secure.s3.us-west-2.amazonaws.com/32538064-b211-4319-a34c-32e54d6f70a7/39d56b29-0a44-4f9f-b955-932993b6ac78/Group_48.png
    

## ETHONLINE2023 VERSION

Our ETHOnline2023 focus: integration with Uniswap and harnessing Safe smart wallets for the Fund Pool foundation.

**Implemented Features**:

- An interface for operators to create pools.
- A "Factory" contract (link to the contract) designed to create pool contracts. It includes a "Guard" mechanism to impose restrictions on operator activities within the pool (link to the contract).
- The capability to use the pool contract as a wallet on the Uniswap service via Safe Wallet.
- An interface to display a list of pools.

### [POC VERSION LIMITATIONS](https://github.com/chainhackers/ethonline-2023/issues/39)

During our Proof of Concept (POC) for the hackathon, we've established specific constraints for users:

User Limitations:

1. Single Active Position: Only one Uniswap position can be open at any time. Prior to initiating a new position, the previous one must be cleared.
2. Liquidity Pair Requirement: Any liquidity position opened must include the anchor currency as one of the pair members.
3. Anchor Currency Operations: Activities are detected by monitoring changes in the anchor currency's balance. Valid operations include swaps involving the anchor currency, liquidity pool actions, and minting new Uniswap positions.
4. Pools do not operate with a native token. #
5. Utilizes the Polygon network. #

Underlying Reasons:

- No Transaction Data Decoding: We can't decode the intricacies of transaction data from Safe UI and the Uniswap Universal router. Instead, our approach is anchored on observing state changes within the contract.
- No Token Iteration: Our system isn't set up to detect all operations involving each token without iterating through token balances.

These constraints are intrinsic to the hackathon POC but are areas we aim to [enhance in subsequent iterations.](https://github.com/chainhackers/ethonline-2023/issues/40)

## RUN LOCALLY

Monorepo setup: smart contracts in root, frontend in its folder. We integrate Foundry/Forge with GitHub Actions for streamlined CI/CD.

### Deployed instances

- [ProfitPalsVaultFactory](https://polygonscan.com/address/0x5b8c9cab6cb6461c97e651fb603946228d66942e#code)
- [ProfitPalsVault(USDC, [WBTC, WETH])](https://polygonscan.com/address/0xd783b002954df35a02bfa3f1e8e0462078d27f84#code)

### Backend Setup:

1. Clone or download the project.
    
    Clone with submodules
    
    ```
    git clone --recurse-submodules git@github.com:chainhackers/ethonline-2023.git
    ```
    
    Update submodules when you need to
    
    ```
    git submodule update --init --recursive
    ```
    

### Frontend Setup:

1. Clone or download the project.

---

### Contribute

Feedback and pull requests are welcome. Kindly adhere to contribution guidelines.

### License

MIT License.

---

Thanks to the ETHOnline2023 community for the support!

Unearth the potential of social liquidity mining with ProfitPals!

---
