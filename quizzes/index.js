"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizByKey = exports.quizzes = void 0;
const introToCaregiving_1 = __importDefault(require("./introToCaregiving"));
const safetyProtocols_1 = __importDefault(require("./safetyProtocols"));
const communicationBasics_1 = __importDefault(require("./communicationBasics"));
const personalCareTechniques_1 = __importDefault(require("./personalCareTechniques"));
const introductionToTheRole_1 = __importDefault(require("./introductionToTheRole"));
const understandingClientNeeds_1 = __importDefault(require("./understandingClientNeeds"));
const keyResponsibilities_1 = __importDefault(require("./keyResponsibilities"));
const infectionControl_1 = __importDefault(require("./infectionControl"));
const emergencyProcedures_1 = __importDefault(require("./emergencyProcedures"));
const clientRights_1 = __importDefault(require("./clientRights"));
exports.quizzes = {
    introToCaregiving: introToCaregiving_1.default,
    safetyProtocols: safetyProtocols_1.default,
    communicationBasics: communicationBasics_1.default,
    personalCareTechniques: personalCareTechniques_1.default,
    introductionToTheRole: introductionToTheRole_1.default,
    understandingClientNeeds: understandingClientNeeds_1.default,
    keyResponsibilities: keyResponsibilities_1.default,
    infectionControl: infectionControl_1.default,
    emergencyProcedures: emergencyProcedures_1.default,
    clientRights: clientRights_1.default
};
const getQuizByKey = (key) => {
    return exports.quizzes[key];
};
exports.getQuizByKey = getQuizByKey;
