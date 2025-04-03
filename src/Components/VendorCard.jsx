import React, { useState } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

function VendorCard( {displayItem }) {
  const [show, setShow] = useState(false);

  const handleShow = async () => {
    setShow(true);
    //console.log("Item Details: ", displayItem);
  };

  const handleClose = () => setShow(false);


  return (
    <>
      <Card style={{ width: '18rem', height: '8rem' , marginBottom: '10px', color: 'whitesmoke', backgroundColor: '#7CAADC' }}>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Vender Name: {displayItem.vendorName}</Card.Subtitle>
            <Card.Title onClick={handleShow}>Product Name: {displayItem.productName}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayItem.vendorName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product Name : {displayItem.productName}
          <br/>
          Price : {displayItem.price}
          <br/>
          Phone No : {displayItem.phoneNo}
          <br/>
          Email : {displayItem.email}
          <br/>
          Address : {displayItem.address}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default VendorCard