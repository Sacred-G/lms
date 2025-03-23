"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz = {
    id: 'client-rights',
    lesson_id: 'client-rights-lesson',
    questions: [
        {
            id: '1',
            quiz_id: 'client-rights',
            text: 'What is a fundamental right that all clients have?',
            explanation: 'Dignity and respect is a fundamental right of all clients, regardless of their condition or circumstances.',
            order_index: 1,
            options: [
                {
                    id: '1a',
                    question_id: '1',
                    text: 'The right to be treated with dignity and respect',
                    is_correct: true,
                    order_index: 1
                },
                {
                    id: '1b',
                    question_id: '1',
                    text: 'The right to unlimited services',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '1c',
                    question_id: '1',
                    text: 'The right to choose their support staff',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '1d',
                    question_id: '1',
                    text: 'The right to refuse all medical treatment',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '2',
            quiz_id: 'client-rights',
            text: 'What does client confidentiality mean?',
            explanation: 'Client confidentiality means that personal and medical information about a client should not be shared with unauthorized individuals.',
            order_index: 2,
            options: [
                {
                    id: '2a',
                    question_id: '2',
                    text: 'Keeping all information about clients secret from everyone',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '2b',
                    question_id: '2',
                    text: 'Not sharing personal or medical information about clients with unauthorized individuals',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '2c',
                    question_id: '2',
                    text: 'Only discussing clients using their first names',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '2d',
                    question_id: '2',
                    text: 'Sharing information only with family members',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '3',
            quiz_id: 'client-rights',
            text: 'What is self-determination in the context of client rights?',
            explanation: 'Self-determination refers to the client\'s right to make their own choices about their care and daily life, which is a fundamental aspect of respecting their autonomy.',
            order_index: 3,
            options: [
                {
                    id: '3a',
                    question_id: '3',
                    text: 'The right to determine their own schedule',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '3b',
                    question_id: '3',
                    text: 'The right to make their own choices about their care and daily life',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '3c',
                    question_id: '3',
                    text: 'The right to choose their own support staff',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '3d',
                    question_id: '3',
                    text: 'The right to determine their own treatment plan without professional input',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '4',
            quiz_id: 'client-rights',
            text: 'What should you do if you suspect a client\'s rights are being violated?',
            explanation: 'Reporting suspected rights violations is a professional responsibility and helps protect clients from harm.',
            order_index: 4,
            options: [
                {
                    id: '4a',
                    question_id: '4',
                    text: 'Wait to see if it happens again before reporting',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '4b',
                    question_id: '4',
                    text: 'Confront the person violating the rights directly',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '4c',
                    question_id: '4',
                    text: 'Report it immediately to your supervisor or appropriate authority',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '4d',
                    question_id: '4',
                    text: 'Discuss it with other staff members to get their opinions',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '5',
            quiz_id: 'client-rights',
            text: 'Which law protects the privacy of health information?',
            explanation: 'The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that protects the privacy and security of health information.',
            order_index: 5,
            options: [
                {
                    id: '5a',
                    question_id: '5',
                    text: 'Americans with Disabilities Act (ADA)',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '5b',
                    question_id: '5',
                    text: 'Health Insurance Portability and Accountability Act (HIPAA)',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '5c',
                    question_id: '5',
                    text: 'Family and Medical Leave Act (FMLA)',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '5d',
                    question_id: '5',
                    text: 'Fair Housing Act (FHA)',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '6',
            quiz_id: 'client-rights',
            text: 'What does "freedom from discrimination" mean in the context of client rights?',
            explanation: 'Freedom from discrimination means that clients have the right to receive services without bias based on personal characteristics such as race, religion, gender, or disability.',
            order_index: 6,
            options: [
                {
                    id: '6a',
                    question_id: '6',
                    text: 'Clients can choose which staff members they want to work with',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '6b',
                    question_id: '6',
                    text: 'Clients have the right to receive services without discrimination based on race, religion, gender, disability, or other factors',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '6c',
                    question_id: '6',
                    text: 'Clients can refuse services for any reason',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '6d',
                    question_id: '6',
                    text: 'Clients must be treated exactly the same regardless of their individual needs',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '7',
            quiz_id: 'client-rights',
            text: 'How can support staff uphold client privacy in daily practice?',
            explanation: 'Knocking before entering private spaces, ensuring conversations about clients are not overheard, and securing personal information are all ways to uphold client privacy.',
            order_index: 7,
            options: [
                {
                    id: '7a',
                    question_id: '7',
                    text: 'By discussing client information only with other staff members',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '7b',
                    question_id: '7',
                    text: 'By keeping all doors open for safety reasons',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '7c',
                    question_id: '7',
                    text: 'By knocking before entering private spaces and ensuring conversations about clients are not overheard',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '7d',
                    question_id: '7',
                    text: 'By limiting client access to their own information',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '8',
            quiz_id: 'client-rights',
            text: 'What is the purpose of informed consent?',
            explanation: 'Informed consent ensures that clients understand and agree to services or treatments, which respects their autonomy and right to self-determination.',
            order_index: 8,
            options: [
                {
                    id: '8a',
                    question_id: '8',
                    text: 'To protect service providers from liability',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '8b',
                    question_id: '8',
                    text: 'To ensure clients understand and agree to services or treatments',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '8c',
                    question_id: '8',
                    text: 'To document that services were provided',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '8d',
                    question_id: '8',
                    text: 'To fulfill insurance requirements',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '9',
            quiz_id: 'client-rights',
            text: 'What constitutes abuse in a care setting?',
            explanation: 'Abuse can take many forms, including physical harm, emotional mistreatment, verbal attacks, financial exploitation, and neglect of basic needs.',
            order_index: 9,
            options: [
                {
                    id: '9a',
                    question_id: '9',
                    text: 'Only physical harm',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '9b',
                    question_id: '9',
                    text: 'Physical, emotional, verbal, financial harm, or neglect',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '9c',
                    question_id: '9',
                    text: 'Only actions that leave visible marks or injuries',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '9d',
                    question_id: '9',
                    text: 'Any action the client dislikes',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '10',
            quiz_id: 'client-rights',
            text: 'How should support staff respond if a client refuses care?',
            explanation: 'Respecting a client\'s right to refuse care while exploring alternatives and documenting the refusal balances client autonomy with duty of care.',
            order_index: 10,
            options: [
                {
                    id: '10a',
                    question_id: '10',
                    text: 'Insist that the care is necessary and proceed anyway',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '10b',
                    question_id: '10',
                    text: 'Respect their decision, explore alternatives, and document the refusal',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '10c',
                    question_id: '10',
                    text: 'Call family members to convince the client',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '10d',
                    question_id: '10',
                    text: 'Ignore the refusal if you believe the care is in their best interest',
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
