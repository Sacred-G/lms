import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Privacy Policy</h1>
          
          <p className="lead mb-4">
            At Centered Support Service Training, we take your privacy seriously. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our 
            learning management system.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you:
          </p>
          <ul className="mb-4">
            <li>Register for an account</li>
            <li>Complete your profile</li>
            <li>Participate in courses and training modules</li>
            <li>Complete assessments and quizzes</li>
            <li>Communicate with us</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including to:
          </p>
          <ul className="mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Track your progress in training modules</li>
            <li>Generate certificates of completion</li>
            <li>Communicate with you about your account or our services</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Analyze usage patterns and trends</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Information Sharing</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul className="mb-4">
            <li>With your employer or organization, if they have sponsored your access to our platform</li>
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>In connection with a business transfer or transaction</li>
            <li>With your consent or at your direction</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your 
            personal information. However, no security system is impenetrable, and we cannot guarantee the 
            security of our systems 100%.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, such as:
          </p>
          <ul className="mb-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address className="mb-5">
            <strong>Centered Support Service Training</strong><br />
            15120 Atkinson Ave, Suite 10, Gardena, CA, 90249<br />
            Email: privacy@centeredsupportservice.org<br />
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

export default PrivacyPolicy;
