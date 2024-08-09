import { API_URLS } from "./config";
import axios from "axios";

export const apiService = {
  async getItems() {
    try {
      const response = await axios.get(API_URLS.ITEMS);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching items: ${error.response?.statusText || error.message}`
      );
    }
  },

  async getItem(id: string) {
    try {
      const response = await axios.get(`${API_URLS.ITEMS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async createItem(item: object) {
    try {
      const response = await axios.post(API_URLS.ITEMS, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error creating item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async updateItem(id: string, item: object) {
    try {
      const response = await axios.put(`${API_URLS.ITEMS}/${id}`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error updating item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async deleteItem(id: string) {
    try {
      const response = await axios.delete(`${API_URLS.ITEMS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Error deleting item: ${error.response?.statusText || error.message}`
      );
    }
  },
};
