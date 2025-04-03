import React, { useState,useEffect } from 'react'
import { Button, Col, Form, Modal, Nav, Navbar, Row } from 'react-bootstrap'
import { getAllProcessPurchase } from '../Services/allApis';
import './SiteEng.css'


function SiteEng() {
  const [orderStatus, setOrderStatus] = useState([]);

  const processedOrder = async () => {
    try {
      const response = await getAllProcessPurchase();
      //console.log('Fetched Orders:', response.data);
      setOrderStatus(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect (() => {
    processedOrder();
  },[]);
 
  return (
    <>
        <Navbar bg="dark" variant="dark" className="nav3 justify-content-between p-3">
            <Navbar.Brand href="/siteEngDashboard">
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/6024/6024190.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  />{' '}
                  Site Engineer Dashboard
              </Navbar.Brand>
            <Nav className="nav3">
              <Nav.Link href="/siteEngDashboard">Home</Nav.Link>
              <Nav.Link href="/place-order">New Order</Nav.Link>
              <Nav.Link href="/order-status">Order Details</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
        </Navbar>

      {/* Order Status Table */}
      <div className="main-container">
        <h3>Recent Purchase Requests</h3>
        <table className="processed-table table-striped">
          <thead>
            <tr>
              <th>Request</th>
              <th>Due Date</th>
              <th>Quantity</th>
              <th>Order Processed Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderStatus.length > 0 ? (
              orderStatus.map((item) => {
                // Normalize remarks for case-insensitive matching
                let statusText;
                let statusClass = ""; // For dynamic CSS class
                const remark = item.remarks ? item.remarks.toLowerCase() : "";

                if (remark === "ready to deliver") {
                  statusText = "Delivered";
                  statusClass = "status-delivered";
                } else if (remark === "out of stock") {
                  statusText = "Rejected";
                  statusClass = "status-rejected";
                } else if (remark === "order processing") {
                  statusText = "Pending";
                  statusClass = "status-pending";
                } else {
                  statusText = "Unknown";
                }

                // Ensure quantity is correctly extracted
                const quantity = Array.isArray(item.items)
                  ? item.items.reduce((sum, i) => sum + (i.quantity || 0), 0)
                  : item.quantity;

                return (
                  <tr key={item.id}>
                    <td>{item.orderId}</td>
                    <td>{item.dueDate}</td>
                    <td>{quantity}</td>
                    <td>{item.processDate}</td>
                    <td className={statusClass}>{statusText}</td> {/* Dynamic color */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-danger text-center">NO ORDERS FOUND</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SiteEng