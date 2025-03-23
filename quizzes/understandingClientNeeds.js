"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz = {
    id: 'understanding-client-needs',
    lesson_id: 'understanding-client-needs-lesson',
    questions: [
        {
            id: '1',
            quiz_id: 'understanding-client-needs',
            text: 'What is the best way to learn about a client\'s preferences for assistance?',
            explanation: 'Direct communication with clients and their family members is the most effective way to understand their unique preferences and needs.',
            order_index: 1,
            options: [
                {
                    id: '1a',
                    question_id: '1',
                    text: 'Follow the care plan strictly without asking for feedback',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '1b',
                    question_id: '1',
                    text: 'Ask the client or their family members about their preferences',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '1c',
                    question_id: '1',
                    text: 'Guess what they might like based on previous clients',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '1d',
                    question_id: '1',
                    text: 'Follow the same routine for all clients regardless of preference',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '2',
            quiz_id: 'understanding-client-needs',
            text: 'Which of the following is considered a "personal care" task?',
            explanation: 'Bathing and grooming are essential personal care tasks that directly relate to a client\'s hygiene and physical wellbeing.',
            order_index: 2,
            options: [
                {
                    id: '2a',
                    question_id: '2',
                    text: 'Managing medication',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '2b',
                    question_id: '2',
                    text: 'Bathing and grooming',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '2c',
                    question_id: '2',
                    text: 'Handling financial matters',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '2d',
                    question_id: '2',
                    text: 'Cooking meals',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '3',
            quiz_id: 'understanding-client-needs',
            text: 'What is one way to support a client with mobility challenges?',
            explanation: 'Mobility aids like canes and walkers help clients maintain independence while ensuring safety during movement.',
            order_index: 3,
            options: [
                {
                    id: '3a',
                    question_id: '3',
                    text: 'Provide physical therapy exercises without consulting a physician',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '3b',
                    question_id: '3',
                    text: 'Encourage the client to walk independently without assistance',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '3c',
                    question_id: '3',
                    text: 'Help with walking aids like canes or walkers as needed',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '3d',
                    question_id: '3',
                    text: 'Always carry the client from place to place',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '4',
            quiz_id: 'understanding-client-needs',
            text: 'How should you approach a client who is hesitant about receiving assistance with personal care?',
            explanation: 'Respecting autonomy while explaining the importance of care helps build trust and encourages client cooperation.',
            order_index: 4,
            options: [
                {
                    id: '4a',
                    question_id: '4',
                    text: 'Be firm and insist they follow the routine',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '4b',
                    question_id: '4',
                    text: 'Explain why the task is important, but respect their autonomy',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '4c',
                    question_id: '4',
                    text: 'Avoid assisting them and let them manage on their own',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '4d',
                    question_id: '4',
                    text: 'Wait for them to ask for help before offering assistance',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '5',
            quiz_id: 'understanding-client-needs',
            text: 'Why is it important to understand a client\'s likes and dislikes?',
            explanation: 'Understanding preferences shows respect and helps create a comfortable environment that promotes the client\'s wellbeing.',
            order_index: 5,
            options: [
                {
                    id: '5a',
                    question_id: '5',
                    text: 'It allows you to make the client feel more at ease and respected',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '5b',
                    question_id: '5',
                    text: 'It makes support tasks go faster',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '5c',
                    question_id: '5',
                    text: 'It reduces the need for formal medical interventions',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '5d',
                    question_id: '5',
                    text: 'It helps you organize the support staff schedule',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '6',
            quiz_id: 'understanding-client-needs',
            text: 'What is an example of an activity that could be helpful for a client with cognitive impairment?',
            explanation: 'Familiar activities like music can provide comfort, stimulation, and emotional connection for clients with cognitive impairments.',
            order_index: 6,
            options: [
                {
                    id: '6a',
                    question_id: '6',
                    text: 'Teaching them new complex skills',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '6b',
                    question_id: '6',
                    text: 'Engaging in simple and familiar activities, like listening to music',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '6c',
                    question_id: '6',
                    text: 'Ignoring them until they show signs of discomfort',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '6d',
                    question_id: '6',
                    text: 'Discouraging any kind of social interaction',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '7',
            quiz_id: 'understanding-client-needs',
            text: 'How can you ensure that a client feels comfortable with you as their support staff?',
            explanation: 'Professional behavior and respecting boundaries builds trust and helps clients feel safe and comfortable.',
            order_index: 7,
            options: [
                {
                    id: '7a',
                    question_id: '7',
                    text: 'By maintaining professionalism and respecting their boundaries',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '7b',
                    question_id: '7',
                    text: 'By only following the care plan and not offering personal conversation',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '7c',
                    question_id: '7',
                    text: 'By allowing the client to perform all tasks independently',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '7d',
                    question_id: '7',
                    text: 'By not interacting with family members or friends',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '8',
            quiz_id: 'understanding-client-needs',
            text: 'What should you do if a client has dietary restrictions?',
            explanation: 'Following care plans and client preferences regarding diet is essential for health, safety, and respecting personal choices.',
            order_index: 8,
            options: [
                {
                    id: '8a',
                    question_id: '8',
                    text: 'Ignore the restrictions and prepare what\'s easiest',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '8b',
                    question_id: '8',
                    text: 'Follow the care plan and communicate with the client about their food preferences',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '8c',
                    question_id: '8',
                    text: 'Never prepare food, even if it\'s part of the care plan',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '8d',
                    question_id: '8',
                    text: 'Always ask the family for instructions every time you prepare a meal',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '9',
            quiz_id: 'understanding-client-needs',
            text: 'How should you approach a client\'s care if they prefer a different routine than the care plan outlines?',
            explanation: 'Discussing differences with supervisors allows for potential adjustments while ensuring care standards are maintained.',
            order_index: 9,
            options: [
                {
                    id: '9a',
                    question_id: '9',
                    text: 'Ignore their preference and stick to the care plan',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '9b',
                    question_id: '9',
                    text: 'Discuss the difference with the supervisor and see if adjustments can be made',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '9c',
                    question_id: '9',
                    text: 'Follow the client\'s routine regardless of the care plan',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '9d',
                    question_id: '9',
                    text: 'Discuss with the family, but make no changes to your caregiving',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '10',
            quiz_id: 'understanding-client-needs',
            text: 'Why is it important to provide emotional support, especially for clients who live alone?',
            explanation: 'Emotional support helps clients maintain mental wellbeing and can prevent feelings of isolation and depression.',
            order_index: 10,
            options: [
                {
                    id: '10a',
                    question_id: '10',
                    text: 'It helps clients feel more connected and supported',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '10b',
                    question_id: '10',
                    text: 'Emotional support isn\'t necessary as long as physical tasks are completed',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '10c',
                    question_id: '10',
                    text: 'It can reduce the need for any further support',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '10d',
                    question_id: '10',
                    text: 'It only matters for clients with visible medical conditions',
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
