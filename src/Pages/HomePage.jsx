import React from 'react';
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgP from "../img/imagenPrincipal.png";
import ImgFondo from "../img/fondoParaImagenPrincipal.png";
import "./css/Home.css"

const HomePage = () => {
  return (
    <Container >
      <Row className="Home d-flex justify-content-center align-items-center">
        <Col
        data-aos="fade-right"
          lg={6}
          md={6}
          sm={12}
          className=" d-flex flex-column justify-content-center text-light text-center"
        >
          <Col sm={12} className="my-4 d-block text-center violeta">
            <h2 className='Welcome-home'>Welcome to TaskGenius</h2>
          </Col>
          <h1 className="tituloHome">Manage your Tasks in a simple way</h1>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/register">
              <Button className="Button mx-2">
                <strong>Regiter</strong>
              </Button>
            </Link>
            <Link to="/login">
              <Button className="Button mx-2">
                <strong>Log In</strong>
              </Button>
            </Link>
          </div>
        </Col>

        <Col
        data-aos="fade-left"
          lg={6}
          md={6}
          sm={12}
          className=" my-5 d-flex justify-content-center align-items-center" 
        >
          <img src={ImgFondo} alt="Imagen de Fondo" className="img-fondo" />

          <img src={ImgP} alt="Imagen Principal" className="img-principal" />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
