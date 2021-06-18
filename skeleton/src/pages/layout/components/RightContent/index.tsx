import { Space, Menu } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

import Avatar from "./AvatarDropdown";
import HeaderDropdown from "../HeaderDropdown";
import HeaderSearch from "../HeaderSearch";
// import "./index.less";
import styles from "./index.module.less";
import SelectLang from "./SelectLang";
import { Locale } from "@/LocaleProvider";
import { Settings } from "@/models";

export type SiderTheme = "light" | "dark";

interface GlobalHeaderRightProps {
  settings: Settings;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}


const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = ({settings, locale, onLocaleChange}) => {

  return (
    <Space className={styles.right}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="Ant Design"
        options={[
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: "Ant Design",
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: "Pro Table",
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: "Pro Layout",
          },
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
      />
      <HeaderDropdown
      className={styles.action}

        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                window.open("/~docs");
              }}
            >
              文档
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window.open("https://pro.ant.design/docs/getting-started");
              }}
            >
              Ant Design Pro 文档
            </Menu.Item>
          </Menu>
        }
      >
        <span>
          <QuestionCircleOutlined />
        </span>
      </HeaderDropdown>
      <Avatar />

      <SelectLang locale={locale} onLocaleChange={onLocaleChange} settings={settings} />
    </Space>
  );
};
export default GlobalHeaderRight;
