import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUtensils, FaShoppingCart, FaHeart, FaSearch, FaEnvelope } from "react-icons/fa";
import "./Navbar.css";

const NavbarComponent = () => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };

    // Initial load
    updateCartCount();

    // Listen for scroll
    window.addEventListener("scroll", handleScroll);

    // Listen for cart updates (same tab)
    window.addEventListener("cartUpdated", updateCartCount);

    // Listen for storage changes (other tabs)
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") updateCartCount();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${navbarScrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <FaUtensils className="brand-icon" />
          Manuel's Kitchen
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>

            {/* CONTACT LINK ADDED */}
            <Nav.Link as={Link} to="/contact" title="Contact Us">
              <FaEnvelope /> Contact
            </Nav.Link>

            <Nav.Link as={Link} to="/search" title="Search">
              <FaSearch />
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" title="Favorites">
              <FaHeart />
            </Nav.Link>

            {/* CART WITH LIVE BADGE */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative"
              title="Cart"
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* ACCOUNT DROPDOWN */}
            {token ? (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;