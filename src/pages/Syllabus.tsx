import React from 'react';
import { useSyllabus } from '../hooks/useSyllabus';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

const Syllabus = () => {
    const { syllabus, toggleTopic, isTopicCompleted, progress } = useSyllabus();
    const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        GATE DA Syllabus
                    </h1>
                    <p className="text-slate-500">Official curriculum for Data Science & AI</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-16 h-16 relative flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent"
                                strokeDasharray={175.84}
                                strokeDashoffset={175.84 - (175.84 * progress) / 100}
                                className="text-indigo-600 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <span className="absolute text-sm font-bold text-indigo-700">{progress}%</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-900">Total Progress</p>
                        <p className="text-xs text-slate-500">Keep going!</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {syllabus.map((subject) => (
                    <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-200 hover:shadow-md">
                        <button
                            onClick={() => toggleExpand(subject.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${expandedSubjects[subject.id] ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <BookOpen size={20} />
                                </div>
                                <span className="font-semibold text-lg text-slate-800">{subject.name}</span>
                            </div>
                            {expandedSubjects[subject.id] ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                        </button>

                        {expandedSubjects[subject.id] && (
                            <div className="px-6 pb-4 pt-0 animate-fadeIn">
                                <div className="h-px bg-slate-100 mb-4" />
                                <div className="space-y-3 pl-4 border-l-2 border-slate-100 ml-5">
                                    {subject.subtopics?.map((subtopic, index) => {
                                        const completed = isTopicCompleted(subject.id, index);
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => toggleTopic(subject.id, index)}
                                                className="flex items-start gap-3 cursor-pointer group"
                                            >
                                                <div className={`mt-0.5 transition-colors ${completed ? 'text-green-500' : 'text-slate-300 group-hover:text-indigo-400'}`}>
                                                    {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                                </div>
                                                <span className={`text-slate-600 transition-all ${completed ? 'line-through text-slate-400' : 'group-hover:text-indigo-900'}`}>
                                                    {subtopic}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Syllabus;
