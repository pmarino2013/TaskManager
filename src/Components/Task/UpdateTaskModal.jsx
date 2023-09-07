import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { updateTask,getByUser } from '../../redux/Action/TaskAction';
import {
  updateTitulo,
  updateDescripcion,
  updateFecha,
  updatePrioridad,
  updateDone,
  updatePending,
  setNewStatus, // Importa setNewStatus
  setShowModal,
} from '../../redux/Reducers/FormSlice';

import '../Task/css/ModalUpdate.css';

const UpdateTaskModal = ({ show, onHide, task }) => {
  const dispatch = useDispatch();

  // Utiliza useSelector para acceder al estado global
  const newTitle = useSelector((state) => state.form.titulo);
  const newDescription = useSelector((state) => state.form.descripcion);
  const newDate = useSelector((state) => state.form.fecha);
  const newPriority = useSelector((state) => state.form.prioridad);
  const newStatus = useSelector((state) => state.form.newStatus); // Utiliza newStatus

  const userToken = sessionStorage.getItem('userToken');

  const handleUpdate = async () => {
    const updatedTask = {
      Titulo: newTitle,
      Contenido: newDescription,
      Fecha: new Date(newDate).toISOString(),
      Prioridad: newPriority,
      done: newStatus === 'done',
      pending: newStatus === 'pending',
    };

    try {
      await dispatch(updateTask({ taskId: task._id, updatedTask, token: userToken }));
      handleCloseModal(); 
       dispatch(getByUser());// Cierra el modal después de guardar la tarea
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(false)); // Oculta el modal utilizando el estado global
    onHide(); // Llama directamente a onHide sin desestructurar
  };

  useEffect(() => {
    // Carga los valores iniciales desde la tarea existente en el estado global
    dispatch(updateTitulo(task.Titulo));
    dispatch(updateDescripcion(task.Contenido));
    dispatch(updateFecha(task.Fecha?.substr(0, 10)));
    dispatch(updatePrioridad(task.Prioridad));
    dispatch(updateDone(task.done));
    dispatch(updatePending(task.pending));
    dispatch(setNewStatus(task.done ? 'done' : 'pending')); // Actualiza newStatus
  }, [dispatch, onHide, task]);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= 50) {
      dispatch(updateDescripcion(newDescription));
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title text-center">Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12">
              <form className="">
                <div className="form-group">
                  <label htmlFor="newTitle" className="backupdate w-100">
                   <p className='mx-2 my-1'>Title</p>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newTitle"
                    value={newTitle}
                    onChange={(e) => dispatch(updateTitulo(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newDescription" className="backupdate w-100">
                   <p className='mx-2 my-1'>  Description (max. 50 characters) </p>
                  </label>
                  <textarea
                    className="form-control"
                    id="newDescription"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                  />
                  {newDescription && (
                    <div className="text-light mt-2">
                      {newDescription.length} / 50 characters
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="newDate" className="backupdate w-100">
                  <p className='mx-2 my-1'>  Date </p>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="newDate"
                    value={newDate}
                    onChange={(e) => dispatch(updateFecha(e.target.value))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPriority" className="backupdate w-100">
                   <p className='mx-2 my-1'> Priority </p>
                  </label>
                  <select
                    className="form-control"
                    id="newPriority"
                    value={newPriority}
                    onChange={(e) => dispatch(updatePrioridad(e.target.value))}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="d-flex form-check status-container">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="new-status-done"
                    value="done"
                    checked={newStatus === 'done'}
                    onChange={() => dispatch(setNewStatus('done'))}
                  />
                  <label className="form-check-label" htmlFor="new-status-done">
                    Done
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="new-status-pending"
                    value="pending"
                    checked={newStatus === 'pending'}
                    onChange={() => dispatch(setNewStatus('pending'))}
                  />
                  <label className="form-check-label" htmlFor="new-status-pending">
                    Pending
                  </label>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <button className="btn btn-primary text-light" onClick={handleUpdate}>
            Save
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default UpdateTaskModal;