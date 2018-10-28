import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Teams from "./views/Teams.vue";
import TeamDetails from "@/views/TeamDetails.vue"

Vue.use(Router);

const titlePrefix = "Retro - ";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: `${titlePrefix} Home`,
        session: "home"
      }
    },
    {
      path: "/times",
      name: "times",
      component: Teams,
      meta: {
        title: `${titlePrefix} Times`,
        session: "teams"
      }
    },
    {
      path: "/times/:id",
      name: "time-detalhes",
      component: TeamDetails,
      meta: {
        title: `${titlePrefix} Detalhe Time`,
        session: "teams"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
