import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import NewOrder from "@/views/NewOrder.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/order", name: "new-order", component: NewOrder },
  { path: "/", redirect: { name: "login" } },
  // login à modifier et rajouter navigation guards à la place
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
