import axios from "axios";

export default {
  getBoxs() {
    axios.defaults.baseURL = "http://localhost:4000";
    return axios.get("boxs");
  },
  getOrders() {
    axios.defaults.baseURL = "http://localhost:3000";
    return axios.get("orders");
  },
};
