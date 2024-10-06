interface MenusItem {
  enable: boolean;
  font_icon: any;
  i18nKey: any;
  id: number;
  key: any;
  name: string;
  path: string;
  style: string;
  parentId: number;
  children?: MenusItem[];
  icon?: { url: string }[];
}

interface GlobalConfig {
  chains: NetWorkConfigType[];
  menus: MenusItem[];
  setting: Record<string, any>;
  walletsConfig: {
    app: {
      walletconnect_project_id: string;
    };
    wallet: {
      extendsKey: string;
      extConfig: any;
    };
  }[];
}

declare interface Window {
  clover?: Ethereum;
  okxwallet?: Ethereum;
  bloctoProvider?: Ethereum;
  dataLayer?: any[];
  collectionsVerification?: string[];
  globalConfig: GlobalConfig;
}

declare module '*.svg' {
  import type { ReactElement, SVGProps } from 'react';

  const content: (
    props: SVGProps<SVGElement> & { size?: number | string },
  ) => ReactElement;
  export default content;
}
