import { API_URLS } from "./config";
import axios from "axios";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const apiService = {
  async getItemsByUserUID(userUID: string) {
    try {
      const q = query(collection(db, "todos"), where("user_id", "==", userUID));
      const newTodos = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newTodos.push({ id: doc.id, ...doc.data() });
      });
      return newTodos;
    } catch (error) {
      throw new Error(
        `Error fetching items: ${error.response?.statusText || error.message}`
      );
    }
  },

  async getItem(id: string) {
    try {
      const q = query(collection(db, "todos"), where("id", "==", id));
      const newTodos = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newTodos.push({ id: doc.id, ...doc.data() });
      });
      return newTodos[0];
    } catch (error) {
      throw new Error(
        `Error fetching item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async createItem(item: object) {
    try {
      const todosRef = collection(db, "todos");
      const data = await addDoc(todosRef, item);
      return data.id;
    } catch (error) {
      throw new Error(
        `Error creating item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async updateItem(id: string, item: object) {
    try {
      const q = query(collection(db, "todos"), where("id", "==", id));
      let newID = "";
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newID = doc.id;
      });
      const docRef = doc(db, "todos", newID);
      await updateDoc(docRef, item);
    } catch (error) {
      throw new Error(
        `Error updating item: ${error.response?.statusText || error.message}`
      );
    }
  },

  async deleteItem(id: string) {
    try {
      const q = query(collection(db, "todos"), where("id", "==", id));
      let newID = "";
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        newID = doc.id;
      });
      await deleteDoc(doc(db, "todos", newID));
    } catch (error) {
      throw new Error(
        `Error deleting item: ${error.response?.statusText || error.message}`
      );
    }
  },
};
