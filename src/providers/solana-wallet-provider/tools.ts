import {
  useWallet,
  useConnection,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
} from '@solana/web3.js';
import { sample } from 'lodash';

export const getConnectionUrl = (network: WalletAdapterNetwork): string => {
  switch (network) {
    case WalletAdapterNetwork.Devnet:
      // NB: This URL will only work for Phantom sandbox apps! Please do not use this for your project.
      return `https://api.devnet.solana.com`;
    case WalletAdapterNetwork.Mainnet:
      // NB: This URL will only work for Phantom sandbox apps! Please do not use this for your project.
      return (
        sample([
          'https://lively-solitary-glade.solana-mainnet.quiknode.pro/9b397724a5617037b2779f833fa2235a3bcc4bcc/',
          'https://solana-mainnet.g.alchemy.com/v2/JZiAUojchEjtGEMTHHXBuk_HDJnqHw-t',
          'https://rpc.ankr.com/solana/defb1a981a9c43740d423ec0db5b20e1318f16fa55fd4aa18d14b8ed9b0740ab',
        ]) ||
        'https://lively-solitary-glade.solana-mainnet.quiknode.pro/9b397724a5617037b2779f833fa2235a3bcc4bcc/'
      );
    default:
      throw new Error(`Invalid network: ${network}`);
  }
};

/**
 * Creates an arbitrary transfer transaction
 * @param   {String}      publicKey  a public key
 * @param   {Connection}  connection an RPC connection
 * @returns {Transaction}            a transaction
 */
export const createTransferTransaction = async (params: {
  from: PublicKey;
  to: PublicKey;
  amount: number | bigint;
  connection: Connection;
  memo?: string;
}): Promise<Transaction> => {
  console.log('💬️ ~ params:', params);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: params.from,
      toPubkey: params.to,
      lamports: params.amount,
    }),
  );
  transaction.feePayer = params.from;

  if (params.memo) {
    await transaction.add(
      new TransactionInstruction({
        keys: [{ pubkey: params.from, isSigner: true, isWritable: true }],
        data: Buffer.from(params.memo, 'utf-8'),
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
      }),
    );
  }

  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (
    await params.connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

/**
 * Signs and sends transaction
 * @param   {PhantomProvider} provider    a Phantom Provider
 * @param   {Transaction}     transaction a transaction to sign
 * @returns {Transaction}                 a signed transaction
 */
export const signAndSendTransaction = async (
  transaction: Transaction | VersionedTransaction,
  connection: Connection,
  sendTx,
): Promise<string> => {
  try {
    const signature = await sendTx(transaction, connection, {
      skipPreflight: false,
    });
    return signature;
  } catch (error: any) {
    console.warn(error);
    throw new Error(error.message);
  }
};

/**
 * Polls for transaction signature statuses
 * @param   {String}     signature  a transaction signature
 * @param   {Connection} connection an RPC connection
 * @param   {Function}   createLog  a function to create log
 * @returns
 */
const POLLING_INTERVAL = 2000; // one second
const MAX_POLLS = 30;
export const pollSignatureStatus = async (
  signature: string,
  connection: Connection,
): Promise<boolean> => {
  let count = 0;

  return new Promise<boolean>((resolve, reject) => {
    const interval = setInterval(async () => {
      // Failed to confirm transaction in time
      if (count === MAX_POLLS) {
        clearInterval(interval);
        console.log({
          status: 'error',
          method: 'signAndSendTransaction',
          message: `Transaction: ${signature}`,
          messageTwo: `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
        });
        reject(
          `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
        );
        return;
      }

      const { value } = await connection.getSignatureStatus(signature);
      const confirmationStatus = value?.confirmationStatus;

      if (confirmationStatus) {
        const hasReachedSufficientCommitment =
          confirmationStatus === 'confirmed' ||
          confirmationStatus === 'finalized';

        console.log({
          status: hasReachedSufficientCommitment ? 'success' : 'info',
          method: 'signAndSendTransaction',
          message: `Transaction: `,
          confirmation: {
            signature,
            link: `https://solscan.io/tx/${signature}`,
          },
          messageTwo: `Status: ${
            confirmationStatus.charAt(0).toUpperCase() +
            confirmationStatus.slice(1)
          }`,
        });

        if (hasReachedSufficientCommitment) {
          resolve(true);
          clearInterval(interval);
          return;
        }
      } else {
        console.log({
          status: 'info',
          method: 'signAndSendTransaction',
          message: `Transaction: ${signature}`,
          messageTwo: 'Status: Waiting on confirmation...',
        });
      }

      count++;
    }, POLLING_INTERVAL);
  });
};
