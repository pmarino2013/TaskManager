import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUser } from '../../redux/Action/AdminAction';
import { getUsers } from "../../redux/Action/AdminAction";
import Swal from "sweetalert2";
import '../Admin/Css/UserModal.css'

const NewUserModal = ({ showModal, closeModal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const nameRegex = /^[A-Za-z0-9\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    useEffect(() => {
        // Inicializa AOS una vez que el componente se haya montado
        AOS.init();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

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
            dispatch(getUsers());
            console.log("Usuario creado");
            closeModal();
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Please check your registration details and try again.",
            });
        }
    };

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    data-aos="fade-down"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId="formBasicUsername" className="mb-3">
                        <Form.Label className="text-light d-flex justify-content-start backupdate">
                            <strong className='mx-2 my-1 text-light'>Username</strong>
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
                        <Form.Label className="text-light d-flex justify-content-start backupdate">
                            <strong className='mx-2 my-1 text-light'>Email</strong>
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
                        <Form.Label className="text-light d-flex justify-content-start backupdate">
                            <strong className='mx-2 my-1 text-light'>Password</strong>
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
                        <strong className='mx-2 my-1 text-light'>Create</strong>
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewUserModal;