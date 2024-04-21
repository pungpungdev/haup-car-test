import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ManageCar from './ManageCar';
const { Header, Sider, Content } = Layout;
export default function Index  () {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{margin:'20px',overflow:'hidden'}}>
        <img src="haup_logo.png"  width="94" height="22"/>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FormOutlined />,
              label: 'ระบบบันทึกรถยนต์ภายในบริษัท',
            },
          ]}
        />
      </Sider>
      <Layout style={{minHeight: '100vh'}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '80vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ManageCar/>
        </Content>
      </Layout>
    </Layout>
  );
};