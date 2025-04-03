import React, { useEffect, useState } from 'react'
import './Admin.css'
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ViewVendor from '../Components/ViewVendor';
import { useNavigate } from 'react-router-dom';
import { getAllProcessPurchase, getVendors } from '../Services/allApis';

function Admin() {

  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [deleteItemStatus, setDeleteItemStatus] = useState({});

  const getVendor = async () => {
    const response = await getVendors();
    //console.log("Vendor Details :",response);
    const {data} = response;
    setVendor(data);
  }

  // Add Vendors
  const addVendors = async() => {
    navigate('/add-vendors');
  }

  // Add Users
  const addUsers = async() => {
    navigate('/create-user');
  }
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
  
  useEffect(() => {
    getVendor();
    processedOrder();
  },[ deleteItemStatus ])
  //console.log("Vendor Details :",vendor);
  return (
    <>
      <div className="container">
        <aside>
          <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
              <li><a href="#" onClick={addVendors}>Add Vendors</a></li>
              <li><a href="#" onClick={addUsers}>Add Users</a></li>
              <li><a href="/" >Logout</a></li>
            </ul>
          </div>
        </aside>
        <main>
          <div className="content">
            <h1 className="title">Welcome to Admin Panel</h1>
            
            {/* First Row: Cards */}
            <div className="row card-container">
              <div className="col-md-2">
                <Card className='card purchase'>
                  <Card.Body>
                    <Card.Title> Total No of Purchases </Card.Title>
                    <Card.Text>
                      <h3>{orderStatus.length}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            
              <div className="col-md-2">
                <Card className='card vendors'>
                  <Card.Body>
                    <Card.Title> Total No Of Vendors </Card.Title>
                    <Card.Text>
                      <h3>{vendor.length}</h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
            
            {/* Second Row: Tables */}
            <div className='row table p-3'>
              <div className="col-md-6 table-container">
                <h3>Recent Processed Purchases</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Processed Date</th>
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
                        return (
                          <tr key={item.id}>
                            <td>{item.orderId}</td>
                            <td>{item.processDate}</td>
                            <td className={statusClass}>{statusText}</td> {/* Dynamic color */}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-danger text-center fw-bold">NO ORDERS FOUND</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
              <Row>
              {
                vendor.length > 0 ? (
                vendor.map((item => (
                  <Col sm={4} md={4} lg={4} xl={4}>
                    <ViewVendor displayItem ={ item } setDeleteItemStatus = { setDeleteItemStatus } />
                  </Col>
                )))
              ) : (
                <p className="text-center text-danger fw-bold mt-3">No vendors available</p>
              )}
              </Row>
          </div>
        </main>
      </div>
      
    </>
  )
}

export default Admin
