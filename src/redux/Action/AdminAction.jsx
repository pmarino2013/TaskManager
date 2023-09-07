
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../types';




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
  








export const createUser = createAsyncThunk("user/createUser", async ({ name, email, password, role }) => {
    try {
        const response = await axios.post(`${URL}/users/create`, {
            name,
            email,
            password,
            role,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    try {
        const userToken = sessionStorage.getItem("userToken");
        const response = await axios.get(`${URL}/users/get`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
});



// Define la acción asincrónica para actualizar un usuario
export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, updatedUser, token }) => {
  try {
    const response = await axios.put(`${URL}/users/update/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedUserData = response.data;
    console.log('Usuario actualizado con éxito', updatedUserData);

    // actualizar el nombre de usuario en el estado global de Redux
    dispatch(setUser(updatedUserData.name));

    return updatedUserData; // Debe devolver el usuario actualizado
  } catch (error) {
    throw error;
  }
});


export const deleteUser = createAsyncThunk("user/deleteUser", async ({ _id, token }) => {
    try {
        const response = await axios.delete(`${URL}/users/delete/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return _id;
    } catch (error) {
        throw error;
    }

});