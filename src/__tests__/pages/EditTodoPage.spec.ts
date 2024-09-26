import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import EditTodoPage from "@/pages/edit/EditTodoPage.vue";
import EditTodo from "@/components/EditTodo.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { createRouter, createMemoryHistory } from "vue-router";
import { ROUTES } from "@/config";
import { apiService } from "@/apiService";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: `${ROUTES.TODO}/:id`,
      name: "Todo",
      component: { template: "<div>Todo Page</div>" },
    },
  ],
});

vi.mock("@/apiService", () => ({
  apiService: {
    updateItem: vi.fn((id, data) => {
      return Promise.resolve();
    }),
    getItem: vi.fn().mockResolvedValue({
      id: "1",
      name: "Test Todo",
      completed: false,
      hide_description: false,
      description: "Test description",
    }),
    createItem: vi.fn(),
  },
}));

describe("EditTodoPage.vue", async () => {
  const { notify } = useNotification();
  let wrapper: any;
  router.push({ name: "Todo", params: { id: "1" } });
  await router.isReady();

  const todoMock = {
    id: "1",
    name: "Test Todo",
    completed: false,
    hide_description: false,
    description: "Test description",
  };

  beforeEach(async () => {
    wrapper = mount(EditTodoPage, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
      },
      route: {
        params: {
          id: "1",
        },
      },
    });
    console.log("Wrapper params ID:", wrapper.vm.$route.params.id);
  });

  it("renders EditTodo component", () => {
    expect(wrapper.findComponent(EditTodo).exists()).toBe(true);
  });

  it("calls handleEdit and updates a todo", async () => {
    const editTodoComponent = wrapper.findComponent(EditTodo);
    await editTodoComponent.vm.$emit("submit", todoMock);
    expect(apiService.updateItem).toHaveBeenCalledWith(todoMock.id, todoMock);
  });
});
