import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';
import { isBrowser } from '@/utils';
import { isProd } from '@/constants';

class MyEmitter extends EventEmitter {
  emit(type: any, ...args: any[]) {
    super.emit('*', { type, args });
    return super.emit(type, ...args) || super.emit('', ...args);
  }
}

export interface MessageEvents {
  '*': (args: { type: string; args: [] }) => void;
  'wallet.account.change': (
    currentAccount: string,
    prevAccount: string,
  ) => void;
  'wallet.onAccount': () => void;
  'wallet.logout': () => void;
  'wallet.data.refresh': () => void;
  'chain.switch': () => void;
  'global.cacheData': () => void;
  'user.avatar.change': () => void;
  'order.bid.cancel': (orderId, tokenUniqueId: string) => void;
  'order.bid.accept': (orderId, tokenUniqueId: string) => void;
  'order.bid.accept.fail': () => void;
  'order.bid.made': (tokenUniqueId: string) => void;
  'order.bid.made.collection': (contractAddress: string) => void;
  'token.buy.success': (tokenUniqueId: string[]) => void;
  'token.list.success': (tokenUniqueId: string[]) => void;
  'flash-sell.list.success': (tokenUniqueId: string[]) => void;
  'movesea.list.success': (tokenUniqueId: string[]) => void;
  'orderbook.market.sell': () => void;
  'orderbook.market.sell.fail': () => void;
  'orderbook.limit.list': () => void;
  'orderbook.limit.buy.success': () => void;
  'orderbook.market.list.success': () => void;
  'user.token.transfer': () => void;

  'error.buy.priceMismatch': () => void;
  'error.sell.priceMismatch': () => void;
  // 'flash-sell.item.change': (contract, tokenTuples: [string, string]) => void;
  'zeroGasOrder.bid.made.collection': () => void;
  'zeroGasOrder.bid.made': (tokenUniqueId: string) => void;
  'zeroGasOrderbook.limit.list.success': () => void;
  'zeroGasOrder.bid.accept': () => void;
  'zeroGasOrder.bid.cancel': () => void;
  'favorite.operate.success': () => void;
  'zeroGas.collection.refresh': () => void;
  // lanchpad events
  'lanchpad.deposit.success': () => void;
  'zeroGas.transfer.success': (tokens: string[]) => void;
  'zeroGas.withdrawal.success': (tokens: string[]) => void;
  'bidPool.deposit.success': () => void;
  'nft.deposit.success': () => void;
  // social nft
  'socialNFT.createFrens.success': () => void;
  'socialNFT.createSoul.success': () => void;
  'socialNFT.buy.success': () => void;
  'socialNFT.sell.success': () => void;
  'socialNFT.collection.refresh': () => void;
  'socialNFT.collection.refreshMetadata': () => void;

  // tx history
  'transaction_history.scope.done': (scope: string) => void;

  'tick.inscribe.success': (hash: string) => void;
  'agp.stake.success': (hash: string) => void;
  'market.listedOrder.success': (hash: string) => void;
  'market.cancelOrder.success': (hash: string) => void;
  'market.executeOrder.success': (hash: string) => void;
  'market.batchMatchOrders.success': (hash: string) => void;
}

export const eventBus = new MyEmitter() as TypedEmitter<MessageEvents>;

if (isBrowser) {
  (window as any).eventBus = eventBus;
}

if (!isProd) {
  eventBus.on('*', ({ type, args }) => {
    console.log('😪️ eventBus', type, args);
  });
}
