import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/Action/TaskAction';
import Swal from 'sweetalert2';
import 'animate.css/animate.min.css';
import '../Task/css/DeleteTask.css'

const DeleteTask = ({ _id }) => {
  const dispatch = useDispatch();
  
  const userToken = sessionStorage.getItem('userToken'); // Obtener el token

  const handleDeleteTask = () => {
 
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__slow', // Ajusta la velocidad aquí
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__slow',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Dispatching deleteTask action");
        dispatch(deleteTask({ _id, token: userToken })); // Pasar el token
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  };

  return (
    <button className="btn btn-danger button-Delete text-light my-2" onClick={handleDeleteTask}>
      Delete
    </button>
  );
};

export default DeleteTask;
