"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz = {
    id: 'emergency-procedures',
    lesson_id: 'emergency-procedures-lesson',
    questions: [
        {
            id: '1',
            quiz_id: 'emergency-procedures',
            text: 'What is the first thing you should do in the case of a medical emergency?',
            explanation: 'Calling for emergency services ensures professional help arrives as quickly as possible.',
            order_index: 1,
            options: [
                {
                    id: '1a',
                    question_id: '1',
                    text: 'Try to handle the situation on your own',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '1b',
                    question_id: '1',
                    text: 'Call for emergency services immediately',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '1c',
                    question_id: '1',
                    text: 'Ignore the situation if the client seems okay',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '1d',
                    question_id: '1',
                    text: 'Wait for the family to arrive and handle the situation',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '2',
            quiz_id: 'emergency-procedures',
            text: 'How should you react if a client falls and appears to be injured?',
            explanation: 'Assessing injuries before moving the client prevents further harm that could occur from improper movement.',
            order_index: 2,
            options: [
                {
                    id: '2a',
                    question_id: '2',
                    text: 'Move them immediately to a more comfortable position',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '2b',
                    question_id: '2',
                    text: 'Call for medical assistance, check for injuries, and avoid moving them unless necessary',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '2c',
                    question_id: '2',
                    text: 'Leave them where they are and continue working',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '2d',
                    question_id: '2',
                    text: 'Encourage them to get up on their own',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '3',
            quiz_id: 'emergency-procedures',
            text: 'Which of the following is considered an emergency situation that requires immediate attention?',
            explanation: 'Chest pain and shortness of breath can be signs of serious cardiac or respiratory issues requiring immediate medical attention.',
            order_index: 3,
            options: [
                {
                    id: '3a',
                    question_id: '3',
                    text: 'A client expressing mild pain or discomfort',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '3b',
                    question_id: '3',
                    text: 'A client experiencing shortness of breath or chest pain',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '3c',
                    question_id: '3',
                    text: 'A client asking for a change in routine',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '3d',
                    question_id: '3',
                    text: 'A client needing help with personal care tasks',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '4',
            quiz_id: 'emergency-procedures',
            text: 'If you notice a client is having trouble breathing, what should you do first?',
            explanation: 'Difficulty breathing can indicate a serious medical emergency that requires immediate professional intervention.',
            order_index: 4,
            options: [
                {
                    id: '4a',
                    question_id: '4',
                    text: 'Wait for the client to feel better on their own',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '4b',
                    question_id: '4',
                    text: 'Call for emergency help immediately and try to keep the client calm',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '4c',
                    question_id: '4',
                    text: 'Offer them a drink of water',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '4d',
                    question_id: '4',
                    text: 'Try to administer oxygen if you\'re not trained',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '5',
            quiz_id: 'emergency-procedures',
            text: 'What should you do if a client experiences a stroke (e.g., slurred speech, weakness on one side)?',
            explanation: 'Stroke symptoms require immediate emergency medical attention to minimize brain damage and increase chances of recovery.',
            order_index: 5,
            options: [
                {
                    id: '5a',
                    question_id: '5',
                    text: 'Wait for the symptoms to go away',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '5b',
                    question_id: '5',
                    text: 'Call emergency services immediately and stay with the client',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '5c',
                    question_id: '5',
                    text: 'Let the family handle the situation',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '5d',
                    question_id: '5',
                    text: 'Try to help the client walk around',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '6',
            quiz_id: 'emergency-procedures',
            text: 'Which of the following is the proper procedure for handling a fire emergency?',
            explanation: 'Client safety is the priority in a fire emergency, followed by alerting emergency services.',
            order_index: 6,
            options: [
                {
                    id: '6a',
                    question_id: '6',
                    text: 'Stay in the home and try to put out the fire',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '6b',
                    question_id: '6',
                    text: 'Evacuate the client immediately, call emergency services, and use a fire extinguisher if necessary',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '6c',
                    question_id: '6',
                    text: 'Lock all doors and wait for help',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '6d',
                    question_id: '6',
                    text: 'Let the client handle the fire themselves',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '7',
            quiz_id: 'emergency-procedures',
            text: 'What should you do if a client is unresponsive?',
            explanation: 'Unresponsiveness requires immediate emergency response and CPR if the client is not breathing normally.',
            order_index: 7,
            options: [
                {
                    id: '7a',
                    question_id: '7',
                    text: 'Call emergency services immediately, check their pulse, and begin CPR if needed',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '7b',
                    question_id: '7',
                    text: 'Wait for the client to regain consciousness',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '7c',
                    question_id: '7',
                    text: 'Gently wake them up and offer them a snack',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '7d',
                    question_id: '7',
                    text: 'Leave the room and notify the family',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '8',
            quiz_id: 'emergency-procedures',
            text: 'How do you handle a situation where a client is choking?',
            explanation: 'The Heimlich maneuver or back blows are appropriate first aid responses to choking that can dislodge airway obstructions.',
            order_index: 8,
            options: [
                {
                    id: '8a',
                    question_id: '8',
                    text: 'Perform the Heimlich maneuver or back blows if trained, and call emergency services',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '8b',
                    question_id: '8',
                    text: 'Let the client cough and clear the blockage on their own',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '8c',
                    question_id: '8',
                    text: 'Give the client water immediately',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '8d',
                    question_id: '8',
                    text: 'Wait for the client to ask for help',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '9',
            quiz_id: 'emergency-procedures',
            text: 'What should be included in the emergency contact information for each client?',
            explanation: 'Comprehensive emergency contact information ensures the right people are notified and appropriate medical care is provided.',
            order_index: 9,
            options: [
                {
                    id: '9a',
                    question_id: '9',
                    text: 'Family members, doctor, and emergency services phone numbers',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '9b',
                    question_id: '9',
                    text: 'Only the client\'s address',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '9c',
                    question_id: '9',
                    text: 'Only the client\'s social security number',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '9d',
                    question_id: '9',
                    text: 'Family pets\' contact information',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '10',
            quiz_id: 'emergency-procedures',
            text: 'In case of an emergency, why is it important to know the client\'s medical history?',
            explanation: 'Medical history provides critical context for emergency responders about conditions, medications, and allergies that may impact treatment.',
            order_index: 10,
            options: [
                {
                    id: '10a',
                    question_id: '10',
                    text: 'To assist in making decisions during the emergency',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '10b',
                    question_id: '10',
                    text: 'To discuss it with the family',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '10c',
                    question_id: '10',
                    text: 'To know what medications they have been prescribed',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '10d',
                    question_id: '10',
                    text: 'All of the above',
                    is_correct: true,
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
