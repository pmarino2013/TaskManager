import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserTaskList from '../Components/Task/UserTaskList';

const TaskPage = () => {
  const userToken = sessionStorage.getItem('userToken');
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);
  const countdownRef = useRef(4);

  useEffect(() => {
    if (!userToken && !alertShown) {
      const timer = setInterval(() => {
        countdownRef.current -= 1;

        Swal.update({
          html: `You will be redirected to the login page in <b>${countdownRef.current}</b> seconds...`,
        });

        if (countdownRef.current === 0) {
          clearInterval(timer);
          Swal.close();
          setAlertShown(true);
          navigate('/login');
        }
      }, 1000);

      Swal.fire({
        icon: 'warning',
        title: 'Please log in first',
        html: `You will be redirected to the login page in <b>${countdownRef.current}</b> seconds...`,
        showConfirmButton: false,
      });

      return () => clearInterval(timer);
    }
  }, [userToken, alertShown, navigate]);

  if (!userToken && !alertShown) {
    return null;
  }

  return (
    <div>
      <UserTaskList />
    </div>
  );
};

export default TaskPage;