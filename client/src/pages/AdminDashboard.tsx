import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import { courseService } from '../services/courseService';
import { Navigate } from 'react-router-dom';
import { Course } from '../types/course';
import SectionManagement from '../components/admin/SectionManagement';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Statistics {
  users: {
    total: number;
    byRole: {
      admin: number;
      instructor: number;
      student: number;
    };
  };
  courses: {
    total: number;
  };
  sections: {
    total: number;
  };
  progress: {
    completedCourses: number;
  };
}

interface ProgressRecord {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  course: {
    _id: string;
    title: string;
  };
  completed: boolean;
  completedAt?: string;
  sectionsProgress: {
    section: {
      _id: string;
      title: string;
    };
    completed: boolean;
    completedAt?: string;
    videoWatched: boolean;
    audioListened: boolean;
    contentRead: boolean;
  }[];
}

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Filters for progress
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [completionStatus, setCompletionStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all required data
        const [statsData, usersData, coursesData] = await Promise.all([
          adminService.getStatistics(),
          adminService.getAllUsers(),
          courseService.getCourses()
        ]);
        
        setStatistics(statsData);
        setUsers(usersData);
        setCourses(coursesData);
        
        // Initial progress data without filters
        const progressData = await adminService.getAllProgress();
        setProgress(progressData);
      } catch (err) {
        setError('Failed to load admin dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle role update
  const handleRoleUpdate = async (userId: string, newRole: string) => {
    try {
      setError(null);
      await adminService.updateUserRole(userId, newRole);
      
      // Update local state
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      
      setSuccessMessage('User role updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to update user role');
      console.error(err);
    }
  };

  // Handle progress filter
  const handleFilterProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: { userId?: string; courseId?: string; completed?: boolean } = {};
      
      if (selectedUser) {
        filters.userId = selectedUser;
      }
      
      if (selectedCourse) {
        filters.courseId = selectedCourse;
      }
      
      if (completionStatus) {
        filters.completed = completionStatus === 'completed';
      }
      
      const progressData = await adminService.getAllProgress(filters);
      setProgress(progressData);
    } catch (err) {
      setError('Failed to filter progress data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset progress filters
  const resetFilters = async () => {
    setSelectedUser('');
    setSelectedCourse('');
    setCompletionStatus('');
    
    try {
      setLoading(true);
      const progressData = await adminService.getAllProgress();
      setProgress(progressData);
    } catch (err) {
      setError('Failed to reset filters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  if (loading && !statistics) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading admin dashboard...</h2>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      {/* Statistics Overview */}
      {statistics && (
        <Row className="mb-4">
          <Col md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="display-4">{statistics.users.total}</h3>
                <Card.Title>Total Users</Card.Title>
                <div className="mt-2">
                  <Badge bg="primary" className="me-1">Admin: {statistics.users.byRole.admin || 0}</Badge>
                  <Badge bg="info" className="me-1">Instructor: {statistics.users.byRole.instructor || 0}</Badge>
                  <Badge bg="secondary">Student: {statistics.users.byRole.student || 0}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="display-4">{statistics.courses.total}</h3>
                <Card.Title>Total Courses</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="display-4">{statistics.sections.total}</h3>
                <Card.Title>Total Sections</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="display-4">{statistics.progress.completedCourses}</h3>
                <Card.Title>Completed Courses</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      {/* Main Content Tabs */}
      <Tabs defaultActiveKey="users" className="mb-4">
        {/* User Management Tab */}
        <Tab eventKey="users" title="User Management">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">User Management</h4>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={
                          user.role === 'admin' ? 'primary' : 
                          user.role === 'instructor' ? 'info' : 
                          'secondary'
                        }>
                          {user.role}
                        </Badge>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Form.Select 
                          size="sm" 
                          value={user.role}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleRoleUpdate(user._id, e.target.value)}
                          style={{ width: '150px' }}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        
        {/* Section Management Tab */}
        <Tab eventKey="sections" title="Section Management">
          <Card className="shadow-sm">
            <Card.Body>
              <SectionManagement />
            </Card.Body>
          </Card>
        </Tab>
        
        {/* Student Progress Tab */}
        <Tab eventKey="progress" title="Student Progress">
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Student Progress</h4>
              
              {/* Filters */}
              <Row className="mb-4">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Filter by User</Form.Label>
                    <Form.Select 
                      value={selectedUser}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUser(e.target.value)}
                    >
                      <option value="">All Users</option>
                      {users
                        .filter(u => u.role === 'student')
                        .map(user => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Filter by Course</Form.Label>
                    <Form.Select 
                      value={selectedCourse}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
                    >
                      <option value="">All Courses</option>
                      {courses.map(course => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Completion Status</Form.Label>
                    <Form.Select 
                      value={completionStatus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCompletionStatus(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3} className="d-flex align-items-end">
                  <Button 
                    variant="primary" 
                    onClick={handleFilterProgress}
                    className="me-2"
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
              
              {/* Progress Table */}
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center">No progress records found</td>
                    </tr>
                  ) : (
                    progress.map(record => {
                      const totalSections = record.sectionsProgress ? record.sectionsProgress.length : 0;
                      const completedSections = record.sectionsProgress ? record.sectionsProgress.filter(s => s.completed).length : 0;
                      const progressPercent = totalSections > 0 
                        ? Math.round((completedSections / totalSections) * 100) 
                        : 0;
                      
                      return (
                        <tr key={record._id}>
                          <td>{record.user ? record.user.name : 'Unknown User'}</td>
                          <td>{record.course ? record.course.title : 'Unknown Course'}</td>
                          <td>
                            {progressPercent}% ({completedSections}/{totalSections} sections)
                          </td>
                          <td>
                            <Badge bg={record.completed ? 'success' : 'warning'}>
                              {record.completed ? 'Completed' : 'In Progress'}
                            </Badge>
                          </td>
                          <td>
                            {record.completedAt 
                              ? new Date(record.completedAt).toLocaleDateString() 
                              : '-'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
