import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Action/UserAction";
import Swal from "sweetalert2"; // Importa SweetAlert

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false); // Estado para validar el formulario
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Expresión regular para validar el nombre (solo letras y espacios)
  const nameRegex = /^[A-Za-z0-9\s]+$/;
  // Expresión regular para validar un email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular para validar una contraseña (alfanumérica, al menos 6 caracteres)
  const passwordRegex = /^[A-Za-z0-9]{6,}$/;

  useEffect(() => {
    // Inicializa AOS una vez que el componente se haya montado
    AOS.init();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validación personalizada para el nombre, email y contraseña
    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Please enter a valid name (only letters and spaces).",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be between 6 and 15 characters and alphanumeric.",
      });
      return;
    }

    try {
      await dispatch(registerUser({ name, email, password }));
      console.log("Usuario creado");
      navigate("/login");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please check your registration details and try again.",
      });

      // Limpiar los campos del formulario
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Form
    data-aos="fade-down"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="login-form mt-4"
    >
      <Form.Group controlId="formBasicUsername" className="mb-3">
        <Form.Label className="text-light d-flex justify-content-center LoginRes">
          {" "}
          <strong>Username</strong>{" "}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="create a new user"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid name (only letters and spaces).
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label className="text-light d-flex justify-content-center LoginRes">
          {" "}
          <strong>Email</strong>{" "}
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Create your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label className="text-light d-flex justify-content-center LoginRes">
          <strong>Password</strong>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="create your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          pattern=".{6,15}"
        />
        <Form.Control.Feedback type="invalid">
          Password must be between 6 and 15 characters and alphanumeric.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3 logIn">
        <strong>Register</strong>
      </Button>
      <div className="text-center text-light">
        <p className="mb-0 blanco"> Do you already have an account</p>
        <Link to="/login" className="logIn my-2">
          <Button className="logIn my-2">
            <strong>Log In</strong>
          </Button>
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;