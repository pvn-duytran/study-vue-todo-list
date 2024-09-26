import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditTodo from "@/components/EditTodo.vue";
import { apiService } from "@/apiService";
import { useRoute } from "vue-router";
import { nextTick } from "vue";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

vi.mock("@/apiService", () => ({
  apiService: {
    getItem: vi.fn(),
  },
}));

describe("EditTodo.vue - onMounted", () => {
  let wrapper: any;
  const mockTodo = {
    id: "todo-123",
    name: "Test Todo",
    description: "Test description",
  };

  beforeEach(async () => {
    (useRoute as vi.Mock).mockReturnValue({
      params: { id: "todo-123" },
    });

    // Mock API trả về giá trị
    (apiService.getItem as vi.Mock).mockResolvedValue(mockTodo);

    wrapper = mount(EditTodo, {
      global: {
        stubs: ["TextField", "ButtonField"],
      },
    });

    await nextTick();
  });

  it("calls apiService.getItem and sets formData and setValues correctly", async () => {
    expect(apiService.getItem).toHaveBeenCalledWith("todo-123");

    expect(wrapper.vm.formData).toEqual(mockTodo);

    expect(wrapper.vm.name).toBe(mockTodo.name);
    expect(wrapper.vm.description).toBe(mockTodo.description);
  });

  it("renders correctly", () => {
    expect(wrapper.find("h2").text()).toBe("EDIT");
    console.log("wrapper.html()", wrapper.html());
  });
});
