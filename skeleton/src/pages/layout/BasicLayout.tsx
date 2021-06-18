import React, { FC } from "react";

import { SmileOutlined, HeartOutlined, FrownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSvg } from "@/assets/logo/react.svg";
import styles from "./index.module.less";

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const BasicLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <LogoSvg className={styles.logo} />
            <span className={styles.title}>项目管理</span>
          </Link>
        </div>
        <div className={styles.desc}>
          全新技术栈(React\Recoil\React Query\React Hooks\Vite)的后台管理系统
        </div>
      </div>
      {children}
    </div>
  );
};

export default BasicLayout;
