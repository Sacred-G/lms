import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaSignInAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fw-bold">Centered Support</h5>
            <p className="mb-4 opacity-75">
              A comprehensive learning management system for support staff working with
              individuals with developmental disabilities.
            </p>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3 text-primary" />
              <span>training@centeredsupportservice.org</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaPhone className="me-3 text-primary" />
              <span>(424) 277-9828</span>
            </div>
            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-3 text-primary" />
              <span>15120 Atkinson Ave, Suite 10, Gardena, CA, 90249</span>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fw-bold">Navigation</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/" className="text-decoration-none text-light d-flex align-items-center">
                  <FaHome className="me-2 text-primary" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard" className="text-decoration-none text-light d-flex align-items-center">
                  <FaTachometerAlt className="me-2 text-primary" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-decoration-none text-light d-flex align-items-center">
                  <FaSignInAlt className="me-2 text-primary" />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 fw-bold">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a href="/resources/training" className="text-decoration-none text-light">Training Materials</a>
              </li>
              <li className="mb-3">
                <a href="/resources/best-practices" className="text-decoration-none text-light">Best Practices</a>
              </li>
              <li>
                <a href="/resources/support" className="text-decoration-none text-light">Support Guidelines</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-uppercase mb-4 fw-bold">Newsletter</h5>
            <p className="mb-4 opacity-75">Subscribe to our newsletter to receive updates on new courses and training materials.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 opacity-25" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 opacity-75">
              &copy; {currentYear} Centered Support Service Training. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/privacy-policy" className="text-light me-3">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-light me-3">Terms of Service</Link>
            <Link to="/accessibility" className="text-light">Accessibility</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
