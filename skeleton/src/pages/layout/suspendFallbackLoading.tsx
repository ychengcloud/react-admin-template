import React, { FC } from 'react';
import { Spin, Alert } from 'antd';
import styles from "./index.module.less";

const SuspendFallbackLoading: FC = () => {
  return (
    <div className={styles.delayedSpinner} style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
  );
};

export default SuspendFallbackLoading;
