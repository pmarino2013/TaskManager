import React, { useState , useEffect} from "react";
import { useDispatch} from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setUser} from "../redux/Action/UserAction";

import "./css/Login.css"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const user = await dispatch(loginUser({ email, password, role }));
        if (user.token) {
        
          console.log("buscando usuario",user.name)
        }
        const token = user.payload.token; // Obtener el token del usuario logueado
        const userName = user.payload.name; // Obtener el nombre del usuario logueado name=user.payload.token;
          dispatch(setUser(userName)); // Guardar nombre de usuario en el estado global de Redux
        console.log("usuario obtenidooooooo:", user.name);
  
        // Almacenar el token en el sessionStorage
        sessionStorage.setItem('token', token);
 

  
      
        if (user.payload.role === "admin") {
          navigate("/adminPage");
        }
        if (user.payload.role === "user") {
          navigate("/taskPage");
        }
      } catch (error) {
        console.error("Error al loguear:", error);
        setErrorMessage("Incorrect email or password");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }
  };
  useEffect(() => {
    setShowAnimation(false);
  }, []);


  return (
     <div data-aos={showAnimation ? "fade-down" : ""}>
    <Form
  
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="login-form mt-4"
    >
      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label className="text-light d-flex justify-content-center LoginRes">
          {" "}
          <strong>Email</strong>{" "}
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3 ">
        <Form.Label className="text-light d-flex justify-content-center LoginRes">
          <strong>Password</strong>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      {errorMessage && (
        <Form.Text className="text-danger mx-4 d-flex">
          {errorMessage}
        </Form.Text>
      )}
      <Button variant="primary" type="submit" className="my-3 logIn"> 
        <strong>Log In</strong>
      </Button>
      <div className="text-center text-light">
        <p className="mb-0 blanco">Don't have an account yet?</p>
        <Link to="/register" className="logIn my-2">
          <Button className="logIn my-2">
            <strong>Register</strong>
          </Button>
        </Link>
      </div>
    </Form>
    </div>
  );
};

export default LoginForm;