import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";
import AllProuctView from "../views/AllProuctView";
import ClassProductView from "../views/ClassProductView";
import ProductDetail from "../views/ProductDetail";
import AboutView from "../views/AboutView";
import RuleView from "../views/RuleView";
import LoginView from "../views/LoginView";
import buyCartView from "../views/buyCartView";
import swal from "sweetalert";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/Home", component: HomeView },
    { path: "/product", component: AllProuctView },
    {
      path: "/product/:class",
      component: ClassProductView,
      props($route) {
        return { class: $route.params.class };
      },
    },
    {
      name: "productInfo",
      path: "/productitem/:id",
      component: ProductDetail,
      props($route) {
        return {
          id: $route.params.id,
        };
      },
    },
    { path: "/about", component: AboutView },
    { path: "/rule", component: RuleView },
    { path: "/login", component: LoginView },
    {
      name: "buycart",
      path: "/buycart",
      component: buyCartView,
      meta: { isAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("user")) {
      next();
    } else {
      swal({
        title: "請先登入",
        icon: "warning",
        dangerMode: true,
      });
    }
  } else {
    next();
  }
});

export default router;
