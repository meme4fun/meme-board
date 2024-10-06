import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { StringState } from '@alien-mm/utils';

export class BuyStore {
  price = new StringState<string>({ value: '' });
  slippage = new StringState<string>({ value: '' });

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
