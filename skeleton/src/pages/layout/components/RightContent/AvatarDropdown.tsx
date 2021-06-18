import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";

import HeaderDropdown from "../HeaderDropdown";
import classes from "./index.module.less";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import useNavigator from "@/hooks/useNavigator";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [user, setUser] = useRecoilState(userState);

  const { username, avatar } = user;

  const navigate = useNavigator();
  const location = useLocation();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // Note: There may be security issues, please note
    if (location.pathname !== "/login") {
      navigate("/login", true);
    }
  };

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === "logout" && user) {
        setUser((cur) => { 
          return {...cur, logged: false }
        });
        loginOut();
        return;
      }
      navigate(`/account/${key}`);
    },
    [user, setUser]
  );

  const loading = (
    <span className={`account`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!user) {
    return loading;
  }

  if (!username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={"menu"} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${classes.action} ${classes.account}`}>
        <Avatar
          size="small"
          className={classes.avatar}
          src={avatar}
          alt="avatar"
        />
        <span className={`${classes.name} anticon`}>{username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
