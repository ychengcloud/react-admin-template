import React, { FC } from "react";

import { Affix, Layout } from "antd";

const FooterBar: FC = ({ children }) => {
  return (
    <Affix offsetBottom={0} style={{ bottom: 0 }}>
      <Layout.Footer
        style={{
          height: "64px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          borderColor: "#EAEAEA",
          borderStyle: "solid",
          borderWidth: "1px",
          borderTopLeftRadius: "8px ",
          borderTopRightRadius: "8px ",
          boxShadow: "0 16px 24px 2px",
        }}
      >
        {children}
      </Layout.Footer>
    </Affix>
  );
};

export default FooterBar;
