import React, { useState } from "react";
import { Flex, Menu } from "antd";
import { AiOutlineDingding } from "react-icons/ai";
import { ShoppingCartOutlined, LogoutOutlined, ContactsOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Sidebar = ({ activeKey }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="h-full flex flex-col">
      <Flex className="items-center justify-center flex">
        <div className="text-red-500 my-8 text-xl">
          <AiOutlineDingding size={40} />
        </div>
      </Flex>

      <Menu mode="inline" className="flex flex-col gap-y-[15px] font-medium">
        <Menu.Item icon={<ContactsOutlined />} className={"!text-white text-base" + (activeKey === 1 ? " !bg-gradient-to-br from-red-600 to-orange-200" : " !bg-red-500")}>
          <a href="/customer">Customer</a>
        </Menu.Item>
        <Menu.Item icon={<ShoppingCartOutlined />} className={" !text-white text-base" + (activeKey === 2 ? " !bg-gradient-to-br from-red-600 to-orange-200" : " !bg-red-500")}>
          <a href="/transaction">Transaction</a>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} className={" !text-white text-base" + (activeKey === 3 ? " !bg-gradient-to-br from-red-600 to-orange-200" : " !bg-red-500")} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
