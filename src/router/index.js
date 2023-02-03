import { createRouter, createWebHistory } from "vue-router";
import { computed } from "vue";
import store from "../store";
import Login from "@/views/Login.vue";
import NewOrder from "@/views/NewOrder.vue";
import CommandRegistered from "@/views/CommandRegistered.vue";

const isLogged = computed(() => store.state.userModule.user.isLogged);
const isUserLogged = () => isLogged.value;

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  { path: "/order", name: "new-order", component: NewOrder },
  {
    path: "/command-registered",
    name: "registered",
    component: CommandRegistered,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name !== "login" && !isUserLogged()) next({ name: "login" });
  else next();
});

export default router;
