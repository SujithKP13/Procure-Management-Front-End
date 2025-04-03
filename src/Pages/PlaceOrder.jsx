import React from 'react';
import './PlaceOrder.css';
import { createOrder } from '../Services/allApis';
import { useState } from 'react';
import { Button, Col, Form, Nav, Navbar, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {

  const navigate = useNavigate();

  const [orderId, setOrderId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [orderProcessedDate, setOrderProcessedDate] = useState('');

  const addItem = () => {
    if (itemInput && quantityInput) {
      setItems([...items, { item: itemInput, quantity: quantityInput }]);
      setItemInput('');
      setQuantityInput('');
    }
  };

  const handleReset = () => {
    setOrderId('');
    setProjectId('');
    setItems([]);
    setItemInput('');
    setQuantityInput('');
    setDueDate('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId ||!projectId || !items.length || !dueDate) {
      toast.warning('Please fill all the fields');
      return;
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();
    const timeValue = year+'-'+0+month+'-'+day;
    console.log(timeValue)
    setOrderProcessedDate(timeValue);
    const result = {
      orderId,
      projectId,
      items,
      dueDate,
      orderProcessedDate : timeValue
    };
    await createOrder( result );
    //console.log("Order Created", result);
    toast.success('Order Created Successfully');
    navigate('/siteEngDashboard')
  };

  return (
    <>
        <Navbar bg="dark" variant="dark" className="nav5 justify-content-between p-3">
            <Navbar.Brand href="/siteEngDashboard">
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/4357/4357420.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  />{' '}
                  User Requirements
              </Navbar.Brand>
            <Nav className="nav5">
              <Nav.Link href="/siteEngDashboard">Close</Nav.Link>
            </Nav>
        </Navbar>

        <div className="order-req">
            <h1 className="heading">Create Order</h1>
          <Form className='order-form'>
            {/* Order ID */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="10">
                  Order Id :
                </Form.Label>
                <Col sm="20">
                  <Form.Control
                    type="text"
                    placeholder="Enter Order Id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </Col>
              </Form.Group>
            {/* Project ID */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="10">
                  Project Id :
                </Form.Label>
                <Col sm="20">
                  <Form.Control
                    type="text"
                    placeholder="Enter Project Id"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                  />
                </Col>
              </Form.Group>

              {/* Items Needed */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="10">
                  Items Needed :
                </Form.Label>
                <Col sm="14">
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    value={itemInput}
                    onChange={(e) => setItemInput(e.target.value)}
                  />
                </Col>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(e.target.value)}
                  />
                </Col>
                <Col sm="12">
                  <Button variant="secondary" onClick={addItem}>
                    Add Item
                  </Button>
                </Col>
              </Form.Group>

              {/* Display Added Items */}
              {items.length > 0 && (
                <ul>
                  {items.map(({ item, quantity }, index) => (
                    <li key={index}>
                      {item} - Quantity: {quantity}
                    </li>
                  ))}
                </ul>
              )}

              {/* Due Date */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="10">
                  Due Date :
                </Form.Label>
                <Col sm="20">
                  <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <div className='d-flex justify-content-center'>
                <Button variant='outline-secondary' onClick={handleReset} >RESET</Button>
                <Button variant="outline-success" onClick={handleSubmit} >SUBMIT</Button>
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

export default PlaceOrder