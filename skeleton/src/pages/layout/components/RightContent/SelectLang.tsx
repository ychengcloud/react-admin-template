import React from "react";
import { useIntl } from 'react-intl';
import { Menu } from "antd";
import { ReactComponent as ZhCnSvg } from "@/assets/header/zh_CN.svg";
import { ReactComponent as EnUsSvg } from "@/assets/header/en_US.svg";
import { ReactComponent as LanguageSvg } from "@/assets/header/language.svg";
import classes from "./index.module.less";

import HeaderDropdown from "../HeaderDropdown";
import { Locale, localeConfigs } from "@/LocaleProvider";
import { Settings } from "@/models";

interface SelectLangProps {
  settings: Settings;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const { locale, onLocaleChange, settings, ...restProps } = props;

  let className = "";

  const selectLocale = ({ key }: { key: any }) => {
  console.log('key: ', key);
    onLocaleChange(key);
    // localStorage.setItem("locale", key);
  };

  if (
    (settings.navTheme === "dark" && settings.layout === "top") ||
    settings.layout === "mix"
  ) {
    className = `dark`;
  }

  const langList = () => {
    return (
      <Menu onClick={selectLocale}>
        {Object.values(Locale).map((lo) => {
          return (
            <Menu.Item
              style={{ textAlign: "left" }}
              disabled={locale === lo}
              key={lo}
            >
              {localeConfigs[lo].icon} {localeConfigs[lo].name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  return (
    <HeaderDropdown
      placement="bottomRight"
      className={classes.action}
      overlay={langList}
    >
      <span id="language-change" className={classes.lang}>
        <LanguageSvg className={`anticon `} />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
