import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Accessibility: React.FC = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Accessibility Statement</h1>
          
          <p className="lead mb-4">
            Centered Support Service Training is committed to ensuring digital accessibility for people with 
            disabilities. We are continually improving the user experience for everyone, and applying the 
            relevant accessibility standards.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers 
            to improve accessibility for people with disabilities. It defines three levels of conformance: 
            Level A, Level AA, and Level AAA.
          </p>
          <p>
            Centered Support Service Training is partially conformant with WCAG 2.1 level AA. Partially 
            conformant means that some parts of the content do not fully conform to the accessibility standard.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Accessibility Features</h2>
          <p>
            Centered Support Service Training includes the following accessibility features:
          </p>
          <ul className="mb-4">
            <li>Semantic HTML structure for better screen reader navigation</li>
            <li>Keyboard navigation support for all interactive elements</li>
            <li>Sufficient color contrast for text and important graphics</li>
            <li>Text alternatives for non-text content</li>
            <li>Resizable text without loss of functionality</li>
            <li>Clear and consistent navigation</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Limitations and Alternatives</h2>
          <p>
            Despite our best efforts to ensure accessibility of Centered Support Service Training, there may be 
            some limitations. Below is a description of known limitations, and potential solutions. Please 
            contact us if you observe an issue not listed below.
          </p>
          <p>
            Known limitations:
          </p>
          <ul className="mb-4">
            <li>Some older video content may not have captions or audio descriptions. We are working to add these features.</li>
            <li>Some interactive exercises may be challenging to use with screen readers. We provide alternative text-based versions of these exercises.</li>
            <li>PDF documents may not be fully accessible. We are working to improve the accessibility of our PDF content.</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Centered Support Service Training. Please let us know if you 
            encounter accessibility barriers:
          </p>
          <ul className="mb-4">
            <li>Phone: (424) 277-9828</li>
            <li>E-mail: accessibility@centeredsupportservice.org</li>
            <li>Postal address: 15120 Atkinson Ave, Suite 10, Gardena, CA, 90249</li>
          </ul>
          <p>
            We try to respond to feedback within 3 business days.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Assessment Approach</h2>
          <p>
            Centered Support Service Training assessed the accessibility of this website by the following approaches:
          </p>
          <ul className="mb-4">
            <li>Self-evaluation</li>
            <li>External evaluation by accessibility consultants</li>
            <li>User testing with assistive technologies</li>
          </ul>
          
          <h2 className="h4 mt-5 mb-3">Compatibility with Browsers and Assistive Technology</h2>
          <p>
            Centered Support Service Training is designed to be compatible with the following assistive technologies:
          </p>
          <ul className="mb-4">
            <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
            <li>Screen magnifiers</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          <p>
            The website is compatible with recent versions of major browsers including Chrome, Firefox, Safari, and Edge.
          </p>
          
          <h2 className="h4 mt-5 mb-3">Technical Specifications</h2>
          <p>
            Accessibility of Centered Support Service Training relies on the following technologies to work with the 
            particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul className="mb-4">
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the accessibility standards used.
          </p>
          
          <p className="text-muted mt-5">
            <small>Last Updated: March 22, 2025</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Accessibility;
