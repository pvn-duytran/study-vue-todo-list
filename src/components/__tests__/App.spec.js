import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "@/stores/TodoStore";
import App from "@/App.vue";
import HeaderTodo from "../HeaderTodo.vue";
import ListTodo from "../ListTodo.vue";
import FooterTodo from "../FooterTodo.vue";
import DetailTodo from "../DetailTodo.vue";
import { mount } from "@vue/test-utils";
import ListTodo from "../ListTodo.vue";

describe("App", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const todoStore = useTodoStore();
    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
      },
      {
        id: "2",
        name: "Task 2",
        completed: true,
        hide_description: false,
        description: "",
      },
    ];
  });

  it("renders Header, ListTodo, and Footer components", () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(HeaderTodo).exists()).toBe(true);
    expect(wrapper.findComponent(ListTodo).exists()).toBe(true);
    expect(wrapper.findComponent(FooterTodo).exists()).toBe(true);
  });

  it("renders DetailsTodo if activePopup == true", () => {
    const wrapper = mount(App);
    const todoStore = useTodoStore();
    todoStore.activePopup = true;
    console.log("todoStore.activePopup: ", todoStore.activePopup);
    expect(wrapper.findComponent(DetailTodo));
    console.log(
      "wrapper.findComponent(DetailTodo): ",
      expect(wrapper.findComponent(DetailTodo).exists())
    );
  });
});
