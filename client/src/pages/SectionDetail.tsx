import React, { useEffect, useState } from 'react';
import { Container, Card, Nav, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { sectionService } from '../services/sectionService';
import { quizService } from '../services/quizService';
import { progressService } from '../services/progressService';
import { interactiveService } from '../services/interactiveService';
import { Section } from '../types/section';
import { Quiz, QuizQuestion } from '../types/quiz';
import { InteractiveScenario, DragDropExercise, RolePlayExercise } from '../types/interactive';
import ScenarioSimulator from '../components/interactive/ScenarioSimulator';
import DragDropExerciseComponent from '../components/interactive/DragDropExercise';
import RolePlayExerciseComponent from '../components/interactive/RolePlayExercise';
import { SectionProgress } from '../types/progress';

type ContentType = 'video' | 'text' | 'audio' | 'quiz' | 'scenario' | 'dragdrop' | 'roleplay';

interface SectionDetailProps {}

const SectionDetail: React.FC<SectionDetailProps> = () => {
  const { courseId, sectionId } = useParams<{ courseId: string; sectionId: string }>();
  const navigate = useNavigate();
  
  const [section, setSection] = useState<Section | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState<ContentType>('video');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<SectionProgress | null>(null);
  
  // Interactive learning elements
  const [scenarios, setScenarios] = useState<InteractiveScenario[]>([]);
  const [dragDropExercises, setDragDropExercises] = useState<DragDropExercise[]>([]);
  const [rolePlayExercises, setRolePlayExercises] = useState<RolePlayExercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !sectionId) return;
      
      try {
        setLoading(true);
        
        // Get section data
        const sectionData = await sectionService.getSectionById(sectionId);
        setSection(sectionData);
        
        // Get progress data
        const progressData = await progressService.getSectionProgress(courseId, sectionId);
        setSectionProgress(progressData);
        setSectionCompleted(progressData?.completed || false);
        
        // Try to get quiz data, but don't fail if not found
        try {
          const quizData = await quizService.getSectionQuiz(sectionId);
          setQuiz(quizData);
        } catch (quizErr) {
          console.log('No quiz found for this section or error loading quiz:', quizErr);
          // Don't set error state for quiz not found
        }
        
        // Fetch interactive learning elements
        try {
          const [scenariosData, dragDropData, rolePlayData] = await Promise.all([
            interactiveService.getSectionScenarios(sectionId),
            interactiveService.getSectionDragDropExercises(sectionId),
            interactiveService.getSectionRolePlayExercises(sectionId)
          ]);
          
          setScenarios(scenariosData);
          setDragDropExercises(dragDropData);
          setRolePlayExercises(rolePlayData);
          
        } catch (interactiveErr) {
          console.error('Failed to load interactive elements:', interactiveErr);
          // Non-critical error, don't show to user
        }
      } catch (err) {
        setError('Failed to load section data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, sectionId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = async () => {
    if (!quiz || !courseId || !sectionId) return;
    
    try {
      const answers = Object.entries(quizAnswers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));
      
      const result = await quizService.submitQuiz(quiz._id, { answers });
      setQuizScore(result.score);
      setQuizSubmitted(true);
      
      // Mark section as completed if quiz passed
      if (result.passed) {
        await progressService.markSectionCompleted(courseId, sectionId);
        setSectionCompleted(true);
      }
    } catch (err) {
      setError('Failed to submit quiz');
      console.error(err);
    }
  };

  const handleVideoComplete = async () => {
    if (!courseId || !sectionId) return;
    
    try {
      // Update only the video watched status
      const response = await progressService.markSectionCompleted(courseId, sectionId);
      setSectionProgress(response);
      
      if (response.completed) {
        setSectionCompleted(true);
      }
    } catch (err) {
      setError('Failed to mark video as watched');
      console.error(err);
    }
  };

  const handleAudioComplete = async () => {
    if (!courseId || !sectionId) return;
    
    try {
      // Update only the audio listened status
      const response = await progressService.markSectionCompleted(courseId, sectionId);
      setSectionProgress(response);
      
      if (response.completed) {
        setSectionCompleted(true);
      }
    } catch (err) {
      setError('Failed to mark audio as listened');
      console.error(err);
    }
  };

  const handleMarkCompleted = async () => {
    if (!courseId || !sectionId) return;
    
    try {
      const response = await progressService.markSectionCompleted(courseId, sectionId);
      setSectionProgress(response);
      setSectionCompleted(true);
    } catch (err) {
      setError('Failed to mark section as completed');
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate(`/courses/${courseId}`);
  };

  // Fix for the undefined index type error - add a null check for question._id
  const renderQuizOption = (question: QuizQuestion, option: string, optIndex: number) => {
    const questionId = question._id || '';
    return (
      <div key={optIndex} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={`question-${questionId}`}
          id={`option-${questionId}-${optIndex}`}
          value={option}
          checked={quizAnswers[questionId] === option}
          onChange={() => handleAnswerChange(questionId, option)}
        />
        <label 
          className="form-check-label" 
          htmlFor={`option-${questionId}-${optIndex}`}
        >
          {option}
        </label>
      </div>
    );
  };

  const handleInteractiveComplete = async (passed: boolean) => {
    if (passed && courseId && sectionId) {
      await progressService.markSectionCompleted(courseId, sectionId);
      setSectionCompleted(true);
    }
  };

  // Check if quiz is available based on video and audio completion
  const isQuizAvailable = () => {
    if (!section || !sectionProgress) return false;
    
    // If there's no video or audio, quiz is always available
    if (!section.videoUrl && !section.audioUrl) return true;
    
    // If there's video but it hasn't been watched, quiz is not available
    if (section.videoUrl && !sectionProgress.videoWatched) return false;
    
    // If there's audio but it hasn't been listened to, quiz is not available
    if (section.audioUrl && !sectionProgress.audioListened) return false;
    
    // Otherwise, quiz is available
    return true;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading section content...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={handleGoBack}>
            Go Back to Course
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!section) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Section Not Found</Alert.Heading>
          <p>The requested section could not be found.</p>
          <Button variant="outline-warning" onClick={handleGoBack}>
            Go Back to Course
          </Button>
        </Alert>
      </Container>
    );
  }

  // Render quiz content based on availability
  const renderQuizContent = () => {
    if (!quiz) {
      return (
        <Card className="mb-4">
          <Card.Body className="text-center py-5">
            <h4>No Quiz Available</h4>
            <p className="mt-3">
              There is currently no quiz available for this section.
            </p>
            {!sectionCompleted && (
              <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" onClick={handleMarkCompleted}>
                  Mark Section as Completed
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      );
    }

    if (!isQuizAvailable()) {
      return (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-lock-fill" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
          </div>
          <h4>Quiz Locked</h4>
          <p className="mt-3">
            You need to complete the following before accessing the quiz:
          </p>
          <ul className="list-group mt-3 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            {section.videoUrl && sectionProgress && !sectionProgress.videoWatched && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Watch the video</span>
                <span className="badge bg-secondary rounded-pill">
                  <i className="bi bi-x-lg"></i>
                </span>
              </li>
            )}
            {section.audioUrl && sectionProgress && !sectionProgress.audioListened && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Listen to the audio</span>
                <span className="badge bg-secondary rounded-pill">
                  <i className="bi bi-x-lg"></i>
                </span>
              </li>
            )}
          </ul>
          <Button 
            variant="outline-primary" 
            onClick={() => {
              if (section.videoUrl && sectionProgress && !sectionProgress.videoWatched) {
                setActiveTab('video');
              } else if (section.audioUrl && sectionProgress && !sectionProgress.audioListened) {
                setActiveTab('audio');
              }
            }}
          >
            Go to {section.videoUrl && sectionProgress && !sectionProgress.videoWatched ? 'Video' : 'Audio'} Content
          </Button>
        </div>
      );
    }

    if (quizSubmitted) {
      return (
        <div className="quiz-results text-center py-4">
          <h4>Quiz Results</h4>
          <p className="lead">Your score: {quizScore}%</p>
          
          {quizScore !== null && quizScore >= 70 ? (
            <Alert variant="success">
              <Alert.Heading>Congratulations!</Alert.Heading>
              <p>You have passed the quiz.</p>
            </Alert>
          ) : (
            <Alert variant="warning">
              <Alert.Heading>Almost there!</Alert.Heading>
              <p>You need a score of at least 70% to pass. Please try again.</p>
            </Alert>
          )}
          
          <Button 
            variant="primary" 
            onClick={() => {
              setQuizSubmitted(false);
              setQuizAnswers({});
              setQuizScore(null);
            }}
            className="mt-3"
          >
            Retake Quiz
          </Button>
        </div>
      );
    }

    return (
      <div className="quiz-questions">
        <h4 className="mb-4">{quiz.title}</h4>
        <p className="mb-4">{quiz.description}</p>
        
        <form>
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div key={question._id || index} className="mb-4">
                <h5>{index + 1}. {question.text}</h5>
                <div className="mt-2">
                  {Array.isArray(question.options) ? 
                    question.options.map((option, optIndex) => renderQuizOption(question, option, optIndex)) :
                    <p>No options available for this question.</p>
                  }
                </div>
                {question.explanation && (
                  <div className="mt-2 text-muted">
                    <small><strong>Explanation:</strong> {question.explanation}</small>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="alert alert-warning">
              No questions available for this quiz.
            </div>
          )}
          
          <div className="d-flex justify-content-end mt-4">
            <Button 
              variant="primary" 
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < (quiz.questions?.length || 0)}
            >
              Submit Quiz
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{section.title}</h2>
        <Button variant="outline-primary" onClick={handleGoBack}>
          Back to Course
        </Button>
      </div>
      
      <p className="lead mb-4">{section.description}</p>
      
      {sectionCompleted && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Section Completed!</Alert.Heading>
          <p>You have successfully completed this section.</p>
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => k && setActiveTab(k as ContentType)}>
            <Nav.Item>
              <Nav.Link eventKey="video">Video</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="text">Text</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="audio">Audio</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="quiz">Quiz</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="scenario">Scenarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="dragdrop">Drag & Drop</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="roleplay">Role Play</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {activeTab === 'video' && (
            <div className="ratio ratio-16x9">
              <ReactPlayer
                url={section.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                controls
                width="100%"
                height="100%"
                onEnded={handleVideoComplete}
              />
            </div>
          )}
          
          {activeTab === 'text' && (
            <div className="section-text-content">
              <div dangerouslySetInnerHTML={{ __html: section.content || '<p>No text content available for this section.</p>' }} />
              
              {!sectionCompleted && (
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={handleMarkCompleted}>
                    Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'audio' && (
            <div className="section-audio-content">
              <audio 
                controls 
                className="w-100 mb-4"
                onEnded={handleAudioComplete}
              >
                <source src={section.audioUrl || ''} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              
              {!sectionCompleted && (
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={handleAudioComplete}>
                    Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'quiz' && (
            <div className="section-quiz-content">
              {renderQuizContent()}
            </div>
          )}
          
          {activeTab === 'scenario' && (
            <div className="section-scenario-content">
              {scenarios.length > 0 ? (
                <ScenarioSimulator 
                  scenarioId={scenarios[0]._id} 
                  onComplete={(passed) => handleInteractiveComplete(passed)}
                />
              ) : (
                <Card className="mb-4">
                  <Card.Body className="text-center py-5">
                    <h4>No Scenario Exercises Available</h4>
                    <p className="mt-3">
                      There are currently no scenario exercises available for this section. 
                      Scenarios allow you to work through interactive decision-making situations
                      and receive feedback on your choices.
                    </p>
                    {!sectionCompleted && (
                      <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" onClick={handleMarkCompleted}>
                          Mark Section as Completed
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
          
          {activeTab === 'dragdrop' && (
            <div className="section-dragdrop-content">
              {dragDropExercises.length > 0 ? (
                <DragDropExerciseComponent 
                  exerciseId={dragDropExercises[0]._id} 
                  onComplete={(passed) => handleInteractiveComplete(passed)}
                />
              ) : (
                <Card className="mb-4">
                  <Card.Body className="text-center py-5">
                    <h4>No Drag & Drop Exercises Available</h4>
                    <p className="mt-3">
                      There are currently no drag and drop exercises available for this section. 
                      Drag and drop exercises help you learn by categorizing and organizing items
                      into their correct groups or sequences.
                    </p>
                    {!sectionCompleted && (
                      <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" onClick={handleMarkCompleted}>
                          Mark Section as Completed
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
          
          {activeTab === 'roleplay' && (
            <div className="section-roleplay-content">
              {rolePlayExercises.length > 0 ? (
                <RolePlayExerciseComponent 
                  exerciseId={rolePlayExercises[0]._id} 
                  onComplete={(passed) => handleInteractiveComplete(passed)}
                />
              ) : (
                <Card className="mb-4">
                  <Card.Body className="text-center py-5">
                    <h4>No Role Play Exercises Available</h4>
                    <p className="mt-3">
                      There are currently no role play exercises available for this section. 
                      Role play exercises allow you to practice real-world scenarios with a partner, 
                      taking on specific roles and receiving feedback on your performance.
                    </p>
                    {!sectionCompleted && (
                      <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" onClick={handleMarkCompleted}>
                          Mark Section as Completed
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SectionDetail;
