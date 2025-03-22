import React, { useState, useEffect, CSSProperties } from 'react';
import { Card, Alert, Button, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { interactiveService } from '../../services/interactiveService';
import { DragDropExercise as DragDropExerciseType, DragDropItem } from '../../types/interactive';

interface DragDropExerciseProps {
  exerciseId: string;
  onComplete: (passed: boolean, score: number) => void;
}

const DragDropExerciseComponent: React.FC<DragDropExerciseProps> = ({ exerciseId, onComplete }) => {
  const [exercise, setExercise] = useState<DragDropExerciseType | null>(null);
  const [items, setItems] = useState<{ [key: string]: DragDropItem[] }>({
    itemBank: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    passed: boolean;
    feedback: { itemId: string; correct: boolean; explanation: string }[];
  } | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exerciseData = await interactiveService.getDragDropExerciseById(exerciseId);
        setExercise(exerciseData);

        // Initialize items in the item bank
        const initialItems: { [key: string]: DragDropItem[] } = {
          itemBank: [...exerciseData.items],
        };

        // Initialize empty zones
        exerciseData.zones.forEach((zone) => {
          initialItems[zone._id] = [];
        });

        setItems(initialItems);
      } catch (err) {
        setError('Failed to load drag and drop exercise');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Moved within the same list
    if (source.droppableId === destination.droppableId) {
      const list = [...items[source.droppableId]];
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);

      setItems({
        ...items,
        [source.droppableId]: list,
      });
    } else {
      // Moved to a different list
      const sourceList = [...items[source.droppableId]];
      const destList = [...items[destination.droppableId]];
      const [removed] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, removed);

      setItems({
        ...items,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });
    }
  };

  const handleSubmit = async () => {
    if (!exercise) return;

    // Create an array of item placements
    const itemPlacements = Object.entries(items)
      .filter(([zoneId]) => zoneId !== 'itemBank') // Exclude the item bank
      .flatMap(([zoneId, zoneItems]) =>
        zoneItems.map((item) => ({
          itemId: item._id,
          zoneId,
        }))
      );

    try {
      const result = await interactiveService.submitDragDropAttempt(exerciseId, itemPlacements);
      setFeedback(result);
      setSubmitted(true);
      onComplete(result.passed, result.score);
    } catch (err) {
      setError('Failed to submit exercise');
      console.error(err);
    }
  };

  const handleReset = () => {
    if (!exercise) return;

    // Reset to initial state
    const initialItems: { [key: string]: DragDropItem[] } = {
      itemBank: [...exercise.items],
    };

    exercise.zones.forEach((zone) => {
      initialItems[zone._id] = [];
    });

    setItems(initialItems);
    setSubmitted(false);
    setFeedback(null);
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

  const getItemStyle = (isDragging: boolean, itemId: string): CSSProperties => {
    // If we have feedback, check if this item was placed correctly
    if (submitted && feedback) {
      const itemFeedback = feedback.feedback.find((fb) => fb.itemId === itemId);
      if (itemFeedback) {
        return {
          userSelect: 'none' as 'none',
          padding: '16px',
          margin: '0 0 8px 0',
          background: itemFeedback.correct ? '#d4edda' : '#f8d7da',
          border: itemFeedback.correct ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
          borderRadius: '4px',
          boxShadow: isDragging ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
        };
      }
    }

    return {
      userSelect: 'none' as 'none',
      padding: '16px',
      margin: '0 0 8px 0',
      background: isDragging ? '#e9ecef' : 'white',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      boxShadow: isDragging ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
    };
  };

  const getListStyle = (isDraggingOver: boolean, zoneId: string): CSSProperties => ({
    background: isDraggingOver ? '#e9ecef' : '#f8f9fa',
    padding: 8,
    minHeight: 250,
    borderRadius: '4px',
    border: '1px dashed #ced4da',
  });

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>{exercise?.title}</h4>
      </Card.Header>
      <Card.Body>
        <p className="lead mb-4">{exercise?.description}</p>

        {submitted && feedback && (
          <Alert variant={feedback.passed ? 'success' : 'warning'} className="mb-4">
            <Alert.Heading>
              {feedback.passed ? 'Great job!' : 'Almost there!'}
            </Alert.Heading>
            <p>
              You scored {feedback.score}% on this exercise.
              {feedback.passed
                ? ' You have successfully completed this exercise!'
                : ' Try again to improve your score.'}
            </p>
          </Alert>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            <Col md={4}>
              <h5 className="mb-3">Items</h5>
              <Droppable droppableId="itemBank">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, 'itemBank')}
                    {...provided.droppableProps}
                  >
                    {items.itemBank.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                        isDragDisabled={submitted}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...getItemStyle(snapshot.isDragging, item._id),
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.text}
                            {submitted && feedback && (
                              <div className="mt-2 small">
                                {feedback.feedback
                                  .filter((fb) => fb.itemId === item._id)
                                  .map((fb) => (
                                    <div key={`feedback-${fb.itemId}`} className={fb.correct ? 'text-success' : 'text-danger'}>
                                      {fb.explanation}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col md={8}>
              <Row>
                {exercise?.zones.map((zone) => (
                  <Col md={6} key={zone._id} className="mb-4">
                    <h5 className="mb-3">{zone.name}</h5>
                    <p className="small text-muted mb-2">{zone.description}</p>
                    <Droppable droppableId={zone._id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver, zone._id)}
                          {...provided.droppableProps}
                        >
                          {items[zone._id]?.map((item, index) => (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                              isDragDisabled={submitted}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...getItemStyle(snapshot.isDragging, item._id),
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.text}
                                  {submitted && feedback && (
                                    <div className="mt-2 small">
                                      {feedback.feedback
                                        .filter((fb) => fb.itemId === item._id)
                                        .map((fb) => (
                                          <div key={`feedback-${fb.itemId}`} className={fb.correct ? 'text-success' : 'text-danger'}>
                                            {fb.explanation}
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </DragDropContext>

        <div className="mt-4 d-flex justify-content-end">
          {submitted ? (
            <Button variant="primary" onClick={handleReset}>
              Try Again
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={Object.entries(items)
                .filter(([zoneId]) => zoneId !== 'itemBank')
                .every(([_, zoneItems]) => zoneItems.length === 0)}
            >
              Submit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DragDropExerciseComponent;
