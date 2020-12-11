import Vue from "vue";
import VueRouter from "vue-router";
import Joblist from "../views/joblist.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/joblist"
  },
  {
    path: "/joblist",
    name: "Home",
    component: Joblist
  },
  {
    path: "/jobdetail/:id",
    name: "jobDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/jobdetail.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
