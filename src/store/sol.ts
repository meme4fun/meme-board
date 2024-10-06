import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { StringState, TokenBalanceState, ValueState } from '@alien-mm/utils';
import { PublicKey } from '@solana/web3.js';

export class SOLStore {
  publicKeyState = new ValueState<PublicKey>();

  balance = new TokenBalanceState({
    decimals: 9,
  });

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }
}
