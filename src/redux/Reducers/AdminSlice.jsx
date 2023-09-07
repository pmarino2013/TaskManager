import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../Action/AdminAction";

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
    token: '', // Agregar el token como campo en el estado
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload; // Aquí actualizamos los usuarios con los que llegan de la acción
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Puedes manejar la respuesta del updateUser aquí si es necesario
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.loading = false;
        state.error = null;
        // Puedes manejar la respuesta del deleteUser aquí si es necesario
      });
  },
});

export default adminUsersSlice.reducer;