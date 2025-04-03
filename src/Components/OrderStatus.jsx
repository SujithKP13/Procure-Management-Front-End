import React, { useEffect, useState } from 'react';
import './OrderStatus.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteOrder, getAllOrders } from '../Services/allApis';
import { toast,ToastContainer } from 'react-toastify';

function OrderStatus() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const result = await getAllOrders();
      //console.log("Placed Orders:", result);
      setOrders(result.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again later.");
    }
  };

  // Remove an order from the list
  const removeOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        // Find the deleted order before removing
        const deletedOrder = orders.find(order => order.id === id);

        // Optimistically update UI before calling API
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));

        // Call API to delete the order
        const results = await deleteOrder(id);
        //console.log("Order deleted:", results);

        if (results.status === 200) {
          toast.success(`Order ${deletedOrder?.orderId} is deleted successfully`);
        } else {
          toast.error('Failed to delete Order');
          fetchOrders(); // Re-fetch in case of failure
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Something went wrong. Please try again.");
        fetchOrders(); // Re-fetch in case of failure
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="nav4 justify-content-between p-2">
        <Navbar.Brand href="/siteEngDashboard">
          <img
            alt="Order Icon"
            src="https://cdn-icons-png.flaticon.com/128/1797/1797410.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Order Details
        </Navbar.Brand>
        <Nav className="nav4">
          <Nav.Link href="/siteEngDashboard">Close</Nav.Link>
        </Nav>
      </Navbar>

      {/* Page Heading */}
      <div className='heading mt-5 d-flex justify-content-between'>
        <h2>Order Status</h2>
        <Link to='/siteEngDashboard' style={{ textDecoration: 'none', color: 'black' }}>
          <i className="fa-solid fa-arrow-left me-3"></i>Back To Home
        </Link>
      </div>

      {/* Orders Table */}
      <div className='order-status'>
        <div className="col-md-6 table-container">
          <h3>RECENT ORDERS</h3>
          <table className="order-table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ORDER ID</th>
                <th scope="col">PROJECT ID</th>
                <th scope="col">ITEMS</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">DUE DATE</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orderId}</td>
                    <td>{item.projectId}</td>
                    <td>{item.items.map(i => i.item).join(", ")}</td>
                    <td>{item.items.map(i => i.quantity).join(", ")}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      <Button variant='danger' onClick={() => removeOrder(item.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className='text-danger fs-bolder text-center'>
                    NO ORDERS FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  );
}

export default OrderStatus;
