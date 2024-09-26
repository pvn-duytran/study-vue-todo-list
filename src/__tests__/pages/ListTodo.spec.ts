import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ListTodo from "@/pages/todos/ListTodo.vue";
import { createTestingPinia } from "@pinia/testing";
import { useTodoStore } from "@/stores/TodoStore";
import { useAuthStore } from "@/stores/AuthStore";
import IconLoading from "@/components/Icon/IconLoading.vue";
import ItemTodo from "@/components/ItemTodo.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import EditTodo from "@/components/EditTodo.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/todo/edit/:id",
      name: "Edit Todo",
      component: EditTodo,
    },
  ],
});
vi.mock("@/apiService", () => ({
  apiService: {
    getItemsByUserUID: vi.fn(),
  },
}));

describe("ListTodo.vue", () => {
  let wrapper: any;
  let TodoStore: any;
  let AuthStore: any;

  beforeEach(() => {
    wrapper = mount(ListTodo, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
      },
    });
    TodoStore = useTodoStore();
    AuthStore = useAuthStore();
  });

  it("renders loading state correctly", async () => {
    wrapper.vm.loading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(IconLoading).exists()).toBe(true);
  });

  it("renders todos after loading", async () => {
    const mockTodos = [
      {
        id: "1",
        name: "Todo 1",
        completed: false,
        hide_description: false,
        description: "Description 1",
        user_id: "user-123",
      },
      {
        id: "2",
        name: "Todo 2",
        completed: true,
        hide_description: true,
        description: "Description 2",
        user_id: "user-123",
      },
    ];
    const { apiService } = await import("@/apiService");
    (apiService.getItemsByUserUID as vi.Mock).mockResolvedValue(mockTodos);
    AuthStore.currentUser = { uid: "user-123" };
    TodoStore.todos = mockTodos;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.loading).toBe(false);
    expect(TodoStore.todos).toEqual(mockTodos);
    expect(wrapper.findComponent(IconLoading).exists()).toBe(false);

    const todoItems = wrapper.findAllComponents(ItemTodo);
    expect(todoItems.length).toBe(mockTodos.length);
    expect(todoItems[0].props("todo")).toEqual(mockTodos[0]);
    expect(todoItems[1].props("todo")).toEqual(mockTodos[1]);
  });

  it('renders "There are no tasks for today yet." when todos is empty', async () => {
    TodoStore.todos = [];

    wrapper.vm.loading = false;
    await wrapper.vm.$nextTick();

    const message = wrapper.find("p");
    expect(message.exists()).toBe(true);
    expect(message.text()).toBe("There are no tasks for today yet.");
  });
});
