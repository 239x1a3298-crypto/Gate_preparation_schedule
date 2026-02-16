export interface User {
    name: string;
    email: string;
    avatar?: string;
}

export interface StudyLog {
    date: string; // YYYY-MM-DD
    gateHours?: number; // Target: 2
    codingHours?: number; // Target: 1
    dsaHours?: number; // Target: 1
    revisionHours?: number; // Target: 1
    studyHours?: number; // Legacy total
    codingProblems: number; // Target: 2
    dsaTopic: string;
    revisionDone?: boolean; // Legacy
    notes?: string;
    gateTopics?: string;
    codingTopics?: string;
    hackerRankProfile?: string;
}

export interface SyllabusTopic {
    id: string;
    subject: string;
    name: string;
    completed: boolean;
    subtopics?: string[];
}

export interface ScheduleWeek {
    weekNumber: number;
    subject: string; // "Linear Algebra", etc.
    focusTopics: string[];
    startDate: string;
    endDate: string;
}

export interface MockTestResult {
    date: string; // YYYY-MM-DD
    score: number;
    totalMarks: number;
    accuracy?: number;
}
