import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../types';
import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction('user/setUser', (data) => ({
  payload: data,
}));



export const registerUser = createAsyncThunk("auth/registerUser", async ({name , email, password }) => {
  try {
    const response = await axios.post(`${URL}/Auth/register`, {
      name,
      email,
      password,
       // Agrega el nombre del usuario al cuerpo de la solicitud
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});



// Acción asincrónica para iniciar sesión

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  try {
    const response = await axios.post(`${URL}/Auth/login`, {
      email,
      password,
    });
    const user = response.data;
    if (user.token) {
      sessionStorage.setItem("userToken", user.token); // Guardar token en sessionStorage
      sessionStorage.setItem("userName", user.name); // Guardar nombre de usuario en sessionStorage
      console.log (user.name);
      
    }
    return user;
  } catch (error) {
    throw error;
  }
});



// Acción asincrónica para cerrar sesión
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(`${URL}/Auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
});