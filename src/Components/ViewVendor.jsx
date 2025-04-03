import React, { useState } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { deleteVendor } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

function ViewVendor( {displayItem,setDeleteItemStatus }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = async () => {
    setShow(true);
    //console.log("Item Details: ", displayItem);
  };

  const handleClose = () => setShow(false);

  const removeItem = async (id) => {
    //alert(id);
    const resp = await deleteVendor(id);
    if(resp.status === 200){
      setDeleteItemStatus( resp );
      toast.success(`${displayItem.vendorName} is deleted successfully`);
    }
  };

  const editItems = async (id) => {
    console.log("ID: ",id);
    if (!id){
      toast.error ("Invalid Vendor ID");
      return;
    } else{
      //alert(`Edit Vendor ID: ${id}`);
      navigate(`/update/${id}`); 
    }
  };


  return (
    <>
      <Card style={{ width: '18rem', height: '10.5rem' , marginBottom: '10px' }}>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Vender Name: {displayItem.vendorName}</Card.Subtitle>
            <Card.Title onClick={handleShow}>Product Name: {displayItem.productName}</Card.Title>
        </Card.Body>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
            <Button variant="danger" onClick={ () => removeItem( displayItem.id) }>
              Remove
            </Button>
            <Button variant="primary" onClick={ () => editItems(displayItem.id)} >Edit</Button>
          </div>
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

export default ViewVendor