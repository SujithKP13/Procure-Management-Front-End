import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap';
import './Login.css'
import { getUsers } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.warning('Please fill in all fields');
    }else {
      const response = await getUsers();
      //console.log("Response :",response)
      const users = response.data;
      //console.log ("User Details :",users)
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        switch(user.role) {
          case 'admin':
            toast.success("Login To Admin Is Success");
            navigate('/adminDashboard');
            break;
          case "siteEngineer":
            toast.success("Login To Site Engineer Success");
            navigate('/siteEngDashboard');
            break;
          case "procureEngineer":
            toast.success("Login To Procure Engineer Success");
            navigate('/procureEngDashboard');
            break;
          default:
            toast.error("Unauthorized role");
        }
      } else {
        toast.error("Invalid Email or Password");
      }
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="container justify-content-center">
        <div className="login-container mt-3 align-items-center justify-content-center">
          <h2 className="login-title">Login</h2>
          <Form className="border border-2 p-4 border-secondary rounded shadow" onSubmit={handleLogin}>
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <i className="fa-solid fa-key"></i>
                    </InputGroup.Text>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </InputGroup>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
                <Button variant="primary" type="submit">Login</Button>
            </div>
        </Form>
        </div>
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

export default Login