import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify exec
const execPromise = promisify(exec);

// Load environment variables
dotenv.config();

const runScript = async (scriptPath: string): Promise<void> => {
  try {
    console.log(`Running script: ${scriptPath}`);
    const { stdout, stderr } = await execPromise(`npx ts-node ${scriptPath}`);
    
    if (stdout) {
      console.log('Output:', stdout);
    }
    
    if (stderr) {
      console.error('Error:', stderr);
    }
  } catch (error) {
    console.error(`Error executing script ${scriptPath}:`, error);
    throw error;
  }
};

const main = async () => {
  try {
    // First add the section
    await runScript('./src/utils/addMasterSupportStaffSection.ts');
    
    // Then import the quiz
    await runScript('./src/utils/importQuizzes.ts');
    
    console.log('Successfully added Master Being a Support Staff section and quiz');
    process.exit(0);
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
};

// Run the main function
main();
