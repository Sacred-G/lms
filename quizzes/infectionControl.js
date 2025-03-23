"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz = {
    id: 'infection-control',
    lesson_id: 'infection-control-lesson',
    questions: [
        {
            id: '1',
            quiz_id: 'infection-control',
            text: 'When should a caregiver wash their hands?',
            explanation: 'Hand hygiene is the most important measure to prevent the spread of infections.',
            order_index: 1,
            options: [
                {
                    id: '1a',
                    question_id: '1',
                    text: 'Only when they visibly look dirty',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '1b',
                    question_id: '1',
                    text: 'Before and after providing personal care or handling food',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '1c',
                    question_id: '1',
                    text: 'At the end of the shift, regardless of the tasks completed',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '1d',
                    question_id: '1',
                    text: 'Once every hour to prevent infection',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '2',
            quiz_id: 'infection-control',
            text: 'What is the purpose of wearing personal protective equipment (PPE)?',
            explanation: 'PPE creates barriers that prevent the transmission of pathogens between caregiver and client.',
            order_index: 2,
            options: [
                {
                    id: '2a',
                    question_id: '2',
                    text: 'To protect the caregiver from client illness',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '2b',
                    question_id: '2',
                    text: 'To make the caregiving process faster',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '2c',
                    question_id: '2',
                    text: 'To look professional and well-prepared',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '2d',
                    question_id: '2',
                    text: 'To prevent the spread of germs and infections to clients and caregivers',
                    is_correct: true,
                    order_index: 4
                }
            ]
        },
        {
            id: '3',
            quiz_id: 'infection-control',
            text: 'What should you do if you notice a caregiver not following infection control protocols (e.g., not wearing gloves)?',
            explanation: 'Proper infection control is essential for client safety and requires consistent adherence by all caregivers.',
            order_index: 3,
            options: [
                {
                    id: '3a',
                    question_id: '3',
                    text: 'Ignore it and continue with your work',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '3b',
                    question_id: '3',
                    text: 'Politely remind them of the correct procedures',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '3c',
                    question_id: '3',
                    text: 'Report the incident to your supervisor or relevant authority',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '3d',
                    question_id: '3',
                    text: 'Try to correct the behavior without discussing it with anyone',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '4',
            quiz_id: 'infection-control',
            text: 'What should be your first step if you need to handle soiled bedding or clothing?',
            explanation: 'Proper handling of contaminated materials prevents the spread of pathogens to other surfaces and people.',
            order_index: 4,
            options: [
                {
                    id: '4a',
                    question_id: '4',
                    text: 'Use gloves and discard the items immediately in the correct container',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '4b',
                    question_id: '4',
                    text: 'Handle the items with bare hands for quicker results',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '4c',
                    question_id: '4',
                    text: 'Leave the soiled items for later without handling them',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '4d',
                    question_id: '4',
                    text: 'Wash them with regular laundry items, no special precautions needed',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '5',
            quiz_id: 'infection-control',
            text: 'What type of PPE is necessary when handling bodily fluids?',
            explanation: 'Gloves provide a barrier against contamination, while masks prevent respiratory transmission during certain procedures.',
            order_index: 5,
            options: [
                {
                    id: '5a',
                    question_id: '5',
                    text: 'Gloves and a mask',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '5b',
                    question_id: '5',
                    text: 'Gloves and a gown',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '5c',
                    question_id: '5',
                    text: 'No PPE is necessary for this task',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '5d',
                    question_id: '5',
                    text: 'Only gloves are required',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '6',
            quiz_id: 'infection-control',
            text: 'How can you minimize the spread of germs in a client\'s home?',
            explanation: 'Regular cleaning and disinfection of high-touch surfaces helps prevent pathogen transmission.',
            order_index: 6,
            options: [
                {
                    id: '6a',
                    question_id: '6',
                    text: 'Only clean the client\'s bedroom',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '6b',
                    question_id: '6',
                    text: 'Clean and disinfect frequently touched surfaces regularly',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '6c',
                    question_id: '6',
                    text: 'Only wash your hands after eating',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '6d',
                    question_id: '6',
                    text: 'Disinfect the client\'s bathroom once a week',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '7',
            quiz_id: 'infection-control',
            text: 'What is the most effective way to prevent cross-contamination during caregiving?',
            explanation: 'Changing gloves between tasks prevents transferring pathogens from one site or task to another.',
            order_index: 7,
            options: [
                {
                    id: '7a',
                    question_id: '7',
                    text: 'Change gloves between tasks, especially when handling different types of personal care',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '7b',
                    question_id: '7',
                    text: 'Use the same gloves for everything to save time',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '7c',
                    question_id: '7',
                    text: 'Only wear gloves when working with food',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '7d',
                    question_id: '7',
                    text: 'Wash your hands at the end of your shift',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '8',
            quiz_id: 'infection-control',
            text: 'What should you do if you accidentally get contaminated with a client\'s bodily fluids?',
            explanation: 'Prompt cleaning and reporting allows for proper medical follow-up if needed.',
            order_index: 8,
            options: [
                {
                    id: '8a',
                    question_id: '8',
                    text: 'Wait until the end of your shift to clean up',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '8b',
                    question_id: '8',
                    text: 'Immediately clean the area and report the incident',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '8c',
                    question_id: '8',
                    text: 'Ignore it if it\'s a small amount',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '8d',
                    question_id: '8',
                    text: 'Ask the client to help you clean up',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '9',
            quiz_id: 'infection-control',
            text: 'When is it necessary to use alcohol-based hand sanitizer?',
            explanation: 'Hand sanitizer is effective when soap and water are not accessible but should not replace handwashing when hands are visibly soiled.',
            order_index: 9,
            options: [
                {
                    id: '9a',
                    question_id: '9',
                    text: 'When there is no access to soap and water',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '9b',
                    question_id: '9',
                    text: 'After every meal',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '9c',
                    question_id: '9',
                    text: 'Only after touching your phone',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '9d',
                    question_id: '9',
                    text: 'When leaving the client\'s home',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '10',
            quiz_id: 'infection-control',
            text: 'What is the correct procedure if you are exposed to a bloodborne pathogen?',
            explanation: 'Prompt reporting and following established protocols ensures proper medical assessment and intervention.',
            order_index: 10,
            options: [
                {
                    id: '10a',
                    question_id: '10',
                    text: 'Clean the area and continue your shift',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '10b',
                    question_id: '10',
                    text: 'Report the exposure immediately, clean the area, and follow the organization\'s protocol for further action',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '10c',
                    question_id: '10',
                    text: 'Wait and see if symptoms develop before taking any action',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '10d',
                    question_id: '10',
                    text: 'Inform the client and leave immediately',
                    is_correct: false,
                    order_index: 4
                }
            ]
        }
    ],
    passing_score: 80,
    allow_retake: true,
    time_limit: 15
};
exports.default = quiz;
