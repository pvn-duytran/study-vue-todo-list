import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodoStore } from "@/stores/TodoStore"; // Adjust the import path as necessary

describe("Todo Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Move up item by one position", () => {
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
        completed: false,
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
    ];
    todoStore.moveUp(1);
    expect(todoStore.todos).toEqual([
      {
        id: "2",
        name: "Task 2",
        completed: false,
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
      {
        id: "3",
        name: "Task 3",
        completed: false,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Don't move up item if item = 0", () => {
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
        completed: false,
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
    ];
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
        completed: false,
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

  it("Move down item by one position", () => {
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
        completed: false,
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
    ];
    todoStore.moveDown(1);
    expect(todoStore.todos).toEqual([
      {
        id: "1",
        name: "Task 1",
        completed: false,
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
      {
        id: "2",
        name: "Task 2",
        completed: false,
        hide_description: false,
        description: "",
      },
    ]);
  });

  it("Don't move down item if item = last", () => {
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
        completed: false,
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
    ];
    todoStore.moveDown(3);
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
        completed: false,
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
});
