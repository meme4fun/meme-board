import i18n from 'i18next';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import meme4fun from '../../public/translations/en/meme4fun.json';
import i18nNamespace from './i18nNamespace.json';

import { STATIC_S3_HOST, isProd } from '@/constants';
import { isBrowser } from '@alien-mm/utils';

export enum LanguageType {
  ZH_CN = 'zh-CN',
  EN = 'en',
  JA = 'ja',
}

export const BannerLanguageSuffixMap = {
  'zh-CN': 'cn',
  en: 'en',
  ja: 'ja',
};

// export const resources = {
//   [LanguageType.EN]: {
//     translation: en,
//     main,
//     market,
//     activityTime,
//   },
// };

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    // resources: (typeof resources)[LanguageType.EN];
  }
}

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    nsSeparator: '.',
    returnNull: false,
    fallbackLng: LanguageType.EN,
    load: 'currentOnly',
    // nsSeparator: '.',
    // resources,
    lng: LanguageType.EN, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: 'meme4fun',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
      ],
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },
    backend: {
      backends: [
        // LocalStorageBackend, // primary backend
        HttpApi, // fallback backend
      ],
      backendOptions: [
        // {
        //   /* options for primary backend */
        // },
        {
          /* options for secondary backend */
          loadPath: isProd
            ? `${STATIC_S3_HOST}/langs/as/{{lng}}/{{ns}}.json`
            : '/translations/{{lng}}/{{ns}}.json', // http load path for my own fallback
          // loadPath:'/translations/{{lng}}/{{ns}}.json'
        },
      ],
    },
    react: {
      useSuspense: false,
    },
  });

i18n.addResourceBundle('en', 'meme4fun', meme4fun);
if (isBrowser) {
  i18n.reloadResources('en', i18nNamespace);
}
