import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProductPage from "../components/ProductPage.vue";
import Success from "../views/Success.vue";
import Failed from "../views/Failed.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ProductPage",
    component: ProductPage,
  },

  {
    path: "/sucess",
    name: "Sucess",
    component: Success,
  },
  {
    path: "/failed",
    name: "Failed",
    component: Failed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
