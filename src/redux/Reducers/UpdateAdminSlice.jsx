import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from '../Action/AdminAction';
import { setUser } from '../Action/UserAction'; // Importa la acción setUser
import { createSelector } from '@reduxjs/toolkit';

export const selectUpdatedUser = createSelector(
  (state) => state.updateAdmin.selectedUser,
  (selectedUser) => selectedUser
);

const updateAdminSlice = createSlice({
  name: 'updateAdmin',
  initialState: {
    id: "",
    name: "",
    email: "",
    password: "",
    showModal: false,
    users: [],
    selectedUser: null,
    formData: {
      id: '',
      name: '',
      email: '',
      password: '',
    },
  },
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map(user => (user._id === updatedUser._id ? updatedUser : user));
      if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
        state.selectedUser = updatedUser;
      }
      
      // Despacha la acción setUser para actualizar el nombre de usuario en el navbar
      if (updatedUser.name) {
        // Asegúrate de que `updatedUser` contenga la propiedad `name`
        setUser(updatedUser.name); // Cambio aquí, no necesitas state.dispatch
      }
    });
  },
});

export const {
  setShowModal,
  setSelectedUser,
  setUsers,
  setFormData,
  updateFormValue,
} = updateAdminSlice.actions;

export default updateAdminSlice.reducer;
