import { useState, useMemo, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTracker } from '../hooks/useTracker';
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    CheckSquare,
    BarChart2,
    LogOut,
    Menu,
    X,
    Bell,
    Terminal,
    CalendarDays,
    Sparkles,
    Zap,
    User as UserIcon,
    Settings,
    Mail
} from 'lucide-react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    getDay,
    parseISO
} from 'date-fns';

const Layout = () => {
    const { user, logout } = useAuth();
    const { logs } = useTracker();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const { getTodayLog } = useTracker();
    const todayLog = getTodayLog();
    const isNotMet = todayLog ? (todayLog.gateHours || 0) < 2 || (todayLog.codingProblems || 0) < 2 : true;

    const prepTip = useMemo(() => {
        const tips = [
            "Focus on 'Probability & Statistics' this week. It's high-weightage!",
            "Solve at least 5 PYQs today to build exam temperament.",
            "Revision is key. Review your short notes before sleeping.",
            "Consistency > Intensity. Even 2 hours of focused study counts.",
            "Don't ignore General Aptitude; it's easy points in the exam."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const calendarDays = useMemo(() => {
        const now = new Date();
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        const days = eachDayOfInterval({ start, end });
        const startDay = getDay(start);
        const padCount = startDay === 0 ? 6 : startDay - 1;
        const padding = Array(padCount).fill(null);
        return [...padding, ...days];
    }, []);

    const getDayStatus = (date: Date) => {
        const log = logs.find(l => isSameDay(parseISO(l.date), date));
        if (!log) return 'empty';
        if (log.codingProblems >= 2) return 'success';
        if (log.codingProblems > 0 || (Number(log.codingHours) || 0) > 0) return 'partial';
        return 'missed';
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Syllabus', path: '/syllabus', icon: BookOpen },
        { name: 'Schedule', path: '/schedule', icon: Calendar },
        { name: 'Tracker', path: '/tracker', icon: CheckSquare },
        { name: 'Coding', path: '/coding', icon: Terminal },
        { name: 'Mock Tests', path: '/mock-tests', icon: BarChart2 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header Navigation */}
            <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                                G
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">GATE DA</h1>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-1 items-center">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `
                                        flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200
                                        ${isActive
                                            ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                            <span>{item.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 md:space-x-4">
                            {/* Activity Calendar Icon */}
                            <div className="relative" ref={calendarRef}>
                                <button
                                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    className={`p-2 rounded-full transition-all duration-300 ${isCalendarOpen ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
                                    title="Activity Calendar"
                                >
                                    <CalendarDays size={20} />
                                </button>

                                {isCalendarOpen && (
                                    <div className="absolute right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 animate-fadeIn slide-in-top">
                                        <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                                            <span>Activity ({format(new Date(), 'MMMM')})</span>
                                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">{logs.length} Days</span>
                                        </h3>
                                        <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                                <div key={i} className="text-[10px] font-black text-slate-300">{d}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {calendarDays.map((day, i) => {
                                                if (!day) return <div key={`pad-${i}`} className="aspect-square" />;
                                                const status = getDayStatus(day);
                                                let bgClass = 'bg-slate-50';
                                                if (status === 'success') bgClass = 'bg-emerald-500 shadow-sm shadow-emerald-200';
                                                else if (status === 'partial') bgClass = 'bg-yellow-400 shadow-sm shadow-yellow-200';
                                                else if (status === 'missed' && day < new Date()) bgClass = 'bg-red-50';
                                                const isTodayState = isToday(day) ? 'ring-2 ring-indigo-500 ring-offset-1' : '';
                                                let textClass = 'text-slate-900';
                                                if (status === 'success') textClass = 'text-white'; // White is better on emerald background
                                                else if (status === 'partial') textClass = 'text-indigo-900';
                                                else if (status === 'missed') textClass = 'text-slate-900';

                                                return (
                                                    <div
                                                        key={day.toISOString()}
                                                        className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-black cursor-pointer ${bgClass} ${isTodayState} ${textClass} transition-all hover:scale-110 shadow-sm`}
                                                        title={`${format(day, 'MMM dd')}: ${status}`}
                                                        onClick={() => {
                                                            setIsCalendarOpen(false);
                                                            navigate('/tracker');
                                                        }}
                                                    >
                                                        {format(day, 'd')}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400">
                                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-emerald-500"></div> Met</div>
                                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-yellow-400"></div> Partial</div>
                                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-slate-100"></div> None</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative" ref={notifRef}>
                                <button
                                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                                    className={`hidden md:flex p-2 rounded-full transition-all duration-300 relative ${isNotifOpen ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'}`}
                                >
                                    <Bell size={20} />
                                    {isNotMet && (
                                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                                    )}
                                </button>

                                {isNotifOpen && (
                                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 z-50 animate-fadeIn slide-in-top">
                                        <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                                            <span>Preparation Insights</span>
                                            <Sparkles size={16} className="text-orange-500" />
                                        </h3>

                                        <div className="space-y-3">
                                            {/* Daily Status */}
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Today's Progress</p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-600">GATE Hours</span>
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${(todayLog?.gateHours || 0) >= 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                                            {(todayLog?.gateHours || 0) >= 2 ? 'Target Met' : 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-600">Coding Props</span>
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${(todayLog?.codingProblems || 0) >= 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                                            {(todayLog?.codingProblems || 0) >= 2 ? 'Target Met' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Random Tip */}
                                            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BookOpen size={14} className="text-indigo-500" />
                                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Study Tip</p>
                                                </div>
                                                <p className="text-xs font-medium text-slate-700 leading-relaxed italic">
                                                    {prepTip}
                                                </p>
                                            </div>

                                            {/* Mock Test Reminder */}
                                            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 flex items-center gap-3">
                                                <div className="p-2 bg-pink-500 text-white rounded-lg">
                                                    <Zap size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Weekly Goal</p>
                                                    <p className="text-xs font-bold text-slate-900">Sunday Mock Exam is coming up!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

                            <div className="relative" ref={profileRef}>
                                <div
                                    className="flex items-center space-x-2 cursor-pointer group"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="hidden md:block text-right mr-1">
                                        <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name}</p>
                                        <p className="text-[10px] font-medium text-slate-400">Student</p>
                                    </div>
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black border-2 transition-all duration-300 ${isProfileOpen ? 'bg-indigo-700 border-indigo-200 scale-110 shadow-lg' : 'bg-indigo-600 border-white shadow-sm'}`}>
                                        <span>{user?.name.charAt(0)}</span>
                                    </div>
                                </div>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fadeIn slide-in-top">
                                        {/* User Header */}
                                        <div className="p-5 bg-slate-50 border-b border-slate-100">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black">
                                                    {user?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{user?.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GATE Aspirant</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                                                <Mail size={12} />
                                                <span className="truncate">{user?.email || 'student@gateda.com'}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                                <UserIcon size={16} className="text-slate-400" />
                                                View Profile
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                                <Settings size={16} className="text-slate-400" />
                                                Account Settings
                                            </button>

                                            <div className="h-px bg-slate-100 my-2 mx-2"></div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-black text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-slate-600 hover:text-slate-900 p-2"
                                >
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-100 bg-white animate-fadeIn">
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `
                                        flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold transition-all
                                        ${isActive
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-50'}
                                    `}
                                >
                                    <item.icon size={20} />
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
