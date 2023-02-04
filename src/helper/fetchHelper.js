import axios from "axios";
import store from "@/store/index.js";
import { computed } from "vue";

const userDomain = computed(() => store.state.userModule.user.domain);
const userUsername = computed(() => store.state.userModule.user.username);
const userPassword = computed(() => store.state.userModule.user.password);
const siteID = computed(() => store.state.siteClient.siteId);

export default {
  getSiteClients({
    domain = userDomain.value,
    username = userUsername.value,
    password = userPassword.value,
    query = "",
  }) {
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
            value: query,
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
  postNewOrder({
    domain = userDomain.value,
    username = userUsername.value,
    password = userPassword.value,
    newOrder,
  }) {
    return axios.post(
      `https://${domain}/api/customer/sales/order/create`,
      {
        ...newOrder,
      },
      {
        params: {
          siteId: siteID.value,
        },
        auth: {
          username: username,
          password: password,
        },
      }
    );
  },
};
