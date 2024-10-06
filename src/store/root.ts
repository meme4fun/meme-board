import { BuyStore } from './buy';
import { SOLStore } from './sol';

class RootStore {
  buy = new BuyStore(this);
  sol = new SOLStore(this);

  dataInitial() {
    // this.listing.marketplacesState.call();
    // this.alien.init();
  }
}

export default RootStore;
