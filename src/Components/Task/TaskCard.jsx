import React, { useState } from "react";
import DeleteTask from "./DeleteTask";
import UpdateTaskModal from "./UpdateTaskModal";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "../Task/css/TaskCard.css";

const TaskCard = ({
  id,
  title,
  description,
  date,
  priority,
  done,
  pending,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = async (updatedTask) => {
    setShowUpdateModal(false);
  };

  const adjustedDate = new Date(date);
  adjustedDate.setTime(
    adjustedDate.getTime() + adjustedDate.getTimezoneOffset() * 60 * 1000
  );

  const formattedDate = adjustedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="row custom-task-card" data-aos="zoom-in-right">
      <div className="card-content ">
        <div className="task-card-container ">
          <div className="card-body">
            <span className="label-title ">Title:</span>
            <h5 className="card-title text-light mb-3">{title}</h5>

            <span className="label-Content">Content:</span>
            <p className="card-text text-light mb-3">{description}</p>

            <div className="label-Priority">Priority:</div>
            <div className="card-text text-light mb-2">{priority}</div>

            <div className="label-Date">Date:</div>
            <div className="card-text text-light mb-2">{formattedDate}</div>
            <div className="responsiveTask">
              {done && (
                <div className="state d-flex align-items-center mb-3">
                  <FaCheckCircle className="text-success mr-2 icon-check " />
                  <span className="text-light estado">Task Done</span>
                </div>
              )}

              {pending && (
                <div className="state d-flex align-items-center mb-3">
                  <FaExclamationTriangle className="text-warning mr-2 icon-warning " />
                  <span className="text-light estado">Task Pending</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn btn-primary button-Update"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
            <DeleteTask  className="responsive-boton" _id={id} />
            <UpdateTaskModal className="responsive-boton"
              show={showUpdateModal}
              onHide={() => setShowUpdateModal(false)}
              task={{
                _id: id,
                Titulo: title,
                Contenido: description,
                Fecha: date,
                Prioridad: priority,
                done,
                pending,
              }}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
