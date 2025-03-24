import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Course from '../models/course.model';
import Section from '../models/section.model';
import Quiz from '../models/quiz.model';
import { Scenario, DragDropExercise, RolePlayExercise } from '../models/interactive.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB for creating supervisor course');
    createSupervisorCourse();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const createSupervisorCourse = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }

    console.log('Found admin user:', admin.name);

    // Create supervisor course
    const course = await Course.create({
      title: 'Supervisor Training',
      description: 'Comprehensive training for supervisors managing support staff working with individuals with developmental disabilities.',
      coverImage: '/images/supervisor-cover.jpg',
      createdBy: admin._id,
    });

    console.log('Created supervisor course');

    // Create sections
    const sections = [
      {
        title: 'Introduction to Supervision',
        description: 'Learn about your role as a supervisor and the impact you can make.',
        content: `
          <h2>Welcome to Your Role as a Supervisor</h2>
          <p>As a supervisor for support staff working with individuals with developmental disabilities, you play a crucial role in ensuring quality care and promoting a positive work environment. This section will introduce you to your responsibilities and the importance of your leadership.</p>
          
          <h3>The Importance of Effective Supervision</h3>
          <p>Effective supervision is essential for maintaining high-quality support services. Supervisors provide guidance, support, and accountability to ensure that staff members have the resources and knowledge they need to perform their roles effectively.</p>
          
          <h3>Core Values in Supervision</h3>
          <ul>
            <li><strong>Leadership:</strong> Providing clear direction and modeling best practices.</li>
            <li><strong>Support:</strong> Creating a supportive environment where staff feel valued and empowered.</li>
            <li><strong>Accountability:</strong> Ensuring that standards are maintained and expectations are met.</li>
            <li><strong>Development:</strong> Fostering growth and learning among staff members.</li>
          </ul>

          <h3>Understanding the Supervisor's Role</h3>
          <p>Supervisors in disability support services have a multifaceted role that includes:</p>
          <ul>
            <li><strong>Staff Management:</strong> Recruiting, training, scheduling, and evaluating staff.</li>
            <li><strong>Quality Assurance:</strong> Monitoring service delivery and ensuring compliance with regulations.</li>
            <li><strong>Problem-Solving:</strong> Addressing challenges and finding solutions to improve services.</li>
            <li><strong>Communication:</strong> Facilitating effective communication among staff, clients, families, and other stakeholders.</li>
            <li><strong>Advocacy:</strong> Advocating for the needs of both staff and clients.</li>
          </ul>
          
          <h3>Balancing Administrative and Supportive Functions</h3>
          <p>One of the key challenges for supervisors is balancing administrative responsibilities with supportive functions:</p>
          <ul>
            <li><strong>Administrative Functions:</strong> Scheduling, documentation, compliance monitoring, budget management.</li>
            <li><strong>Supportive Functions:</strong> Coaching, mentoring, team building, conflict resolution, staff development.</li>
          </ul>
          <p>Finding the right balance between these functions is essential for effective supervision. Too much focus on administrative tasks can lead to a lack of support for staff, while too little attention to administrative responsibilities can result in compliance issues and operational problems.</p>
          
          <h3>Ethical Considerations in Supervision</h3>
          <p>Supervisors must navigate various ethical considerations, including:</p>
          <ul>
            <li><strong>Confidentiality:</strong> Maintaining appropriate boundaries regarding client and staff information.</li>
            <li><strong>Fairness:</strong> Treating all staff equitably and avoiding favoritism.</li>
            <li><strong>Boundaries:</strong> Maintaining professional relationships with staff while providing support.</li>
            <li><strong>Dual Relationships:</strong> Managing situations where supervisors may have multiple roles with staff members.</li>
          </ul>
          
          <h3>The Impact of Effective Supervision</h3>
          <p>Research has shown that effective supervision leads to:</p>
          <ul>
            <li>Improved staff retention and job satisfaction</li>
            <li>Higher quality of services for clients</li>
            <li>Better outcomes for individuals receiving support</li>
            <li>Reduced incidents and liability concerns</li>
            <li>More efficient use of resources</li>
          </ul>
          
          <h3>Supervision Styles and Approaches</h3>
          <p>Different situations may call for different supervision styles:</p>
          <ul>
            <li><strong>Directive:</strong> Providing clear instructions and close oversight, often used with new staff or in crisis situations.</li>
            <li><strong>Supportive:</strong> Focusing on encouragement and emotional support, helpful during challenging periods.</li>
            <li><strong>Collaborative:</strong> Working together with staff to solve problems and make decisions, effective with experienced staff.</li>
            <li><strong>Delegative:</strong> Giving staff autonomy to make decisions, appropriate for highly skilled and motivated staff.</li>
          </ul>
          <p>Effective supervisors adapt their style based on the staff member's experience, the situation, and the task at hand.</p>
        `,
        videoUrl: 'https://youtu.be/example-supervisor-intro',
        audioUrl: '/audio/introduction-to-supervision.wav',
        order: 1,
        course: course._id,
      },
      {
        title: 'Staff Recruitment and Retention',
        description: 'Learn strategies for recruiting and retaining quality support staff.',
        content: `
          <h2>Staff Recruitment and Retention</h2>
          <p>Recruiting and retaining qualified support staff is one of the most significant challenges facing supervisors in disability services. This section will provide strategies for effective recruitment and retention.</p>
          
          <h3>The Recruitment Challenge</h3>
          <p>The disability support sector often faces challenges in recruitment, including:</p>
          <ul>
            <li>Competitive job market with limited candidate pool</li>
            <li>Demanding work with relatively low compensation</li>
            <li>High turnover rates industry-wide</li>
            <li>Need for specific skills and qualities</li>
          </ul>
          
          <h3>Effective Recruitment Strategies</h3>
          <p>To attract qualified candidates, consider the following strategies:</p>
          <ul>
            <li><strong>Clear Job Descriptions:</strong> Develop detailed job descriptions that accurately reflect the role's responsibilities and requirements.</li>
            <li><strong>Multiple Recruitment Channels:</strong> Utilize various channels including online job boards, social media, community organizations, and educational institutions.</li>
            <li><strong>Employee Referrals:</strong> Encourage current staff to refer qualified candidates, possibly with incentives for successful hires.</li>
            <li><strong>Targeted Outreach:</strong> Connect with educational programs, workforce development agencies, and community organizations that may have potential candidates.</li>
            <li><strong>Highlighting Benefits:</strong> Emphasize the meaningful nature of the work, professional development opportunities, and any unique benefits of your organization.</li>
          </ul>
          
          <h3>The Selection Process</h3>
          <p>An effective selection process includes:</p>
          <ul>
            <li><strong>Screening Applications:</strong> Review applications for basic qualifications and red flags.</li>
            <li><strong>Structured Interviews:</strong> Use consistent questions that assess both technical skills and personal qualities.</li>
            <li><strong>Scenario-Based Questions:</strong> Present realistic scenarios to assess problem-solving abilities and values alignment.</li>
            <li><strong>Multiple Perspectives:</strong> Involve team members and possibly clients in the interview process.</li>
            <li><strong>Reference Checks:</strong> Thoroughly check references to verify experience and performance.</li>
            <li><strong>Background Checks:</strong> Conduct appropriate background checks as required by regulations.</li>
          </ul>
          
          <h3>Qualities to Look for in Support Staff</h3>
          <p>When selecting candidates, consider these key qualities:</p>
          <ul>
            <li><strong>Empathy and Compassion:</strong> Genuine care for others and ability to understand different perspectives.</li>
            <li><strong>Reliability and Dependability:</strong> Consistent attendance and follow-through on commitments.</li>
            <li><strong>Flexibility and Adaptability:</strong> Willingness to adjust to changing needs and situations.</li>
            <li><strong>Problem-Solving Skills:</strong> Ability to think critically and find solutions to challenges.</li>
            <li><strong>Communication Skills:</strong> Clear and respectful communication with clients, families, and team members.</li>
            <li><strong>Patience and Stress Management:</strong> Capacity to remain calm and patient in difficult situations.</li>
            <li><strong>Integrity and Ethics:</strong> Strong ethical principles and commitment to client rights.</li>
            <li><strong>Willingness to Learn:</strong> Openness to feedback and continuous improvement.</li>
          </ul>
          
          <h3>Onboarding New Staff</h3>
          <p>Effective onboarding is crucial for retention and includes:</p>
          <ul>
            <li><strong>Comprehensive Orientation:</strong> Introduction to the organization's mission, values, policies, and procedures.</li>
            <li><strong>Structured Training:</strong> Clear training plan covering essential skills and knowledge.</li>
            <li><strong>Mentorship:</strong> Pairing new staff with experienced mentors for guidance and support.</li>
            <li><strong>Gradual Responsibility:</strong> Incrementally increasing responsibilities as competence develops.</li>
            <li><strong>Regular Check-ins:</strong> Scheduled meetings to address questions and provide feedback.</li>
            <li><strong>Clear Expectations:</strong> Explicit communication about performance expectations and evaluation criteria.</li>
          </ul>
          
          <h3>Retention Strategies</h3>
          <p>To improve staff retention, consider these approaches:</p>
          <ul>
            <li><strong>Competitive Compensation:</strong> Offer fair wages and benefits within organizational constraints.</li>
            <li><strong>Recognition and Appreciation:</strong> Regularly acknowledge staff contributions and successes.</li>
            <li><strong>Professional Development:</strong> Provide opportunities for skill development and career advancement.</li>
            <li><strong>Supportive Supervision:</strong> Offer regular, constructive feedback and emotional support.</li>
            <li><strong>Team Building:</strong> Foster a positive team culture and sense of belonging.</li>
            <li><strong>Work-Life Balance:</strong> Respect personal time and provide flexible scheduling when possible.</li>
            <li><strong>Input in Decision-Making:</strong> Involve staff in decisions that affect their work.</li>
            <li><strong>Addressing Burnout:</strong> Recognize signs of burnout and provide appropriate support.</li>
          </ul>
          
          <h3>Measuring Recruitment and Retention Success</h3>
          <p>Track key metrics to evaluate your efforts:</p>
          <ul>
            <li>Time-to-fill for open positions</li>
            <li>Quality of hire (performance ratings of new staff)</li>
            <li>Turnover rate (overall and for new hires)</li>
            <li>Staff satisfaction scores</li>
            <li>Exit interview feedback</li>
            <li>Cost of recruitment and training</li>
          </ul>
          
          <h3>Addressing Turnover</h3>
          <p>When staff do leave, take these steps:</p>
          <ul>
            <li>Conduct thorough exit interviews to understand reasons for leaving</li>
            <li>Analyze patterns in turnover to identify systemic issues</li>
            <li>Implement changes based on feedback and analysis</li>
            <li>Maintain positive relationships with departing staff when appropriate</li>
            <li>Have contingency plans for coverage during vacancies</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/example-recruitment',
        audioUrl: '/audio/staff-recruitment-retention.wav',
        order: 2,
        course: course._id,
      },
      {
        title: 'Effective Staff Training and Development',
        description: 'Learn how to develop and implement effective training programs for support staff.',
        content: `
          <h2>Effective Staff Training and Development</h2>
          <p>Ongoing training and development are essential for maintaining high-quality support services and promoting staff growth. This section will explore strategies for effective staff training and development.</p>
          
          <h3>The Importance of Staff Training</h3>
          <p>Investing in staff training and development offers numerous benefits:</p>
          <ul>
            <li>Improved quality of services for clients</li>
            <li>Enhanced staff confidence and competence</li>
            <li>Reduced incidents and liability concerns</li>
            <li>Increased staff satisfaction and retention</li>
            <li>Adaptation to evolving best practices and regulations</li>
            <li>Preparation for staff advancement and succession planning</li>
          </ul>
          
          <h3>Assessing Training Needs</h3>
          <p>Effective training begins with a thorough assessment of needs:</p>
          <ul>
            <li><strong>Individual Assessment:</strong> Evaluate each staff member's current skills, knowledge, and areas for growth.</li>
            <li><strong>Team Assessment:</strong> Identify common gaps or needs across the team.</li>
            <li><strong>Organizational Requirements:</strong> Consider regulatory requirements, organizational changes, and strategic priorities.</li>
            <li><strong>Client Needs:</strong> Assess whether staff have the specific skills needed to support current clients.</li>
            <li><strong>Performance Data:</strong> Review incident reports, client outcomes, and performance evaluations to identify training needs.</li>
          </ul>
          
          <h3>Types of Training</h3>
          <p>A comprehensive training program includes various types of training:</p>
          <ul>
            <li><strong>Orientation Training:</strong> Introduction to the organization, policies, and basic expectations.</li>
            <li><strong>Core Skills Training:</strong> Essential skills required for all support staff (e.g., communication, safety, client rights).</li>
            <li><strong>Specialized Training:</strong> Skills for supporting specific populations or conditions (e.g., autism, behavioral support, medical needs).</li>
            <li><strong>Refresher Training:</strong> Regular updates on essential skills and knowledge.</li>
            <li><strong>Advanced Training:</strong> Higher-level skills for experienced staff or those in specialized roles.</li>
            <li><strong>Leadership Development:</strong> Preparation for supervisory or leadership positions.</li>
          </ul>
          
          <h3>Training Methods and Approaches</h3>
          <p>Effective training programs utilize a variety of methods:</p>
          <ul>
            <li><strong>Classroom Training:</strong> Structured sessions for presenting information and group discussion.</li>
            <li><strong>Hands-on Practice:</strong> Opportunities to practice skills in a controlled environment.</li>
            <li><strong>On-the-Job Training:</strong> Guided learning while performing actual job duties.</li>
            <li><strong>Mentoring and Shadowing:</strong> Learning from experienced staff through observation and guidance.</li>
            <li><strong>Online Learning:</strong> Self-paced modules and virtual classrooms for flexible learning.</li>
            <li><strong>Role-Playing:</strong> Simulating real situations to practice responses and problem-solving.</li>
            <li><strong>Case Studies:</strong> Analyzing real or fictional scenarios to apply knowledge.</li>
            <li><strong>Reflective Practice:</strong> Structured reflection on experiences to extract learning.</li>
          </ul>
          
          <h3>Adult Learning Principles</h3>
          <p>Effective training incorporates principles of adult learning:</p>
          <ul>
            <li><strong>Relevance:</strong> Adults learn best when they understand how the content applies to their work.</li>
            <li><strong>Experience:</strong> Building on existing knowledge and experience enhances learning.</li>
            <li><strong>Active Participation:</strong> Engagement in the learning process improves retention.</li>
            <li><strong>Practical Application:</strong> Opportunities to apply new knowledge immediately reinforce learning.</li>
            <li><strong>Respect:</strong> Acknowledging the expertise and contributions of learners creates a positive environment.</li>
            <li><strong>Feedback:</strong> Constructive feedback helps learners refine their understanding and skills.</li>
            <li><strong>Self-Direction:</strong> Involving staff in setting learning goals increases motivation.</li>
          </ul>
          
          <h3>Developing a Training Plan</h3>
          <p>A comprehensive training plan includes:</p>
          <ul>
            <li><strong>Clear Objectives:</strong> Specific, measurable learning outcomes for each training.</li>
            <li><strong>Content Outline:</strong> Key topics and skills to be covered.</li>
            <li><strong>Methods and Activities:</strong> Varied approaches to engage different learning styles.</li>
            <li><strong>Materials and Resources:</strong> Handouts, visual aids, equipment, and other resources needed.</li>
            <li><strong>Timeline and Schedule:</strong> When and how often training will occur.</li>
            <li><strong>Evaluation Methods:</strong> How learning and application will be assessed.</li>
            <li><strong>Follow-up Plan:</strong> How the training will be reinforced and supported afterward.</li>
          </ul>
          
          <h3>Implementing Training</h3>
          <p>Effective implementation of training includes:</p>
          <ul>
            <li><strong>Preparation:</strong> Ensuring all materials, space, and technology are ready.</li>
            <li><strong>Creating a Positive Environment:</strong> Establishing a safe, respectful atmosphere for learning.</li>
            <li><strong>Clear Communication:</strong> Explaining the purpose and expectations of the training.</li>
            <li><strong>Engagement Strategies:</strong> Using questions, discussions, and activities to maintain interest.</li>
            <li><strong>Flexibility:</strong> Adapting to the needs and responses of the participants.</li>
            <li><strong>Time Management:</strong> Balancing coverage of content with opportunities for practice and questions.</li>
            <li><strong>Addressing Challenges:</strong> Managing resistance, varying skill levels, and other potential obstacles.</li>
          </ul>
          
          <h3>Evaluating Training Effectiveness</h3>
          <p>Comprehensive evaluation of training includes multiple levels:</p>
          <ul>
            <li><strong>Reaction:</strong> Participant satisfaction and perceived value of the training.</li>
            <li><strong>Learning:</strong> Knowledge and skills acquired during the training.</li>
            <li><strong>Behavior:</strong> Application of learning in the work environment.</li>
            <li><strong>Results:</strong> Impact on client outcomes, incidents, and other organizational measures.</li>
            <li><strong>Return on Investment:</strong> Benefits of the training relative to its costs.</li>
          </ul>
          
          <h3>Supporting Ongoing Development</h3>
          <p>Beyond formal training, support ongoing development through:</p>
          <ul>
            <li><strong>Individual Development Plans:</strong> Collaboratively created plans for each staff member's growth.</li>
            <li><strong>Coaching:</strong> One-on-one guidance to enhance specific skills.</li>
            <li><strong>Peer Learning:</strong> Opportunities for staff to learn from each other.</li>
            <li><strong>Resource Library:</strong> Access to books, articles, videos, and other learning resources.</li>
            <li><strong>External Opportunities:</strong> Conferences, workshops, and courses outside the organization.</li>
            <li><strong>Career Pathways:</strong> Clear paths for advancement and the development needed for each step.</li>
            <li><strong>Learning Culture:</strong> Fostering an environment that values continuous learning and improvement.</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/example-training',
        audioUrl: '/audio/staff-training-development.wav',
        order: 3,
        course: course._id,
      },
      {
        title: 'Performance Management and Feedback',
        description: 'Learn effective strategies for managing staff performance and providing constructive feedback.',
        content: `
          <h2>Performance Management and Feedback</h2>
          <p>Effective performance management and feedback are essential for maintaining high-quality services and supporting staff development. This section will explore strategies for monitoring performance, providing feedback, and addressing performance issues.</p>
          
          <h3>The Purpose of Performance Management</h3>
          <p>A comprehensive performance management system serves multiple purposes:</p>
          <ul>
            <li>Ensuring quality services for clients</li>
            <li>Clarifying expectations for staff</li>
            <li>Recognizing and reinforcing good performance</li>
            <li>Identifying and addressing performance issues</li>
            <li>Supporting staff development and growth</li>
            <li>Documenting performance for administrative purposes</li>
            <li>Aligning individual performance with organizational goals</li>
          </ul>
          
          <h3>Setting Clear Expectations</h3>
          <p>Effective performance management begins with clear expectations:</p>
          <ul>
            <li><strong>Job Descriptions:</strong> Detailed, up-to-date descriptions of roles and responsibilities.</li>
            <li><strong>Performance Standards:</strong> Specific, measurable criteria for evaluating performance.</li>
            <li><strong>Organizational Policies:</strong> Clear policies and procedures that guide work practices.</li>
            <li><strong>Individual Goals:</strong> Specific objectives for each staff member aligned with team and organizational goals.</li>
            <li><strong>Regular Communication:</strong> Ongoing discussion about expectations and priorities.</li>
          </ul>
          
          <h3>Monitoring Performance</h3>
          <p>Effective supervisors use various methods to monitor performance:</p>
          <ul>
            <li><strong>Direct Observation:</strong> Regularly observing staff in their work environment.</li>
            <li><strong>Documentation Review:</strong> Examining notes, reports, and other written materials.</li>
            <li><strong>Client Feedback:</strong> Gathering input from clients and families about their experiences.</li>
            <li><strong>Peer Feedback:</strong> Collecting perspectives from colleagues who work with the staff member.</li>
            <li><strong>Outcome Measures:</strong> Reviewing client outcomes and progress toward goals.</li>
            <li><strong>Self-Assessment:</strong> Encouraging staff to reflect on and evaluate their own performance.</li>
          </ul>
          
          <h3>Providing Effective Feedback</h3>
          <p>Constructive feedback is a powerful tool for improving performance:</p>
          <ul>
            <li><strong>Timely:</strong> Providing feedback as close as possible to the observed behavior.</li>
            <li><strong>Specific:</strong> Focusing on concrete behaviors rather than generalizations.</li>
            <li><strong>Balanced:</strong> Acknowledging strengths as well as areas for improvement.</li>
            <li><strong>Objective:</strong> Based on observable facts rather than assumptions or judgments.</li>
            <li><strong>Actionable:</strong> Offering clear guidance on how to improve or maintain performance.</li>
            <li><strong>Respectful:</strong> Delivered in a way that maintains the staff member's dignity.</li>
            <li><strong>Two-Way:</strong> Encouraging dialogue and the staff member's perspective.</li>
          </ul>
          
          <h3>Formal Performance Evaluations</h3>
          <p>While ongoing feedback is essential, formal evaluations provide structured assessment:</p>
          <ul>
            <li><strong>Regular Schedule:</strong> Conducting evaluations at consistent intervals (e.g., annually).</li>
            <li><strong>Comprehensive Review:</strong> Assessing all aspects of job performance.</li>
            <li><strong>Evidence-Based:</strong> Using specific examples and data to support ratings.</li>
            <li><strong>Forward-Looking:</strong> Setting goals and development plans for the coming period.</li>
            <li><strong>Collaborative:</strong> Involving the staff member in self-assessment and goal-setting.</li>
            <li><strong>Documentation:</strong> Creating a written record of the evaluation and plans.</li>
          </ul>
          
          <h3>Addressing Performance Issues</h3>
          <p>When performance falls below expectations, a structured approach is needed:</p>
          <ul>
            <li><strong>Early Intervention:</strong> Addressing issues as soon as they are identified.</li>
            <li><strong>Clear Communication:</strong> Explicitly stating the concern and expected performance.</li>
            <li><strong>Root Cause Analysis:</strong> Exploring factors contributing to the performance issue.</li>
            <li><strong>Collaborative Problem-Solving:</strong> Working with the staff member to develop solutions.</li>
            <li><strong>Performance Improvement Plan:</strong> Creating a structured plan with specific goals and timelines.</li>
            <li><strong>Regular Follow-Up:</strong> Monitoring progress and providing ongoing feedback.</li>
            <li><strong>Documentation:</strong> Maintaining records of discussions, plans, and outcomes.</li>
          </ul>
          
          <h3>Common Performance Issues and Strategies</h3>
          <p>Different types of performance issues may require different approaches:</p>
          <ul>
            <li><strong>Skill Deficits:</strong> Provide additional training, demonstration, and practice opportunities.</li>
            <li><strong>Knowledge Gaps:</strong> Offer resources, mentoring, and educational opportunities.</li>
            <li><strong>Motivational Issues:</strong> Explore underlying factors, clarify expectations, and find motivators.</li>
            <li><strong>Behavioral Concerns:</strong> Set clear boundaries, explain impact, and establish consequences.</li>
            <li><strong>Attendance Problems:</strong> Clarify expectations, explore barriers, and implement accountability measures.</li>
            <li><strong>Interpersonal Conflicts:</strong> Facilitate communication, mediate when necessary, and establish team norms.</li>
          </ul>
          
          <h3>Progressive Discipline</h3>
          <p>When performance issues persist despite support, progressive discipline may be necessary:</p>
          <ul>
            <li><strong>Verbal Warning:</strong> A documented conversation about the issue and expectations.</li>
            <li><strong>Written Warning:</strong> A formal document outlining the concern, expectations, and consequences.</li>
            <li><strong>Suspension:</strong> Temporary removal from duties, with or without pay.</li>
            <li><strong>Termination:</strong> Ending employment when other interventions have been unsuccessful.</li>
          </ul>
          <p>Each step should include clear communication about the issue, expectations for improvement, support available, and consequences of continued problems.</p>
          
          <h3>Recognizing and Reinforcing Good Performance</h3>
          <p>Effective performance management includes recognition and reinforcement:</p>
          <ul>
            <li><strong>Specific Praise:</strong> Acknowledging particular actions or achievements.</li>
            <li><strong>Public Recognition:</strong> Celebrating accomplishments in team meetings or communications.</li>
            <li><strong>Formal Awards:</strong> Establishing recognition programs for outstanding performance.</li>
            <li><strong>Growth Opportunities:</strong> Offering special projects or development opportunities.</li>
            <li><strong>Advancement:</strong> Promoting staff who consistently demonstrate excellence.</li>
            <li><strong>Personalized Recognition:</strong> Tailoring recognition to individual preferences and values.</li>
          </ul>
          
          <h3>Legal and Ethical Considerations</h3>
          <p>Performance management must adhere to legal and ethical standards:</p>
          <ul>
            <li><strong>Consistency:</strong> Applying the same standards and processes to all staff.</li>
            <li><strong>Documentation:</strong> Maintaining accurate, objective records of performance discussions.</li>
            <li><strong>Confidentiality:</strong> Keeping performance information private and secure.</li>
            <li><strong>Fairness:</strong> Ensuring that evaluations are based on job-related criteria.</li>
            <li><strong>Compliance:</strong> Following organizational policies and relevant laws.</li>
            <li><strong>Accommodations:</strong> Providing reasonable accommodations for staff with disabilities.</li>
          </ul>
          
          <h3>Creating a Culture of Continuous Improvement</h3>
          <p>Beyond individual performance management, supervisors should foster a culture of improvement:</p>
          <ul>
            <li><strong>Modeling:</strong> Demonstrating openness to feedback and continuous learning.</li>
            <li><strong>Psychological Safety:</strong> Creating an environment where staff feel safe to take risks and learn from mistakes.</li>
            <li><strong>Learning Opportunities:</strong> Providing regular chances for skill development and knowledge sharing.</li>
            <li><strong>Celebrating Growth:</strong> Recognizing improvement and effort, not just achievement.</li>
            <li><strong>Systems Thinking:</strong> Addressing organizational factors that affect performance.</li>
            <li><strong>Feedback in All Directions:</strong> Encouraging feedback from staff to supervisors and among peers.</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/example-performance',
        audioUrl: '/audio/performance-management.wav',
        order: 4,
        course: course._id,
      },
      {
        title: 'Team Building and Conflict Resolution',
        description: 'Learn strategies for building effective teams and resolving conflicts in the workplace.',
        content: `
          <h2>Team Building and Conflict Resolution</h2>
          <p>Effective supervisors build cohesive teams and address conflicts constructively. This section will explore strategies for team building and conflict resolution in support services settings.</p>
          
          <h3>The Importance of Effective Teams</h3>
          <p>Strong teams provide numerous benefits in support services:</p>
          <ul>
            <li>Improved quality and consistency of care</li>
            <li>Enhanced problem-solving and creativity</li>
            <li>Increased staff satisfaction and retention</li>
            <li>Better communication and coordination</li>
            <li>More efficient use of resources</li>
            <li>Greater resilience during challenges and transitions</li>
            <li>Stronger support for individual team members</li>
          </ul>
          
          <h3>Characteristics of Effective Teams</h3>
          <p>High-performing teams typically demonstrate these characteristics:</p>
          <ul>
            <li><strong>Shared Purpose:</strong> Clear understanding of and commitment to team goals.</li>
            <li><strong>Clear Roles:</strong> Well-defined responsibilities with appropriate overlap.</li>
            <li><strong>Open Communication:</strong> Free flow of information and ideas.</li>
            <li><strong>Trust and Psychological Safety:</strong> Members feel safe to take risks and be vulnerable.</li>
            <li><strong>Mutual Accountability:</strong> Members hold themselves and each other responsible.</li>
            <li><strong>Appreciation of Diversity:</strong> Valuing different perspectives and strengths.</li>
            <li><strong>Effective Conflict Management:</strong> Addressing disagreements constructively.</li>
            <li><strong>Collaborative Problem-Solving:</strong> Working together to address challenges.</li>
            <li><strong>Continuous Improvement:</strong> Regularly reflecting on and enhancing team functioning.</li>
          </ul>
          
          <h3>Stages of Team Development</h3>
          <p>Teams typically progress through several stages of development:</p>
          <ul>
            <li><strong>Forming:</strong> Initial stage where members are getting to know each other and establishing basic relationships.</li>
            <li><strong>Storming:</strong> Period of testing boundaries, experiencing conflicts, and clarifying roles and expectations.</li>
            <li><strong>Norming:</strong> Development of cohesion, establishment of norms, and increased collaboration.</li>
            <li><strong>Performing:</strong> High functioning stage where the team works effectively toward shared goals.</li>
            <li><strong>Adjourning/Transforming:</strong> Transition as the team completes its purpose or undergoes significant changes.</li>
          </ul>
          <p>Understanding these stages helps supervisors provide appropriate support and interventions as teams develop.</p>
          
          <h3>Team Building Strategies</h3>
          <p>Effective team building includes both formal and informal approaches:</p>
          <ul>
            <li><strong>Clear Purpose and Goals:</strong> Ensuring all team members understand and commit to shared objectives.</li>
            <li><strong>Defined Roles and Responsibilities:</strong> Clarifying each person's contributions and how they complement each other.</li>
            <li><strong>Team Agreements:</strong> Collaboratively establishing norms for communication, decision-making, and conflict resolution.</li>
            <li><strong>Regular Team Meetings:</strong> Creating structured opportunities for information sharing, problem-solving, and planning.</li>
            <li><strong>Team-Building Activities:</strong> Facilitating exercises that build trust, communication, and collaboration skills.</li>
            <li><strong>Celebrating Successes:</strong> Recognizing team achievements and milestones.</li>
            <li><strong>Addressing Challenges Together:</strong> Using difficulties as opportunities for team growth and learning.</li>
          </ul>
          
          <h3>Understanding Conflict</h3>
          <p>Conflict is a natural part of team dynamics and can be constructive when managed effectively:</p>
          <ul>
            <li><strong>Types of Conflict:</strong> Task conflicts (about the work itself), relationship conflicts (interpersonal issues), and process conflicts (how work is done).</li>
            <li><strong>Sources of Conflict:</strong> Miscommunication, competing priorities, resource limitations, personality differences, role ambiguity, and external pressures.</li>
            <li><strong>Benefits of Constructive Conflict:</strong> Enhanced creativity, better decision-making, increased understanding, and stronger relationships when resolved effectively.</li>
            <li><strong>Costs of Unresolved Conflict:</strong> Decreased productivity, damaged relationships, increased stress, and potential impact on client care.</li>
          </ul>
          
          <h3>Conflict Resolution Approaches</h3>
          <p>Different situations may call for different conflict resolution approaches:</p>
          <ul>
            <li><strong>Competing/Forcing:</strong> Taking a firm stand and pursuing one's position at the expense of others. Appropriate in emergencies or when unpopular decisions must be implemented.</li>
            <li><strong>Accommodating:</strong> Putting aside one's own concerns to satisfy others. Useful when preserving relationships is more important than the issue at hand.</li>
            <li><strong>Avoiding:</strong> Sidestepping or postponing the conflict. May be appropriate for minor issues or when emotions are too high for productive discussion.</li>
            <li><strong>Compromising:</strong> Finding a middle ground where each party gives up something. Useful when time is limited or when equally powerful parties are committed to mutually exclusive goals.</li>
            <li><strong>Collaborating:</strong> Working together to find a solution that fully satisfies all concerns. Ideal for complex issues where creative solutions and buy-in from all parties are needed.</li>
          </ul>
          
          <h3>Conflict Resolution Process</h3>
          <p>A structured approach to resolving conflicts includes these steps:</p>
          <ul>
            <li><strong>Create the Right Environment:</strong> Choose an appropriate time and place, establish ground rules, and set a constructive tone.</li>
            <li><strong>Clarify Perspectives:</strong> Allow each person to share their view of the situation without interruption.</li>
            <li><strong>Identify Interests:</strong> Look beyond positions to understand underlying needs, concerns, and values.</li>
            <li><strong>Generate Options:</strong> Brainstorm possible solutions without evaluating them initially.</li>
            <li><strong>Evaluate and Select Solutions:</strong> Consider options based on how well they meet all parties' interests.</li>
            <li><strong>Develop an Implementation Plan:</strong> Agree on specific actions, responsibilities, and timelines.</li>
            <li><strong>Follow Up:</strong> Check in on progress and make adjustments as needed.</li>
          </ul>
          
          <h3>The Supervisor's Role in Conflict Resolution</h3>
          <p>Supervisors play several roles in addressing team conflicts:</p>
          <ul>
            <li><strong>Prevention:</strong> Creating an environment that minimizes destructive conflict through clear expectations, open communication, and team building.</li>
            <li><strong>Early Intervention:</strong> Addressing issues before they escalate into serious conflicts.</li>
            <li><strong>Mediation:</strong> Facilitating discussions between conflicting parties to help them reach resolution.</li>
            <li><strong>Coaching:</strong> Supporting staff in developing their own conflict resolution skills.</li>
            <li><strong>Decision-Making:</strong> Making difficult decisions when parties cannot reach agreement on their own.</li>
          </ul>
          
          <h3>Challenging Conflict Situations</h3>
          <p>Some conflict situations require special consideration:</p>
          <ul>
            <li><strong>Power Imbalances:</strong> Ensuring that less powerful individuals have a voice and are protected from intimidation.</li>
            <li><strong>Cultural Differences:</strong> Recognizing and respecting different cultural approaches to conflict and communication.</li>
            <li><strong>Chronic Conflicts:</strong> Addressing patterns of recurring conflict by examining underlying systemic issues.</li>
            <li><strong>High Emotion:</strong> Managing situations where strong emotions threaten to derail productive discussion.</li>
            <li><strong>Bullying or Harassment:</strong> Intervening promptly in situations that involve inappropriate behavior and following organizational policies.</li>
          </ul>
          
          <h3>Building Conflict Resolution Skills</h3>
          <p>Supervisors can help staff develop skills for addressing conflicts effectively:</p>
          <ul>
            <li><strong>Active Listening:</strong> Fully focusing on the speaker, acknowledging their message, and responding thoughtfully.</li>
            <li><strong>Assertive Communication:</strong> Expressing needs and concerns clearly and respectfully without aggression or passivity.</li>
            <li><strong>Emotional Intelligence:</strong> Recognizing and managing one's own emotions and responding appropriately to others' emotions.</li>
            <li><strong>Negotiation:</strong> Finding mutually acceptable solutions through give-and-take.</li>
            <li><strong>Problem-Solving:</strong> Approaching conflicts as problems to be solved rather than battles to be won.</li>
            <li><strong>Cultural Competence:</strong> Understanding and adapting to different cultural approaches to conflict.</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/example-team-building',
        audioUrl: '/audio/team-building-conflict-resolution.wav',
        order: 5,
        course: course._id,
      },
    ];

    // Create sections and quizzes
    for (const sectionData of sections) {
      const section = await Section.create(sectionData);
      
      // Create quiz for each section
      const quiz = await Quiz.create({
        title: `${sectionData.title} Quiz`,
        description: `Test your knowledge of ${sectionData.title.toLowerCase()}`,
        section: section._id,
        questions: [
          {
            text: `What is one of the core values in supervision mentioned in the ${sectionData.title} section?`,
            options: ['Cost efficiency', 'Leadership', 'Strict scheduling', 'Minimal interaction'],
            correctAnswer: 1,
            explanation: 'Leadership is a core value in supervision, providing clear direction and modeling best practices.',
          },
          {
            text: 'Why is documentation important in performance management?',
            options: ['It is not important', 'Only for billing purposes', 'To maintain accurate, objective records of performance discussions', 'Only required by management'],
            correctAnswer: 2,
            explanation: 'Documentation is crucial for maintaining accurate, objective records of performance discussions, which supports fair evaluation and provides a reference for future discussions.',
          },
          {
            text: 'What is person-centered supervision?',
            options: ['Focusing only on what supervisors think is best', 'Balancing administrative tasks with supportive functions', 'Following a strict schedule', 'Providing the same supervision to everyone'],
            correctAnswer: 1,
            explanation: 'Person-centered supervision involves balancing administrative tasks with supportive functions, recognizing the unique needs and strengths of each staff member.',
          },
          {
            text: 'What is one effective recruitment strategy mentioned in the course?',
            options: ['Only hiring friends and family', 'Using only one job board', 'Developing clear job descriptions that accurately reflect the role', 'Minimizing information about job responsibilities'],
            correctAnswer: 2,
            explanation: 'Developing clear job descriptions that accurately reflect the role\'s responsibilities and requirements is an effective recruitment strategy.',
          },
          {
            text: 'What is the "storming" stage in team development?',
            options: ['When the team first forms', 'Period of testing boundaries and experiencing conflicts', 'High functioning stage of teamwork', 'When the team disbands'],
            correctAnswer: 1,
            explanation: 'The "storming" stage is a period of testing boundaries, experiencing conflicts, and clarifying roles and expectations in team development.',
          },
        ],
        passingScore: 70,
      });

      // Update section with quiz reference
      section.quiz = quiz._id;
      await section.save();

      // Add section to course
      course.sections.push(section._id);
    }

    await course.save();

    console.log('Supervisor course created successfully with sections and quizzes');
    process.exit(0);
  } catch (error) {
    console.error('Error creating supervisor course:', error);
    process.exit(1);
  }
};
