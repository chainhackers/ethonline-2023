import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig } from 'wagmi';
import { polygon } from '@wagmi/core/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { PROJECT_ID } from './constants/constants';
import { createPublicClient, http } from 'viem';

console.log('walletConnect PROJECT_ID: ', PROJECT_ID);

export const { chains, publicClient } = configureChains([polygon], [publicProvider()]);
export const publicClientViem = createPublicClient({
  chain: polygon,
  transport: http(),
});

const { connectors } = getDefaultWallets({
  appName: 'profitpals',
  projectId: PROJECT_ID,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
