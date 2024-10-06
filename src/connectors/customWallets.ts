import { JoyIdWallet as JoyIdWalletNPM } from '@joyid/rainbowkit';
import { gateWallet } from '@/connectors/gateRainbowConnector';
import { bybitWallet } from '@/connectors/bybitRainbowConnector';
import { bloctoWallet } from '@blocto/rainbowkit-connector';

const JoyIdWallet = typeof window !== 'undefined' ? JoyIdWalletNPM : undefined;

export { JoyIdWallet, gateWallet, bybitWallet, bloctoWallet };
