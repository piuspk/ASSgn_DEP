import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import '../pages/All.css'


const Header = () => {
  return (
   <>
    <Navbar style={{ backgroundColor: '#2F4F4F' }} variant="dark" className="fixed-top">
  <Container>
    <Navbar.Brand >DEP ASSIGNMENT</Navbar.Brand>
    {/* <Nav className="">
      <Nav.Link href="/" style={{ color: "white"}}>Home</Nav.Link>
    </Nav> */}
  </Container>
</Navbar>
   </>
  )
}

export default Header