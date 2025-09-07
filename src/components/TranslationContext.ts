import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "../i18n/index";

type Lang = "en" | "ar" | "ru";

interface TranslationContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Record<string, string>;
}

const TranslationContext = createContext<TranslationContextProps>({} as TranslationContextProps);

interface ProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: ProviderProps) => {
  const [lang, setLang] = useState<Lang>("en");

  const contextValue: TranslationContextProps = {
    lang,
    setLang,
    t: translations[lang],
  };

  return React.createElement(
    TranslationContext.Provider,
    { value: contextValue },
    children
  );
};

export const useTranslation = (): TranslationContextProps => {
  const context = useContext(TranslationContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
};