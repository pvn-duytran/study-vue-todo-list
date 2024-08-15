import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "@/stores/TodoStore";
import { apiService } from "@/apiService";

vi.mock("@/apiService", () => ({
  apiService: {
    getItems: vi.fn(),
    updateItem: vi.fn(),
    deleteItem: vi.fn(),
    createItem: vi.fn(),
    getItem: vi.fn(),
    filterItems: vi.fn(),
  },
}));
describe("Todo Store", () => {
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

  it("Get todos", async () => {
    const todoStore = useTodoStore();
    apiService.getItems.mockResolvedValue(todoStore.todos);
    await todoStore.getTodos();
    expect(todoStore.todos).toEqual(todoStore.todos);
  });

  it("Update todo", async () => {
    const todoStore = useTodoStore();
    const mockTodo = {
      id: "1",
      name: "Update Task 1",
      completed: false,
      hide_description: false,
      description: "Update description",
    };
    apiService.updateItem.mockResolvedValue(mockTodo);
    const updatedTodo = await todoStore.updateTodo(mockTodo.id, mockTodo);
    expect(updatedTodo).toEqual(mockTodo);
  });

  it("Delete todo", async () => {
    const todoStore = useTodoStore();

    apiService.deleteItem.mockResolvedValue({ success: true });
    await todoStore.deleteTodo("1");
    expect(todoStore.todos).toEqual([
      {
        id: "2",
        name: "Task 2",
        completed: true,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Create todo", async () => {
    const todoStore = useTodoStore();
    const mockTodo = {
      id: "3",
      name: "Task 3",
      completed: false,
      hide_description: false,
      description: "",
    };
    apiService.createItem.mockResolvedValue(mockTodo);
    await todoStore.createTodo(mockTodo);
    expect(todoStore.todos).toEqual([
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
      {
        id: "3",
        name: "Task 3",
        completed: false,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Get detail", () => {
    const todoStore = useTodoStore();
    todoStore.getDetailTodo("2");
    expect(todoStore.detailsTodo).toEqual({
      id: "2",
      name: "Task 2",
      completed: true,
      hide_description: false,
      description: "",
    });
  });

  it("Move up item by one position", () => {
    const todoStore = useTodoStore();
    todoStore.moveUp(1);
    expect(todoStore.todos).toEqual([
      {
        id: "2",
        name: "Task 2",
        completed: true,
        hide_description: false,
        description: "",
      },
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Don't move up item if item = 0", () => {
    const todoStore = useTodoStore();
    todoStore.moveUp(0);
    expect(todoStore.todos).toEqual([
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
    ]);
  });

  it("Move down item by one position", () => {
    const todoStore = useTodoStore();
    todoStore.moveDown(0);
    expect(todoStore.todos).toEqual([
      {
        id: "2",
        name: "Task 2",
        completed: true,
        hide_description: false,
        description: "",
      },
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Don't move down item if item = last", () => {
    const todoStore = useTodoStore();
    todoStore.moveDown(2);
    expect(todoStore.todos).toEqual([
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
    ]);
  });
});
