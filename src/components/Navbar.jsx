import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import '../styles/Navbar.css';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ cartCount = 0, onCartClick }) {
  const location = useLocation();
  const active = navLinks.find(link => link.href === location.pathname)?.name || '';

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="navbar-logo" />
          Brew Haven Café
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link
                  className={`nav-link${active === link.name ? ' active' : ''}`}
                  to={link.href}
                  tabIndex={0}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <button
                className="nav-link position-relative btn"
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={onCartClick}
                aria-label="Open cart"
              >
                <span className="me-1">
                  <i className="bi bi-cart2"></i> Cart
                </span>
                <span className="badge rounded-pill">
                  {cartCount}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}