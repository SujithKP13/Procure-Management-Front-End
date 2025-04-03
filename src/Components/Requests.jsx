import React, { useEffect, useState } from 'react'; 
import './Requests.css';
import { Navbar, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { createProcessPurchase, getAllOrders } from '../Services/allApis';
import jsPDF from 'jspdf';
import { toast,ToastContainer } from 'react-toastify';

function Requests() {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [purchase, setPurchase] = useState({
    orderId: '',
    quantity: '',
    dueDate: '',
    processDate: '',
    remarks: '',
  });

  const handleClose = () => {
    setShow(false);
    setSelectedOrder(null);
  };

  const handleShow = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order) {
      setSelectedOrder(order);
      setPurchase({
        orderId: order.orderId,
        quantity: order.items.reduce((acc, i) => acc + i.quantity, 0),
        dueDate: order.dueDate,
        processDate: new Date().toISOString().split('T')[0],
      });
      setShow(true);
    }
  };

  const fetchOrders = async () => {
    try {
      const result = await getAllOrders();
      setOrders(result.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await createProcessPurchase(purchase);
      //console.log(response.data);
      toast.success('Purchase Processed Successfully');
      setPurchase({ orderId: '', quantity: '', dueDate: '', processDate: '' });
      setShow(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error processing purchase:", error);
      toast.error('An error occurred while processing the purchase.');
    }
  };

  const handleInvoice = (id) => {
    const order = orders.find((item) => item.id === id);
    if (!order) return;
  
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("Order Invoice", 14, 15);
    
    doc.setFontSize(16);
    doc.text(`ORDER ID: ${order.orderId}`, 14, 30);
    doc.text(`PROJECT ID: ${order.projectId}`, 14, 40);
    doc.text(`ORDER DATE: ${order.orderProcessedDate}`, 14, 50);
    doc.text(`DUE DATE: ${order.dueDate}`, 14, 60);
  
    doc.setFontSize(14);
    doc.text("ITEM DETAILS:", 14, 75);
    
    let yPosition = 85;
    order.items.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. Item: ${item.item}`, 14, yPosition);
      doc.text(`   Quantity: ${item.quantity}`, 14, yPosition + 7);
      yPosition += 15;
    });
  
    doc.save(`Invoice_${order.orderId}.pdf`);
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="nav4 justify-content-between p-2">
        <Navbar.Brand href="/requests">
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/128/1797/1797410.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Order Details
        </Navbar.Brand>
      </Navbar>

      <div className="heading mt-5 d-flex justify-content-between">
        <h2>Order Status</h2>
        <Link to="/procureEngDashboard" style={{ textDecoration: 'none', color: 'black' }}>
          <i className="fa-solid fa-arrow-left me-3"></i>Back To Home
        </Link>
      </div>

      <div className="order-status">
        <div className="col-md-6 table-container">
          <h3>RECENT ORDERS</h3>
          <table className="order-table table-striped table-hover">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>PROJECT ID</th>
                <th>ITEMS</th>
                <th>QUANTITY</th>
                <th>ORDER DATE</th>
                <th>DUE DATE</th>
                <th>ACTION</th>
                <th>INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orderId}</td>
                    <td>{item.projectId}</td>
                    <td>{item.items.map((i) => i.item).join(', ')}</td>
                    <td>{item.items.map((i) => i.quantity).join(', ')}</td>
                    <td>{item.orderProcessedDate}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      <Button variant="success" onClick={() => handleShow(item.id)}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                      </Button>
                    </td>
                    <td>
                      <Button variant="success" onClick={() => handleInvoice(item.id)}>
                        <i class="fa-solid fa-receipt"></i>
                        </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-danger fw-bold text-center">
                    NO ORDERS FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Order Id:</strong> {selectedOrder.orderId}</p>
              <p><strong>Item:</strong> {selectedOrder.items.map((i) => i.item).join(', ')}</p>
              <p><strong>Quantity:</strong> {selectedOrder.items.map((i) => i.quantity).join(', ')}</p>
              <p><strong>Due Date:</strong> {selectedOrder.dueDate}</p>

              <Form onSubmit={handlePurchase} style={{ width: "90%", margin: "0 auto" }}>
                <Row style={{ width: "90%", margin: "0 auto" }}>  {/* 90% width of modal, centered */}
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Order Id:</Form.Label>
                    <Form.Control type="text" value={purchase.orderId || selectedOrder.orderId} disabled />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      value={purchase.quantity}
                      onChange={(e) => setPurchase({ ...purchase, quantity: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Due Date:</Form.Label>
                    <Form.Control type="date" value={purchase.dueDate || selectedOrder.dueDate} disabled />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Remarks:</Form.Label>
                    <Form.Select
                      value={purchase.remarks}
                      onChange={(e) => setPurchase({ ...purchase, remarks: e.target.value })}
                      required
                    >
                      <option value="" disabled selected>Select Remark</option>
                      <option value="Ready to Deliver">Ready to Deliver</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Order Processing">Order Processing</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Button variant="success" type="submit">Process</Button>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
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
  );
}

export default Requests;