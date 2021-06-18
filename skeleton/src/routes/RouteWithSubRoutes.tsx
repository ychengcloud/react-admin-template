import { User } from "@/models/user";
import NotFoundPage from "@/pages/404";
import SuspendFallbackLoading from "@/pages/layout/suspendFallbackLoading";
import { userState } from "@/stores/user";
import { PermissionEnum } from "@/types";
import React, { Suspense } from "react";
import Helmet from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import { Redirect, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IRoute } from "./config";

const RouteWithSubRoutes = (route: IRoute) => {
  const { formatMessage } = useIntl();
  /** Authenticated flag */
  const [user, setUser] = useRecoilState(userState);
  const { logged } = user;

  const title = formatMessage({ id: route.name });

  const hasPermission = (permission: PermissionEnum, user: User) =>
    user.permissions?.map((perm) => perm?.code).includes(permission);

  const hasPermissions =
    !route.permissions ||
    route.permissions
      .map((permission) => hasPermission(permission, user))
      .reduce((prev, curr) => prev && curr);

  return (
    //如果不加suspense， route为lazy加载方式时， antd 的menu组件会无法自动选中菜单项
    <Suspense fallback={<SuspendFallbackLoading />}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Route
        path={route.path}
        render={(props) => {
          if (route.redirect) {
            return <Redirect to={route.redirect} />;
          }

          if (route.private && !logged) {
            return <Redirect to="/login" />;
          }

          return hasPermissions ? (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          ) : (
            <NotFoundPage />
          );
        }}
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
