import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/home/Home.vue";
import AddTodoPage from "./pages/add/AddTodoPage.vue";
import EditTodoPage from "./pages/edit/EditTodoPage.vue";
import { ROUTES } from "./config";
import Register from "./pages/register/Register.vue";
import Login from "./pages/login/Login.vue";
const routes = [
  { path: ROUTES.HOME, component: Home },
  { path: ROUTES.TODO, component: Home },
  { path: ROUTES.ADD_TODO, component: AddTodoPage },
  { path: ROUTES.EDIT_TODO, component: EditTodoPage },
  { path: ROUTES.REGISTER, component: Register },
  { path: ROUTES.LOGIN, component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
