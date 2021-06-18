import React, { FC, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { useGuide } from "../guide/useGuide";
import { useLocation, useHistory, Link } from "react-router-dom";
import { userState } from "@/stores/user";
import { useRecoilState } from "recoil";

import ProLayout, { MenuDataItem } from "@ant-design/pro-layout";
import { SmileOutlined, HeartOutlined, FrownOutlined } from "@ant-design/icons";
import useLocale from "@/hooks/useLocale";
import RightContent from "./components/RightContent";
import styles from "./index.module.less";

import useNavigator from "@/hooks/useNavigator";
import { useIntl } from "react-intl";

import RenderRouter from "@/routes";
import { IRoute } from "@/routes/config";
import Footer from "./components/Footer";

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

interface RenderRouterProps {
  routes: IRoute[];
}

const AppLayout: FC<RenderRouterProps> = ({ routes }) => {
  let history = useHistory();
  const { locale, setLocale } = useLocale();
  const intl = useIntl();

  const [user, setUser] = useRecoilState(userState);
  const [pathname, setPathname] = useState("/welcome");
  const { device, collapsed, newUser, settings } = user;
  const isMobile = device === "MOBILE";
  const { driverStart } = useGuide();
  const location = useLocation();
  const navigate = useNavigator();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const toggle = () => {
    setUser((cur) => {
      return { ...cur, collapsed: !collapsed };
    });
  };

  useEffect(() => {
    newUser && driverStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  const renderMenus = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    return menus.map(({ icon, children, name, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      name: intl.formatMessage({ id: name}),
      children: children && renderMenus(children),
    }));

  };

  return (
    <ProLayout
      className={styles.layoutPage}
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      route={{ routes: routes }}
      onCollapse={toggle}
      formatMessage={intl.formatMessage}
      onMenuHeaderClick={() => history.push("https://reactjs.org/")}
      headerTitleRender={(logo, title, props) => (
        <a className={styles.layoutPageHeader}>
          <img src={settings.logo} />
          {title}
        </a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: intl.formatMessage({ id: "global.menu.home" }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={(menudata) => {
        console.log("menudata: ", menudata);
        return renderMenus(menudata);
      }}
      rightContentRender={() => (
        <RightContent
          settings={settings}
          locale={locale}
          onLocaleChange={setLocale}
        />
      )}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <RenderRouter routes={routes} />
    </ProLayout>
  );
};

export default AppLayout;
