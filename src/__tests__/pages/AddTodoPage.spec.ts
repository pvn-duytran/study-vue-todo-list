import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import AddTodoPage from "@/pages/add/AddTodoPage.vue";
import AddTodo from "@/components/AddTodo.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { useNotification } from "@kyvg/vue3-notification";
import { createRouter, createMemoryHistory } from "vue-router";
import { ROUTES } from "@/config";
import { apiService } from "@/apiService";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: ROUTES.TODO,
      name: "Todo",
      component: { template: "<div>Todo Page</div>" },
    },
  ],
});

vi.mock("@/apiService", () => ({
  apiService: {
    createItem: vi.fn(),
  },
}));

describe("AddTodoPage.vue", () => {
  let wrapper: any;
  let TodoStore: any;
  const { notify } = useNotification();

  const todoMock = {
    id: "1",
    name: "Test Todo",
    completed: false,
    hide_description: false,
    description: "Test description",
    user_id: "user-123",
  };

  beforeEach(async () => {
    wrapper = mount(AddTodoPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
      },
    });
    TodoStore = useTodoStore();
    router.push = vi.fn();
  });

  it("renders AddTodo component", () => {
    expect(wrapper.findComponent(AddTodo).exists()).toBe(true);
  });

  it("calls handleAdd and adds a todo", async () => {
    const addTodoComponent = wrapper.findComponent(AddTodo);

    await addTodoComponent.vm.$emit("submit", todoMock);
    await wrapper.vm.$nextTick();

    expect(apiService.createItem).toHaveBeenCalledWith(todoMock);
  });
});
