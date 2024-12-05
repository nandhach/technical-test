import React from "react";
import { Flex, Typography } from "antd";

const HeaderBar = () => {
  return (
    <>
      <Flex>
        <Typography.Title level={3} className="!text-white ">
          Your Best Place to Buy Package Online
        </Typography.Title>
      </Flex>
    </>
  );
};

export default HeaderBar;
