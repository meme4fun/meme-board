import { mainnet } from 'wagmi';
import { ZeroGasCurrentChainId } from '.';

export const ZeroGasMintEIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
] as const;

export const ZeroGasTransferEIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
] as const;

export const ZeroGasTransferEIP712_NFT_TRANSFER_DOMAIN = {
  name: 'NFT Transfer',
  version: '1',
  chainId: ZeroGasCurrentChainId,
} as const;

export const ZeroGasTransferEIP712_NFT_TRANSFER_TYPES = {
  domain: ZeroGasTransferEIP712_NFT_TRANSFER_DOMAIN,
  primaryType: 'Message',
  types: {
    EIP712Domain: ZeroGasTransferEIP712Domain,
    Token: [
      { name: 'token', type: 'string' },
      { name: 'qty', type: 'uint256' },
    ],
    Message: [
      { name: 'tokens', type: 'Token[]' },
      { name: 'to_address', type: 'address' },
      { name: 'nonce', type: 'uint256' },
    ],
  },
} as const;

export const ZeroGasWithDrawalEIP712_NFT_TRANSFER_TYPES = {
  domain: {
    name: 'NFT Withdraw',
    version: '1',
    chainId: ZeroGasCurrentChainId,
  },
  primaryType: 'Message',
  types: {
    EIP712Domain: ZeroGasTransferEIP712Domain,
    Token: [
      { name: 'token', type: 'string' },
      { name: 'qty', type: 'uint256' },
    ],
    Message: [
      { name: 'tokens', type: 'Token[]' },
      { name: 'to_address', type: 'address' },
      { name: 'nonce', type: 'uint256' },
    ],
  },
} as const;
export const ZeroGasMint_TYPES = {
  domain: {
    name: 'Zero Gas Mint',
    version: '1',
    chainId: ZeroGasCurrentChainId,
  },
  primaryType: 'Message',
  types: {
    EIP712Domain: ZeroGasMintEIP712Domain,
    Message: [
      { name: 'collection', type: 'string' },
      { name: 'qty', type: 'uint256' },
      { name: 'address', type: 'address' },
      { name: 'nonce', type: 'uint256' },
    ],
  },
} as const;

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
];
export const EIP712_CLAIM_FEECARD_TYPES = {
  domain: {
    name: 'CLAIM FEECARD',
    version: '1',
  },
  primaryType: 'Message',
  types: {
    EIP712Domain: EIP712Domain,
    Message: [
      { name: 'address', type: 'address' },
      { name: 'nonce', type: 'uint256' },
    ],
  },
};
