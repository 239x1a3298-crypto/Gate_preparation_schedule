import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSyllabus } from '../hooks/useSyllabus';
import { useTracker } from '../hooks/useTracker';
import { Link } from 'react-router-dom';
import {
    Clock,
    BookOpen,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    ArrowRight,
    Code,
    BrainCircuit,
    RotateCcw,
    Zap,
    Quote,
    Sparkles,
    Terminal
} from 'lucide-react';
import { format } from 'date-fns';
import { MOTIVATIONAL_QUOTES } from '../data/quotes';

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">{title}</p>
                <h3 className="text-4xl font-black mt-2 text-slate-900 tracking-tight">{value}</h3>
                {subtext && <p className="text-xs text-slate-500 mt-2 font-medium">{subtext}</p>}
            </div>
            <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 text-opacity-100`}>
                <Icon size={28} className={colorClass.replace('bg-', 'text-')} />
            </div>
        </div>
    </div>
);

const DailyGoal = ({ label, target, current, icon: Icon, colorClass }: any) => {
    const progress = Math.min((current / target) * 100, 100);
    const isMet = current >= target;

    return (
        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border-2 border-slate-100 hover:border-indigo-100 transition-colors group">
            <div className="flex items-center gap-5 flex-1">
                <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
                    <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between mb-2">
                        <p className="font-bold text-slate-800 text-base">{label}</p>
                        <p className="text-sm text-slate-600 font-bold">{current}/{target} hrs</p>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${isMet ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full transition-all duration-500 shadow-sm`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
            {isMet && <div className="ml-4 text-emerald-600"><CheckCircle size={28} /></div>}
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const { progress } = useSyllabus();
    const { logs, mockScores, checkMissedDay, getTodayLog } = useTracker();

    // Get current schedule topic
    const [currentWeek, setCurrentWeek] = React.useState<any>(null);
    React.useEffect(() => {
        import('../utils/scheduleGenerator').then(({ generateSchedule }) => {
            const schedule = generateSchedule();
            const today = new Date();
            const start = new Date('2026-02-19');
            const diffTime = Math.abs(today.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let active;
            if (today < start) {
                active = schedule[0];
            } else {
                const weekIndex = Math.floor(diffDays / 7);
                active = schedule[weekIndex] || schedule[schedule.length - 1];
            }
            setCurrentWeek(active);
        });
    }, []);

    const todayLog = getTodayLog();
    const missedYesterday = checkMissedDay();
    const lastMockScore = mockScores.length > 0 ? mockScores[mockScores.length - 1].score : '0';

    const totalStudyHours = logs.reduce((acc, log) => {
        return acc + (log.gateHours || 0) + (log.codingHours || 0) + (log.dsaHours || 0) + (log.revisionHours || 0);
    }, 0);

    // Daily Quote Logic
    const dayOfYear = Math.floor((new Date().getTime()) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % MOTIVATIONAL_QUOTES.length;
    const dailyQuote = MOTIVATIONAL_QUOTES[quoteIndex];

    return (
        <div className="space-y-8 pb-20 fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                        Hello, {user?.name} <span className="text-sky-500">✦</span>
                    </h1>
                    <p className="text-slate-600 mt-2 text-xl font-medium">Ready to dominate GATE DA today?</p>
                </div>
                <div className="bg-white border-2 border-sky-100 px-6 py-3 rounded-full text-slate-700 font-bold text-sm flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <Clock size={20} className="text-sky-500" />
                    {format(new Date(), 'EEEE, MMMM do')}
                </div>
            </div>

            {/* Daily Wisdom (Moved to Top) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Quote size={100} />
                </div>
                <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
                    <div className="bg-white p-3 rounded-xl text-sky-500 shadow-sm">
                        <Quote size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Daily Wisdom</h3>
                        <blockquote className="text-slate-700 italic font-medium leading-relaxed">"{dailyQuote.text}"</blockquote>
                    </div>
                </div>
                <p className="text-sm font-black text-sky-600 uppercase tracking-widest whitespace-nowrap relative z-10">— {dailyQuote.author}</p>
            </div>

            {/* Current Schedule Focus Banner */}
            {currentWeek && (
                <div className="relative overflow-hidden rounded-3xl bg-indigo-600 shadow-2xl shadow-indigo-200/50 p-10 text-white transform transition-transform hover:scale-[1.01] duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <BrainCircuit size={400} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm backdrop-blur-md">
                                    {new Date() < new Date('2026-02-19') ? 'Starting Soon' : `Week ${currentWeek.weekNumber} / 48`}
                                </span>
                                <span className="text-indigo-100 text-sm font-semibold tracking-wide">Target: Jan 30, 2027</span>
                            </div>
                            <h2 className="text-5xl font-black text-white mb-6 tracking-tight leading-tight">{currentWeek.subject}</h2>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Sparkles size={20} className="text-yellow-300 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="font-bold opacity-80 block mb-1">Weekly Focus Topics:</span>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-indigo-100 font-medium list-disc list-inside">
                                            {Array.isArray(currentWeek.focusTopics)
                                                ? currentWeek.focusTopics.map((topic: string, i: number) => (
                                                    <li key={i} className={topic.includes('Mock Test') ? 'text-yellow-300 font-bold list-none flex items-center gap-2' : ''}>
                                                        {topic.includes('Mock Test') && <span className="text-xl">📝</span>}
                                                        {topic}
                                                    </li>
                                                ))
                                                : <li>{currentWeek.focusTopics}</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="/schedule" className="hidden md:flex flex-col items-center justify-center w-32 h-32 bg-white text-indigo-600 rounded-full font-black hover:bg-indigo-50 transition-all hover:scale-110 shadow-xl text-center p-4 leading-tight shrink-0">
                            View Plan <ArrowRight size={20} className="mt-1" />
                        </Link>
                    </div>
                </div>
            )}

            {/* GATE Achievement Banner */}
            {todayLog && (todayLog.gateHours ?? 0) >= 2 && (
                <div className="bg-emerald-600 border-2 border-emerald-500 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-200/50 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                        <Zap size={120} />
                    </div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20">
                            <Zap size={32} className="text-yellow-300" />
                        </div>
                        <div>
                            <h3 className="font-black text-2xl tracking-tight">GATE Milestone Reached! 🏆</h3>
                            <p className="text-emerald-50 font-medium">You've completed your core 2-hour GATE session today. Outstanding!</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black uppercase tracking-widest opacity-70">Study Time</p>
                            <p className="text-2xl font-black">{todayLog.gateHours}h / 2h</p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-lg">
                            <CheckCircle size={28} />
                        </div>
                    </div>
                </div>
            )}

            {/* Alerts */}
            {missedYesterday && !todayLog && (
                <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl flex items-start gap-5 animate-pulse shadow-sm">
                    <div className="p-3 bg-red-100 rounded-xl text-red-600">
                        <AlertCircle size={28} />
                    </div>
                    <div>
                        <h3 className="font-black text-red-700 text-lg">Missed Study Alert!</h3>
                        <p className="text-base text-red-600 mt-1 font-medium">You didn't log yesterday. Consistency is key—double down today!</p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Syllabus Covered"
                    value={`${progress}%`}
                    subtext="Keep pushing!"
                    icon={BookOpen}
                    colorClass="bg-sky-500 text-sky-600"
                />
                <StatCard
                    title="Total Hours"
                    value={`${totalStudyHours}h`}
                    subtext="Goal: 5h daily"
                    icon={Clock}
                    colorClass="bg-indigo-500 text-indigo-600"
                />
                <StatCard
                    title="Mock Score"
                    value={lastMockScore}
                    subtext="Target: 80+"
                    icon={TrendingUp}
                    colorClass="bg-fuchsia-500 text-fuchsia-600"
                />
                <StatCard
                    title="Streak"
                    value={`${logs.length} days`}
                    subtext="Consistency is key"
                    icon={CheckCircle}
                    colorClass="bg-emerald-500 text-emerald-600"
                />
            </div>

            {/* Today's Focus Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Daily Checklist */}
                <div className="lg:col-span-12 bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-black text-2xl text-slate-900 flex items-center gap-2">
                                Daily Targets <span className="text-slate-300">/</span> <span className="text-sky-600">5h</span>
                            </h3>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Focus on quality over quantity.</p>
                        </div>
                        <Link to="/tracker" className="text-sky-600 hover:text-sky-700 text-sm font-bold flex items-center gap-2 transition-colors bg-sky-50 px-4 py-2 rounded-lg hover:bg-sky-100">
                            Update Log <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DailyGoal
                            label="GATE Syllabus Prep"
                            target={2}
                            current={todayLog?.gateHours || 0}
                            icon={BookOpen}
                            colorClass="bg-sky-500 text-sky-600"
                        />
                        <DailyGoal
                            label="Coding Practice"
                            target={1}
                            current={todayLog?.codingHours || 0}
                            icon={Code}
                            colorClass="bg-purple-500 text-purple-600"
                        />
                        <DailyGoal
                            label="DSA Concepts"
                            target={1}
                            current={todayLog?.dsaHours || 0}
                            icon={BrainCircuit}
                            colorClass="bg-pink-500 text-pink-600"
                        />
                        <DailyGoal
                            label="Aptitude"
                            target={1}
                            current={todayLog?.revisionHours || 0}
                            icon={RotateCcw}
                            colorClass="bg-amber-500 text-amber-600"
                        />
                    </div>
                </div>

                {/* Quick Resources Section (New) */}
                <div className="lg:col-span-12 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h3 className="font-black text-2xl mb-1 flex items-center gap-3">
                                <Sparkles size={24} className="text-yellow-400" />
                                Official Resources
                            </h3>
                            <p className="text-slate-400 font-medium">Direct links to official and premium prep material.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="https://gate2026.iitg.ac.in/" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="p-3 bg-sky-500/20 rounded-xl group-hover:bg-sky-500/30 transition-colors">
                                <BookOpen size={24} className="text-sky-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-sky-400 uppercase tracking-widest mb-1">Official Site</p>
                                <p className="font-bold text-sm">GATE DA 2026</p>
                            </div>
                        </a>

                        <a href="https://www.hackerrank.com/dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="p-3 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
                                <Terminal size={24} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1">Coding</p>
                                <p className="font-bold text-sm">HackerRank Dash</p>
                            </div>
                        </a>

                        <a href="https://testbook.com/gate-da/mock-test" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="p-3 bg-pink-500/20 rounded-xl group-hover:bg-pink-500/30 transition-colors">
                                <Zap size={24} className="text-pink-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-pink-400 uppercase tracking-widest mb-1">Testing</p>
                                <p className="font-bold text-sm">Testbook Mock</p>
                            </div>
                        </a>

                        <a href="https://www.geeksforgeeks.org/gate-da-mock-tests/" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                            <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                                <TrendingUp size={24} className="text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">More Practice</p>
                                <p className="font-bold text-sm">GFG Mock Series</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
