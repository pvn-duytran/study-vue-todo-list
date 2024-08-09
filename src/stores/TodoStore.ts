import { defineStore } from "pinia";
import { apiService } from "../apiService";

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
    filters: boolean;
    detailsTodo: Todo;
    detailsIndex: number;
  } => ({
    todos: [],
    activePopup: false,
    filters: true,
    detailsTodo: {} as Todo,
    detailsIndex: 0,
  }),
  getters: {
    countTodos() {
      return this.todos.length;
    },
    countCompleted() {
      return this.todos.filter((todo: Todo) => todo.completed).length;
    },
    filtersTodo() {
      console.log("filtersTodo");
      console.log(this.filters);
      if (this.filters) {
        console.log("true");
        return this.todos;
      } else {
        console.log("false");
        return this.todos.filter((todo: Todo) => !todo.completed);
      }
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
        await apiService.updateItem(id, data);
      } catch (error) {
        console.error(error);
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
    async deleteTodo(id: string) {
      try {
        await apiService.deleteItem(id);
        this.todos = this.todos.filter((todo: Todo) => todo.id != id);
      } catch (error) {
        console.error(error);
      }
    },
    moveUp(index: number) {
      if (index > 0) {
        [this.filtersTodo[index], this.filtersTodo[index - 1]] = [
          this.filtersTodo[index - 1],
          this.filtersTodo[index],
        ];
        console.log("moveUp");
      }
      console.log(this.filtersTodo);
      console.log("moveUp1");
    },
    moveDown(index: number) {
      if (index < this.filtersTodo.length - 1) {
        [this.filtersTodo[index], this.filtersTodo[index + 1]] = [
          this.filtersTodo[index + 1],
          this.filtersTodo[index],
        ];
        console.log("moveDown");
      }
      console.log("moveDown1");
    },
  },
});
