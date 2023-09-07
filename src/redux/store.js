import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './Reducers/TaskSlice';
import GraficoReducer from './Reducers/GraficoSlice';
import userReducer from './Reducers/UserSlice';
import formReducer from './Reducers/FormSlice'; 
import adminUsersReducer from './Reducers/AdminSlice';
import thunk from 'redux-thunk';
import updateAdminReducer from '../redux/Reducers/UpdateAdminSlice'; // Cambia la ruta a tu archivo UpdateAdminSlice.

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
    form: formReducer, 
    grafico: GraficoReducer,
    adminUsers: adminUsersReducer,
    updateAdmin: updateAdminReducer, // Cambia el nombre aquí para que coincida
  },
  middleware: [thunk],
});

export default store;