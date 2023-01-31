import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login.vue";
import NewOrder from "@/views/newOrder.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/order", name: "new-order", component: NewOrder },
  { path: "/", redirect: { name: "login" } },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
