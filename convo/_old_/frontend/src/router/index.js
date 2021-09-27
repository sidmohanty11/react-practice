import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "Signup" */ "../views/Signup.vue")
  },
  {
    path: "/messages/:id",
    name: "Message",
    component: () => import(/* webpackChunkName: "Message" */ "../views/Message.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
