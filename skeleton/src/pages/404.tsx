import { Button, Result } from "antd";
import React from "react";
import { useIntl } from 'react-intl';

import useNavigator from "@/hooks/useNavigator";

interface NotFoundPageProps {
  onBack?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { onBack } = props;
  const navigate = useNavigator();
  const { formatMessage } = useIntl();

  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: "gloabal.tips.notfound" })}
      extra={
        <>
          <Button type="primary" onClick={() => navigate("/")}>
            {formatMessage({ id: "gloabal.tips.backHome" })}
          </Button>
          <Button onClick={onBack}>
            {formatMessage({ id: "gloabal.tips.back" })}
          </Button>
        </>
      }
    ></Result>
  );
};

export default NotFoundPage;
