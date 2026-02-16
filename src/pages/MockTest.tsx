import React, { useState } from 'react';
import { useTracker } from '../hooks/useTracker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, ExternalLink, Terminal, BookOpen, Zap } from 'lucide-react';
import { format } from 'date-fns';

const MockTests = () => {
    const { mockScores, addMockScore } = useTracker();
    const [showForm, setShowForm] = useState(false);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(100);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMockScore({
            date: format(new Date(), 'yyyy-MM-dd'),
            score,
            totalMarks: total,
        });
        setShowForm(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        Mock Test Analytics
                    </h1>
                    <p className="text-slate-500">Track your performance improvement every Sunday.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/30"
                >
                    <PlusCircle size={20} />
                    <span>Add Result</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 animate-fadeIn">
                    <h3 className="font-bold text-lg mb-4">Enter Mock Test Result</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Score Obtained</label>
                            <input type="number" value={score} onChange={e => setScore(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" required />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Total Marks</label>
                            <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" required />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 w-full md:w-auto">Save</button>
                    </form>
                </div>
            )}

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]">
                <h3 className="font-bold text-slate-700 mb-4">Performance Trend</h3>
                {mockScores.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockScores}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickFormatter={(str) => format(new Date(str), 'MMM d')} />
                            <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 'auto']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#4f46e5"
                                strokeWidth={3}
                                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <p>No test data yet. Add a score to see the graph.</p>
                    </div>
                )}
            </div>

            {/* Links Section */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-xl p-6 text-white shadow-xl">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <ExternalLink size={20} />
                    <span>Quick Links</span>
                </h3>
                <p className="text-slate-300 text-sm mb-4">Useful resources for your preparation.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <a href="https://www.hackerrank.com/dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all text-sm font-bold border border-white/10 group">
                        <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                            <Terminal size={20} className="text-emerald-400" />
                        </div>
                        <span>HackerRank Dash</span>
                    </a>
                    <a href="https://gate2026.iitg.ac.in/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all text-sm font-bold border border-white/10 group">
                        <div className="p-2 bg-sky-500/20 rounded-lg group-hover:bg-sky-500/30 transition-colors">
                            <BookOpen size={20} className="text-sky-400" />
                        </div>
                        <span>GATE DA Official</span>
                    </a>
                    <a href="https://testbook.com/gate-da/mock-test" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-pink-500/20 hover:bg-pink-500/30 text-pink-50 rounded-2xl border border-pink-500/30 backdrop-blur-md transition-all text-sm font-bold group">
                        <div className="p-2 bg-pink-500/30 rounded-lg group-hover:bg-pink-500/40 transition-colors">
                            <Zap size={20} className="text-pink-300" />
                        </div>
                        <span>Testbook Mock</span>
                    </a>
                    <a href="https://www.geeksforgeeks.org/gate-da-mock-tests/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-50 rounded-2xl border border-indigo-500/30 backdrop-blur-md transition-all text-sm font-bold group">
                        <div className="p-2 bg-indigo-500/30 rounded-lg group-hover:bg-indigo-500/40 transition-colors">
                            <ExternalLink size={20} className="text-indigo-300" />
                        </div>
                        <span>GFG Mock Tests</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MockTests;
