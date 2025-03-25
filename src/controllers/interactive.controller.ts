import { Request, Response } from 'express';
import { Scenario, DragDropExercise, RolePlayExercise } from '../models/interactive.model';
import Section from '../models/section.model';
import Course from '../models/course.model';

// Scenario Controllers
export const getSectionScenarios = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;
    
    // Check if this section belongs to the supervisor course
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this section' });
    }
    
    const scenarios = await Scenario.find({ section: sectionId });
    res.status(200).json(scenarios);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scenarios', error });
  }
};

export const getScenarioById = async (req: Request, res: Response) => {
  try {
    const { scenarioId } = req.params;
    const scenario = await Scenario.findById(scenarioId);
    
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }
    
    // Check if this scenario belongs to a section in the supervisor course
    const section = await Section.findById(scenario.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this scenario' });
    }
    
    res.status(200).json(scenario);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scenario', error });
  }
};

export const submitScenarioAttempt = async (req: Request, res: Response) => {
  try {
    const { scenarioId } = req.params;
    const { stepResponses } = req.body;
    
    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }
    
    // Check if this scenario belongs to a section in the supervisor course
    const section = await Section.findById(scenario.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to submit this scenario' });
    }
    
    // Calculate score based on correct responses
    const correctResponses = stepResponses.filter((response: { isCorrect: boolean }) => response.isCorrect).length;
    const totalResponses = stepResponses.length;
    const score = totalResponses > 0 ? Math.round((correctResponses / totalResponses) * 100) : 0;
    
    // Determine if passed based on passing score
    const passed = score >= scenario.passingScore;
    
    res.status(200).json({
      scenarioId,
      stepResponses,
      score,
      passed,
      completedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting scenario attempt', error });
  }
};

// Drag & Drop Controllers
export const getSectionDragDropExercises = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;
    
    // Check if this section belongs to the supervisor course
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this section' });
    }
    
    const exercises = await DragDropExercise.find({ section: sectionId });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drag & drop exercises', error });
  }
};

export const getDragDropExerciseById = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await DragDropExercise.findById(exerciseId);
    
    if (!exercise) {
      return res.status(404).json({ message: 'Drag & drop exercise not found' });
    }
    
    // Check if this exercise belongs to a section in the supervisor course
    const section = await Section.findById(exercise.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this exercise' });
    }
    
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drag & drop exercise', error });
  }
};

export const submitDragDropAttempt = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const { itemPlacements } = req.body;
    
    const exercise = await DragDropExercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Drag & drop exercise not found' });
    }
    
    // Check if this exercise belongs to a section in the supervisor course
    const section = await Section.findById(exercise.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to submit this exercise' });
    }
    
    // Generate feedback for each item
    const feedback = itemPlacements.map((placement: { itemId: string; zoneId: string }) => {
      const item = exercise.items.find(i => i._id.toString() === placement.itemId);
      const correct = item && item.correctZone === placement.zoneId;
      
      return {
        itemId: placement.itemId,
        correct: correct || false,
        explanation: item 
          ? (correct 
              ? `Correct! "${item.text}" belongs in this category.` 
              : `Incorrect. "${item.text}" belongs in a different category.`)
          : 'Item not found'
      };
    });
    
    // Calculate score
    const correctPlacements = feedback.filter((f: { correct: boolean }) => f.correct).length;
    const score = itemPlacements.length > 0 
      ? Math.round((correctPlacements / itemPlacements.length) * 100) 
      : 0;
    
    // Determine if passed
    const passed = score >= exercise.passingScore;
    
    res.status(200).json({
      score,
      passed,
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting drag & drop attempt', error });
  }
};

// Role Play Controllers
export const getSectionRolePlayExercises = async (req: Request, res: Response) => {
  try {
    const { sectionId } = req.params;
    
    // Check if this section belongs to the supervisor course
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this section' });
    }
    
    const exercises = await RolePlayExercise.find({ section: sectionId });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role play exercises', error });
  }
};

export const getRolePlayExerciseById = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await RolePlayExercise.findById(exerciseId);
    
    if (!exercise) {
      return res.status(404).json({ message: 'Role play exercise not found' });
    }
    
    // Check if this exercise belongs to a section in the supervisor course
    const section = await Section.findById(exercise.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to access this exercise' });
    }
    
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role play exercise', error });
  }
};

export const submitRolePlayEvaluation = async (req: Request, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const { participantId, criteriaScores, notes } = req.body;
    
    const exercise = await RolePlayExercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Role play exercise not found' });
    }
    
    // Check if this exercise belongs to a section in the supervisor course
    const section = await Section.findById(exercise.section);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    const course = await Course.findById(section.course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if this is the supervisor course and user doesn't have appropriate role
    if (
      course.title === 'Supervisor Training' && 
      req.user && 
      req.user.role !== 'admin' && 
      req.user.role !== 'instructor'
    ) {
      return res.status(403).json({ message: 'Not authorized to submit this evaluation' });
    }
    
    // Calculate weighted score
    let totalScore = 0;
    let totalWeight = 0;
    
    criteriaScores.forEach((criteriaScore: { criterionId: string; score: number }) => {
      const criterion = exercise.evaluationCriteria.find(c => 
        c._id.toString() === criteriaScore.criterionId
      );
      
      if (criterion) {
        totalScore += criteriaScore.score * criterion.weight;
        totalWeight += criterion.weight;
      }
    });
    
    const overallScore = totalWeight > 0 
      ? Math.round((totalScore / (totalWeight * 5)) * 100) 
      : 0;
    
    // Determine if passed (70% is passing)
    const passed = overallScore >= 70;
    
    // Generate feedback based on score
    let feedback = '';
    if (overallScore >= 90) {
      feedback = 'Excellent performance! You demonstrated outstanding communication skills and empathy.';
    } else if (overallScore >= 80) {
      feedback = 'Great job! You showed strong communication skills with a few areas for improvement.';
    } else if (overallScore >= 70) {
      feedback = 'Good work! You met the basic requirements with several areas to strengthen.';
    } else {
      feedback = 'You need more practice. Focus on improving your communication skills and empathy.';
    }
    
    if (notes) {
      feedback += ` Additional notes: ${notes}`;
    }
    
    res.status(200).json({
      overallScore,
      passed,
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting role play evaluation', error });
  }
};
