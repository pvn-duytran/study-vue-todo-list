import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import AddTodo from "./components/AddTodo.vue";
import EditTodo from "./components/EditTodo.vue";
import { ROUTES } from "./config";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
const routes = [
  { path: ROUTES.HOME, component: Home },
  { path: ROUTES.TODO, component: Home },
  { path: ROUTES.ADD_TODO, component: AddTodo },
  { path: ROUTES.EDIT_TODO, component: EditTodo },
  { path: ROUTES.REGISTER, component: Register },
  { path: ROUTES.LOGIN, component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
