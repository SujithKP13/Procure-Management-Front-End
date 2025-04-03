import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <Navbar className="nav6 bg-dark p-2">
        <Container>
          <Navbar.Brand >
          <Link to={'/home'} style={{textDecoration:'none', color:'white'}}>
            <i class="fa-brands fa-teamspeak text-warning fa-beat-fade"></i>
            <span style={{color:'white', fontWeight:'600'}} >  PROCURE MANAGEMENT</span>
          </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>

    </>
  )
}

export default Header