import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';

interface ChecklistItem {
  id: string;
  text: string;
  explanation: string;
  required: boolean;
}

interface InteractiveChecklistProps {
  title: string;
  description: string;
  items: ChecklistItem[];
  passingThreshold: number;
  onComplete: (passed: boolean, score: number, checkedItems: string[]) => void;
}

const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  title,
  description,
  items,
  passingThreshold,
  onComplete
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [showExplanations, setShowExplanations] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleCheckItem = (itemId: string) => {
    setCheckedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const toggleExplanation = (itemId: string) => {
    setShowExplanations(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSubmit = () => {
    // Calculate score
    const requiredItems = items.filter(item => item.required).map(item => item.id);
    const correctItems = checkedItems.filter(itemId => 
      requiredItems.includes(itemId)
    );
    const incorrectItems = checkedItems.filter(itemId => 
      !requiredItems.includes(itemId)
    );
    
    // Score calculation: (correct items - incorrect items) / total required items * 100
    const calculatedScore = Math.max(
      0,
      (correctItems.length - incorrectItems.length) / requiredItems.length * 100
    );
    
    const roundedScore = Math.round(calculatedScore);
    setScore(roundedScore);
    
    // Check if passed
    const hasPassed = roundedScore >= passingThreshold;
    setPassed(hasPassed);
    
    setSubmitted(true);
    onComplete(hasPassed, roundedScore, checkedItems);
  };

  const handleReset = () => {
    setCheckedItems([]);
    setShowExplanations([]);
    setSubmitted(false);
    setScore(0);
    setPassed(false);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>{title}</h4>
      </Card.Header>
      <Card.Body>
        <p className="lead mb-4">{description}</p>
        
        {submitted && (
          <Alert variant={passed ? 'success' : 'warning'} className="mb-4">
            <Alert.Heading>
              {passed ? 'Great job!' : 'Review needed'}
            </Alert.Heading>
            <p>
              Your score: {score}% (Passing threshold: {passingThreshold}%)
            </p>
            <ProgressBar 
              now={score} 
              variant={passed ? 'success' : 'warning'} 
              label={`${score}%`} 
              className="mt-2"
            />
          </Alert>
        )}
        
        <div className="checklist-items">
          {items.map((item) => (
            <div key={item.id} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`checklist-item-${item.id}`}
                label={item.text}
                checked={checkedItems.includes(item.id)}
                onChange={() => handleCheckItem(item.id)}
                disabled={submitted}
                className={submitted ? (
                  item.required ? 
                    (checkedItems.includes(item.id) ? 'text-success' : 'text-danger') : 
                    (!checkedItems.includes(item.id) ? 'text-success' : 'text-danger')
                ) : ''}
              />
              
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => toggleExplanation(item.id)}
                className="ms-2 p-0"
              >
                {showExplanations.includes(item.id) ? 'Hide explanation' : 'Show explanation'}
              </Button>
              
              {showExplanations.includes(item.id) && (
                <div className="mt-2 ms-4 p-2 bg-light border rounded">
                  <small>{item.explanation}</small>
                  {submitted && (
                    <div className={`mt-1 ${
                      item.required ? 
                        (checkedItems.includes(item.id) ? 'text-success' : 'text-danger') : 
                        (!checkedItems.includes(item.id) ? 'text-success' : 'text-danger')
                    }`}>
                      <small>
                        <strong>
                          {item.required ? 
                            (checkedItems.includes(item.id) ? '✓ Correctly selected' : '✗ Should have been selected') : 
                            (!checkedItems.includes(item.id) ? '✓ Correctly not selected' : '✗ Should not have been selected')}
                        </strong>
                      </small>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          {submitted ? (
            <Button variant="primary" onClick={handleReset}>
              Try Again
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={checkedItems.length === 0}
            >
              Submit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default InteractiveChecklist;
