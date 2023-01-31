import axios from "axios";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/RyuzakL/wms",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getBoxs() {
    return api.get("/boxs");
  },
  getOrder() {
    return api.get("/orders");
  },
  getSiteClients(input) {
    return api.post(
      "https://wms.parcelontime.es/api/admin/datatable/site",
      {
        first: 0,
        rows: 59,
        sortField: "createdAt",
        sortOrder: 1,
        multiSortMeta: [],
        filters: {
          siteCode: {
            matchMode: "startsWith",
            value: input,
          },
        },
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Basic YmVuamFtaW46YmVuamFtaW4=",
          "Content-Type": "application/json",
        },
      }
    );
  },
};
