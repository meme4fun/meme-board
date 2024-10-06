import { Chain } from 'viem';
import { BaseConnector, BaseConnectorOptions, getProviderFn } from './base';

export class CLVConnector extends BaseConnector {
  readonly id = 'clover';
  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[];
    options?: BaseConnectorOptions;
  } = {}) {
    super({
      chains,
      options: {
        getProvider: getProviderFn('clover', 'isClover'),
        name: 'Clover',
      },
    });
  }
}
