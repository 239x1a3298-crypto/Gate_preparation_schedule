import React, { useMemo } from 'react';
import { useTracker } from '../hooks/useTracker';
import { useNavigate } from 'react-router-dom';
import {
    Code,
    Terminal,
    Cpu,
    ExternalLink,
    CheckCircle,
    Flame,
    Trophy,
    Clock,
    RotateCcw
} from 'lucide-react';
import {
    format,
    parseISO
} from 'date-fns';

const CodingDashboard = () => {
    const { logs, getTodayLog } = useTracker();
    const navigate = useNavigate();

    // Derived State
    const todayLog = getTodayLog();
    const isTargetMet = (todayLog?.codingProblems || 0) >= 2;

    // Get latest HackerRank profile
    const hackerRankProfile = useMemo(() => {
        const reversedLogs = [...logs].reverse();
        return reversedLogs.find(l => l.hackerRankProfile)?.hackerRankProfile || '';
    }, [logs]);

    // Stats
    const totalProblems = logs.reduce((acc, log) => acc + (log.codingProblems || 0), 0);
    const totalCodingHours = logs.reduce((acc, log) => acc + (Number(log.codingHours) || 0) + (Number(log.dsaHours) || 0), 0);

    // Calculate Streak (Active Days)
    const activeDaysCount = useMemo(() => {
        return logs.filter(l => (Number(l.codingProblems) > 0 || Number(l.codingHours) > 0)).length;
    }, [logs]);

    return (
        <div className="space-y-8 pb-20 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Terminal className="text-emerald-500" size={40} />
                        Coding Dashboard
                    </h1>
                    <p className="text-slate-600 mt-2 text-xl font-medium">Track your DSA & Hackathon prep.</p>
                </div>

                {hackerRankProfile && (
                    <a
                        href={hackerRankProfile.startsWith('http') ? hackerRankProfile : `https://${hackerRankProfile}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-200 transition-colors"
                    >
                        <ExternalLink size={18} /> Visit HackerRank
                    </a>
                )}
            </div>

            {/* Daily Status Banner */}
            <div className={`
                relative overflow-hidden rounded-3xl p-8 border-2 shadow-xl transition-all
                ${isTargetMet
                    ? 'bg-emerald-600 border-emerald-500 shadow-emerald-200/50'
                    : 'bg-white border-slate-200 shadow-slate-200/50'}
            `}>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className={isTargetMet ? 'text-white' : 'text-slate-900'}>
                        <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                            {isTargetMet ? (
                                <>
                                    <Trophy className="text-yellow-300" size={32} />
                                    Hackathon Progress Completed! 🚀
                                </>
                            ) : (
                                <>
                                    <Cpu className="text-slate-400" size={32} />
                                    Daily Target Pending
                                </>
                            )}
                        </h2>
                        <p className={`text-lg font-medium ${isTargetMet ? 'text-emerald-50' : 'text-slate-500'}`}>
                            {isTargetMet
                                ? "Great job! You've crushed your coding goals for today."
                                : "Solve at least 2 problems to mark today as complete."}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className={`text-center p-4 rounded-2xl ${isTargetMet ? 'bg-white/10 backdrop-blur-md' : 'bg-slate-50'}`}>
                            <div className={`text-3xl font-black ${isTargetMet ? 'text-white' : 'text-slate-900'}`}>
                                {todayLog?.codingProblems || 0} / 2
                            </div>
                            <div className={`text-xs font-bold uppercase tracking-wider ${isTargetMet ? 'text-emerald-200' : 'text-slate-400'}`}>
                                Problems
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refined Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                        <Trophy size={28} />
                    </div>
                    <div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Total Solved</p>
                        <h3 className="text-3xl font-black text-slate-900">{totalProblems}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                        <Clock size={28} />
                    </div>
                    <div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Hours Put In</p>
                        <h3 className="text-3xl font-black text-slate-900">{totalCodingHours}h</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="p-4 rounded-2xl bg-orange-50 text-orange-600">
                        <Flame size={28} />
                    </div>
                    <div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Active Streak</p>
                        <h3 className="text-3xl font-black text-slate-900">{activeDaysCount}</h3>
                    </div>
                </div>
                <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg border border-indigo-500 flex items-center gap-5 group cursor-pointer hover:bg-indigo-700 transition-all"
                    onClick={() => {
                        window.open(hackerRankProfile.startsWith('http') ? hackerRankProfile : `https://www.hackerrank.com/dashboard`, '_blank');
                    }}>
                    <div className="p-4 rounded-2xl bg-white/10 text-white">
                        <RotateCcw size={28} className="group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                    <div>
                        <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest">HackerRank</p>
                        <h3 className="text-2xl font-black text-white">Sync Now</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Topics */}
                <div className="lg:col-span-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-black text-2xl text-slate-900">Recent Coding Focus</h3>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Your latest journey through problems and concepts.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {logs.slice(-6).reverse().map((log, i) => (
                            <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{format(parseISO(log.date), 'MMM dd')}</span>
                                    {log.codingProblems >= 2 && (
                                        <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform">
                                            <CheckCircle size={16} />
                                        </div>
                                    )}
                                </div>
                                {log.codingTopics ? (
                                    <p className="text-slate-700 font-bold text-base leading-snug">{log.codingTopics}</p>
                                ) : (
                                    <p className="text-slate-400 italic text-sm">Routine Daily Prep</p>
                                )}
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-500">
                                    <Cpu size={14} /> {log.codingProblems} Problems
                                </div>
                            </div>
                        ))}
                        {logs.length === 0 && (
                            <div className="md:col-span-3 text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <Code className="mx-auto text-slate-300 mb-4" size={48} />
                                <p className="text-slate-500 font-bold">No coding logs yet. Ready to start your streak?</p>
                                <button onClick={() => navigate('/tracker')} className="mt-4 text-indigo-600 font-black flex items-center gap-2 mx-auto">
                                    Open Tracker <ExternalLink size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodingDashboard;
