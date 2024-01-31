import json from './data.json';

export interface RawDataEntry {
    alias: string;
    timestamp: string;
    otherUniversity: string;
    studyStartYear: string;
    graduationDate: string;
    major: string;
    degree: string;
    interests: string;
    learnings: string;
    relevantCourses: string;
    usesCanvas: string;
    skillInformationVisualization: string;
    skillStatistics: string;
    skillMathematics: string;
    skillArtistic: string;
    skillComputerUsage: string;
    skillProgramming: string;
    skillComputerGraphicsProgramming: string;
    skillHCIProgramming: string;
    skillExperienceEvaluation: string;
    skillCommunication: string;
    skillCollaboration: string;
    skillCodeRepository: string;
    thesisStatus: string;
    futureOutlook: string;
}

export class IvisSurveyDataEntry {
    alias: string;
    timestamp: Date;
    otherUniversity: string;
    studyStartYear: number;
    graduationDate: Date;
    major: string;
    degree: string;
    interests: string;
    learnings: string;
    relevantCourses: string;
    usesCanvas: string;
    skillInformationVisualization: number;
    skillStatistics: number;
    skillMathematics: number;
    skillArtistic: number;
    skillComputerUsage: number;
    skillProgramming: number;
    skillComputerGraphicsProgramming: number;
    skillHCIProgramming: number;
    skillExperienceEvaluation: number;
    skillCommunication: number;
    skillCollaboration: number;
    skillCodeRepository: number;
    thesisStatus: string;
    futureOutlook: string;

    constructor(jsonEntry: RawDataEntry) {
        this.alias = jsonEntry.alias;
        this.timestamp = new Date(jsonEntry.timestamp);
        this.otherUniversity = jsonEntry.otherUniversity;
        this.studyStartYear = Number.parseInt(jsonEntry.studyStartYear);
        this.graduationDate = new Date(jsonEntry.graduationDate);
        this.major = jsonEntry.major;
        this.degree = jsonEntry.degree;
        this.interests = jsonEntry.interests;
        this.learnings = jsonEntry.learnings;
        this.relevantCourses = jsonEntry.relevantCourses;
        this.usesCanvas = jsonEntry.usesCanvas;
        this.skillInformationVisualization = Number.parseInt(jsonEntry.skillInformationVisualization);
        this.skillStatistics = Number.parseInt(jsonEntry.skillStatistics);
        this.skillMathematics = Number.parseInt(jsonEntry.skillMathematics);
        this.skillArtistic = Number.parseInt(jsonEntry.skillArtistic);
        this.skillComputerUsage = Number.parseInt(jsonEntry.skillComputerUsage);
        this.skillProgramming = Number.parseInt(jsonEntry.skillProgramming);
        this.skillComputerGraphicsProgramming = Number.parseInt(jsonEntry.skillComputerGraphicsProgramming);
        this.skillHCIProgramming = Number.parseInt(jsonEntry.skillHCIProgramming);
        this.skillExperienceEvaluation = Number.parseInt(jsonEntry.skillExperienceEvaluation);
        this.skillCommunication = Number.parseInt(jsonEntry.skillCommunication);
        this.skillCollaboration = Number.parseInt(jsonEntry.skillCollaboration);
        this.skillCodeRepository = Number.parseInt(jsonEntry.skillCodeRepository);
        this.thesisStatus = jsonEntry.thesisStatus;
        this.futureOutlook = jsonEntry.futureOutlook;
    }

    get allSkills() {
        const skills = new Map<string, number>();
        skills.set('skillInformationVisualization', this.skillInformationVisualization);
        skills.set('skillStatistics', this.skillStatistics);
        skills.set('skillMathematics', this.skillMathematics);
        skills.set('skillComputerUsage', this.skillComputerUsage);
        skills.set('skillProgramming', this.skillProgramming);
        skills.set('skillComputerGraphicsProgramming', this.skillComputerGraphicsProgramming);
        skills.set('skillHCIProgramming', this.skillHCIProgramming);
        skills.set('skillCodeRepository', this.skillCodeRepository);
        skills.set('skillCollaboration', this.skillCollaboration);
        skills.set('skillCommunication', this.skillCommunication);
        skills.set('skillArtistic', this.skillArtistic);
        skills.set('skillExperienceEvaluation', this.skillExperienceEvaluation);
        return skills;
    }

    get meanSkillScore(): number {
        return this.totalSkillScore / this.allSkills.size;
    }

    get totalSkillScore(): number {
        return [...this.allSkills.values()].reduce((acc, curr) => acc + curr, 0);
    }
}

export const data = json.map((entry) => {
    return new IvisSurveyDataEntry(entry);
});

export const metadata = {
    allSkills: [
        'meanSkillScore',
        'skillInformationVisualization',
        'skillStatistics',
        'skillMathematics',
        'skillComputerUsage',
        'skillProgramming',
        'skillComputerGraphicsProgramming',
        'skillHCIProgramming',
        'skillCodeRepository',
        'skillCollaboration',
        'skillCommunication',
        'skillExperienceEvaluation',
        'skillArtistic',
    ],
    maxSkillScore: 10,
    skillsCount: 12,
    totalSkillScore: data.reduce((acc, e) => acc + e.totalSkillScore, 0),
    skillLabels: {
        meanSkillScore: 'Average of All Skills',
        skillInformationVisualization: 'Information Visualization',
        skillStatistics: 'Statistics',
        skillMathematics: 'Mathematics',
        skillComputerUsage: 'Computer Usage',
        skillProgramming: 'Programming',
        skillComputerGraphicsProgramming: 'CG Programming',
        skillHCIProgramming: 'HCI Programming',
        skillCodeRepository: 'Code Repository',
        skillCollaboration: 'Collaboration',
        skillCommunication: 'Communication',
        skillExperienceEvaluation: 'Experience Evaluation',
        skillArtistic: 'Artistic',
    },
};
