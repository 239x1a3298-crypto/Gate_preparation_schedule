import { useState, useEffect } from 'react';
import { GATE_DA_SYLLABUS } from '../data/syllabus';

export const useSyllabus = () => {
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const stored = localStorage.getItem('gate_da_syllabus_progress');
        if (stored) {
            setCompletedTopics(JSON.parse(stored));
        }
    }, []);

    const toggleTopic = (topicId: string, subtopicIndex: number) => {
        const key = `${topicId}-${subtopicIndex}`;
        const newStatus = !completedTopics[key];
        const newCompleted = { ...completedTopics, [key]: newStatus };
        setCompletedTopics(newCompleted);
        localStorage.setItem('gate_da_syllabus_progress', JSON.stringify(newCompleted));
    };

    const isTopicCompleted = (topicId: string, subtopicIndex: number) => {
        return !!completedTopics[`${topicId}-${subtopicIndex}`];
    };

    const calculateProgress = () => {
        let totalSubtopics = 0;
        let completedCount = 0;

        GATE_DA_SYLLABUS.forEach(subject => {
            if (subject.subtopics) {
                subject.subtopics.forEach((_, idx) => {
                    totalSubtopics++;
                    if (completedTopics[`${subject.id}-${idx}`]) {
                        completedCount++;
                    }
                });
            }
        });

        return totalSubtopics === 0 ? 0 : Math.round((completedCount / totalSubtopics) * 100);
    };

    return {
        syllabus: GATE_DA_SYLLABUS,
        toggleTopic,
        isTopicCompleted,
        progress: calculateProgress()
    };
};
