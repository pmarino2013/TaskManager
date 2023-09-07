import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getByUser,
  updateSearchTerm,
  searchTasks,
  clearSearchTerm,
  setFilterByDone,
  setFilterByPending,
} from "../../redux/Action/TaskAction";
import TaskCard from "./TaskCard";
import Grafico from "./Grafico";
import "../Task/css/UserTask.css";

const UserTaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const filterByDone = useSelector((state) => state.tasks.filterByDone);
  const filterByPending = useSelector((state) => state.tasks.filterByPending);

  useEffect(() => {
    dispatch(getByUser());
  }, [dispatch]);

  const tasksToDisplay = tasks.filter((task) => {
    if (!task.Titulo) {
      return false;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerTitle = task.Titulo.toLowerCase();
    const lowerDate = task.Fecha.toLowerCase();
    const lowerPriority = task.Prioridad.toLowerCase();

    if (filterByDone && !task.done) {
      return false;
    }

    if (filterByPending && !task.pending) {
      return false;
    }

    if (!filterByDone && !filterByPending) {
      return (
        lowerTitle.includes(lowerSearchTerm) ||
        lowerDate.includes(lowerSearchTerm) ||
        lowerPriority.includes(lowerSearchTerm)
      );
    }

    return true;
  });

  const handleSearchChange = (e) => {
    const updatedTerm = e.target.value.trim();
    dispatch(updateSearchTerm(updatedTerm));
    dispatch(searchTasks(updatedTerm));
  };

  const handleClearSearch = () => {
    dispatch(clearSearchTerm());
  };

  const handleFilterByDone = () => {
    dispatch(setFilterByDone(!filterByDone));
  };

  const handleFilterByPending = () => {
    dispatch(setFilterByPending(!filterByPending));
  };

  const isClearButtonDisabled = searchTerm === "";

  return (
    <>
      {tasks.length === 0 && (
        <div className="row">
          <h3 className="no-tasks-message1">Welcome to Task Genius</h3>
          <h3 className="no-tasks-message">Start a new task</h3>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-6">
            <div className="user-task-list-container container">
              <div className="row">
                {tasksToDisplay.length > 0 && (
                  <h1 className="text-center text-List">Task List</h1>
                )}

                <div className="search-bar-container">
                  <input
                    className="Search-Bar"
                    type="text"
                    placeholder="Search Task..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="clear-button"
                    onClick={handleClearSearch}
                    disabled={isClearButtonDisabled}
                  >
                    Clear
                  </button>
                </div>

                <div
                  className="btn-group d-flex justify-content-between"
                  style={{ margin: "10px 0" }}
                >
                  <button
                    className={`btn btn-sm btn-secondary  ${
                      filterByDone ? "active" : ""
                    }`}
                    onClick={handleFilterByDone}
                  >
                    Done
                  </button>
                  <span style={{ margin: "0 5px" }}></span>{" "}
             
                  <button
                    className={`btn btn-sm btn-secondary ${
                      filterByPending ? "active" : ""
                    }`}
                    onClick={handleFilterByPending}
                  >
                    Pending
                  </button>
                  <span style={{ margin: "0 5px" }}></span>{" "}
                  
                  <button
                    className={`btn btn-sm btn-secondary  ${
                      filterByPending || filterByDone ? "active" : ""
                    }`}
                    onClick={() => {
                      dispatch(setFilterByPending(null));
                      dispatch(setFilterByDone(null));
                    }}
                  >
                    Clear
                  </button>
                </div>

                {tasksToDisplay.length === 0 && (
                  <h1 className="text-center no-tasks-message3">
                    No tasks found
                  </h1>
                )}

                {tasksToDisplay.map((task) => (
                  <div key={task._id} className="my-2">
                    <TaskCard
                      key={task._id}
                      id={task._id}
                      title={task.Titulo}
                      description={task.Contenido}
                      date={task.Fecha}
                      priority={task.Prioridad}
                      done={task.done}
                      pending={task.pending}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {tasksToDisplay.length > 0 && (
            <div className="col-sm-12 col-md-8 col-lg-6 graficoResponsive">
              <Grafico />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserTaskList;
