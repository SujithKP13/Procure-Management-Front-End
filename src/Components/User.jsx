import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './User.css'
import { Button, Form, Row, Col,Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { createUser } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

function User() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const clearForm = () => {
        setUser({
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, role } = user;
        if (!email || !password || !confirmPassword || !role) {
            toast.warning("All fields must be filled out.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        try {
            const result = await createUser({ email, password, role });
            if (result.status === 201) {
                toast.success("User Added Successfully");
                navigate('/adminDashboard');
            } else {
                toast.error("Failed to add User");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Error adding user. Please try again.");
        }
    }
  
    return (
        <>
            <Navbar className="nav2">
                <Container className="nav2-container justify-content-center">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="https://cdn-icons-png.flaticon.com/128/166/166260.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Add New Users
                    </Navbar.Brand>
                    <Nav className="nav2">
                        <Nav.Link href="/adminDashboard" >Close</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="UserContainer">
                <Form className="userForm" onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm="4">
                            <i className="fa-solid fa-envelope"></i> Email:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formRole">
                        <Form.Label column sm="4">
                            <i className="fa-solid fa-circle-user"></i> Role:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select name="role" value={user.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="procureEngineer">Procure Engineer</option>
                                <option value="siteEngineer">Site Engineer</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPassword">
                        <Form.Label column sm="4">
                            <i className="fa-solid fa-key"></i> Password:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formConfirmPassword">
                        <Form.Label column sm="4">
                            <i className="fa-solid fa-key"></i> Confirm Password:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {error && <small className="text-danger">{error}</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Check
                            type="checkbox"
                            label="Show Password"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-evenly">
                        <Button variant="outline-danger" onClick={clearForm}>
                            Cancel
                        </Button>
                        <Button variant="outline-success" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
            {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="dark"
      />
        </>
    )
}

export default User
