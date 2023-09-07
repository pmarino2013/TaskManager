import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { URL } from "../types";

export const updateTasksToDisplay = createAction("tasks/updateTasksToDisplay");

export const updateSearchTerm = createAction("tasks/updateSearchTerm");

export const clearSearchTerm = createAction("tasks/clearSearchTerm");

export const setFilterByDate = createAction("tasks/setFilterByDate");

export const setFilterByPriority = createAction("tasks/setFilterByPriority");

export const setFilterByDone = createAction("tasks/setFilterByDone");

export const setFilterByPending = createAction("tasks/setFilterByPending");

export const createTask = createAsyncThunk("tasks/createTask", async ({ data, token }) => {
  try {
    const response = await axios.post(`${URL}/tasks/create`, data, {
      headers: {
        Authorization: `Bearer ${token}` // Agrega el token al encabezado de autorización
      }
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
});

export const searchTasks = createAsyncThunk("tasks/searchTasks", async (searchTerm) => {
  try {
    console.log(`Searching for term: ${searchTerm}`);
    const response = await axios.get(`${URL}/tasks/search?term=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });

    console.log("Search results:", response.data);
    return response.data; // Esto debería ser un arreglo de tareas filtradas
  } catch (error) {
    console.error("Error searching tasks:", error);
    throw error;
  }
});

export const updateFilteredTasks = createAction("tasks/updateFilteredTasks");



export const getByUser = createAsyncThunk("tasks/getByUser", async () => {
  try {
    const userToken = sessionStorage.getItem("userToken"); // Obtiene el token del sessionStorage
    const response = await axios.get(`${URL}/tasks/get`, {
      headers: {
        Authorization: `Bearer ${userToken}`, // Agrega el token en los headers
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedTask, token }) => {
    try {
      const response = await axios.put(
        `${URL}/tasks/update/${taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Debe devolver la tarea actualizada
    } catch (error) {
      throw error;
    }
  }
);


export const deleteTask = createAsyncThunk("tasks/deleteTask", async ({ _id, token }) => {
  try {
    const response = await axios.delete(`${URL}/tasks/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return _id;
  } catch (error) {
    throw error;
  }
});


export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axios.get(`${URL}/Tasks/get`);
    return response.data;
  } catch (error) {
    throw error;
  }
});