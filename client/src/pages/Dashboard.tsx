import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/courseService';
import { progressService } from '../services/progressService';
import { Course } from '../types/course';
import { Progress } from '../types/progress';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, progressData] = await Promise.all([
          courseService.getCourses(),
          progressService.getUserProgress()
        ]);
        setCourses(coursesData);
        setProgress(progressData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate progress percentage for each course
  const calculateProgress = (courseId: string) => {
    const courseProgress = progress.find(p => p.course._id === courseId);
    if (!courseProgress) return 0;
    
    const totalSections = courseProgress.sectionsProgress.length;
    if (totalSections === 0) return 0;
    
    const completedSections = courseProgress.sectionsProgress.filter(s => s.completed).length;
    return Math.round((completedSections / totalSections) * 100);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading your dashboard...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <h2>Error</h2>
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Welcome, {user?.name}</h1>
          <p className="lead">
            Track your progress and continue your learning journey.
          </p>
        </Col>
      </Row>

      {/* Progress Overview with Dashboard Image */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow border-0 overflow-hidden">
            <div className="position-relative">
              <div 
                className="w-100" 
                style={{ 
                  height: '240px', 
                  backgroundImage: 'url(/dashboardpic.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} 
                role="img"
                aria-label="Dashboard Banner"
              />
              <div 
                className="position-absolute" 
                style={{ 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <h2 className="text-white mb-2">Your Learning Journey</h2>
                <p className="text-white mb-0">
                  Continue where you left off or explore new training modules.
                </p>
              </div>
            </div>
            <Card.Body className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">Overall Progress</h5>
                </div>
                <div>
                  <Badge bg="primary" className="px-3 py-2">
                    {progress.length} {progress.length === 1 ? 'Course' : 'Courses'} Enrolled
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Course List */}
      <h3 className="mb-3">Your Courses</h3>
      <Row>
        {courses.length === 0 ? (
          <Col>
            <p>No courses available at the moment.</p>
          </Col>
        ) : (
          courses.map(course => {
            const progressPercent = calculateProgress(course._id);
            let statusBadge;
            
            if (progressPercent === 100) {
              statusBadge = <Badge bg="success">Completed</Badge>;
            } else if (progressPercent > 0) {
              statusBadge = <Badge bg="warning">In Progress</Badge>;
            } else {
              statusBadge = <Badge bg="secondary">Not Started</Badge>;
            }
            
            return (
              <Col key={course._id} md={6} lg={4} className="mb-4">
                <Card className="course-card h-100 shadow">
                  <div 
                    className="card-img-top d-flex align-items-center justify-content-center text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                      height: '140px'
                    }}
                  >
                    <h3 className="m-0 p-3 text-center">{course.title}</h3>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-end mb-3">
                      {statusBadge}
                    </div>
                    <Card.Text className="mb-4">{course.description}</Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="fw-bold">Progress</small>
                        <small className="fw-bold">{progressPercent}%</small>
                      </div>
                      <ProgressBar 
                        now={progressPercent} 
                        variant={
                          progressPercent === 100 ? "success" : 
                          progressPercent > 50 ? "info" : 
                          progressPercent > 0 ? "warning" : "info"
                        }
                        className="mb-3"
                        style={{ height: '8px' }}
                      />
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top-0 pb-3">
                    <Link 
                      to={`/courses/${course._id}`} 
                      className="btn btn-primary w-100"
                    >
                      {progressPercent > 0 ? 'Continue' : 'Start'} Course
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
