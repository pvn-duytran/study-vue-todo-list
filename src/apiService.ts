import { API_URLS } from './config';

export const apiService = {
  async getItems() {
    const response = await fetch(API_URLS.ITEMS);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async getItem(id: string) {
    const response = await fetch(`${API_URLS.ITEMS}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async createItem(item: object) {
    const response = await fetch(API_URLS.ITEMS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async updateItem(id:string, item:object) {
    const response = await fetch(`${API_URLS.ITEMS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  async deleteItem(id:string) {
    const response = await fetch(`${API_URLS.ITEMS}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    ////huhuuh
  }
};
