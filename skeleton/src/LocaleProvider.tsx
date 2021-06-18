import useLocalStorage from "@/hooks/useLocalStorage";
import React from "react";
import { IntlProvider } from "react-intl";

import { ReactComponent as ZhCnSvg } from "@/assets/header/zh_CN.svg";
import { ReactComponent as EnUsSvg } from "@/assets/header/en_US.svg";

export enum Locale {
  // AR = "ar",
  // AZ = "az",
  // BG = "bg",
  // BN = "bn",
  // CA = "ca",
  // CS = "cs",
  // DA = "da",
  // DE = "de",
  // EL = "el",
  EN = "en",
  // ES = "es",
  // ES_CO = "es-CO",
  // ET = "et",
  // FA = "fa",
  // FR = "fr",
  // HI = "hi",
  // HU = "hu",
  // HY = "hy",
  // ID = "id",
  // IS = "is",
  // IT = "it",
  // JA = "ja",
  // KO = "ko",
  // MN = "mn",
  // NB = "nb",
  // NL = "nl",
  // PL = "pl",
  // PT = "pt",
  // PT_BR = "pt-BR",
  // RO = "ro",
  // RU = "ru",
  // SK = "sk",
  // SL = "sl",
  // SQ = "sq",
  // SR = "sr",
  // SV = "sv",
  // TH = "th",
  // TR = "tr",
  // UK = "uk",
  // VI = "vi",
  ZH_HANS = "zh-Hans",
  // ZH_HANT = "zh-Hant",
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;

export const localeConfigs: Record<Locale, { name: string; icon: any }> = {
  // [Locale.AR]: "العربيّة",
  // [Locale.AZ]: "Azərbaycanca",
  // [Locale.BG]: "български",
  // [Locale.BN]: "বাংলা",
  // [Locale.CA]: "català",
  // [Locale.CS]: "česky",
  // [Locale.DA]: "dansk",
  // [Locale.DE]: "Deutsch",
  // [Locale.EL]: "Ελληνικά",
  [Locale.EN]: { name: "English", icon: <EnUsSvg /> },
  // [Locale.ES]: "español",
  // [Locale.ES_CO]: "español de Colombia",
  // [Locale.ET]: "eesti",
  // [Locale.FA]: "فارسی",
  // [Locale.FR]: "français",
  // [Locale.HI]: "Hindi",
  // [Locale.HU]: "Magyar",
  // [Locale.HY]: "հայերեն",
  // [Locale.ID]: "Bahasa Indonesia",
  // [Locale.IS]: "Íslenska",
  // [Locale.IT]: "italiano",
  // [Locale.JA]: "日本語",
  // [Locale.KO]: "한국어",
  // [Locale.MN]: "Mongolian",
  // [Locale.NB]: "norsk (bokmål)",
  // [Locale.NL]: "Nederlands",
  // [Locale.PL]: "polski",
  // [Locale.PT]: "Português",
  // [Locale.PT_BR]: "Português Brasileiro",
  // [Locale.RO]: "Română",
  // [Locale.RU]: "Русский",
  // [Locale.SK]: "Slovensky",
  // [Locale.SL]: "Slovenščina",
  // [Locale.SQ]: "shqip",
  // [Locale.SR]: "српски",
  // [Locale.SV]: "svenska",
  // [Locale.TH]: "ภาษาไทย",
  // [Locale.TR]: "Türkçe",
  // [Locale.UK]: "Українська",
  // [Locale.VI]: "Tiếng Việt",
  [Locale.ZH_HANS]: { name: "简体中文", icon: <ZhCnSvg /> },
  // [Locale.ZH_HANT]: "繁體中文",
};

export const getMatchingLocale = (
  languages: readonly string[]
): Locale | undefined => {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const [key, localeEntrie] of localeEntries) {
      if (localeEntrie.toLowerCase() === preferredLocale.toLowerCase()) {
        return localeEntrie;
      }
    }
  }

  return undefined;
};

const defaultLocale = Locale.EN;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = React.createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

const { Consumer: LocaleConsumer, Provider: RawLocaleProvider } = LocaleContext;

const LocaleProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useLocalStorage(
    "locale",
    getMatchingLocale(navigator.languages) || defaultLocale
  );
  const [messages, setMessages] = React.useState(undefined);

  const localeModules = import.meta.glob("./locale/*.json");

  React.useEffect(() => {
    async function changeLocale() {
      const mod = await localeModules["./locale/" + locale + ".json"]();
      console.log("mod: ", mod);
      setMessages(mod.default);
    }

    changeLocale();
  }, [locale]);

  return (
    <IntlProvider
      defaultLocale={defaultLocale}
      locale={locale}
      messages={messages}
      onError={(err) => {
        // if (!err.includes("[React Intl] Missing message: ")) {
        //   console.error(err);
        // }
      }}
      key={locale}
    >
      <RawLocaleProvider
        value={{
          locale,
          setLocale,
        }}
      >
        {children}
      </RawLocaleProvider>
    </IntlProvider>
  );
};

export { LocaleConsumer, LocaleProvider, RawLocaleProvider };
