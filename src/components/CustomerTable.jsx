import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../services/api";
import { Table } from "antd";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomer = async () => {
    const res = await getAllCustomer();
    const result = res.data.map((item, index) => ({ ...item, no: index + 1 }));
    setCustomers(result);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <>
      <Table dataSource={customers} columns={columns} />
    </>
  );
};

export default CustomerTable;
