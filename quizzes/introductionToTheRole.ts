import { Quiz } from './types';

const quiz: Quiz = {
  id: 'introduction-to-the-role',
  lesson_id: 'introduction-lesson',
  questions: [
    {
      id: '1',
      quiz_id: 'introduction-to-the-role',
      text: 'What is the central aim of supportive living, as described in the video?',
      explanation: 'Supportive living focuses on empowering individuals to maintain their independence while receiving the necessary support at home, rather than providing complete medical care or encouraging transitions to more intensive care facilities.',
      order_index: 1,
      options: [
        {
          id: '1a',
          question_id: '1',
          text: 'To offer complete medical care within the client\'s home.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '1b',
          question_id: '1',
          text: 'To empower individuals to maintain their independence while receiving the necessary support at home.',
          is_correct: true,
          order_index: 2
        },
        {
          id: '1c',
          question_id: '1',
          text: 'To encourage clients to transition to more intensive care facilities.',
          is_correct: false,
          order_index: 3
        },
        {
          id: '1d',
          question_id: '1',
          text: 'To take over all daily tasks for clients to ease their burden.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '2',
      quiz_id: 'introduction-to-the-role',
      text: 'According to the video, which of the following tasks falls outside the typical responsibilities of a support staff member?',
      explanation: 'Administering medications directly falls outside the typical responsibilities of a support staff member. Support staff can provide medication reminders but should not directly administer medications, as this requires specialized training and certification.',
      order_index: 2,
      options: [
        {
          id: '2a',
          question_id: '2',
          text: 'Providing medication reminders.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '2b',
          question_id: '2',
          text: 'Assisting with personal care.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '2c',
          question_id: '2',
          text: 'Administering medications directly.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '2d',
          question_id: '2',
          text: 'Helping with meal preparation.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '3',
      quiz_id: 'introduction-to-the-role',
      text: 'What is highlighted as a key principle when support staff provide mobility assistance to clients?',
      explanation: 'When providing mobility assistance, it\'s crucial to encourage clients to perform as much of the movement as they are able, rather than doing everything for them. This promotes independence and maintains the client\'s physical abilities.',
      order_index: 3,
      options: [
        {
          id: '3a',
          question_id: '3',
          text: 'Ensuring the task is completed as quickly as possible.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '3b',
          question_id: '3',
          text: 'Encouraging the client to perform as much of the movement as they are able.',
          is_correct: true,
          order_index: 2
        },
        {
          id: '3c',
          question_id: '3',
          text: 'Using maximum physical support to prevent any risk of falls.',
          is_correct: false,
          order_index: 3
        },
        {
          id: '3d',
          question_id: '3',
          text: 'Following a standardized mobility assistance protocol for all clients.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '4',
      quiz_id: 'introduction-to-the-role',
      text: 'When assisting with personal care, the video emphasizes the importance of always prioritizing the client\'s:',
      explanation: 'When assisting with personal care, it\'s essential to always prioritize the client\'s dignity and privacy. This shows respect for the client as an individual and helps maintain their sense of self-worth during potentially sensitive care activities.',
      order_index: 4,
      options: [
        {
          id: '4a',
          question_id: '4',
          text: 'Efficiency in completing the task.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '4b',
          question_id: '4',
          text: 'Adherence to a strict hygiene schedule.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '4c',
          question_id: '4',
          text: 'Dignity and privacy.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '4d',
          question_id: '4',
          text: 'Willingness to accept assistance.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '5',
      quiz_id: 'introduction-to-the-role',
      text: 'The video suggests that for clients who may experience loneliness due to a lack of regular visitors, the support staff can make a significant difference by providing:',
      explanation: 'Support staff can make a significant difference for clients experiencing loneliness by providing friendly and engaging companionship, which addresses the social and emotional needs that are just as important as physical care.',
      order_index: 5,
      options: [
        {
          id: '5a',
          question_id: '5',
          text: 'Professional medical evaluations.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '5b',
          question_id: '5',
          text: 'Assistance with complex financial matters.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '5c',
          question_id: '5',
          text: 'Friendly and engaging companionship.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '5d',
          question_id: '5',
          text: 'Detailed reports on their medical history.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '6',
      quiz_id: 'introduction-to-the-role',
      text: 'If a client expresses that they do not want help with a particular task on a given day, what does the video advise support staff to do?',
      explanation: 'When a client refuses assistance with a task, support staff should respect their decision while considering alternative approaches or trying again later. This balances respect for client autonomy with ensuring their needs are met.',
      order_index: 6,
      options: [
        {
          id: '6a',
          question_id: '6',
          text: 'Insist on completing the task as it is part of the daily schedule.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '6b',
          question_id: '6',
          text: 'Immediately report the client\'s refusal to their supervisor.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '6c',
          question_id: '6',
          text: 'Respect the client\'s decision and consider trying again later or offering an alternative approach.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '6d',
          question_id: '6',
          text: 'Document the refusal and do not offer assistance again for that task.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '7',
      quiz_id: 'introduction-to-the-role',
      text: 'According to the video, the typical clients served in supportive living environments are:',
      explanation: 'Supportive living environments typically serve adults over the age of 18 who are recovering from illness or injury or managing chronic conditions, rather than children or individuals requiring continuous medical monitoring.',
      order_index: 7,
      options: [
        {
          id: '7a',
          question_id: '7',
          text: 'Children and adolescents with developmental disabilities.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '7b',
          question_id: '7',
          text: 'Individuals requiring continuous, round-the-clock medical monitoring.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '7c',
          question_id: '7',
          text: 'Adults over the age of 18 who are recovering from illness or injury or managing chronic conditions.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '7d',
          question_id: '7',
          text: 'Elderly individuals who are completely unable to care for themselves.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '8',
      quiz_id: 'introduction-to-the-role',
      text: 'Which of the following is explicitly mentioned in the video as being outside the scope of a support staff member\'s role?',
      explanation: 'Diagnosing medical conditions is explicitly mentioned as being outside the scope of a support staff member\'s role, as this requires specialized medical training and is the responsibility of healthcare professionals.',
      order_index: 8,
      options: [
        {
          id: '8a',
          question_id: '8',
          text: 'Providing light housekeeping services.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '8b',
          question_id: '8',
          text: 'Offering transportation to medical appointments.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '8c',
          question_id: '8',
          text: 'Diagnosing medical conditions.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '8d',
          question_id: '8',
          text: 'Reminding clients to take their prescribed medications.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '9',
      quiz_id: 'introduction-to-the-role',
      text: 'The video emphasizes that a fundamental aspect of providing support in supportive living is to have your approach guided by:',
      explanation: 'A fundamental aspect of providing support in supportive living is to have your approach guided by the client\'s individual preferences and routines, rather than standardized care plans or the support staff\'s personal philosophies.',
      order_index: 9,
      options: [
        {
          id: '9a',
          question_id: '9',
          text: 'The support staff member\'s personal care philosophies.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '9b',
          question_id: '9',
          text: 'The most efficient methods for completing daily tasks.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '9c',
          question_id: '9',
          text: 'The client\'s individual preferences and routines.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '9d',
          question_id: '9',
          text: 'Standardized care plans that apply to all clients.',
          is_correct: false,
          order_index: 4
        }
      ]
    },
    {
      id: '10',
      quiz_id: 'introduction-to-the-role',
      text: 'What positive impact does the video associate with support staff being a friendly and engaging presence for clients?',
      explanation: 'The video associates support staff being a friendly and engaging presence with significantly combating loneliness, which is an important aspect of emotional wellbeing for clients who may not have regular visitors.',
      order_index: 10,
      options: [
        {
          id: '10a',
          question_id: '10',
          text: 'It reduces the client\'s reliance on medical professionals.',
          is_correct: false,
          order_index: 1
        },
        {
          id: '10b',
          question_id: '10',
          text: 'It ensures that all required physical tasks are completed more efficiently.',
          is_correct: false,
          order_index: 2
        },
        {
          id: '10c',
          question_id: '10',
          text: 'It can significantly combat loneliness.',
          is_correct: true,
          order_index: 3
        },
        {
          id: '10d',
          question_id: '10',
          text: 'It allows support staff to provide informal medical advice.',
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
