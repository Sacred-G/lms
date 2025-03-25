import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/course.model';
import Section from '../models/section.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
    addMasterSupportStaffSection();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const addMasterSupportStaffSection = async () => {
  try {
    // Find the Support Staff Training course
    const course = await Course.findOne({ title: 'Support Staff Training' });
    
    if (!course) {
      console.error('Support Staff Training course not found');
      process.exit(1);
    }
    
    console.log('Found course:', course.title);
    
    // Check if the section already exists
    const existingSection = await Section.findOne({ title: 'Master Being a Support Staff' });
    
    if (existingSection) {
      console.log('Section "Master Being a Support Staff" already exists');
      process.exit(0);
    }
    
    // Get the highest order number from existing sections
    const sections = await Section.find({ course: course._id }).sort({ order: -1 }).limit(1);
    const highestOrder = sections.length > 0 ? sections[0].order : 0;
    const newOrder = highestOrder + 1;
    
    // Create the new section
    const newSection = await Section.create({
      title: 'Master Being a Support Staff',
      description: 'Learn advanced skills and techniques to excel in your role as a support staff.',
      content: `
        <h2>Master Being a Support Staff</h2>
        <p>This section will help you develop advanced skills and techniques to excel in your role as a support staff member for individuals with developmental disabilities.</p>
        
        <h3>Understanding Developmental Disabilities</h3>
        <p>Developmental disabilities are a diverse group of conditions, including intellectual disabilities, cerebral palsy, epilepsy, autism, and down syndrome. It's important to understand that having one of these conditions doesn't automatically mean a person has an intellectual disability. Each individual with a developmental disability is uniquely human, requiring a nuanced and person-centered approach to care.</p>
        
        <h3>The Multifaceted Role of Support Staff</h3>
        <p>Support staff are often described as the "Swiss Army knife of the care world" due to the wide range of responsibilities they undertake. These include:</p>
        <ul>
          <li><strong>Practical Assistance:</strong> Helping with daily living activities such as cooking or cleaning.</li>
          <li><strong>Emotional Support:</strong> Acting as cheerleaders, a shoulder to cry on, and often the best friend to the person they're caring for.</li>
          <li><strong>Companionship:</strong> Fostering a bond, a sense of trust and safety, often becoming like family to those they support.</li>
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
        
        <h3>Addressing Challenging Behavior</h3>
        <p>When faced with challenging behavior, it's important to approach the situation with calmness and understanding:</p>
        <ul>
          <li>Remain calm and avoid reacting emotionally.</li>
          <li>Try to understand the underlying cause of the behavior.</li>
          <li>Use positive behavior support techniques.</li>
          <li>Focus on prevention by identifying triggers.</li>
          <li>Maintain consistency in your approach.</li>
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
      videoUrl: 'https://youtu.be/-PDp9AifTKQ',
      audioUrl: '/audio/Mastering Support Staff Roles in Developmental Disabilities.wav',
      order: newOrder,
      course: course._id,
    });
    
    console.log('Created new section:', newSection.title);
    
    // Add the section to the course
    course.sections.push(newSection._id);
    await course.save();
    
    console.log('Added section to course');
    console.log('Process completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error adding Master Being a Support Staff section:', error);
    process.exit(1);
  }
};
