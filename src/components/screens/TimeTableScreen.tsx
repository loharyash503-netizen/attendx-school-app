import React, { useState } from 'react';
import { timetableSchedule } from '../../data/mockData';
import { Clock, User, BookOpen, Coffee } from 'lucide-react';

export const TimeTableScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const schedule = timetableSchedule[selectedDay] || timetableSchedule['Mon'];

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 max-w-4xl mx-auto">
      {/* Day Selector Pills matching Screen 29 */}
      <div className="flex items-center justify-between gap-1.5 bg-white p-2 rounded-2xl shadow-neu-sm border border-slate-100">
        {days.map((day) => {
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-2 px-1 rounded-xl text-xs font-black transition-all ${
                isActive
                  ? 'bg-[#FF3644] text-white shadow-neu-red scale-105'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Timeline Schedule matching Screen 29 */}
      <div className="relative pl-6 space-y-4">
        {/* Continuous Left Vertical Red Line */}
        <div className="absolute left-2.5 top-3 bottom-4 w-0.5 bg-red-400/80" />

        {schedule.map((item, idx) => {
          if (item.isBreak) {
            return (
              <div key={idx} className="relative py-2 flex items-center justify-center">
                <div className="bg-[#FFF1F2] px-4 py-1.5 rounded-full border border-red-200 text-xs font-black text-[#FF3644] flex items-center gap-1.5 shadow-neu-sm z-10">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>— BREAK TIME —</span>
                </div>
              </div>
            );
          }

          return (
            <div key={idx} className="relative group">
              {/* Connected Dot on Timeline */}
              <div className="absolute -left-6 top-5 w-3.5 h-3.5 rounded-full bg-[#FF3644] border-2 border-white shadow-sm ring-2 ring-red-200" />

              {/* Class Schedule Card */}
              <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100/80 hover:shadow-neu transition-all">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {/* Subject */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SUBJECT
                    </span>
                    <span className="text-xs font-black text-slate-800 block mt-0.5">
                      {item.subject}
                    </span>
                  </div>

                  {/* Teacher */}
                  <div className="border-x border-slate-100 px-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      TEACHER
                    </span>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">
                      {item.teacher}
                    </span>
                  </div>

                  {/* Time */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      TIME
                    </span>
                    <span className="text-xs font-black text-[#FF3644] block mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
