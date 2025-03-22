import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, ProgressBar } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import { Course } from '../types/course';
import { Section } from '../types/section';
import { CourseProgress } from '../types/progress';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const [courseData, sectionsData, progressData] = await Promise.all([
          courseService.getCourseById(courseId),
          courseService.getCourseSections(courseId),
          progressService.getUserCourseProgress(courseId)
        ]);
        
        setCourse(courseData);
        setSections(sectionsData);
        setProgress(progressData);
      } catch (err) {
        setError('Failed to load course data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const isSectionCompleted = (sectionId: string) => {
    if (!progress) return false;
    const sectionProgress = progress.sectionsProgress.find(s => s.section === sectionId);
    return sectionProgress?.completed || false;
  };

  const calculateCourseProgress = () => {
    if (!progress || !sections.length) return 0;
    
    const completedSections = progress.sectionsProgress.filter(s => s.completed).length;
    return Math.round((completedSections / sections.length) * 100);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading course...</h2>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container className="py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error || 'Course not found'}</p>
        <Link to="/dashboard" className="btn btn-primary mt-3">
          Return to Dashboard
        </Link>
      </Container>
    );
  }

  const progressPercent = calculateCourseProgress();

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Link to="/dashboard" className="btn btn-outline-primary mb-3">
            &larr; Back to Dashboard
          </Link>
          <h1>{course.title}</h1>
          <p className="lead">{course.description}</p>
          
          <div className="mt-4 mb-4">
            <div className="d-flex justify-content-between mb-1">
              <span>Course Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <ProgressBar now={progressPercent} className="mb-2" style={{ height: '10px' }} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header>
              <h3 className="mb-0">Course Sections</h3>
            </Card.Header>
            <ListGroup variant="flush">
              {sections.map((section, index) => {
                const isCompleted = isSectionCompleted(section._id);
                return (
                  <ListGroup.Item key={section._id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">
                        {index + 1}. {section.title}
                        {isCompleted && (
                          <Badge bg="success" className="ms-2">Completed</Badge>
                        )}
                      </h5>
                      <p className="mb-0 text-muted">{section.description}</p>
                    </div>
                    <Link 
                      to={`/courses/${courseId}/sections/${section._id}`} 
                      className="btn btn-primary"
                    >
                      {isCompleted ? 'Review' : 'Start'} Section
                    </Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
