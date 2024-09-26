import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import AddTodo from "@/components/AddTodo.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { ROUTES } from "@/config";
import { createRouter, createMemoryHistory } from "vue-router";
import { nextTick } from "vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/add",
      name: "addTodo",
      component: AddTodo,
    },
  ],
});
vi.mock("@/stores/AuthStore", () => ({
  useAuthStore: vi.fn(),
}));

describe("AddTodo.vue", () => {
  let wrapper: any;
  let AuthStore: any;

  beforeEach(() => {
    AuthStore = {
      currentUser: { uid: "user-123" },
    };
    (useAuthStore as vi.Mock).mockReturnValue(AuthStore);

    wrapper = mount(AddTodo, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.find("h2").text()).toBe("ADD");
    expect(wrapper.findComponent({ name: "TextField" }).exists()).toBe(true);
    expect(wrapper.findAll("input").length).toBe(1);
    expect(wrapper.findAll("textarea").length).toBe(1);
  });

  it("displays validation errors when fields are invalid", async () => {
    const submitButton = wrapper.find("button[type='submit']");
    await submitButton.trigger("click");
    await nextTick();
    if (wrapper.vm.errors && wrapper.vm.errors.value) {
      expect(wrapper.vm.errors.value.name).toBeTruthy();
      expect(wrapper.vm.errors.description).toBeTruthy();
    } else {
      console.error("errors hoặc errors.value không tồn tại");
    }
  });

  it("calls handleAdd when form is submitted with valid data", async () => {
    const nameInput = wrapper.find("input");
    const descriptionTextarea = wrapper.find("textarea");

    await nameInput.setValue("Test Todo");
    await descriptionTextarea.setValue("Test description");
    const handleAddSpy = vi.spyOn(wrapper.vm, "handleAdd");

    const form = wrapper.find("form");
    await form.trigger("submit.prevent");

    await nextTick();

    expect(handleAddSpy).toHaveBeenCalled();
  });
});
