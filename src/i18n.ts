import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

// List of all namespaces corresponding to your translation files
const namespaces = [
  'astrophysics',
  'biomedical',
  'citation',
  'citationBlock',
  'codeMeta20',
  'collection',
  'computationalworkflow',
  'createDataset',
  'dataset',
  'file',
  'files',
  'footer',
  'geospatial',
  'header',
  'journal',
  'pageNotFound',
  'pageNumberNotFound',
  'pagination',
  'socialscience'
];

void i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(I18NextHttpBackend)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ar'], 
    ns: namespaces,
    // defaultNS: 'common', // Optional: Set a default namespace if needed
    returnNull: false,
    backend: {
      loadPath:
        import.meta.env.BASE_URL !== '/spa'
          ? `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`
          : `/spa/locales/{{lng}}/{{ns}}.json`,
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
