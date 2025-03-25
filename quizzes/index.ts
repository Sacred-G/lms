import { Quiz } from './types';
import introToCaregiving from './introToCaregiving';
import safetyProtocols from './safetyProtocols';
import communicationBasics from './communicationBasics';
import personalCareTechniques from './personalCareTechniques';
import introductionToTheRole from './introductionToTheRole';
import understandingClientNeeds from './understandingClientNeeds';
import keyResponsibilities from './keyResponsibilities';
import infectionControl from './infectionControl';
import emergencyProcedures from './emergencyProcedures';
import clientRights from './clientRights';
import masterSupportStaff from './masterSupportStaff';

export const quizzes: Record<string, Quiz> = {
  introToCaregiving,
  safetyProtocols,
  communicationBasics,
  personalCareTechniques,
  introductionToTheRole,
  understandingClientNeeds,
  keyResponsibilities,
  infectionControl,
  emergencyProcedures,
  clientRights,
  masterSupportStaff
};

export const getQuizByKey = (key: string): Quiz | undefined => {
  return quizzes[key];
};
