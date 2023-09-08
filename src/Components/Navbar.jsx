import React, { useEffect, useState } from "react";
import { Nav, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import { logoutUser } from "../redux/Action/UserAction";
import ModalPost from "./Task/ModalPost";
import AdminNavbar from "../Components/Admin/AdminNavbar";

import "../Components/Task/css/Nav.css";

const Navbar = () => {
  const userToken = sessionStorage.getItem("userToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/adminPage";

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const userName = sessionStorage.getItem("userName");

  useEffect(() => {
    // Este useEffect se ejecutará cada vez que userName cambie en el sessionStorage
    // Puedes realizar acciones relacionadas con el cambio del nombre de usuario aquí
    console.log("UserName updated:", userName);
  }, [userName]); // Asegúrate de incluir userName como una dependencia

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };

  return (
    <Nav
      activeKey="/"
      className="fixed-top  nav justify-content-between col-lg-12 col-md-12 col-sm-12"
    >
      <Nav.Item className="mx-5">
        <Row className="d-flex align-items-center">
          <Col xs="12" className="text-center">
            <Link
              className="d-flex align-items-center text-light text-decoration-none my-2"
              to="/"
            >
              <img
                src={Logo}
                alt="TaskGenius Logo"
                height="50"
                className="mr-3"
              />
              <h1 className="text-light Nav-title m-0">TaskGenius</h1>
            </Link>
          </Col>
        </Row>
      </Nav.Item>

      {userToken && !isHomePage && (
        <Nav.Item className="mx-auto">
          <h1 className="text-light my-3 Nav-title">
            Welcome {capitalizeFirstLetter(userName)}
          </h1>
        </Nav.Item>
      )}

      {userToken && !isHomePage && (
        <Nav.Item className="mr-5 d-flex">
          <Button
            variant="danger"
            className="logout-button my-3 mr-2"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {isAdminPage ? (
            <AdminNavbar />
          ) : (
            <Button
              variant="primary"
              className="new-task-button my-3"
              onClick={openModal}
            >
              New Task
            </Button>
          )}

          <ModalPost showModal={showModal} closeModal={closeModal} />
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
