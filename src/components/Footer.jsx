import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--sidebar)', color: 'var(--sidebar-foreground)' }}>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <strong>Brew Haven Café</strong><br />
            123 Roast Street, Beanville<br />
            Open daily: 7:00 AM – 7:00 PM<br />
            <span>
              <i className="bi bi-instagram me-2"></i>
              <i className="bi bi-facebook me-2"></i>
              <i className="bi bi-twitter"></i>
            </span>
          </div>
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <strong>Contact</strong><br />
            hello@brewhaven.cafe<br />
            (555) 012-3456
          </div>
          <div className="col-12 col-md-4">
            <strong>Quick Links</strong><br />
            Home<br />
            Menu<br />
            Catering
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center medium">
            &copy; {new Date().getFullYear()} Brew Haven Café &nbsp;|&nbsp; Credits: Adrian Reynolds &nbsp;|&nbsp; Powered by YSB Academy LLC 
          </div>
        </div>
      </div>
    </footer>
  );
}