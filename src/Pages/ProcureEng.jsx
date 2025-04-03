import React, { useEffect, useState } from 'react';
import './ProcureEng.css'
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getVendors } from '../Services/allApis';
import VendorCard from '../Components/VendorCard';

function ProcureEng() {
  
  const [vendors, setVendors] = useState([]);

  const displayVendor = async () => {
    try {
      const response = await getVendors();
      //console.log('Vendor Details:', response);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    displayVendor();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="nav4 justify-content-between p-2">
        <Navbar.Brand as={Link} to="/procurementEngDashboard">
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/128/9370/9370440.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Procurement Engineer
        </Navbar.Brand>
        <Nav className="nav4">
          <Nav.Link as={Link} to="/procureEngDashboard">Home</Nav.Link>
          <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
          <Nav.Link as={Link} to="/">Logout</Nav.Link>
        </Nav>
      </Navbar>

      {/* Vendor Details Section */}
      <div className="vendorHeading mt-5 ">
        <h2>Vendor Details</h2>
      </div>

      {/* Vendor Cards */}
      <div className="vendor-card mt-2 p-3">
        <Row>
          {vendors.length > 0 ? (
            vendors.map((item, index) => (
              <Col key={index} sm={4} md={4} lg={4} xl={4}>
                <VendorCard displayItem={item} />
              </Col>
            ))
          ) : (
            <p className="text-center text-danger fw-bold mt-3">No vendors available</p>
          )}
        </Row>
      </div>
    </>
  );
}

export default ProcureEng;
