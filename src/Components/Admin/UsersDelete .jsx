import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/Action/AdminAction';
import Swal from 'sweetalert2';

const UsersDelete = ({ userId }) => {
  const dispatch = useDispatch();
  
  const userToken = sessionStorage.getItem('userToken');

  const handleDeleteUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ _id: userId, token: userToken }));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  };

  return (
    <button className="btn btn-danger" onClick={handleDeleteUser}>
      Delete
    </button>
  );
};

export default UsersDelete;