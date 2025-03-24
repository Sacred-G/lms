import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Custom Link component that looks like a Button
  const ButtonLink = ({ to, variant, size, className, children }: { 
    to: string; 
    variant: string; 
    size?: string; 
    className?: string; 
    children: React.ReactNode 
  }) => (
    <Link 
      to={to} 
      className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className || ''}`}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );

  return (
    <Container>
      {/* Hero Section */}
      <Row className="py-5">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold">Centered Support Service Training</h1>
          <p className="lead my-4">
            A comprehensive learning management system for support staff working with
            individuals with developmental disabilities.
          </p>
          {isAuthenticated ? (
            <div>
              <ButtonLink to="/dashboard" variant="primary" size="lg" className="me-3">
                Go to Dashboard
              </ButtonLink>
            </div>
          ) : (
            <div>
              <ButtonLink to="/login" variant="primary" size="lg" className="me-3">
                Login
              </ButtonLink>
              <ButtonLink to="/register" variant="outline-primary" size="lg">
                Register
              </ButtonLink>
            </div>
          )}
        </Col>
        <Col md={6}>
          <div 
            className="rounded shadow overflow-hidden"
            style={{ height: '100%', minHeight: '300px' }}
          >
            <div 
              className="w-100 h-100" 
              style={{ 
                backgroundImage: 'url(/dashboardpic.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} 
              role="img"
              aria-label="Support staff helping a person with disability"
            />
          </div>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="py-5">
        <Col xs={12} className="text-center mb-4">
          <h2 className="fw-bold">Training Modules</h2>
          <p className="lead">
            Our comprehensive training program covers all essential aspects of support work
          </p>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Introduction to the Role</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Learn about your role as a support staff member and the impact you can make.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Understanding Client Needs</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Develop skills to identify and respond to individual needs and preferences.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--secondary-color), var(--accent-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Key Responsibilities</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Learn about the essential duties and responsibilities in your role.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Communication Skills</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Develop effective communication skills and professional behavior.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--primary-dark), var(--secondary-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Infection Control</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Learn essential infection control and hygiene practices to ensure health and safety.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--secondary-color), var(--primary-dark))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Emergency Procedures</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Learn how to respond effectively to emergencies and manage crisis situations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">6 Rights of Medication Administration</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Master the essential principles for safe and effective medication administration.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="course-card h-100 shadow">
            <div 
              className="card-img-top d-flex align-items-center justify-content-center text-white"
              style={{
                background: `linear-gradient(135deg, var(--primary-dark), var(--accent-color))`,
                height: '120px'
              }}
            >
              <h4 className="m-0 p-3 text-center">Client Rights</h4>
            </div>
            <Card.Body>
              <Card.Text>
                Understand and uphold the fundamental rights and dignity of clients in your care.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Learning Features */}
      <Row className="py-5 my-4">
        <Col xs={12} className="text-center mb-5">
          <h2 className="fw-bold">Comprehensive Learning Experience</h2>
          <p className="lead">
            Each module includes multiple learning formats to enhance understanding
          </p>
        </Col>

        <Col md={3} className="text-center mb-4">
          <div 
            className="feature-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
            </svg>
          </div>
          <h4 className="fw-bold">Video Lessons</h4>
          <p className="text-muted">
            Watch instructional videos demonstrating key concepts and practices
          </p>
        </Col>

        <Col md={3} className="text-center mb-4">
          <div 
            className="feature-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
              <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
            </svg>
          </div>
          <h4 className="fw-bold">Text Content</h4>
          <p className="text-muted">
            Read detailed information and explanations of important topics
          </p>
        </Col>

        <Col md={3} className="text-center mb-4">
          <div 
            className="feature-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
            </svg>
          </div>
          <h4 className="fw-bold">Audio Clips</h4>
          <p className="text-muted">
            Listen to audio content for flexible learning on the go
          </p>
        </Col>

        <Col md={3} className="text-center mb-4">
          <div 
            className="feature-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--primary-dark), var(--secondary-color))',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <h4 className="fw-bold">Assessments</h4>
          <p className="text-muted">
            Test your knowledge with quizzes to ensure understanding
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
