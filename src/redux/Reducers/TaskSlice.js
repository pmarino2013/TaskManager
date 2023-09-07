import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
  getByUser,
  searchTasks,
  updateSearchTerm,
  clearSearchTerm,
  setFilterByDate,
  setFilterByPriority,
  setFilterByDone, // Nuevo filtro por estado "done"
  setFilterByPending, // Nuevo filtro por estado "pending"
} from "../Action/TaskAction";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filteredTasks: [],
    searchTerm: "",
    filterByDate: null,
    filterByPriority: null,
    filterByDone: null,
    filterByPending: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getByUser.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.filteredTasks = action.payload;
      })
      .addCase(updateSearchTerm, (state, action) => {
        state.searchTerm = action.payload;
        state.filterByPriority = null;
        state.filterByDate = null;
        state.filterByDone = null;
        state.filterByPending = null;
      })
      .addCase(clearSearchTerm, (state) => {
        state.searchTerm = "";
        state.filterByPriority = null;
        state.filterByDate = null;
        state.filterByDone = null;
        state.filterByPending = null;
      })
      .addCase(setFilterByDate, (state, action) => {
        state.filterByDate = action.payload;
        state.filterByPriority = null;
        state.filterByDone = null;
        state.filterByPending = null;
      })
      .addCase(setFilterByPriority, (state, action) => {
        state.filterByPriority = action.payload;
        state.filterByDate = null;
        state.filterByDone = null;
        state.filterByPending = null;
      })
      .addCase(setFilterByDone, (state, action) => {
        state.filterByDone = action.payload;
        state.filterByPending = null;
        state.filterByPriority = null;
        state.filterByDate = null;
      })
      .addCase(setFilterByPending, (state, action) => {
        state.filterByPending = action.payload;
        state.filterByDone = null;
        state.filterByPriority = null;
        state.filterByDate = null;
      });
  },
});

export default tasksSlice.reducer;
