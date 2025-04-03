import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-dark p-1">
        <div className="container-fluid d-flex flex-wrap justify-content-evenly">
          {/* Overview Section */}
          <div className="overview" style={{ maxWidth: '400px' }}>
            <h5>
              <i className="fa-brands fa-teamspeak text-warning fa-beat-fade"></i>
              <span style={{ color: 'white', fontWeight: '700' }}> Procure Management </span>
            </h5>
            <p style={{ color: 'white', textAlign: 'justify' }}>
              Procure Management is a web application that helps users manage their procurement process. 
              It allows users to create and manage purchase orders, track inventory, and monitor procurement costs.
            </p>
          </div>

          {/* Functions Section */}
          <div className="functions d-flex flex-column text-white">
            <h4>FUNCTIONS</h4>
            <ul className="list-unstyled">
              <li>Vendor Registration</li>
              <li>Order Management</li>
              <li>Inventory Management</li>
            </ul>
          </div>

          {/* Guides Section */}
          <div className="guides d-flex flex-column text-white">
            <h4>GUIDES</h4>
            <ul className="list-unstyled">
              <li>REACT</li>
              <li>REACT BOOTSTRAP</li>
              <li>FONT AWESOME</li>
              <li>JSON SERVER</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="contact_us text-white">
            <h4>CONTACT US</h4>
            <div className="d-flex">
              <input type="email" placeholder="Enter Your Email" className="form-control" />
              <button className="btn btn-warning ms-3">SUBSCRIBE</button>
            </div>
            <div className="d-flex justify-content-evenly align-items-center mt-3">
              <i className="fa-brands fa-instagram fa-2x"></i>
              <i className="fa-brands fa-twitter fa-2x"></i>
              <i className="fa-brands fa-whatsapp fa-2x"></i>
              <i className="fa-brands fa-facebook fa-2x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright Text */}
      <p className="footer-text mt-2 text-center text-gray">
        Copyright &copy; 2025 Procure Management, Built with React
      </p>
    </>
  );
}

export default Footer;
