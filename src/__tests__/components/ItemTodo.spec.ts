import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ItemTodo from "@/components/ItemTodo.vue";
import IconChecked from "@/components/Icon/IconChecked.vue";
import IconUnChecked from "@/components/Icon/IconUnChecked.vue";
import { createTestingPinia } from "@pinia/testing";
import { apiService } from "@/apiService";
import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/todo/edit/:id",
      name: "editTodo",
      component: { template: "<div>Edit Todo</div>" },
    },
  ],
});
vi.mock("@/apiService", () => ({
  apiService: {
    updateItem: vi.fn(),
  },
}));

describe("ItemTodo.vue", () => {
  let wrapper: any;

  const todoMock = {
    id: "1",
    name: "Todo 1",
    completed: false,
    hide_description: false,
    description: "This is a test description",
    user_id: "user-123",
  };

  beforeEach(() => {
    wrapper = mount(ItemTodo, {
      props: {
        todo: todoMock,
        id: "1",
        index: 0,
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
      },
    });
  });

  it("renders todo name and description", () => {
    expect(wrapper.text()).toContain(todoMock.name);
    expect(wrapper.text()).toContain(todoMock.description);
  });

  it("renders IconUnChecked when todo is not completed", () => {
    const iconUnchecked = wrapper.findComponent(IconUnChecked);
    expect(iconUnchecked.exists()).toBe(true);
  });

  it("renders IconChecked when todo is completed", async () => {
    await wrapper.setProps({ todo: { ...todoMock, completed: true } });
    const iconChecked = wrapper.findComponent(IconChecked);
    expect(iconChecked.exists()).toBe(true);
  });

  it("toggles todo.completed and calls API on click", async () => {
    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.vm.todo.completed).toBe(true);
    expect(apiService.updateItem).toHaveBeenCalledWith(todoMock.id, {
      ...todoMock,
      completed: true,
    });
  });
});
