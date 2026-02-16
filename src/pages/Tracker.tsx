import React, { useState, useEffect } from 'react';
import { useTracker } from '../hooks/useTracker';
import { format } from 'date-fns';
import { CheckSquare, Save, AlertCircle, Clock, BookOpen, Zap } from 'lucide-react';

const Tracker = () => {
    const { addLog, getTodayLog, checkMissedDay, logs } = useTracker();
    const [missedYesterday, setMissedYesterday] = useState(false);

    // Form state
    // Time breakdown (Total 5h)
    const [gateHours, setGateHours] = useState(0); // Target 2
    const [codingHours, setCodingHours] = useState(0); // Target 1
    const [dsaHours, setDsaHours] = useState(0); // Target 1
    const [revisionHours, setRevisionHours] = useState(0); // Target 1

    // Other metrics
    const [codingProblems, setCodingProblems] = useState(0);
    const [dsaTopic, setDsaTopic] = useState(''); // Kept for backward compatibility if needed, but mostly replaced by codingTopics
    const [gateTopics, setGateTopics] = useState('');
    const [codingTopics, setCodingTopics] = useState('');
    const [hackerRankProfile, setHackerRankProfile] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setMissedYesterday(checkMissedDay());
        const existing = getTodayLog();
        if (existing) {
            setGateHours(existing.gateHours || 0);
            setCodingHours(existing.codingHours || 0);
            setDsaHours(existing.dsaHours || 0);
            setRevisionHours(existing.revisionHours || 0);
            setCodingProblems(existing.codingProblems);
            setDsaTopic(existing.dsaTopic);
            setGateTopics(existing.gateTopics || '');
            setCodingTopics(existing.codingTopics || '');
            setHackerRankProfile(existing.hackerRankProfile || '');
            setNotes(existing.notes || '');
        }
    }, [getTodayLog, checkMissedDay]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addLog({
            date: format(new Date(), 'yyyy-MM-dd'),
            gateHours,
            codingHours,
            dsaHours,
            revisionHours,
            codingProblems,
            dsaTopic, // Legacy
            gateTopics,
            codingTopics,
            hackerRankProfile,
            notes
        });
        alert('Progress saved successfully!');
    };

    const totalHours = gateHours + codingHours + dsaHours + revisionHours;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        Daily Tracker
                    </h1>
                    <p className="text-slate-500">Log your daily progress. Consistency is key.</p>
                </div>
            </div>

            {missedYesterday && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                    <AlertCircle className="text-red-500 mt-0.5" size={24} />
                    <div>
                        <h3 className="font-bold text-red-700">You missed yesterday!</h3>
                        <p className="text-sm text-red-600">Try to cover up the pending topics today/Sunday. Don't break the chain!</p>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckSquare className="text-indigo-600" />
                        <span>Today's Log ({format(new Date(), 'MMM do, yyyy')})</span>
                    </h2>
                    <div className={`px-4 py-2 rounded-lg font-bold ${totalHours >= 5 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        Total: {totalHours}/5 Hours
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* GATE Preparation Tracking Section */}
                    <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                        <h3 className="font-semibold text-sky-700 mb-4 flex items-center gap-2 text-lg">
                            <BookOpen size={20} className="text-sky-600" />
                            <span>GATE Preparation Tracking</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">GATE Study Duration (Target: 2h)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={gateHours}
                                        onChange={e => setGateHours(Number(e.target.value))}
                                        className="w-24 px-3 py-2 rounded-lg border-2 border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none"
                                    />
                                    {gateHours >= 2 && (
                                        <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-black shadow-md animate-bounce">
                                            <Zap size={16} /> GATE Target Met! 🏆
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-sky-600 font-medium">Log your core GATE syllabus study time here.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Recent GATE Topics</label>
                                <textarea
                                    value={gateTopics}
                                    onChange={(e) => setGateTopics(e.target.value)}
                                    rows={1}
                                    placeholder="e.g., Eigenvalues, Probability Distribution..."
                                    className="w-full px-4 py-2 rounded-lg border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Time Allocation Section (Remaining) */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <Clock size={18} /> Daily Routine Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Coding (1h)</label>
                                <input type="number" min="0" step="0.5" value={codingHours} onChange={e => setCodingHours(Number(e.target.value))} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">DSA Concept (1h)</label>
                                <input type="number" min="0" step="0.5" value={dsaHours} onChange={e => setDsaHours(Number(e.target.value))} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Revision (1h)</label>
                                <input type="number" min="0" step="0.5" value={revisionHours} onChange={e => setRevisionHours(Number(e.target.value))} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>
                    </div>

                    {/* HackerRank / Coding Profiles */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <span className="text-green-600 font-bold">HackerRank & Coding</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">HackerRank Profile URL</label>
                                <input
                                    type="text"
                                    value={hackerRankProfile}
                                    onChange={e => setHackerRankProfile(e.target.value)}
                                    placeholder="https://hackerrank.com/your_username"
                                    className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-600">Problems Solved Today</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        value={codingProblems}
                                        onChange={e => setCodingProblems(Number(e.target.value))}
                                        className="w-24 px-3 py-2 rounded border focus:ring-2 focus:ring-green-500"
                                    />
                                    {codingProblems >= 2 && (
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
                                            Hackathon Progress Completed! 🚀
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    Coding Problems Solved (Target: 2+)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={codingProblems}
                                    onChange={(e) => setCodingProblems(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">
                                    DSA Topic Covered
                                </label>
                                <input
                                    type="text"
                                    value={dsaTopic}
                                    onChange={(e) => setDsaTopic(e.target.value)}
                                    placeholder="e.g., Linked Lists Basics"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                General Notes / Remarks
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={2}
                                placeholder="Any difficulties faced or key takeaways..."
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            <span>Save Log</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Recent History */}
            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {logs.slice(-5).reverse().map((log, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-slate-100 flex justify-between items-center opacity-75">
                            <div>
                                <p className="font-semibold text-slate-700">{log.date}</p>
                                <p className="text-xs text-slate-500">{log.dsaTopic}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-indigo-600 font-bold">
                                    {(log.gateHours || 0) + (log.codingHours || 0) + (log.dsaHours || 0) + (log.revisionHours || 0)}h
                                </span>
                                <p className="text-xs text-slate-400">{log.codingProblems} probs</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tracker;
