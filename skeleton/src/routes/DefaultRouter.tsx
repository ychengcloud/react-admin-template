import React, { FC } from "react";

import RenderRouter from "@/routes";
import { IRoute } from "@/routes/config";

interface RenderRouterProps {
  routes: IRoute[];
}

const DefaultRouter: FC<RenderRouterProps> = ({ routes }) => {
  return <RenderRouter routes={routes} />;
};
export default DefaultRouter;
