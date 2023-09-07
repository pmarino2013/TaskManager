import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import NewUserModal from "./NewUserModal"; // Importa el componente NewUserModal

const AdminNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Nav.Item className="mr-5">
        <Button
          variant="primary d-flex"
          className="new-task-button my-3"
          onClick={openModal}
        >
          New User
        </Button>
      </Nav.Item>

      <NewUserModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default AdminNavbar;