import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Scenario } from '../models/interactive.model';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    addCommunicationScenario();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const addCommunicationScenario = async () => {
  try {
    // Find the Communication and Professionalism section
    const communicationSection = await Section.findOne({ title: 'Communication and Professionalism' });
    
    if (!communicationSection) {
      console.error('Communication and Professionalism section not found');
      process.exit(1);
    }

    // Generate IDs for steps
    const initialStepId = new mongoose.Types.ObjectId().toString();
    const step2Id = new mongoose.Types.ObjectId().toString();
    const step3Id = new mongoose.Types.ObjectId().toString();
    const step4Id = new mongoose.Types.ObjectId().toString();
    const step5Id = new mongoose.Types.ObjectId().toString();
    const conclusionId = new mongoose.Types.ObjectId().toString();

    // Create a new scenario
    const scenario = await Scenario.create({
      title: 'Effective Communication with a Non-Verbal Client',
      description: 'Practice effective communication techniques with a client who has limited verbal communication abilities.',
      type: 'communication',
      section: communicationSection._id,
      passingScore: 70,
      initialStep: initialStepId,
      steps: []
    });

    // Add steps one by one
    // Step 1 (Initial)
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: initialStepId,
            content: "You are supporting Maria, a 35-year-old client with cerebral palsy who has limited verbal communication. You notice that Maria seems agitated this morning, moving restlessly in her wheelchair and making sounds that indicate distress. How do you approach this situation?",
            options: [
              {
                text: "Immediately ask yes/no questions to try to identify the problem quickly.",
                isCorrect: false,
                nextStepId: step2Id,
                explanation: "While yes/no questions can be helpful, starting with them immediately may not give Maria enough time to express herself in her own way. It's better to begin with a more open approach."
              },
              {
                text: "Calmly approach Maria, make eye contact, and use a gentle tone to acknowledge that you notice she seems upset.",
                isCorrect: true,
                nextStepId: step3Id,
                explanation: "This approach shows respect and acknowledges Maria's feelings. Making eye contact and using a calm tone helps establish connection before trying to solve the problem."
              },
              {
                text: "Check her schedule to see what might be causing the agitation based on her routine.",
                isCorrect: false,
                nextStepId: step2Id,
                explanation: "While checking the schedule might provide helpful context, addressing Maria directly first shows that you prioritize her communication and autonomy."
              }
            ],
            feedback: {
              positive: "Great choice! Starting with a calm, respectful acknowledgment shows Maria that you recognize her feelings and are there to support her.",
              negative: "Consider how you can first acknowledge Maria's feelings and establish a connection before trying to solve the problem."
            }
          }
        }
      }
    );

    // Step 2
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: step2Id,
            content: "Maria continues to show signs of distress. You want to understand what's bothering her. What's your next step?",
            options: [
              {
                text: "Bring her communication board and give her time to indicate what's wrong.",
                isCorrect: true,
                nextStepId: step4Id,
                explanation: "Providing appropriate communication tools and giving Maria time to use them respects her autonomy and ability to communicate her needs."
              },
              {
                text: "Call a family member to ask if they know what might be bothering her.",
                isCorrect: false,
                nextStepId: step4Id,
                explanation: "While family input can be valuable, it's better to first try direct communication with Maria using her preferred communication methods."
              },
              {
                text: "Make your best guess about what's wrong and try to fix the most likely issues.",
                isCorrect: false,
                nextStepId: step4Id,
                explanation: "Making assumptions without giving Maria a chance to communicate can undermine her autonomy and might not address the actual issue."
              }
            ],
            feedback: {
              positive: "Excellent! Providing appropriate communication tools and giving Maria time to express herself respects her autonomy and demonstrates person-centered support.",
              negative: "Remember that supporting Maria's own communication should be the priority before seeking external input or making assumptions."
            }
          }
        }
      }
    );

    // Step 3
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: step3Id,
            content: "After your calm approach, Maria seems slightly less agitated. What would be the most effective way to understand what she needs?",
            options: [
              {
                text: "Ask a series of yes/no questions about possible problems, giving her time to respond to each one.",
                isCorrect: false,
                nextStepId: step4Id,
                explanation: "While yes/no questions can be helpful, starting with Maria's preferred communication method would be more respectful and potentially more efficient."
              },
              {
                text: "Offer her communication board or device and give her time to indicate what's bothering her.",
                isCorrect: true,
                nextStepId: step4Id,
                explanation: "Using Maria's established communication tools shows respect for her preferred method of expression and supports her autonomy."
              },
              {
                text: "Suggest common issues that might be bothering her, like hunger, pain, or needing to use the bathroom.",
                isCorrect: false,
                nextStepId: step4Id,
                explanation: "While these suggestions address common needs, it's better to first give Maria the opportunity to communicate using her preferred method rather than limiting options."
              }
            ],
            feedback: {
              positive: "Perfect! Offering Maria's communication tools and giving her time to use them is the most respectful and effective approach.",
              negative: "Consider how you can best support Maria's own communication rather than directing or limiting the conversation."
            }
          }
        }
      }
    );

    // Step 4
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: step4Id,
            content: "Using her communication board, Maria indicates that she's in pain. How do you proceed to get more specific information?",
            options: [
              {
                text: "Immediately call the nurse or doctor to report the pain.",
                isCorrect: false,
                nextStepId: step5Id,
                explanation: "While medical attention may be needed, it's important to first gather more specific information about the pain to provide to healthcare professionals."
              },
              {
                text: "Use a body chart or ask her to point to where the pain is located, then ask about the severity using a scale or facial expressions.",
                isCorrect: true,
                nextStepId: step5Id,
                explanation: "This approach gathers specific, useful information about the pain while continuing to support Maria's communication."
              },
              {
                text: "Give her pain medication according to her care plan's PRN orders.",
                isCorrect: false,
                nextStepId: step5Id,
                explanation: "Administering medication without gathering more information about the pain could be inappropriate or insufficient for addressing the actual issue."
              }
            ],
            feedback: {
              positive: "Excellent choice! Getting specific information about the location and severity of pain is important for proper care while continuing to support Maria's communication.",
              negative: "Before taking action, it's important to gather more specific information about the pain to ensure appropriate care."
            }
          }
        }
      }
    );

    // Step 5
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: step5Id,
            content: "Maria indicates that she has a headache and shows it's quite severe. You've documented this information. What's the most appropriate next step?",
            options: [
              {
                text: "Follow her care plan for pain management, which includes offering approved pain medication and notifying her healthcare provider.",
                isCorrect: true,
                nextStepId: conclusionId,
                explanation: "Following the established care plan while keeping healthcare providers informed is the appropriate response that balances immediate care with proper medical oversight."
              },
              {
                text: "Tell her to rest while you finish your other tasks, then check back later.",
                isCorrect: false,
                nextStepId: conclusionId,
                explanation: "Delaying care for a severe headache is not appropriate and doesn't prioritize Maria's needs or comfort."
              },
              {
                text: "Call emergency services immediately since the headache is severe.",
                isCorrect: false,
                nextStepId: conclusionId,
                explanation: "While the headache is severe, calling emergency services is likely an overreaction unless there are other concerning symptoms or specific instructions in her care plan for this situation."
              }
            ],
            feedback: {
              positive: "Great decision! Following the established care plan for pain management while keeping healthcare providers informed strikes the right balance between providing immediate care and ensuring proper medical oversight.",
              negative: "Consider what response would both address Maria's immediate needs and follow proper protocols for her care."
            }
          }
        }
      }
    );

    // Conclusion Step
    await Scenario.findByIdAndUpdate(
      scenario._id,
      {
        $push: {
          steps: {
            _id: conclusionId,
            content: "After following the care plan and providing approved pain medication, Maria begins to feel better. This scenario demonstrated several important aspects of effective communication with clients who have limited verbal abilities:",
            options: [
              {
                text: "Review what you've learned and complete the scenario",
                isCorrect: true,
                explanation: "You've successfully navigated this communication scenario by: 1) Approaching calmly and acknowledging feelings, 2) Using appropriate communication tools, 3) Gathering specific information systematically, and 4) Following proper care protocols while keeping Maria's needs central."
              }
            ],
            feedback: {
              positive: "Congratulations! You've successfully demonstrated effective communication techniques with a client who has limited verbal abilities. Remember these key principles in your daily practice: respect, patience, appropriate tools, and following care plans."
            }
          }
        }
      }
    );

    // Save the scenario
    await scenario.save();
    
    console.log('Communication scenario added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error adding communication scenario:', error);
    process.exit(1);
  }
};
