"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz = {
    id: 'communication-basics',
    lesson_id: 'communication-basics-lesson',
    questions: [
        {
            id: '1',
            quiz_id: 'communication-basics',
            text: 'What is active listening?',
            explanation: 'Active listening involves full engagement and understanding of the speaker.',
            order_index: 1,
            options: [
                {
                    id: '1a',
                    question_id: '1',
                    text: 'Interrupting to share your opinion',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '1b',
                    question_id: '1',
                    text: 'Thinking about your response while others speak',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '1c',
                    question_id: '1',
                    text: 'Fully focusing on the speaker and providing appropriate feedback',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '1d',
                    question_id: '1',
                    text: 'Simply staying quiet',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '2',
            quiz_id: 'communication-basics',
            text: 'What is the best way to handle sensitive information?',
            explanation: 'Confidentiality is crucial in caregiving to maintain trust and professional relationships.',
            order_index: 2,
            options: [
                {
                    id: '2a',
                    question_id: '2',
                    text: 'Share it only with close colleagues',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '2b',
                    question_id: '2',
                    text: 'Maintain strict confidentiality and follow privacy protocols',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '2c',
                    question_id: '2',
                    text: 'Document it in a public log',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '2d',
                    question_id: '2',
                    text: 'Tell family members immediately',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '3',
            quiz_id: 'communication-basics',
            text: 'How should you handle communication barriers?',
            explanation: 'Adapting communication methods ensures effective understanding despite barriers.',
            order_index: 3,
            options: [
                {
                    id: '3a',
                    question_id: '3',
                    text: 'Speak louder to overcome barriers',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '3b',
                    question_id: '3',
                    text: 'Give up if initial attempts fail',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '3c',
                    question_id: '3',
                    text: 'Use appropriate alternative communication methods',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '3d',
                    question_id: '3',
                    text: 'Ignore the barriers',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '4',
            quiz_id: 'communication-basics',
            text: 'What is the importance of non-verbal communication in caregiving?',
            explanation: 'Non-verbal cues often convey more information than words alone and are essential for understanding clients fully.',
            order_index: 4,
            options: [
                {
                    id: '4a',
                    question_id: '4',
                    text: 'It is less important than verbal communication',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '4b',
                    question_id: '4',
                    text: 'It can convey emotions and needs that clients may not express verbally',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '4c',
                    question_id: '4',
                    text: 'It should be ignored in professional settings',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '4d',
                    question_id: '4',
                    text: 'It is only relevant for clients who cannot speak',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '5',
            quiz_id: 'communication-basics',
            text: 'What is the best approach when communicating with a client who has hearing impairment?',
            explanation: 'Facing the client and speaking clearly facilitates lip reading and improves communication effectiveness.',
            order_index: 5,
            options: [
                {
                    id: '5a',
                    question_id: '5',
                    text: 'Speak very loudly at all times',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '5b',
                    question_id: '5',
                    text: 'Face the client, speak clearly, and use visual cues when appropriate',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '5c',
                    question_id: '5',
                    text: 'Communicate primarily through written notes',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '5d',
                    question_id: '5',
                    text: 'Speak to family members instead of directly to the client',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '6',
            quiz_id: 'communication-basics',
            text: 'How should you communicate with healthcare team members about a client\'s condition?',
            explanation: 'Clear, factual communication ensures accurate information transfer and appropriate care decisions.',
            order_index: 6,
            options: [
                {
                    id: '6a',
                    question_id: '6',
                    text: 'Share only general impressions',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '6b',
                    question_id: '6',
                    text: 'Provide clear, factual information using appropriate terminology',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '6c',
                    question_id: '6',
                    text: 'Include personal opinions about the client\'s family',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '6d',
                    question_id: '6',
                    text: 'Minimize communication to respect privacy',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '7',
            quiz_id: 'communication-basics',
            text: 'What is the best way to communicate with a client who has dementia?',
            explanation: 'Simple, direct communication with minimal distractions helps clients with dementia process information more effectively.',
            order_index: 7,
            options: [
                {
                    id: '7a',
                    question_id: '7',
                    text: 'Use complex sentences to stimulate their brain',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '7b',
                    question_id: '7',
                    text: 'Speak to them as you would to a child',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '7c',
                    question_id: '7',
                    text: 'Use simple, direct sentences and minimize distractions',
                    is_correct: true,
                    order_index: 3
                },
                {
                    id: '7d',
                    question_id: '7',
                    text: 'Avoid eye contact to prevent confusion',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '8',
            quiz_id: 'communication-basics',
            text: 'What is the purpose of documentation in caregiving?',
            explanation: 'Proper documentation ensures continuity of care and provides a legal record of services provided.',
            order_index: 8,
            options: [
                {
                    id: '8a',
                    question_id: '8',
                    text: 'To create extra work for caregivers',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '8b',
                    question_id: '8',
                    text: 'To ensure continuity of care and maintain legal records',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '8c',
                    question_id: '8',
                    text: 'To evaluate caregiver performance only',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '8d',
                    question_id: '8',
                    text: 'To share with the client\'s neighbors',
                    is_correct: false,
                    order_index: 4
                }
            ]
        },
        {
            id: '9',
            quiz_id: 'communication-basics',
            text: 'How should you respond when a client expresses frustration or anger?',
            explanation: 'Remaining calm and acknowledging feelings helps de-escalate situations and maintains therapeutic relationships.',
            order_index: 9,
            options: [
                {
                    id: '9a',
                    question_id: '9',
                    text: 'Respond with equal frustration to show you understand',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '9b',
                    question_id: '9',
                    text: 'Ignore their feelings and continue with tasks',
                    is_correct: false,
                    order_index: 2
                },
                {
                    id: '9c',
                    question_id: '9',
                    text: 'Leave immediately to avoid conflict',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '9d',
                    question_id: '9',
                    text: 'Remain calm, acknowledge their feelings, and listen actively',
                    is_correct: true,
                    order_index: 4
                }
            ]
        },
        {
            id: '10',
            quiz_id: 'communication-basics',
            text: 'What is cultural competence in caregiving communication?',
            explanation: 'Cultural competence involves understanding and respecting cultural differences to provide appropriate care.',
            order_index: 10,
            options: [
                {
                    id: '10a',
                    question_id: '10',
                    text: 'Speaking multiple languages',
                    is_correct: false,
                    order_index: 1
                },
                {
                    id: '10b',
                    question_id: '10',
                    text: 'Understanding and respecting cultural differences in communication and care preferences',
                    is_correct: true,
                    order_index: 2
                },
                {
                    id: '10c',
                    question_id: '10',
                    text: 'Treating all clients exactly the same regardless of background',
                    is_correct: false,
                    order_index: 3
                },
                {
                    id: '10d',
                    question_id: '10',
                    text: 'Avoiding clients from different cultural backgrounds',
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
