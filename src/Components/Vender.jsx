import React, {  useState } from 'react'
import './Vendor.css'
import { Button, Form, Row, Col,Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { createVendor } from '../Services/allApis';
import { useNavigate, Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

function Vender() {

    const navigate = useNavigate('');

    const [vendors, setVendors] = useState({
        vendorName: '',
        productName: '',
        price: '',
        phoneNo: '',
        email: '',
        address: ''
    });

    const handleReset = () => {
        setVendors({
            vendorName: '',
            productName: '',
            price: '',
            phoneNo: '',
            email: '',
            address: '',
            isVisible: false
        });
        navigate('/adminDashboard');
    };

    const handleAddVendor = async (e) => {
        e.preventDefault();
        //console.log("Vendor Details: ", vendors);
        const { vendorName, productName, price, phoneNo, email, address } = vendors;
        if (!vendorName || !productName || !price || !phoneNo || !email || !address) {
            toast.warning("All fields must be filled out.");
            return;
        } else {
            const result = await createVendor(vendors);
            const details = result.data;
            //console.log("Newly added Vendors",result);
            if (result.status === 201) {
                setVendors(details);
                //console.log(" Vendor Details :", details);
                toast.success("Vendor Added Successfully");
                navigate('/adminDashboard');
            } else {
                toast.error("Failed to add Vendor");
            }
        }
    }


  return (
    <>
        <Navbar className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/11993/11993362.png"
                width="30"
                height="30"
                className=" d-inline-block align-top"
                />{' '}
                Add New Vendor Details
            </Navbar.Brand>
            <Nav className="nav4">
                <Nav.Link href="/adminDashboard">Close</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    
    <div className="add-vendor">
            <Form className='vendorForm'>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                    <Form.Label column sm="4">
                    Vendor Name :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type='text' placeholder="Enter Vendor Name" onChange={(e) => setVendors({...vendors, vendorName: e.target.value })} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                    <Form.Label column sm="4">
                    Product Name :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type="text" placeholder="Enter Product Name"  onChange={(e) => setVendors({...vendors, productName: e.target.value })} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                    <Form.Label column sm="4">
                    Price :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type="number" placeholder="Enter Price" onChange={(e) => setVendors({...vendors, price: e.target.value })} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                    <Form.Label column sm="4">
                    Phone No :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type="number" placeholder="Enter Phone No" onChange={(e) => setVendors({...vendors, phoneNo: e.target.value })} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="4">
                    Email :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setVendors({...vendors, email: e.target.value })} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                    <Form.Label column sm="4">
                    Address :
                    </Form.Label>
                    <Col sm="20">
                    <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setVendors({...vendors, address: e.target.value })} />
                    </Col>
                </Form.Group>
                <div className=''>
                    <Button variant='secondary' onClick={handleReset} >CLOSE</Button>
                    <Button variant="primary" onClick={handleAddVendor} >SUBMIT</Button>
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

export default Vender