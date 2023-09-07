import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, setUser } from '../Action/UserAction';

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null, userName: sessionStorage.getItem("userName") || null },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
        };
        
        state.token = action.payload.token;
        console.log("Usuario autenticado con éxito", action.payload.name);
      })
      .addCase(loginUser.pending, (state, action) => {
        // Aquí podrías realizar algún tipo de acción mientras la solicitud esté en espera
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Aquí podrías manejar el caso en que la solicitud ha sido rechazada
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.userName = null;
      });
  },
});

export default userSlice.reducer;