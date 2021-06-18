import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import "moment/locale/zh-cn";
import RenderRouter from "./routes";

import "./App.less";

import useLocale from "./hooks/useLocale";
import { Locale } from "./LocaleProvider";
import { useRecoilState } from "recoil";
import { userState } from "./stores/user";
import { useCurrentUserQuery } from "./generated/graphql";
import { routesState } from "./stores/routes";

const App: React.FC = () => {
  const { locale } = useLocale();
  const [user, setUser] = useRecoilState(userState);
  const [routes, setRoutes] = useRecoilState(routesState);

  // const { data: currentUser, error } = useGetCurrentUser();
  const { data, error } = useCurrentUserQuery();

  useEffect(() => {
    const currentUser = data?.currentUser;
    if (!currentUser) return;

    setUser((cur) => {
      return {
        ...cur,
        username: currentUser?.name || "",
        permissions: currentUser?.permissions?? [],
        logged: true,
      };
    });
  }, [data, error]);

  const getAntdLocale = () => {
    if (locale === Locale.EN) {
      return enUS;
    } else if (locale === Locale.ZH_HANS) {
      return zhCN;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <BrowserRouter>
        <RenderRouter routes={routes} />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
