import React from 'react';
import './Home.css';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Home() {
  return (
    <>
      {/* Welcome Section */}
      <div className="welcome-container">
        <div className="content-wrapper">
          <h3 className="textStyle">
            Welcome To <span className="text-warning">PROCURE MANAGEMENT</span>
          </h3>
          <p className="textStyle mt-4">
            Procurement Management is the strategic process of acquiring goods, services,
            and works from external sources to meet an organization’s needs. It involves planning, sourcing, selecting suppliers, 
            negotiating contracts, and managing supplier relationships to ensure cost-effectiveness, quality, and timely delivery.
          </p>
          <Link to={'/login'}>
            <button className="btn btn-warning mt-3">
              LOGIN <i className="fa-solid fa-arrow-right ms-2"></i>
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className='features-container'>
        <h3 className='textStyle'>FEATURES</h3>
        <div className='features-wrapper'>
          {[
            {
              title: "Vendor Management",
              text: "Vendor management is a crucial aspect of supply chain and procurement processes.",
              img: "https://cdn-icons-png.freepik.com/256/3690/3690650.png"
            },
            {
              title: "Order Management",
              text: "Order management is the process of managing orders from the point of receipt to the point of delivery.",
              img: "https://cdn-icons-png.freepik.com/256/11000/11000549.png"
            },
            {
              title: "Inventory Management",
              text: "Inventory management is the process of managing inventory levels, tracking inventory movement, and optimizing inventory storage.",
              img: "https://cdn-icons-png.freepik.com/256/2825/2825813.png"
            }
          ].map((feature, index) => (
            <Card key={index} className="feature-card">
              <Card.Img variant="top" src={feature.img} className="feature-img" />
              <Card.Body>
                <Card.Title className="title">{feature.title}</Card.Title>
                <Card.Text>{feature.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <Container className='content-container mt-5 mb-5 border border-2 p-5 border-secondary rounded'>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className='textStyle'> CONTENTS </h3>
              {[
                { title: "VENDOR MANAGEMENT", text: "Manage your vendors with ease, track their performance, and optimize your supply chain." },
                { title: "ORDER MANAGEMENT", text: "Streamline your order process, automate tasks, and improve customer satisfaction." },
                { title: "INVENTORY MANAGEMENT", text: "Optimize your inventory levels, reduce waste, and improve your bottom line." }
              ].map((content, index) => (
                <p key={index} className='textStyle'>
                  <span className='fs-5 fw-bolder'>{content.title}: </span> {content.text}
                </p>
              ))}
            </Col>
            <Col md={6} className="text-center">
              <img className='simp-image img-fluid' src="https://cdn-icons-png.freepik.com/256/12244/12244962.png" alt="Procurement Illustration" />
            </Col>
          </Row>
        </Container>
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

export default Home;
