import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import CustomerTable from "../components/CustomerTable";

const { Sider, Header, Content } = Layout;
const CustomerPage = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="h-screen sticky top-0 left-0 bottom-0">
        <Sidebar activeKey={1} />

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-2xl w-[50px] h-[50px] fixed bottom-[10px] left-[10px]"
        />
      </Sider>
      <Layout>
        <Header className="pt-[12px] bg-gradient-to-r from-red-600 to-orange-300">
          <HeaderBar />
          <Content className="mx-[24px] my-[16px] p-[20px]">
            <CustomerTable />
          </Content>
        </Header>
      </Layout>
    </Layout>
  );
};

export default CustomerPage;
