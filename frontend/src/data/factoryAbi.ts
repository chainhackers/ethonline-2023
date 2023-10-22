export const factoryABI = [
  {
    inputs: [
      { internalType: 'address', name: 'safeLogicSingleton_', type: 'address' },
      { internalType: 'address', name: 'safeProxyFactory_', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'contract IProfitPalsVault', name: 'vault', type: 'address' },
      { indexed: true, internalType: 'contract IERC20', name: 'anchorCurrency', type: 'address' },
      { indexed: false, internalType: 'address[]', name: 'allowedTokens', type: 'address[]' },
      { indexed: false, internalType: 'uint256', name: 'operatorFee', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      { indexed: false, internalType: 'string', name: 'symbol', type: 'string' },
      { indexed: false, internalType: 'address', name: 'safe', type: 'address' },
    ],
    name: 'ProfitPalsVaultCreated',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'anchorCurrency', type: 'address' },
      { internalType: 'address[]', name: 'tokens', type: 'address[]' },
      { internalType: 'uint256', name: 'operatorFee', type: 'uint256' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'symbol', type: 'string' },
    ],
    name: 'createVault',
    outputs: [{ internalType: 'contract IProfitPalsVault', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes', name: '', type: 'bytes' },
      { internalType: 'bytes', name: '_signature', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'safeLogicSingleton',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'safeProxyFactory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];
