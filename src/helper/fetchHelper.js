import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/RyuzakL/wms",
  withCredentials: false,
});

export default {
  getBoxs() {
    return api.get("/boxs");
  },
  getOrder() {
    return api.get("/orders");
  },
  getSiteClients(inputFilter = "", domain, username, password) {
    return api.post(
      `https://${domain}/api/admin/datatable/site`,
      {
        first: 0,
        rows: 59,
        sortField: "createdAt",
        sortOrder: 1,
        multiSortMeta: [],
        filters: {
          siteCode: {
            matchMode: "startsWith",
            value: inputFilter,
          },
        },
      },
      {
        auth: {
          username: username,
          password: password,
        },
      }
    );
  },
  postNewOrder(domain, username, password, newOrder, ID) {
    axios.post(
      `https://${domain}/api/customer/sales/order/create`,
      // '{\n\t"reference": ""\n}',
      {
        newOrder,
      },
      {
        params: {
          siteId: ID,
        },
        auth: {
          username: username,
          password: password,
        },
      }
    );
  },
};
