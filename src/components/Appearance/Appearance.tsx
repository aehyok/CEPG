import React from 'react';
import { Card, Input } from 'antd';

type AppearanceProps = {};
const Appearance: React.FC = () => {
  return (
    <Card title="属性" bordered={false} size="small">
      <Input addonBefore="文本" size="small" defaultValue="mysite" />
    </Card>
  );
};

export default React.memo(Appearance);
