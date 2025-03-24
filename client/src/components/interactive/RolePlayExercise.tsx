import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, Alert, Button, Form, ListGroup, Badge, Accordion } from 'react-bootstrap';
import { interactiveService } from '../../services/interactiveService';
import { RolePlayExercise as RolePlayExerciseType } from '../../types/interactive';

interface RolePlayExerciseProps {
  exerciseId: string;
  onComplete: (passed: boolean, score: number) => void;
}

const RolePlayExerciseComponent: React.FC<RolePlayExerciseProps> = ({ exerciseId, onComplete }) => {
  const [exercise, setExercise] = useState<RolePlayExerciseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [partnerRole, setPartnerRole] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [evaluationMode, setEvaluationMode] = useState(false);
  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    overallScore: number;
    passed: boolean;
    feedback: string;
  } | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exerciseData = await interactiveService.getRolePlayExerciseById(exerciseId);
        setExercise(exerciseData);
        
        // Initialize criteria scores with zeros
        const initialScores: Record<string, number> = {};
        exerciseData.evaluationCriteria.forEach(criterion => {
          initialScores[criterion._id] = 0;
        });
        setCriteriaScores(initialScores);
      } catch (err) {
        setError('Failed to load role play exercise');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    
    // Automatically select a partner role (first available role that's not the selected one)
    if (exercise) {
      const otherRole = exercise.roles.find(role => role._id !== roleId);
      if (otherRole) {
        setPartnerRole(otherRole._id);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleStartRolePlay = () => {
    // Start the role play exercise
    setEvaluationMode(false);
  };

  const handleStartEvaluation = () => {
    // Switch to evaluation mode
    setEvaluationMode(true);
  };

  const handleCriterionScoreChange = (criterionId: string, score: number) => {
    setCriteriaScores(prev => ({
      ...prev,
      [criterionId]: score
    }));
  };

  const handleSubmitEvaluation = async () => {
    if (!exercise || !selectedRole) return;
    
    try {
      // Convert criteria scores to the format expected by the API
      const criteriaScoresArray = Object.entries(criteriaScores).map(([criterionId, score]) => ({
        criterionId,
        score
      }));
      
      const evaluationResult = await interactiveService.submitRolePlayEvaluation(
        exerciseId,
        {
          participantId: selectedRole,
          criteriaScores: criteriaScoresArray,
          notes
        }
      );
      
      setResult(evaluationResult);
      setSubmitted(true);
      onComplete(evaluationResult.passed, evaluationResult.overallScore);
    } catch (err) {
      setError('Failed to submit evaluation');
      console.error(err);
    }
  };

  const handleReset = () => {
    setSelectedRole(null);
    setPartnerRole(null);
    setNotes('');
    setEvaluationMode(false);
    setSubmitted(false);
    setResult(null);
    
    // Reset criteria scores
    if (exercise) {
      const initialScores: Record<string, number> = {};
      exercise.evaluationCriteria.forEach(criterion => {
        initialScores[criterion._id] = 0;
      });
      setCriteriaScores(initialScores);
    }
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading exercise...</p>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!exercise) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Exercise Not Found</Alert.Heading>
        <p>The requested role play exercise could not be found.</p>
      </Alert>
    );
  }

  if (submitted && result) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h4>{exercise.title} - Evaluation Results</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant={result.passed ? 'success' : 'warning'}>
            <Alert.Heading>
              {result.passed ? 'Great job!' : 'Keep practicing!'}
            </Alert.Heading>
            <p>
              Overall Score: {result.overallScore}%
              {result.passed
                ? ' You have successfully completed this role play exercise!'
                : ' Try again to improve your performance.'}
            </p>
          </Alert>
          
          <h5 className="mt-4">Feedback</h5>
          <p>{result.feedback}</p>
          
          <div className="d-flex justify-content-end mt-4">
            <Button variant="primary" onClick={handleReset}>
              Try Again
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (!selectedRole) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h4>{exercise.title}</h4>
        </Card.Header>
        <Card.Body>
          <p className="lead mb-4">{exercise.description}</p>
          
          <h5 className="mb-3">Scenario</h5>
          <p className="mb-4">{exercise.scenario}</p>
          
          <h5 className="mb-3">Select Your Role</h5>
          <ListGroup className="mb-4">
            {exercise.roles.map(role => (
              <ListGroup.Item 
                key={role._id}
                action
                onClick={() => handleRoleSelect(role._id)}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-1">{role.name}</h6>
                  <p className="mb-0 text-muted small">{role.description}</p>
                </div>
                <Badge bg="primary" pill>Select</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }

  const selectedRoleData = exercise.roles.find(role => role._id === selectedRole);
  const partnerRoleData = exercise.roles.find(role => role._id === partnerRole);

  if (evaluationMode) {
    return (
      <Card className="mb-4">
        <Card.Header>
          <h4>{exercise.title} - Evaluation</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="mb-4">
            <p className="mb-0">
              Now that you've completed the role play, evaluate your performance based on the criteria below.
            </p>
          </Alert>
          
          <h5 className="mb-3">Evaluation Criteria</h5>
          {exercise.evaluationCriteria.map(criterion => (
            <Form.Group key={criterion._id} className="mb-4">
              <Form.Label><strong>{criterion.criterion}</strong></Form.Label>
              <div className="d-flex align-items-center">
                <Form.Range
                  min={0}
                  max={5}
                  step={1}
                  value={criteriaScores[criterion._id]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleCriterionScoreChange(criterion._id, parseInt(e.target.value))}
                  className="me-3 flex-grow-1"
                />
                <span className="badge bg-primary">{criteriaScores[criterion._id]}/5</span>
              </div>
            </Form.Group>
          ))}
          
          <Form.Group className="mb-4">
            <Form.Label><strong>Notes and Reflections</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={notes}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
              placeholder="Reflect on your performance. What went well? What could be improved?"
            />
          </Form.Group>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              onClick={handleSubmitEvaluation}
              disabled={Object.values(criteriaScores).every(score => score === 0)}
            >
              Submit Evaluation
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>{exercise.title} - Role Play</h4>
      </Card.Header>
      <Card.Body>
        <Alert variant="info" className="mb-4">
          <Alert.Heading>Instructions</Alert.Heading>
          <p>
            You are playing the role of <strong>{selectedRoleData?.name}</strong>. 
            Your partner will play the role of <strong>{partnerRoleData?.name}</strong>.
          </p>
          <p className="mb-0">
            Follow the key points for your role and engage in a conversation based on the scenario.
            After completing the role play, you'll evaluate your performance.
          </p>
        </Alert>
        
        <h5 className="mb-3">Scenario</h5>
        <p className="mb-4">{exercise.scenario}</p>
        
        <Accordion className="mb-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Your Role: {selectedRoleData?.name}</Accordion.Header>
            <Accordion.Body>
              <p>{selectedRoleData?.description}</p>
              <h6 className="mt-3">Key Points to Remember:</h6>
              <ul>
                {selectedRoleData?.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>Partner Role: {partnerRoleData?.name}</Accordion.Header>
            <Accordion.Body>
              <p>{partnerRoleData?.description}</p>
              <h6 className="mt-3">Key Points:</h6>
              <ul>
                {partnerRoleData?.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleStartEvaluation}>
            Complete Role Play & Evaluate
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RolePlayExerciseComponent;
