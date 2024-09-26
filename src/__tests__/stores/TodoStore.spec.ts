import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "@/stores/TodoStore";
import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Todo Store - state", () => {
  it("has correct initial state", () => {
    const todoStore = useTodoStore();

    expect(todoStore.todos).toEqual([]);
    expect(todoStore.activePopup).toBe(false);
    expect(todoStore.activeForm).toBe(false);
    expect(todoStore.filters).toBe(false);
    expect(todoStore.detailsTodo).toEqual({});
    expect(todoStore.detailsIndex).toBe(0);
    expect(todoStore.isEdit).toBe(false);
  });
});

describe("Todo Store - getters", () => {
  it("countTodos returns correct number of todos", () => {
    const todoStore = useTodoStore();

    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    expect(todoStore.countTodos).toBe(2);
  });

  it("countCompleted returns correct number of completed todos", () => {
    const todoStore = useTodoStore();

    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: true,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    expect(todoStore.countCompleted).toBe(1);
  });

  it("filteredTodos returns correct todos based on filters", () => {
    const todoStore = useTodoStore();

    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: true,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    todoStore.filters = true;

    expect(todoStore.filteredTodos).toEqual([
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ]);
  });
});

describe("Todo Store - actions", () => {
  it("getDetailTodo sets the correct todo details", () => {
    const todoStore = useTodoStore();
    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    todoStore.getDetailTodo("1");
    expect(todoStore.detailsTodo.name).toBe("Task 1");
    expect(todoStore.detailsIndex).toBe(0);
  });

  it("moveUp swaps todo with the previous one", () => {
    const todoStore = useTodoStore();
    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    todoStore.moveUp(1);
    expect(todoStore.todos[0].name).toBe("Task 2");
    expect(todoStore.todos[1].name).toBe("Task 1");
  });

  it("moveDown swaps todo with the next one", () => {
    const todoStore = useTodoStore();
    todoStore.todos = [
      {
        id: "1",
        name: "Task 1",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
        user_id: "123",
      },
    ];

    todoStore.moveDown(0);
    expect(todoStore.todos[0].name).toBe("Task 2");
    expect(todoStore.todos[1].name).toBe("Task 1");
  });
});
