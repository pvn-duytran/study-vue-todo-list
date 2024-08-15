import { defineStore } from "pinia";
import { apiService } from "../apiService";
import { useNotification } from "@kyvg/vue3-notification";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  hide_description: boolean;
  description: string;
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
    async getTodos() {
      try {
        const response = await apiService.getItems();
        this.todos = response;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async updateTodo(id: string, data: Todo) {
      try {
        const newData = await apiService.updateItem(id, data);
        return newData;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTodo(id: string) {
      try {
        const data = await apiService.deleteItem(id);
        this.todos = this.todos.filter((todo: Todo) => todo.id != id);
      } catch (error) {
        console.error(error);
      }
    },
    async createTodo(data: Todo, title: string, type: string) {
      try {
        const response = await apiService.createItem(data);
        this.todos.push(response);
      } catch (error) {
        console.error(error);
      } finally {
        this.activeForm = false;
        this.activePopup = false;
        useNotification().notify({
          title: title,
          type: type,
          speed: 1000,
          duration: 2000,
        });
      }
    },
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
