import axios from "axios";

const baseUrl = "http://localhost:3000";


/**
 * Login function
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The logged-in user data.
 */
const login = async (email, password) => {
    try {
      const users = (await axios.get(`${baseUrl}/auth`)).data;
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid email or password");
      return user;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

const getAllCustomer = async () => {
  try {
    return await axios.get(`${baseUrl}/customers`);
  } catch (error) {
    console.log(error);
  }
};

const getCustomerById = async (id) => {
  try {
    return await axios.get(`${baseUrl}/customers/${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Add a new customer
 * @param {Object} data customer data (name, phone)
 * @returns {Promise<Object>} new customer data
 */
const addCustomer = async (data) => {
  try {
    return await axios.post(`${baseUrl}/customers`, data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update an existing customer
 * @param {number} id customer id
 * @param {Object} data customer data (name, phone)
 * @returns {Promise<Object>} updated customer data
 */
const updateCustomer = async (id, data) => {
  try {
    return await axios.put(`${baseUrl}/customers/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete an existing customer
 * @param {number} id customer id
 * @returns {Promise<void>}
 */
const deleteCustomer = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/customers/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (id) => {
  try {
    return await axios.get(`${baseUrl}/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async () => {
  try {
    return await axios.get(`${baseUrl}/products`);
  } catch (error) {
    console.log(error);
  }
};

const getAllTransaction = async () => {
  try {
    let transactions = (await axios.get(`${baseUrl}/transactions`)).data;
    const transactionDatas = [];

    for (let i = 0; i < transactions.length; i++) {
      const customerData = await getCustomerById(transactions[i].customerId);
      const productData = await getProductById(transactions[i].productId);

      transactionDatas.push({
        id: transactions[i].id,
        name: customerData.data.name,
        phone: customerData.data.phone,
        productName: productData.data.name,
        price: productData.data.price,
      });
    }

    return transactionDatas;
  } catch (error) {
    console.log(error);
  }
};

const deleteTransaction = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/transactions/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const addTransaction = async (data) => {
  try {
    return await axios.post(`${baseUrl}/transactions`, data);
  } catch (error) {
    console.log(error);
  }
};

export { getAllCustomer, getCustomerById, addCustomer, updateCustomer, deleteCustomer, getAllTransaction, deleteTransaction, getProductById, getAllProduct, addTransaction, login };
