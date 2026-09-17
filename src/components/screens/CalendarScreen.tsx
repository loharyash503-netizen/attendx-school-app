import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Flag, Star } from 'lucide-react';

export const CalendarScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('April 2026');
  const [selectedDay, setSelectedDay] = useState(14);

  // Holidays in April 2026
  const holidays: Record<number, { title: string; day: string }> = {
    14: { title: 'Dr. BABASAHEB AMBEDKAR JAYANTI', day: 'TUESDAY' },
    3: { title: 'GOOD FRIDAY', day: 'FRIDAY' },
    11: { title: '2nd SATURDAY SCHOOL HOLIDAY', day: 'SATURDAY' },
  };

  return (
    <div className="space-y-4 pb-28 px-4 pt-2 max-w-md mx-auto">
      <div className="px-1">
        <h3 className="font-extrabold text-sm text-slate-800">Academic Calendar</h3>
        <p className="text-[11px] text-slate-400">School working days, holidays &amp; examination slots</p>
      </div>

      {/* Calendar Card matching Screen 28 */}
      <div className="bg-white rounded-[28px] p-5 shadow-neu border border-white/80">
        {/* Month bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedMonth('March 2026')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-slate-800 text-base">{selectedMonth}/5</span>
          <button
            onClick={() => setSelectedMonth('May 2026')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 mb-2">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>

        {/* April 2026 Grid: Starts Wednesday (3 offset) */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-slate-700">
          <span />
          <span />
          <span />

          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isHoliday = holidays[day] !== undefined;
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-9 h-10 mx-auto rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-[#FF3644] text-white shadow-neu-red scale-105'
                    : isHoliday
                    ? 'bg-rose-50 text-[#FF3644] border border-red-100'
                    : 'hover:bg-slate-100'
                }`}
              >
                <span>{day}</span>
                {/* Dots indicator matching Screen 28 */}
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                    isHoliday
                      ? isSelected
                        ? 'bg-white'
                        : 'bg-[#FF3644]'
                      : isSelected
                      ? 'bg-emerald-200'
                      : 'bg-emerald-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Legend matching Screen 28 */}
        <div className="flex items-center justify-center gap-8 mt-6 pt-3 border-t border-slate-100 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3644]" />
            <span>Holiday</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Classes</span>
          </div>
        </div>
      </div>

      {/* Holiday Event Card matching Screen 28 */}
      <div className="bg-white rounded-[24px] p-5 shadow-neu border border-slate-100 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 text-[#FF3644] flex flex-col items-center justify-center shadow-neu-inset-sm flex-shrink-0">
          <span className="text-xl font-black">{selectedDay}</span>
          <span className="text-[8px] font-bold uppercase tracking-wider">
            {holidays[selectedDay]?.day || 'APR'}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            {holidays[selectedDay]?.day || 'SCHOOL DAY'}
          </span>
          <h4 className="text-xs font-black text-[#FF3644] tracking-tight mt-0.5">
            {holidays[selectedDay]?.title || 'Regular Classes & Lab Work Scheduled'}
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Shiv Ashish School Campus &bull; Class 10th-A
          </p>
        </div>
      </div>
    </div>
  );
};
