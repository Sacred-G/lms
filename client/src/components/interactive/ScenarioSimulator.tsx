import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, ProgressBar, Modal } from 'react-bootstrap';
import { interactiveService } from '../../services/interactiveService';
import { InteractiveScenario, ScenarioStep, ScenarioOption } from '../../types/interactive';
import ReactPlayer from 'react-player';

interface ScenarioSimulatorProps {
  scenarioId: string;
  onComplete: (passed: boolean, score: number) => void;
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ scenarioId, onComplete }) => {
  const [scenario, setScenario] = useState<InteractiveScenario | null>(null);
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stepResponses, setStepResponses] = useState<Array<{
    stepId: string;
    optionSelected: string;
    isCorrect: boolean;
  }>>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        setLoading(true);
        const scenarioData = await interactiveService.getScenarioById(scenarioId);
        setScenario(scenarioData);
        
        // Find the initial step
        const initialStep = scenarioData.steps.find(step => step._id === scenarioData.initialStep);
        if (initialStep) {
          setCurrentStep(initialStep);
        } else {
          setError('Could not find initial step for this scenario');
        }
      } catch (err) {
        setError('Failed to load scenario');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScenario();
  }, [scenarioId]);

  const handleOptionSelect = (option: ScenarioOption) => {
    setSelectedOption(option._id);
    setIsCorrect(option.isCorrect);
    
    // Set appropriate feedback
    if (option.isCorrect && currentStep?.feedback?.positive) {
      setFeedback(currentStep.feedback.positive);
    } else if (!option.isCorrect && currentStep?.feedback?.negative) {
      setFeedback(currentStep.feedback.negative);
    } else {
      setFeedback(option.explanation);
    }
    
    setShowFeedbackModal(true);
  };

  const handleNextStep = () => {
    if (!currentStep || !selectedOption || !scenario) return;
    
    // Record this step's response
    const newResponse = {
      stepId: currentStep._id,
      optionSelected: selectedOption,
      isCorrect: isCorrect || false
    };
    
    const updatedResponses = [...stepResponses, newResponse];
    setStepResponses(updatedResponses);
    
    // Find the selected option
    const option = currentStep.options.find(opt => opt._id === selectedOption);
    
    if (option?.nextStepId) {
      // Move to the next step if there is one
      const nextStep = scenario.steps.find(step => step._id === option.nextStepId);
      if (nextStep) {
        setCurrentStep(nextStep);
        setSelectedOption(null);
        setFeedback(null);
        setIsCorrect(null);
        
        // Update progress
        setProgress(Math.min(100, (updatedResponses.length / scenario.steps.length) * 100));
        setShowFeedbackModal(false);
        return;
      }
    }
    
    // If there's no next step or we can't find it, the scenario is complete
    handleScenarioComplete(updatedResponses);
  };

  const handleScenarioComplete = async (responses: Array<{
    stepId: string;
    optionSelected: string;
    isCorrect: boolean;
  }>) => {
    if (!scenario) return;
    
    try {
      const result = await interactiveService.submitScenarioAttempt(scenarioId, {
        stepResponses: responses
      });
      
      setCompleted(true);
      setProgress(100);
      onComplete(result.passed, result.score);
      setShowFeedbackModal(false);
    } catch (err) {
      setError('Failed to submit scenario attempt');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading scenario...</p>
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

  if (completed) {
    return (
      <Card className="mb-4">
        <Card.Body className="text-center py-5">
          <h3>Scenario Completed!</h3>
          <p>You have completed this interactive scenario.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-4 scenario-simulator">
        <Card.Header>
          <h4>{scenario?.title}</h4>
          <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mt-2" />
        </Card.Header>
        <Card.Body>
          {currentStep?.mediaUrl && currentStep.mediaType === 'video' && (
            <div className="mb-4 scenario-media">
              <div className="mb-3">
                <ReactPlayer
                  url={currentStep.mediaUrl}
                  controls
                  width="100%"
                  height="auto"
                />
              </div>
            </div>
          )}
          
          {currentStep?.mediaUrl && currentStep.mediaType === 'image' && (
            <div className="mb-4 scenario-media">
              <img 
                src={currentStep.mediaUrl} 
                alt="Scenario visual" 
                className="img-fluid rounded mb-3" 
              />
            </div>
          )}
          
          {currentStep?.mediaUrl && currentStep.mediaType === 'audio' && (
            <div className="mb-4 scenario-media">
              <audio controls className="w-100 mb-3">
                <source src={currentStep.mediaUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
          <div className="scenario-content mb-4">
            <p className="lead">{currentStep?.content}</p>
          </div>
          
          <div className="scenario-options">
            <h5>What would you do?</h5>
            {currentStep?.options.map((option) => (
              <Button
                key={option._id}
                variant="outline-primary"
                className="d-block w-100 text-start mb-2 p-3"
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
      
      {/* Feedback Modal */}
      <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isCorrect ? 'Good choice!' : 'Think again...'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{feedback}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleNextStep}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScenarioSimulator;
