import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TermsOfService: React.FC = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Terms of Service</h1>
          
          <p className="lead mb-4">
            Welcome to Centered Support Service Training. These Terms of Service govern your use of our 
            learning management system and website. By accessing or using our services, you agree to be 
            bound by these Terms.
          </p>
          
          <h2 className="h4 mt-5 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Centered Support Service Training platform, you agree to be bound by 
            these Terms of Service and all applicable laws and regulations. If you do not agree with any of 
            these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2 className="h4 mt-5 mb-3">2. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. 
            You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          <p>
            You agree to notify us immediately of any unauthorized use of your account or any other breach of security. 
            We cannot and will not be liable for any loss or damage arising from your failure to comply with this section.
          </p>
          
          <h2 className="h4 mt-5 mb-3">3. Content and Intellectual Property</h2>
          <p>
            All content included on this platform, such as text, graphics, logos, images, audio clips, video, 
            and software, is the property of Centered Support Service Training or its content suppliers and 
            protected by copyright laws.
          </p>
          <p>
            You may access and use the content for your personal and non-commercial use only. You may not modify, 
            copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, 
            transfer, or sell any information or content obtained from our platform.
          </p>
          
          <h2 className="h4 mt-5 mb-3">4. User Conduct</h2>
          <p>
            You agree not to use our platform to:
          </p>
          <ul className="mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe the rights of others</li>
            <li>Interfere with or disrupt the platform or servers</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
            <li>Collect or track personal information of other users</li>
            <li>Spam, phish, or engage in any other deceptive practices</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">5. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services immediately, without prior notice or 
            liability, for any reason, including without limitation if you breach the Terms of Service.
          </p>
          <p>
            Upon termination, your right to use the service will immediately cease. If you wish to terminate your 
            account, you may simply discontinue using the service.
          </p>
          
          <h2 className="h4 mt-5 mb-3">6. Limitation of Liability</h2>
          <p>
            In no event shall Centered Support Service Training, its officers, directors, employees, or agents be 
            liable for any indirect, incidental, special, consequential or punitive damages, including without 
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="mb-4">
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use or alteration of your transmissions or content</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will 
            provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
          </p>
          <p>
            Your continued use of the platform after any such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="h4 mt-5 mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="mb-5">
            <strong>Centered Support Service Training</strong><br />
            15120 Atkinson Ave, Suite 10, Gardena, CA, 90249<br />
            Email: legal@centeredsupportservice.org<br />
            Phone: (424) 277-9828
          </address>
          
          <p className="text-muted">
            <small>Last Updated: March 22, 2025</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;
