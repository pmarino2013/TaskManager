import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { createTask, getByUser } from '../../redux/Action/TaskAction';
import {
  updateTitulo,
  updateDescripcion,
  updateFecha,
  updatePrioridad,
  updateDone,
  updatePending,
  setShowModal,
} from '../../redux/Reducers/FormSlice';
import '../Task/css/ModalPost.css';

const ModalPost = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('userToken');

  const titulo = useSelector((state) => state.form.titulo);
  const descripcion = useSelector((state) => state.form.descripcion);
  const fecha = useSelector((state) => state.form.fecha);
  const prioridad = useSelector((state) => state.form.prioridad);
  const done = useSelector((state) => state.form.done);
  const pending = useSelector((state) => state.form.pending);

  // Calcular la fecha mínima y máxima permitidas (hoy y 5 años en el futuro, respectivamente)
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 5);

  const obtenerTareas = async () => {
    try {
      if (token) {
        await dispatch(getByUser(token));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const resetForm = () => {
    dispatch(updateTitulo(''));
    dispatch(updateDescripcion(''));
    dispatch(updateFecha(''));
    dispatch(updatePrioridad('Low'));
    dispatch(updateDone(false));
    dispatch(updatePending(true));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      Titulo: titulo,
      Contenido: descripcion,
      Fecha: new Date(fecha).toISOString(),
      Prioridad: prioridad,
      done: done,
      pending: pending,
    };

    try {
      if (!token) {
        console.error('No se encontró el token en el sessionStorage');
        return;
      }
      await dispatch(createTask({ data: newTask, token })).then(() => {
        obtenerTareas().then(() => {
          resetForm();
          closeModal();
        });
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    // Esta función se ejecutará cuando el modal se abra
    resetForm(); // Restablece el estado del formulario cuando se monta el modal
  }, [showModal]); // Dependencia: se ejecuta cuando showModal cambia

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    closeModal();
  };

  const handleDescripcionChange = (e) => {
    const newDescripcion = e.target.value;
    if (newDescripcion.length <= 50) {
      dispatch(updateDescripcion(newDescripcion));
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='bg'>
          <form onSubmit={handleSubmit} className='custom-form responsiveModal'>
            <div className='col-sm-12'>
              <div className='form-group form'>
                <label htmlFor='titulo' className='form-label backupdate'>
                <p className='mx-2 my-1'>Title</p>
                </label>
                <input
                  type='text'
                  id='titulo'
                  className='form-control'
                  value={titulo || ''}
                  onChange={(e) => dispatch(updateTitulo(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='form-group'>
                <label htmlFor='descripcion' className='form-label backupdate'>
                <p className='mx-2 my-1'>  Description (max. 50 characters) </p>
                </label>
                <textarea
                  id='descripcion'
                  className='form-control'
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  required
                  maxLength={50}
                />
                <div className='text-light mt-2'>
                  {descripcion ? `${descripcion.length} / 50 characters` : ''}
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='form-group'>
                <label htmlFor='fecha' className='form-label backupdate'>
                <p className='mx-2 my-1'>  Date </p>
                </label>
                <input
                  type='date'
                  id='fecha'
                  className='form-control'
                  value={fecha}
                  onChange={(e) => dispatch(updateFecha(e.target.value))}
                  required
                  min={today.toISOString().split('T')[0]} // Establece la fecha mínima
                  max={maxDate.toISOString().split('T')[0]} // Establece la fecha máxima
                />
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='form-group'>
                <label htmlFor='prioridad' className='form-label backupdate'>
                <p className='mx-2 my-1'> Priority </p>
                </label>
                <select
                  id='prioridad'
                  className='form-select'
                  value={prioridad}
                  onChange={(e) => dispatch(updatePrioridad(e.target.value))}
                  required
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='form-group'>
                <label className='form-label'>Done:</label>
                <input
                  type='checkbox'
                  checked={done}
                  onChange={() => dispatch(updateDone(!done))}
                  className='mx-3'
                />
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='form-group'>
                <label className='form-label'>Pending:</label>
                <input
                  type='checkbox'
                  checked={pending}
                  onChange={() => dispatch(updatePending(!pending))}
                  className='mx-3'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPost;