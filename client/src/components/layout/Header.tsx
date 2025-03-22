import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaTachometerAlt, FaUserCog } from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Custom Link component that looks like Nav.Link
  const NavLink = ({ to, children, icon }: { to: string; children: React.ReactNode; icon?: React.ReactNode }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={`nav-link d-flex align-items-center ${isActive ? 'active' : ''}`}
        style={{ 
          color: isActive ? 'white' : 'rgba(255,255,255,.8)', 
          textDecoration: 'none',
          fontWeight: isActive ? '600' : '400',
          position: 'relative',
          padding: '0.5rem 1rem',
          transition: 'all 0.3s ease'
        }}
      >
        {icon && <span className="me-2">{icon}</span>}
        {children}
        {isActive && (
          <span 
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              height: '3px',
              width: '30px',
              backgroundColor: 'white',
              borderRadius: '3px'
            }}
          />
        )}
      </Link>
    );
  };

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      className="py-3 shadow-sm sticky-top navbar-custom"
    >
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fw-bold">Centered Support</span>
          <span className="ms-2 d-none d-sm-inline">Service Training</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" icon={<FaHome />}>
              Home
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" icon={<FaTachometerAlt />}>
                  Dashboard
                </NavLink>
                {user?.role === 'admin' && (
                  <NavLink to="/admin" icon={<FaUserCog />}>
                    Admin Panel
                  </NavLink>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center text-white">
                  <div className="me-2 rounded-circle bg-white text-primary d-flex align-items-center justify-content-center" 
                       style={{ width: '32px', height: '32px', fontWeight: 'bold' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-md-inline">{user?.name}</span>
                  <span className="ms-2 badge bg-light text-primary d-none d-md-inline">
                    {user?.role}
                  </span>
                </div>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex">
                <Link 
                  to="/login" 
                  className="btn btn-outline-light me-2"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-light text-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
