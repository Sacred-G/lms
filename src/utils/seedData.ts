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
    console.log('Connected to MongoDB for seeding');
    seedDatabase();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Section.deleteMany({});
    await Quiz.deleteMany({});
    await Scenario.deleteMany({});
    await DragDropExercise.deleteMany({});
    await RolePlayExercise.deleteMany({});

    console.log('Cleared existing data');

    // Create admin users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const stevenAdmin = await User.create({
      name: 'Steven',
      email: 'steven@centeredsupportservice.org',
      password: 'password123',
      role: 'admin',
    });

    console.log('Created admin users');

    // Create course
    const course = await Course.create({
      title: 'Support Staff Training',
      description: 'Comprehensive training for support staff working with individuals with developmental disabilities.',
      coverImage: '/images/home-health-cover.jpg',
      createdBy: admin._id,
    });

    console.log('Created course');

    // Create sections
    const sections = [
      {
        title: 'Introduction to the Role',
        description: 'Learn about your role as a support staff member and the impact you can make.',
        content: `
          <h2>Welcome to Your Role as a Support Staff</h2>
          <p>As a support staff member for individuals with developmental disabilities, you play a crucial role in enhancing their quality of life and promoting their independence. This section will introduce you to your responsibilities and the importance of your work.</p>
          
          <h3>The Importance of Support Staff</h3>
          <p>Support staff are essential in helping individuals with developmental disabilities live fulfilling lives in their communities. You provide assistance with daily activities, emotional support, and help individuals develop skills for greater independence.</p>
          
          <h3>Core Values in Support Work</h3>
          <ul>
            <li><strong>Dignity and Respect:</strong> Treating each person with dignity and respect, recognizing their inherent worth.</li>
            <li><strong>Person-Centered Approach:</strong> Focusing on the individual's needs, preferences, and goals.</li>
            <li><strong>Empowerment:</strong> Supporting individuals to make their own choices and develop independence.</li>
            <li><strong>Inclusion:</strong> Promoting participation in community life and building relationships.</li>
          </ul>

          <h3>Understanding Developmental Disabilities</h3>
          <p>Developmental disabilities are a diverse group of conditions, including intellectual disabilities, cerebral palsy, epilepsy, autism, and down syndrome. It's important to understand that having one of these conditions doesn't automatically mean a person has an intellectual disability. Each individual with a developmental disability is uniquely human, requiring a nuanced and person-centered approach to care.</p>
          
          <h3>The Multifaceted Role of Support Staff</h3>
          <p>Support staff are often described as the "Swiss Army knife of the care world" due to the wide range of responsibilities they undertake. These include:</p>
          <ul>
            <li><strong>Practical Assistance:</strong> Helping with daily living activities such as cooking or cleaning.</li>
            <li><strong>Emotional Support:</strong> Acting as cheerleaders, a shoulder to cry on, and often the best friend to the person they're caring for.</li>
            <li><strong>Companionship:</strong> Fostering a bond, a sense of trust and safety, often becoming like family to those they support.</li>
          </ul>
          
          <h3>Fostering Independence and Empowerment</h3>
          <p>A central aspect of your role is empowering individuals with developmental disabilities to achieve greater independence through small, incremental steps:</p>
          <ul>
            <li>Assisting someone in making a sandwich, fostering independence and confidence.</li>
            <li>Providing choices to promote self-expression and autonomy, such as allowing individuals to select their own clothes.</li>
            <li>Understanding that the journey to independence is gradual but rewarding, with each step being a testament to the individual's growth and your support.</li>
          </ul>
          
          <h3>Person-Centered Planning and Advocacy</h3>
          <p>Person-centered planning is at the heart of effective caregiving, ensuring that the individual's needs and preferences are always prioritized. As support staff, you also play a critical role as advocates:</p>
          <ul>
            <li>Acting as superheroes navigating challenges and fighting for the rights and well-being of those you care for.</li>
            <li>Advocating for inclusive programs that ensure everyone has the opportunity to participate and thrive.</li>
          </ul>
          
          <h3>Effective Communication and Interpersonal Skills</h3>
          <p>Effective communication is an art that's essential in your role:</p>
          <ul>
            <li>Using various methods like sign language to bridge gaps and ensure clear understanding.</li>
            <li>Employing tools like picture boards to facilitate expression.</li>
            <li>Practicing active listening as a cornerstone of effective caregiving, demonstrating empathy and building trust.</li>
            <li>Exercising patience by waiting for responses and allowing individuals time to communicate.</li>
            <li>Being observant to notice changes that may indicate health issues, positioning yourself as a sentinel vigilantly overseeing the health and well-being of those in your care.</li>
            <li>Using positive communication to foster a nurturing environment and build strong, trusting relationships.</li>
          </ul>
          
          <h3>Collaboration and Comprehensive Care</h3>
          <p>Collaboration is key in providing comprehensive care:</p>
          <ul>
            <li>Creating a network of support with you at the center to ensure comprehensive care.</li>
            <li>Working with healthcare professionals to address all aspects of an individual's health.</li>
            <li>Developing support plans collaboratively, understanding and addressing the unique needs of each individual.</li>
            <li>Recognizing that these plans are evolving, requiring continuous adaptation and growth, and regular review to ensure they remain relevant and effective in meeting changing needs.</li>
          </ul>
          
          <h3>The Rewarding Nature of Support Work</h3>
          <p>Despite its complexities, being a support staff member is a meaningful and rewarding journey filled with countless moments of connection, growth, and support. Remember:</p>
          <ul>
            <li>Every individual has the potential to be a hero in their own story with the right support and encouragement.</li>
            <li>Celebrating achievements, no matter how small, strengthens the bond and reinforces positive outcomes.</li>
            <li>Ultimately, being a support staff member is about providing a place of warmth and support where every sunset marks another day of empowerment and care.</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/cQW6vgsVjY8',
        audioUrl: '/audio/introduction_to_the_role.wav',
        order: 1,
        course: course._id,
      },
      {
        title: 'Understanding Client Needs and Preferences',
        description: 'Develop skills to identify and respond to individual needs and preferences.',
        content: `
          <h2>Understanding Individual Needs and Preferences</h2>
          <p>Every person you support has unique needs, preferences, strengths, and challenges. Learning to understand these individual characteristics is essential for providing effective support.</p>
          
          <h3>Types of Developmental Disabilities</h3>
          <p>Developmental disabilities encompass a range of conditions that affect cognitive and/or physical development. Common types include:</p>
          <ul>
            <li><strong>Intellectual Disability:</strong> Affects intellectual functioning and adaptive behavior.</li>
            <li><strong>Autism Spectrum Disorder:</strong> Affects social interaction, communication, and may involve repetitive behaviors.</li>
            <li><strong>Cerebral Palsy:</strong> Affects movement and muscle coordination.</li>
            <li><strong>Down Syndrome:</strong> A genetic condition that causes developmental and intellectual delays.</li>
          </ul>
          
          <h3>Person-Centered Thinking</h3>
          <p>Person-centered thinking involves:</p>
          <ul>
            <li>Learning what is important TO the person (their preferences, interests, relationships)</li>
            <li>Understanding what is important FOR the person (health, safety, well-being)</li>
            <li>Finding the balance between the two</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/TAXr3rWMYxQ',
        audioUrl: '/client/public/audio/Understanding_Client_Needs_and_Rights.wav',
        order: 2,
        course: course._id,
      },
      {
        title: 'Key Responsibilities of Support Staff',
        description: 'Learn about the essential duties and responsibilities in your role.',
        content: `
          <h2>Key Responsibilities of Support Staff</h2>
          <p>As a support staff member, you have several important responsibilities that contribute to the well-being and development of the individuals you support.</p>
          
          <h3>Daily Living Support</h3>
          <ul>
            <li>Assisting with personal care (bathing, grooming, dressing)</li>
            <li>Meal preparation and assistance with eating</li>
            <li>Medication administration (as trained and authorized)</li>
            <li>Housekeeping and maintaining a clean environment</li>
            <li>Transportation to appointments and community activities</li>
          </ul>
          
          <h3>Skill Development</h3>
          <ul>
            <li>Teaching daily living skills</li>
            <li>Supporting the development of social skills</li>
            <li>Encouraging communication skills</li>
            <li>Promoting problem-solving abilities</li>
          </ul>
          
          <h3>Health and Safety</h3>
          <ul>
            <li>Monitoring health conditions</li>
            <li>Implementing safety protocols</li>
            <li>Recognizing and reporting changes in condition</li>
            <li>Following emergency procedures</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/RxbPrvyHyxQ',
        audioUrl: '/client/public/audio/Direct Support Staff_ Key Responsibilities.wav',
        order: 3,
        course: course._id,
      },
      {
        title: 'Communication and Professionalism',
        description: 'Develop effective communication skills and professional behavior.',
        content: `
          <h2>Communication and Professionalism</h2>
          <p>Effective communication and professional behavior are essential for providing quality support and maintaining positive relationships with individuals, families, and team members.</p>
          
          <h3>Communication Strategies</h3>
          <ul>
            <li><strong>Active Listening:</strong> Giving full attention, acknowledging, and responding appropriately.</li>
            <li><strong>Clear Expression:</strong> Using simple, direct language and checking for understanding.</li>
            <li><strong>Nonverbal Communication:</strong> Being aware of body language, facial expressions, and tone of voice.</li>
            <li><strong>Alternative Communication:</strong> Using pictures, gestures, or assistive technology when needed.</li>
          </ul>
          
          <h3>Professional Boundaries</h3>
          <p>Maintaining appropriate boundaries involves:</p>
          <ul>
            <li>Respecting privacy and confidentiality</li>
            <li>Avoiding dual relationships (e.g., becoming friends on social media)</li>
            <li>Maintaining consistency and reliability</li>
            <li>Focusing on the individual's needs rather than your own</li>
          </ul>
          
          <h3>Documentation</h3>
          <p>Proper documentation is crucial for:</p>
          <ul>
            <li>Ensuring continuity of care</li>
            <li>Tracking progress and identifying concerns</li>
            <li>Meeting regulatory requirements</li>
            <li>Supporting communication among team members</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/bSQ53FXO-cU',
        audioUrl: '/client/public/audio/Effective_Communication_in_Support_Roles.wav',
        order: 4,
        course: course._id,
      },
      {
        title: 'Infection Control and Hygiene Practices',
        description: 'Learn essential infection control and hygiene practices to ensure health and safety.',
        content: `
          <h2>Infection Control and Hygiene Practices</h2>
          <p>Proper infection control and hygiene practices are essential for preventing the spread of illness and maintaining a healthy environment for both individuals and staff.</p>
          
          <h3>Hand Hygiene</h3>
          <p>Hand washing is the most effective way to prevent the spread of infection:</p>
          <ul>
            <li>Wash hands with soap and water for at least 20 seconds</li>
            <li>Use hand sanitizer with at least 60% alcohol when soap and water are not available</li>
            <li>Key times to wash hands: before and after providing care, before handling food, after using the bathroom, after coughing/sneezing</li>
          </ul>
          
          <h3>Personal Protective Equipment (PPE)</h3>
          <ul>
            <li>Gloves: Use when in contact with bodily fluids or when providing personal care</li>
            <li>Masks: Use when indicated for respiratory symptoms or as required by policy</li>
            <li>Gowns: Use when there is risk of clothing contamination</li>
          </ul>
          
          <h3>Environmental Cleaning</h3>
          <ul>
            <li>Regular cleaning of frequently touched surfaces</li>
            <li>Proper disinfection of bathrooms and kitchen areas</li>
            <li>Appropriate handling and disposal of waste</li>
            <li>Laundering of linens and clothing according to guidelines</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/S3jjur8J2r4',
        audioUrl: '/client/public/audio/Support_Staff_Hygiene_and_Infection_Control.wav',
        order: 5,
        course: course._id,
      },
      {
        title: 'Emergency Procedures and Crisis Management',
        description: 'Learn how to respond effectively to emergencies and manage crisis situations.',
        content: `
          <h2>Emergency Procedures and Crisis Management</h2>
          <p>Being prepared for emergencies and knowing how to respond to crisis situations is a critical responsibility for support staff.</p>
          
          <h3>Medical Emergencies</h3>
          <ul>
            <li>Recognizing signs of medical emergencies (seizures, difficulty breathing, severe pain)</li>
            <li>Basic first aid procedures</li>
            <li>When and how to call emergency services (911)</li>
            <li>Documentation and reporting requirements</li>
          </ul>
          
          <h3>Behavioral Crisis Management</h3>
          <ul>
            <li>Identifying triggers and warning signs</li>
            <li>De-escalation techniques</li>
            <li>Ensuring safety for all involved</li>
            <li>Post-crisis support and debriefing</li>
          </ul>
          
          <h3>Natural Disasters and Facility Emergencies</h3>
          <ul>
            <li>Evacuation procedures</li>
            <li>Shelter-in-place protocols</li>
            <li>Emergency supplies and equipment</li>
            <li>Communication during emergencies</li>
          </ul>
          
          <h3>Incident Reporting</h3>
          <ul>
            <li>What constitutes a reportable incident</li>
            <li>Required timeframes for reporting</li>
            <li>Documentation requirements</li>
            <li>Follow-up procedures</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/7P-YMPl_4ig',
        audioUrl: 'client/public/audio/Emergency_Preparedness_Guide_for_Support_Staff.wav',
        order: 6,
        course: course._id,
      },
      {
        title: '6 Rights of Medication Administration',
        description: 'Learn the essential rights to ensure safe and effective medication administration.',
        content: `
          <h2>6 Rights of Medication Administration</h2>
          <p>Medication administration is a critical responsibility that requires careful attention to detail and adherence to established protocols. The 6 Rights of Medication Administration provide a framework to ensure medications are given safely and effectively.</p>
          
          <h3>The 6 Rights of Medication Administration</h3>
          <ul>
            <li><strong>Right Patient:</strong> Always verify you are giving medication to the correct individual by checking identification.</li>
            <li><strong>Right Medication:</strong> Confirm you are administering the medication that was prescribed by checking the label three times.</li>
            <li><strong>Right Dose:</strong> Ensure you are giving the correct amount of medication as prescribed.</li>
            <li><strong>Right Route:</strong> Administer the medication by the correct method (oral, topical, injection, etc.).</li>
            <li><strong>Right Time:</strong> Give the medication at the prescribed time to maintain therapeutic levels.</li>
            <li><strong>Right Documentation:</strong> Record the administration promptly and accurately after giving the medication.</li>
          </ul>
          
          <h3>Medication Safety Practices</h3>
          <ul>
            <li>Always wash hands before handling medications</li>
            <li>Never leave medications unattended</li>
            <li>Store medications according to instructions</li>
            <li>Check expiration dates regularly</li>
            <li>Report medication errors immediately</li>
            <li>Know the purpose and potential side effects of medications you administer</li>
          </ul>
          
          <h3>Special Considerations</h3>
          <ul>
            <li>Be aware of potential drug interactions</li>
            <li>Monitor for allergic reactions</li>
            <li>Know when to hold medications (e.g., low blood pressure, low blood sugar)</li>
            <li>Understand proper techniques for different administration routes</li>
            <li>Follow agency-specific protocols for medication administration</li>
          </ul>

          <h3>Comprehensive Guide to Medication Administration</h3>
          <p>The following information summarizes key themes and important information about medication administration in assisted living settings:</p>

          <h4>Prevalence and Impact of Medication Errors</h4>
          <ul>
            <li>Medication errors are a significant concern in assisted living facilities where many residents take medications for various health conditions.</li>
            <li>A medication error is defined as "any preventable event that may cause or lead to inappropriate medication use or resident harm while the medication is in the control of the health care professional, resident, or consumer."</li>
            <li>Errors occur when medication administration deviates from a physician's order or manufacturer specifications.</li>
            <li>Consequences of medication errors range from mild side effects to severe reactions and life-threatening complications for residents.</li>
          </ul>

          <h4>The Crucial Role of Medication Passers</h4>
          <ul>
            <li>Medication passers are identified as the "last line of defense against medication errors."</li>
            <li>They must demonstrate competency in medication administration and adhere to the highest standards of resident care.</li>
            <li>Proper training in medication handling and administration is essential for these staff members.</li>
          </ul>

          <h4>Common Causes of Medication Errors</h4>
          <ul>
            <li>Lack of adequate training</li>
            <li>Insufficient staffing</li>
            <li>Failure to follow established systems or processes</li>
            <li>Poor handwriting</li>
            <li>Missing medication</li>
            <li>Dosage miscalculations</li>
            <li>Incorrect storage</li>
            <li>Incorrect scheduling of medication</li>
            <li>Hectic work environments</li>
            <li>Pharmacy errors</li>
          </ul>

          <h4>Common Mistakes Leading to Medication Errors</h4>
          <ul>
            <li>Administering the wrong medication</li>
            <li>Administering expired medication</li>
            <li>Administering incorrect dosages</li>
            <li>Failure to provide adequate food before medication when required</li>
            <li>Crushing medication intended to be taken whole</li>
            <li>Failure to provide adequate liquids with medication</li>
            <li>Failure to shake medications requiring shaking</li>
            <li>Incorrect administration of eye drops</li>
          </ul>

          <h4>Essential Training for Medication Passers</h4>
          <ul>
            <li>Medication routes and dosage types</li>
            <li>Common medication categories</li>
            <li>Potential side effects and adverse effects</li>
            <li>Warning signs of medication allergies</li>
            <li>Medication interactions</li>
            <li>Dispensing systems and disposal</li>
            <li>Understanding physicians' orders and pharmacy labels</li>
            <li>Documentation of medication administration</li>
            <li>Handling resident medication refusals</li>
          </ul>

          <h4>Consequences Beyond Resident Harm</h4>
          <ul>
            <li>Staff turnover</li>
            <li>Harm to the facility's reputation</li>
            <li>Rule violations</li>
          </ul>

          <h4>Strategies for Reducing Medication Errors</h4>
          <ul>
            <li>Fostering a commitment to resident rights</li>
            <li>Preparing medications in a clean environment</li>
            <li>Minimizing interruptions during medication administration</li>
            <li>Maintaining alertness and seeking assistance when uncertain</li>
            <li>Creating a culture that supports accurate error reporting and encourages learning from errors rather than assigning blame</li>
            <li>Ensuring adequate staffing</li>
            <li>Routine medication audits</li>
            <li>Ongoing observation of medication administration</li>
            <li>Tracking of errors by type to improve training and procedures</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/4bHtI-pCeEo',
        audioUrl: '/client/public/audio/Six_Rights_of_Medication_Administration.wav',
        order: 7,
        course: course._id,
      },
      {
        title: 'Client Rights',
        description: 'Learn about the rights of clients and how to uphold them in your role as support staff.',
        content: `
          <h2>Client Rights</h2>
          <p>Understanding and respecting client rights is fundamental to providing ethical and person-centered support. This section will introduce you to the key rights that all clients have and how to ensure these rights are upheld in your daily work.</p>
          
          <h3>I. Fundamental Client Rights</h3>
          <p>The training explicitly outlines several fundamental rights that every client is entitled to. These rights form the bedrock of ethical and respectful client interactions.</p>

          <p><strong>Right to be treated with dignity and respect:</strong> This underscores the importance of valuing each client as an individual and interacting with them in a courteous and considerate manner. The example of staff knocking, announcing themselves, and waiting for permission before entering a client's space directly illustrates this right.</p>
          
          <p><strong>Right to privacy and confidentiality:</strong> Clients have the right to control access to their personal information and to have it kept private. The training highlights this with the staff action of seeking permission before entering a client's room. Furthermore, the discussion about documentation emphasizes the need to explain what information will be recorded and who will have access.</p>
          
          <p><strong>Right to informed consent:</strong> Clients have the right to understand the services being offered and to make voluntary decisions about whether or not to receive them. While not explicitly detailed in the excerpts, this right is implicitly supported by the emphasis on clear communication and checking for understanding.</p>
          
          <p><strong>Right to make their own choices:</strong> This principle of client autonomy is central to person-centered support. Staff should empower clients to make decisions about their lives and the services they receive. An example provided shows a staff member supporting a client's desire to try handling a situation independently while offering backup: "I'd prefer to try handling it myself first but with someone nearby just in case... That makes sense I'll be right here if you need any assistance but I'll let you take the lead."</p>
          
          <p><strong>Right to voice complaints without fear of retaliation:</strong> Clients should feel safe to express concerns or dissatisfaction with services without repercussions. This ensures accountability and promotes service improvement.</p>
          
          <p><strong>Right to receive services without discrimination:</strong> Services must be provided equitably, without bias based on factors such as race, religion, gender, or other personal characteristics.</p>
          
          <h3>II. Recognizing Diverse Client Needs</h3>
          <p>The training emphasizes that client needs are multifaceted and extend beyond the immediately apparent. Support staff must be proactive in identifying these diverse needs.</p>

          <p><strong>Categorization of Needs:</strong> The training identifies several categories of client needs:</p>
          <ul>
            <li>Physical: Assistance with daily activities.</li>
            <li>Health-related: Support for medical and well-being.</li>
            <li>Emotional: Feeling heard and having concerns validated.</li>
            <li>Social: Maintaining connections with family and community. The example of the client missing group activities due to family calls illustrates this: "The activities are all scheduled when my family typically calls. I don't want to miss those connection."</li>
            <li>Cultural: Respecting traditions and practices.</li>
            <li>Spiritual: Supporting belief systems.</li>
          </ul>
          
          <p><strong>Importance of Active Listening and Open-Ended Questions:</strong> The training highlights the necessity of asking open-ended questions and actively listening to uncover underlying needs. The interaction where the staff member notices the client's lack of participation and asks, "I noticed you haven't been participating in group activities lately. Is there something about them that isn't working for you?" demonstrates this approach. This led to the discovery of a social need related to family connections.</p>

          <h3>III. Person-Centered Support</h3>
          <p>A core theme of the training is the provision of person-centered support, which recognizes the uniqueness of each client.</p>

          <p><strong>Key Principles:</strong></p>
          <ul>
            <li>Starting with the client's priorities: Focus on what matters most to the client, not staff assumptions.</li>
            <li>Supporting client autonomy: Empowering clients to make decisions and exercise control over their lives. The example of the client wanting to try handling something themselves with support nearby demonstrates this principle.</li>
            <li>Being flexible in providing support: Adapting approaches to meet individual preferences and circumstances.</li>
            <li>Respecting cultural backgrounds and individual preferences: Recognizing and valuing the diversity of clients.</li>
            <li>Recognizing clients as the experts on their own lives: Acknowledging the client's unique knowledge of their own experiences and needs.</li>
          </ul>

          <h3>IV. Effective Communication</h3>
          <p>The training underscores the critical role of effective communication in understanding and meeting client needs.</p>

          <p><strong>Key Communication Practices:</strong></p>
          <ul>
            <li>Using clear, simple language without being condescending: Ensuring the client understands information.</li>
            <li>Confirming understanding rather than assuming: Proactively checking if the client has grasped the information. The example of the staff member asking, "just to make sure I've explained this well, could you tell me your understanding of what I'll be documenting?" exemplifies this.</li>
            <li>Paying attention to non-verbal cues: Recognizing unspoken messages.</li>
            <li>Practicing active listening: Fully concentrating on what the client is saying, both verbally and non-verbally.</li>
            <li>Avoiding interrupting: Allowing the client to fully express themselves.</li>
            <li>Respecting silences and processing time: Giving clients adequate time to think and respond.</li>
            <li>Seeking permission before sharing information: Respecting privacy and control over personal data, as shown by "I'll need to document this in your file. May I explain what information I'll be recording and who might see it?"</li>
          </ul>

          <h3>V. Navigating Challenging Situations</h3>
          <p>The training provides guidance on how to handle difficult interactions with clients.</p>

          <p><strong>Key Strategies:</strong></p>
          <ul>
            <li>Staying calm and professional: Maintaining composure in stressful situations.</li>
            <li>Listening to understand, not to respond: Focusing on the client's perspective.</li>
            <li>Acknowledging the client's feelings: Validating their emotions. The example of responding to a frustrated client with "I understand you're frustrated about having to repeat yourself. That would be annoying for anyone" demonstrates this empathy.</li>
            <li>Focusing on finding solutions, not placing blame: Working collaboratively to resolve issues. The staff member's offer to take notes and share with the team is a solution-oriented approach.</li>
            <li>Knowing when to involve supervisors: Recognizing situations that require additional support or expertise.</li>
            <li>Documenting incidents appropriately: Maintaining accurate records of challenging situations.</li>
          </ul>

          <h3>VI. Legal and Organizational Considerations</h3>
          <p>The training highlights that client rights are not only good practice but are also protected by law and organizational policies.</p>

          <p><strong>Key Areas:</strong></p>
          <ul>
            <li>Privacy and confidentiality regulations.</li>
            <li>Anti-discrimination laws.</li>
            <li>Mandatory reporting requirements. The staff member's statement, "I want to assure you that what we discuss is confidential with a few exceptions I need to mention. I'm required to report any instances of abuse or neglect or situations where you or someone else might be in danger. Does that make sense?" clearly communicates these legal obligations.</li>
          </ul>
          
          <p><strong>Balancing Rights and Responsibilities:</strong> Support staff must navigate the intersection of client rights and needs with their professional duties and organizational guidelines.</p>

          <h3>VII. Continuous Improvement</h3>
          <p>The training concludes by emphasizing that understanding client rights and needs is an ongoing process.</p>

          <p><strong>Key Elements of Continuous Improvement:</strong></p>
          <ul>
            <li>Active listening.</li>
            <li>Cultural humility.</li>
            <li>Flexibility.</li>
            <li>Self-awareness.</li>
            <li>Continuous learning.</li>
          </ul>

          <h3>Supporting Client Rights in Practice</h3>
          <ul>
            <li>Involving clients in decisions about their care</li>
            <li>Respecting personal boundaries and privacy</li>
            <li>Maintaining confidentiality of client information</li>
            <li>Advocating for clients when their rights are not being respected</li>
            <li>Reporting any suspected abuse or neglect immediately</li>
          </ul>
          
          <h3>Legal Protections</h3>
          <p>Various laws protect the rights of individuals receiving support services, including:</p>
          <ul>
            <li>Americans with Disabilities Act (ADA)</li>
            <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
            <li>State-specific client rights legislation</li>
          </ul>
        `,
        videoUrl: 'https://youtu.be/fWWNTxrGAWw',
        audioUrl: '/audio/Mastering Client Rights_ Support Staff Guide.wav',
        order: 8,
        course: course._id,
      },
    ];

    for (const sectionData of sections) {
      const section = await Section.create(sectionData);
      
      // Create quiz for each section
      const quiz = await Quiz.create({
        title: `${sectionData.title} Quiz`,
        description: `Test your knowledge of ${sectionData.title.toLowerCase()}`,
        section: section._id,
        questions: [
          {
            text: `What is one of the core values in support work mentioned in the ${sectionData.title} section?`,
            options: ['Cost efficiency', 'Dignity and Respect', 'Strict scheduling', 'Minimal interaction'],
            correctAnswer: 1,
            explanation: 'Dignity and Respect is a core value in support work, treating each person with dignity and recognizing their inherent worth.',
          },
          {
            text: 'Why is documentation important in support work?',
            options: ['It is not important', 'Only for billing purposes', 'To ensure continuity of care and track progress', 'Only required by management'],
            correctAnswer: 2,
            explanation: 'Proper documentation ensures continuity of care, tracks progress, meets regulatory requirements, and supports team communication.',
          },
          {
            text: 'What is person-centered thinking?',
            options: ['Focusing only on what staff thinks is best', 'Balancing what is important TO and FOR the person', 'Following a strict schedule', 'Providing the same care to everyone'],
            correctAnswer: 1,
            explanation: 'Person-centered thinking involves balancing what is important TO the person (preferences, interests) with what is important FOR them (health, safety).',
          },
          {
            text: 'When should you wash your hands?',
            options: ['Only after using the bathroom', 'Only before eating', 'Before and after providing care, before handling food, after using the bathroom', 'Only when visibly dirty'],
            correctAnswer: 2,
            explanation: 'Hand washing is crucial before and after providing care, before handling food, after using the bathroom, and after coughing or sneezing.',
          },
          {
            text: 'What should you do in a behavioral crisis?',
            options: ['Immediately call the police', 'Use de-escalation techniques and ensure safety', 'Ignore the behavior', 'Leave the individual alone'],
            correctAnswer: 1,
            explanation: 'In a behavioral crisis, you should use de-escalation techniques, ensure safety for all involved, and provide post-crisis support.',
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

    // Create interactive content
    console.log('Creating interactive content...');

    // Create a sample drag & drop exercise for the "Client Rights" section
    const clientRightsSection = await Section.findOne({ title: 'Client Rights' });
    if (clientRightsSection) {
      // First create the zones
      const zones = [
        {
          name: 'Privacy Rights',
          description: 'Rights related to personal privacy and confidentiality'
        },
        {
          name: 'Dignity Rights',
          description: 'Rights related to being treated with respect and dignity'
        },
        {
          name: 'Self-Determination Rights',
          description: 'Rights related to making choices and decisions'
        }
      ];

      // Create the drag & drop exercise with empty items first
      const dragDropExercise = await DragDropExercise.create({
        title: 'Client Rights Categories',
        description: 'Drag each right to the correct category it belongs to.',
        section: clientRightsSection._id,
        items: [],
        zones,
        passingScore: 70
      });

      // Now that we have the zone IDs, we can create the items with the correct zone IDs
      const privacyZoneId = dragDropExercise.zones[0]._id.toString();
      const dignityZoneId = dragDropExercise.zones[1]._id.toString();
      const selfDeterminationZoneId = dragDropExercise.zones[2]._id.toString();

      // Create a new exercise with the items
      await DragDropExercise.findByIdAndDelete(dragDropExercise._id);
      
      const completeExercise = await DragDropExercise.create({
        title: 'Client Rights Categories',
        description: 'Drag each right to the correct category it belongs to.',
        section: clientRightsSection._id,
        items: [
          {
            text: 'Right to privacy during personal care',
            category: 'Privacy',
            correctZone: privacyZoneId
          },
          {
            text: 'Right to be addressed by preferred name',
            category: 'Dignity',
            correctZone: dignityZoneId
          },
          {
            text: 'Right to confidential treatment of personal information',
            category: 'Privacy',
            correctZone: privacyZoneId
          },
          {
            text: 'Right to participate in developing care plan',
            category: 'Self-Determination',
            correctZone: selfDeterminationZoneId
          },
          {
            text: 'Right to be free from discrimination',
            category: 'Dignity',
            correctZone: dignityZoneId
          },
          {
            text: 'Right to choose daily activities',
            category: 'Self-Determination',
            correctZone: selfDeterminationZoneId
          }
        ],
        zones,
        passingScore: 70
      });
      
      console.log('Created drag & drop exercise');
    }

    // Create a sample role play exercise
    const communicationSection = await Section.findOne({ title: 'Communication and Professionalism' });
    if (communicationSection) {
      const rolePlayExercise = await RolePlayExercise.create({
        title: 'Effective Communication Role Play',
        description: 'Practice effective communication techniques in a challenging scenario.',
        section: communicationSection._id,
        scenario: 'A client is upset because they wanted to go to the park today, but it\'s raining heavily. They are expressing frustration and refusing to participate in indoor activities.',
        roles: [
          {
            name: 'Support Staff',
            description: 'You are a support staff member who needs to address the client\'s frustration while maintaining a positive and supportive approach.',
            keyPoints: [
              'Use active listening techniques',
              'Acknowledge the client\'s feelings',
              'Offer alternative activities',
              'Maintain a calm and respectful tone',
              'Find a compromise if possible'
            ]
          },
          {
            name: 'Client',
            description: 'You are a client who is disappointed and frustrated about not being able to go to the park as planned.',
            keyPoints: [
              'Express disappointment initially',
              'Respond to empathy from the support staff',
              'Consider alternatives when presented appropriately',
              'Show how your mood improves when you feel heard and respected'
            ]
          }
        ],
        evaluationCriteria: [
          {
            criterion: 'Active Listening',
            weight: 25
          },
          {
            criterion: 'Empathy and Validation',
            weight: 25
          },
          {
            criterion: 'Problem-Solving Approach',
            weight: 20
          },
          {
            criterion: 'Respectful Communication',
            weight: 20
          },
          {
            criterion: 'Overall Effectiveness',
            weight: 10
          }
        ]
      });
      
      console.log('Created role play exercise');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
