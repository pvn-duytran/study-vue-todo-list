import { defineStore } from "pinia";
import { apiService } from "../apiService";
import { useNotification } from "@kyvg/vue3-notification";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
  user_id: string;
};
export const useTodoStore = defineStore({
  id: "todo",
  state: (): {
    todos: Todo[];
    activePopup: boolean;
    activeForm: boolean;
    filters: boolean;
    detailsTodo: Todo;
    detailsIndex: number;
    isEdit: boolean;
  } => ({
    todos: [],
    activePopup: false,
    activeForm: false,
    filters: false,
    detailsTodo: {} as Todo,
    detailsIndex: 0,
    isEdit: false,
  }),
  getters: {
    countTodos() {
      return this.todos.length;
    },
    countCompleted() {
      return this.todos.filter((todo: Todo) => todo.completed).length;
    },
    filteredTodos() {
      if (this.filters) {
        return this.todos.filter((todo: Todo) => !todo.completed);
      }
      return this.todos;
    },
  },
  actions: {
    getDetailTodo(id: string) {
      this.todos.find((todo: Todo, index: number) => {
        if (todo.id == id) {
          this.detailsIndex = index;
        }
      });
      this.detailsTodo = this.todos.find((todo: Todo) => todo.id == id);
    },
    moveUp(index: number) {
      if (index > 0) {
        [this.filteredTodos[index], this.filteredTodos[index - 1]] = [
          this.filteredTodos[index - 1],
          this.filteredTodos[index],
        ];
        this.syncTodosWithFiltered();
      }
    },
    moveDown(index: number) {
      if (index < this.filteredTodos.length - 1) {
        [this.filteredTodos[index], this.filteredTodos[index + 1]] = [
          this.filteredTodos[index + 1],
          this.filteredTodos[index],
        ];
        this.syncTodosWithFiltered();
      }
    },
    syncTodosWithFiltered() {
      const remainingTodos: Todo[] = this.todos.filter((todo: Todo) =>
        this.filteredTodos.every(
          (filteredTodo: Todo) => filteredTodo.id !== todo.id
        )
      );
      this.todos = [...remainingTodos, ...this.filteredTodos];
    },
  },
});
