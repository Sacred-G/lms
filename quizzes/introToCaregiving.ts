import { Quiz } from './types';

const quiz: Quiz = {
  id: 'intro-to-caregiving',
  lesson_id: 'intro-to-caregiving-lesson',
  questions: [
    {
      id: '1',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the primary role of a support staff member?',
      explanation: 'Support staff provide comprehensive assistance while maintaining the dignity and independence of those they assist.',
      order_index: 1,
      options: [
        {
          id: '1a',
          question_id: '1',
          text: 'To provide comprehensive support while maintaining client dignity',
          is_correct: true,
          order_index: 1
        },
        {
          id: '1b',
          question_id: '1',
          text: 'To make medical decisions for clients',
          is_correct: false,
          order_index: 2
        },
        {
          id: '1c',
          question_id: '1',
          text: 'To replace family members',
          is_correct: false,
          order_index: 3
        },
        {
          id: '1d',
          question_id: '1',
          text: 'To prescribe medications',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '2',
      quiz_id: 'intro-to-caregiving',
      text: 'Which of the following is NOT typically a support staff responsibility?',
      explanation: 'Support staff assist with many tasks but do not prescribe medications or make medical diagnoses.',
      order_index: 2,
      options: [
        {
          id: '2a',
          question_id: '2',
          text: 'Helping with personal hygiene',
          is_correct: false,
          order_index: 1
        },
        {
          id: '2b',
          question_id: '2',
          text: 'Preparing meals',
          is_correct: false,
          order_index: 2
        },
        {
          id: '2c',
          question_id: '2',
          text: 'Diagnosing medical conditions',
          is_correct: true,
          order_index: 3
        },
        {
          id: '2d',
          question_id: '2',
          text: 'Providing emotional support',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '3',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the most important aspect of maintaining client dignity?',
      explanation: 'Respecting client preferences and choices helps maintain their dignity and sense of autonomy.',
      order_index: 3,
      options: [
        {
          id: '3a',
          question_id: '3',
          text: 'Making all decisions for them',
          is_correct: false,
          order_index: 1
        },
        {
          id: '3b',
          question_id: '3',
          text: 'Respecting their preferences and choices',
          is_correct: true,
          order_index: 2
        },
        {
          id: '3c',
          question_id: '3',
          text: 'Doing everything for them',
          is_correct: false,
          order_index: 3
        },
        {
          id: '3d',
          question_id: '3',
          text: 'Treating them like children',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '4',
      quiz_id: 'intro-to-caregiving',
      text: 'What should a support staff member do if they observe changes in a client\'s condition?',
      explanation: 'Proper documentation and reporting ensure continuity of care and appropriate medical attention.',
      order_index: 4,
      options: [
        {
          id: '4a',
          question_id: '4',
          text: 'Keep it to themselves',
          is_correct: false,
          order_index: 1
        },
        {
          id: '4b',
          question_id: '4',
          text: 'Wait to see if it gets worse',
          is_correct: false,
          order_index: 2
        },
        {
          id: '4c',
          question_id: '4',
          text: 'Document and report to appropriate healthcare providers',
          is_correct: true,
          order_index: 3
        },
        {
          id: '4d',
          question_id: '4',
          text: 'Try to treat it themselves',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '5',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the best approach to handling confidential information?',
      explanation: 'Maintaining client confidentiality is a fundamental ethical and legal requirement in support work.',
      order_index: 5,
      options: [
        {
          id: '5a',
          question_id: '5',
          text: 'Share it only with close family members',
          is_correct: false,
          order_index: 1
        },
        {
          id: '5b',
          question_id: '5',
          text: 'Discuss it with other support staff during breaks',
          is_correct: false,
          order_index: 2
        },
        {
          id: '5c',
          question_id: '5',
          text: 'Keep it strictly confidential and share only with authorized personnel',
          is_correct: true,
          order_index: 3
        },
        {
          id: '5d',
          question_id: '5',
          text: 'Post updates on social media',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '6',
      quiz_id: 'intro-to-caregiving',
      text: 'Which of the following is an example of promoting client independence?',
      explanation: 'Encouraging clients to do what they can for themselves promotes independence and maintains dignity.',
      order_index: 6,
      options: [
        {
          id: '6a',
          question_id: '6',
          text: 'Doing everything for the client to save time',
          is_correct: false,
          order_index: 1
        },
        {
          id: '6b',
          question_id: '6',
          text: 'Encouraging the client to perform tasks they are capable of doing',
          is_correct: true,
          order_index: 2
        },
        {
          id: '6c',
          question_id: '6',
          text: 'Making all decisions without consulting the client',
          is_correct: false,
          order_index: 3
        },
        {
          id: '6d',
          question_id: '6',
          text: 'Limiting client activities to prevent accidents',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '7',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the importance of cultural competence in support work?',
      explanation: 'Cultural competence ensures care is provided in a way that respects and accommodates the client\'s cultural background and preferences.',
      order_index: 7,
      options: [
        {
          id: '7a',
          question_id: '7',
          text: 'It helps support staff impose their own cultural values',
          is_correct: false,
          order_index: 1
        },
        {
          id: '7b',
          question_id: '7',
          text: 'It allows support staff to provide assistance that respects cultural differences',
          is_correct: true,
          order_index: 2
        },
        {
          id: '7c',
          question_id: '7',
          text: 'It is only important when assisting foreign clients',
          is_correct: false,
          order_index: 3
        },
        {
          id: '7d',
          question_id: '7',
          text: 'It has no significant impact on support quality',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '8',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the best way to handle a situation where a client refuses assistance?',
      explanation: 'Understanding the reason for refusal and finding alternatives respects client autonomy while ensuring needs are met.',
      order_index: 8,
      options: [
        {
          id: '8a',
          question_id: '8',
          text: 'Force the client to accept assistance',
          is_correct: false,
          order_index: 1
        },
        {
          id: '8b',
          question_id: '8',
          text: 'Wait to see if it gets worse',
          is_correct: false,
          order_index: 2
        },
        {
          id: '8c',
          question_id: '8',
          text: 'Document and report to appropriate healthcare providers',
          is_correct: true,
          order_index: 3
        },
        {
          id: '8d',
          question_id: '8',
          text: 'Try to treat it themselves',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '9',
      quiz_id: 'intro-to-caregiving',
      text: 'Which of the following is a key component of effective communication with clients?',
      explanation: 'Active listening demonstrates respect and ensures the support staff member fully understands the client\'s needs and preferences.',
      order_index: 9,
      options: [
        {
          id: '9a',
          question_id: '9',
          text: 'Speaking loudly to all clients',
          is_correct: false,
          order_index: 1
        },
        {
          id: '9b',
          question_id: '9',
          text: 'Using complex medical terminology',
          is_correct: false,
          order_index: 2
        },
        {
          id: '9c',
          question_id: '9',
          text: 'Active listening and appropriate responses',
          is_correct: true,
          order_index: 3
        },
        {
          id: '9d',
          question_id: '9',
          text: 'Minimizing conversation to save time',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '10',
      quiz_id: 'intro-to-caregiving',
      text: 'What is the importance of self-care for support staff?',
      explanation: 'Self-care prevents burnout and ensures support staff can continue to provide quality assistance to their clients.',
      order_index: 10,
      options: [
        {
          id: '10a',
          question_id: '10',
          text: 'It is unnecessary as client care always comes first',
          is_correct: false,
          order_index: 1
        },
        {
          id: '10b',
          question_id: '10',
          text: 'It prevents burnout and ensures continued quality support',
          is_correct: true,
          order_index: 2
        },
        {
          id: '10c',
          question_id: '10',
          text: 'It is only important for new support staff',
          is_correct: false,
          order_index: 3
        },
        {
          id: '10d',
          question_id: '10',
          text: 'It should only be practiced during vacation time',
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

export default quiz;