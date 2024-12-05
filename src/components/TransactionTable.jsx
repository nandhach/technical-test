import React, { useEffect, useState } from "react";
import { deleteTransaction, getAllTransaction, getAllCustomer, getAllProduct, addTransaction } from "../services/api";
import { Table, Button, Modal, Form, Select, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchTransaction = async () => {
    const res = await getAllTransaction();
    setTransactions(res);
  };

  const fetchCustomers = async () => {
    const res = await getAllCustomer();
    setCustomers(res?.data || []);
  };

  const fetchProducts = async () => {
    const res = await getAllProduct();
    setProducts(res.data || []);
  };

  useEffect(() => {
    fetchTransaction();
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleAddTransaction = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSaveTransaction = async (values) => {
    console.log(values);
    try {
      const newTransaction = {
        customerId: values.customerId,
        productId: values.productId,
      };
      await addTransaction(newTransaction);
      message.success("Transaction added successfully!");
      fetchTransaction();
    } catch (error) {
      console.error("Error adding transaction:", error);
      message.error("Failed to add transaction.");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchTransaction();
    message.success("Transaction deleted successfully!");
  };

  const columns = [
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
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Button type="text" icon={<DeleteOutlined style={{ color: "red" }} />} onClick={() => handleDelete(record.id)} />,
    },
  ];

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTransaction} style={{ marginBottom: "16px" }}>
        Add New Transaction
      </Button>

      <Table columns={columns} dataSource={transactions} rowKey="id" />

      <Modal
        title="Add New Transaction"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={async () => {
          await handleSaveTransaction(form.getFieldsValue());
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveTransaction}>
          <Form.Item name="customerId" label="Select Customer" rules={[{ required: true, message: "Please select a customer" }]}>
            <Select placeholder="Select a customer">
              {customers.map((customer) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="productId" label="Select Product" rules={[{ required: true, message: "Please select a product" }]}>
            <Select placeholder="Select a product">
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TransactionTable;
