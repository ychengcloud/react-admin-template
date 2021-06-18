import React, { FC } from "react";

import { Route, Switch } from "react-router-dom";

import { IRoute } from "./config";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

import NotFoundPage from "@/pages/404";

interface RenderRouterProps {
  routes: IRoute[];
}

const RenderRouter: FC<RenderRouterProps> = ({ routes }) => {
  return (
    <>
      <Switch>
        {routes &&
          routes.map((route: IRoute, index: number) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};
export default RenderRouter;
