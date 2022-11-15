import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      needsUser: true, //za redirect
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// za svaku promjenu rute gledamo
router.beforeEach((to, from, next) => {
  console.log(
    "stara ruta je",
    from.name,
    "nova ruta",
    to.name,
    "korisnik",
    store.currentUser
  );
  const noUser = store.currentUser === null; //no user je ture ako je s.cur === null
  if (noUser && to.meta.needsUser) {
    next("login");
  } else {
    next();
  }
});

export default router;
