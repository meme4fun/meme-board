import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  Chain,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  foundry,
  gnosis,
  goerli,
  hardhat,
  iotex,
  iotexTestnet,
  localhost,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
  taraxa,
  taraxaTestnet,
  zkSync,
  zkSyncTestnet,
} from 'wagmi/chains';

const ChainMap: Record<string, Chain> = {};
[
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  foundry,
  gnosis,
  goerli,
  hardhat,
  iotex,
  iotexTestnet,
  localhost,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
  taraxa,
  taraxaTestnet,
  zkSync,
  zkSyncTestnet,
].forEach((c) => (ChainMap[c.id] = c));

export function getChain(id: number) {
  return ChainMap[id];
}