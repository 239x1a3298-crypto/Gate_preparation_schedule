import { useState, useEffect } from 'react';
import type { StudyLog, MockTestResult } from '../types';
import { format, subDays, isSameDay, parseISO } from 'date-fns';

export const useTracker = () => {
    const [logs, setLogs] = useState<StudyLog[]>([]);
    const [mockScores, setMockScores] = useState<MockTestResult[]>([]);

    useEffect(() => {
        const storedLogs = localStorage.getItem('gate_da_logs');
        const storedScores = localStorage.getItem('gate_da_mock_scores');
        if (storedLogs) setLogs(JSON.parse(storedLogs));
        if (storedScores) setMockScores(JSON.parse(storedScores));
    }, []);

    const addLog = (log: StudyLog) => {
        const newLogs = [...logs.filter(l => l.date !== log.date), log];
        setLogs(newLogs);
        localStorage.setItem('gate_da_logs', JSON.stringify(newLogs));
    };

    const addMockScore = (score: MockTestResult) => {
        const newScores = [...mockScores, score];
        // Sort by date
        newScores.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setMockScores(newScores);
        localStorage.setItem('gate_da_mock_scores', JSON.stringify(newScores));
    };

    const checkMissedDay = () => {
        const today = new Date();
        const yesterday = subDays(today, 1);
        const hasLogForYesterday = logs.some(log => isSameDay(parseISO(log.date), yesterday));
        return !hasLogForYesterday;
    };

    const getTodayLog = () => {
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        return logs.find(l => l.date === todayStr);
    };

    return {
        logs,
        mockScores,
        addLog,
        addMockScore,
        checkMissedDay,
        getTodayLog
    };
};
