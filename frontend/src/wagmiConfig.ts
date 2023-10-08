import {publicProvider} from 'wagmi/providers/public';
import {configureChains, createConfig, mainnet} from "wagmi";
import {polygon} from "@wagmi/core/chains";
import {getDefaultWallets} from "@rainbow-me/rainbowkit";
import { arbitrum, base, optimism, zora } from 'viem/chains';
import {config} from "dotenv";


config();

const PROJECT_ID = process.env.PROJECT_ID!;

export const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'profitpals',
  projectId: PROJECT_ID,
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
