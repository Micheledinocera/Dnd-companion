import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import About from "../views/Home/About/About.vue";
import UserPage from "../views/Home/UserPage/UserPage.vue";
import CampagnaPage from "../views/Home/CampagnaPage/CampagnaPage.vue";
import Auth from "../views/Auth/Auth.vue";
import Login from "../views/Auth/Login/Login.vue";
import Signin from "../views/Auth/Signin/Signin.vue";
import { RouterNames } from "./RouterNames";
import Utils from "@/utils/Utils";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouterNames.AUTH,
    component: Auth,
    children: [
      {
        path: "/",
        name: RouterNames.LOGIN,
        component: Login,
      },
      {
        path: RouterNames.SIGNIN,
        name: RouterNames.SIGNIN,
        component: Signin,
      },
    ],
  },
  {
    path: "/" + RouterNames.HOME,
    name: RouterNames.HOME,
    component: Home,
    children: [
      {
        path: RouterNames.ABOUT,
        name: RouterNames.ABOUT,
        component: About,
      },
      {
        path: RouterNames.CAMPAGNA_PAGE,
        name: RouterNames.CAMPAGNA_PAGE,
        component: CampagnaPage,
      },
      {
        path: "",
        name: RouterNames.USER_PAGE,
        component: UserPage,
      },
    ],
  },
  {
    path: "/" + RouterNames.NOTFOUND,
    name: RouterNames.NOTFOUND,
    component: NotFound,
  },
  { path: "/:pathMatch(.*)*", redirect: { name: RouterNames.NOTFOUND } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let user = store.getters.getUser;
  if (user.email == "") {
    user = await Utils.getCurrentUser();
    if (user) await store.dispatch("bindUser", user.uid);
  }
  if (user && to.matched[0].name == RouterNames.AUTH)
    router.push({ name: RouterNames.USER_PAGE });
  else if (!user && to.matched[0].name !== RouterNames.AUTH)
    router.push({ name: RouterNames.LOGIN });
  next();
});

export default router;
