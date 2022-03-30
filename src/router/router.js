import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/cadastro",
      name: "register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/entrar",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

export default router;
