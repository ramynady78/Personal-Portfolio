import 'react-i18next';
import en from "../i18n/en.json";

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}
