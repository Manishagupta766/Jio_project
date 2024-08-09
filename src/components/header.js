// src/Header.js
import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import logo from '../logo.png'; 
import profile from '../profile.png'; 
import '../index.css'

const Header = () => {
	return (
	  <Navbar bg="primary" variant="dark" expand="lg">
		<Container>
		  <Navbar.Brand href="#home">
			<Image src={logo} width="30" height="30" className="d-inline-block align-top" alt="Logo" />
		  </Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link href="#Dashboard" className="fw-bold">Dashboard</Nav.Link>
			  <Nav.Link href="#Workflow Builder" className="fw-bold underline ">Workflow Builder</Nav.Link>			
			    <Nav.Link href="#Screen Builder" className="fw-bold">Screen Builder</Nav.Link>
			  <Nav.Link href="#APK Builder" className="fw-bold">APK Builder</Nav.Link>
			</Nav>
			<Nav className="ms-auto d-flex align-items-center">
			  <Nav.Link href="#profile" className="ms-3">
				<Image
				  src={profile}
				  roundedCircle
				  style={{ width: '50px', height: '30px' }}
				  alt="Profile"
				/>
			  </Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>
	);
  };
  


export default Header;
