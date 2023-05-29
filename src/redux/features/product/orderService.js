import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/order/`;

// Create New Order
const createOrder = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data.message;
};

// Get all products
const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Product
const getOrder = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateOrderStatus = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data.message;
};

const orderService = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};

export default orderService;
