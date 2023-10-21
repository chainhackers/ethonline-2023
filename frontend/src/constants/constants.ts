export const PROJECT_ID = 'f5f4ef3634a6aa0af5a1d5516608377a';
export const ANIMATION_MS = 200;
export const ABI = {
  createVault: {
    name: 'createVault',
    address: import.meta.env.VITE_REACT_POLYGON_ADDRESS_PP_VAULT_FACTORY,
  },
};

export const ROUTES = {
  landing: '/landing',
  assetManagement: '/asset-management',
  poolsAvailable: '/pools-available',
};

export const TOKENS = {
  MATIC: {
    fullName: 'MATIC',
    name: 'MATIC',
    address: '0x0000000000000000000000000000000000001010',
    decimals: 18,
    iconPath: 'assets/img/tokens/polygon-matic-logo.svg',
  },
  USDC: {
    fullName: 'USDCoin',
    name: 'USDC',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    decimals: 6,
    iconPath: 'assets/img/tokens/usdc.svg',
  },
  ChainLinkToken: {
    fullName: 'ChainLinkToken',
    name: 'LINK',
    address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    decimals: 18,
    iconPath: 'assets/img/tokens/link.svg',
  },
  WrappedEther: {
    fullName: 'WrappedEther',
    name: 'WETH',
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    iconPath: 'assets/img/tokens/weth.svg',
  },
  TetherUSDt: {
    fullName: '(PoS)TetherUSD',
    name: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    iconPath: 'assets/img/tokens/usdt.svg',
  },
  DaiStablecoin: {
    fullName: '(PoS)DaiStablecoin',
    name: 'DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    iconPath: 'assets/img/tokens/dai.svg',
  },
  Aave: {
    fullName: 'Aave(PoS)',
    name: 'AAVE',
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    decimals: 18,
    iconPath: 'assets/img/tokens/aave.svg',
  },
};
