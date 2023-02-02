import axios from "axios";

export default {
  getOrder() {
    return axios.get("https://my-json-server.typicode.com/RyuzakL/wms/orders");
  },
  getSiteClients(inputFilter = "", domain, username, password) {
    return axios.post(
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
    return axios.post(
      `https://${domain}/api/customer/sales/order/create`,
      {
        ...newOrder,
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
  // Trouver un moyen d'importer mon store pour utiliser
  // Les données utilisateur en tant que valeur par defaut pour les arguments
  // à fin de ne pas être obliger de toujours mettre id,password,domain
};
