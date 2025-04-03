import React, { useEffect, useState } from 'react'
import './Update.css'
import { Button, Form, Row, Col, Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { updateVendor } from '../Services/allApis';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { serverUrl } from '../Services/serverApi';
import { toast,ToastContainer } from 'react-toastify';

function Update() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [originalVendor, setOriginalVendor] = useState({});

    const [editVendor, setEditVendor] = useState({
        price: '',
        phoneNo: '',
        email: '',
        address: ''});

    useEffect(() => {
        if (id) {
            fetch(`${serverUrl}/vendors/${id}`)
                .then(response => response.json())
                .then(data => {
                    setOriginalVendor(data);
                    setEditVendor(data);
                })
                .catch(error => console.error("Error fetching vendor:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setEditVendor({ ...editVendor, [e.target.name]: e.target.value });
    };

    const saveEdit = async () => {
        if (!id) {
            toast.warning("No vendor selected for editing.");
            return;
        }
        try {
            const updatedVendor = { ...originalVendor, ...editVendor };
            await updateVendor(id, updatedVendor);
            //console.log("Updated Vendor Details: ", updatedVendor);
            toast.success("Vendor updated successfully");
            navigate('/adminDashboard'); // Redirect after saving
        } catch (error) {
            console.error("Failed to update vendor", error);
        }
    };

    const clearForm = () => {
        setEditVendor({ price: '', phoneNo: '', email: '', address: '' });
    };

  return (
    <>
      <Navbar className="nav1">
            <Container className="nav1-container justify-content-center">
            <Navbar.Brand href="#home">
                <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/1160/1160515.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Update Vendor Details
            </Navbar.Brand>
            <Nav className="nav3">
                <Nav.Link href="/adminDashboard" >Close</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    
    <div className="update-vendor">
        <Form className='vendorForm'>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Form.Label column sm="4">
                Price :
              </Form.Label>
              <Col sm="20">
                <Form.Control 
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    value={editVendor.price}
                    onChange={handleChange}/>          
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="4">
                Phone No :
                </Form.Label>
                <Col sm="20">
                <Form.Control
                    type="number"
                    placeholder="Enter Phone No"
                    name="phoneNo"
                    value={editVendor.phoneNo}
                    onChange={handleChange}/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="4">
                Email :
                </Form.Label>
                <Col sm="20">
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={editVendor.email}
                    onChange={handleChange}/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="4">
                Address :
                </Form.Label>
                <Col sm="20">
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={editVendor.address}
                    onChange={handleChange}/>
                </Col>
            </Form.Group>
            <div className=''>
                <Button variant="outline-danger" onClick={clearForm}>
                Cancel
                </Button>
                <Button variant="outline-success" onClick={saveEdit}>
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

export default Update