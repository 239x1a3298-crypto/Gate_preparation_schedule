import { useMemo } from 'react';
import { generateSchedule } from '../utils/scheduleGenerator';
import { Calendar, Clock } from 'lucide-react';

const Schedule = () => {
    // Generate schedule starting from today (or a fixed date if preferred)
    // For now, let's assume start date is today. 
    // In a real app, user might pick a start date.
    const schedule = useMemo(() => generateSchedule(new Date()), []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                        8-Month Plan
                    </h1>
                    <p className="text-slate-500">Weekly breakdown strictly following "One Topic at a Time"</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                    <Calendar size={18} className="text-indigo-500" />
                    <span>Total: 32 Weeks</span>
                </div>
            </div>

            <div className="relative border-l-2 border-indigo-200 ml-3 md:ml-6 space-y-8 py-4">
                {schedule.map((week) => (
                    <div key={week.weekNumber} className="relative pl-8 md:pl-12">
                        {/* Timeline connector dot */}
                        <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-indigo-600 border-4 border-white shadow-sm ring-1 ring-indigo-200" />

                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                                        Week {week.weekNumber}
                                    </span>
                                    <span className="text-slate-400 text-sm">{week.startDate} - {week.endDate}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                    <Clock size={16} />
                                    <span>Focus Phase</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">{week.subject}</h3>

                            <div className="flex flex-wrap gap-2">
                                {week.focusTopics.map((topic, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
