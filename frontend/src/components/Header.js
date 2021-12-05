import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import './Header.css';
export default function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand to="/">User management system</Navbar.Brand>
        <Nav className="right">
          <Link to="/" className="link">Home</Link>
          <Link to="/add" className="link">Add User</Link>
          <Link to="/about" className="link">About</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
