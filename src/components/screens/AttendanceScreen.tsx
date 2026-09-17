import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, Calendar as CalendarIcon, AlertTriangle, Send } from 'lucide-react';
import { StudentInfo } from '../../types';

interface AttendanceScreenProps {
  student: StudentInfo;
  attendancePercent: number;
  onSimulateAbsence: () => void;
  onSimulatePresent: () => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  student,
  attendancePercent,
  onSimulateAbsence,
  onSimulatePresent,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('May 2026');
  const [activeDate, setActiveDate] = useState<number | null>(19);

  // Status map for days in May 2026
  const dayStatusMap: Record<number, 'present' | 'absent' | 'late' | 'holiday'> = {
    1: 'present',
    2: 'holiday',
    3: 'holiday',
    4: 'present',
    5: 'present',
    6: 'present',
    7: 'present',
    8: 'present',
    9: 'holiday',
    10: 'holiday',
    11: 'present',
    12: 'present',
    13: 'present',
    14: 'present',
    15: 'present',
    16: 'holiday',
    17: 'holiday',
    18: 'present',
    19: 'present', // Highlighted in design
    20: 'present',
    21: 'absent',  // Highlighted in design
    22: 'present',
    23: 'holiday',
    24: 'holiday',
    25: 'present',
    26: 'present',
    27: 'present',
    28: 'late',    // Highlighted in design (yellow)
    29: 'present',
    30: 'holiday',
    31: 'holiday',
  };

  // SVG circular gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendancePercent / 100) * circumference;

  return (
    <div className="space-y-6 pb-28 px-4 sm:px-8 pt-3 sm:pt-6 w-full max-w-7xl mx-auto">
      {/* Top summary section: 2 columns on PC/tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Attendance Circular Ring Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[28px] p-6 shadow-neu border border-white/80 flex flex-col items-center justify-center relative">
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Overall Attendance
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Above 75% Target
              </span>
            </div>

            <div
              className="relative w-48 h-48 flex items-center justify-center"
              role="img"
              aria-label={`Attendance rate: ${attendancePercent} percent. Minimum required is 75 percent.`}
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
                {/* Background ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#F1F3F6"
                  strokeWidth="14"
                  fill="transparent"
                />
                {/* Value progress ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={attendancePercent >= 75 ? '#10B981' : '#FF3644'}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center text in circular gauge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-800 tracking-tight">
                  {attendancePercent}%
                </span>
                <span className="text-xs font-bold text-slate-600 mt-1">Monday</span>
                <span className="text-[11px] font-semibold text-slate-400">20 May, 2026</span>
              </div>
            </div>

            {/* Present / Absent Action Buttons */}
            <div className="flex items-center gap-3 mt-5 w-full max-w-sm">
              <button
                onClick={onSimulatePresent}
                aria-label="Simulate Marking Student Present for Today"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-neu-green flex items-center justify-center gap-2 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>MARK PRESENT</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <button
                onClick={onSimulateAbsence}
                aria-label="Simulate Marking Student Absent to trigger real-time parent alert"
                className="flex-1 py-3 px-4 bg-white text-[#FF3644] border-2 border-red-200 hover:border-red-400 font-extrabold text-xs sm:text-sm rounded-full shadow-neu-sm flex items-center justify-center gap-2 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#FF3644]"
              >
                <XCircle className="w-4 h-4" />
                <span>MARK ABSENT</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Tap &apos;Mark Absent&apos; to demonstrate the real-time notification alert sent to parents.
            </p>
          </div>

          {/* Student Details Presence Badge */}
          <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={student.avatarUrl}
                alt={`Photo of ${student.name}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FF3644]"
              />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-800">{student.name}</h3>
                <p className="text-xs text-slate-500">
                  Class {student.class}th &bull; Section {student.section} &bull; Roll No: {student.rollNo}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold shadow-xs">
              PRESENT TODAY <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </span>
          </div>

          {/* Period-wise Attendance breakdown */}
          <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 space-y-2">
            <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Today&apos;s Period Breakdown (20 May)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Period 1: Maths</span>
                <span className="font-extrabold text-emerald-600">Present</span>
              </div>
              <div className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Period 2: English</span>
                <span className="font-extrabold text-emerald-600">Present</span>
              </div>
              <div className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Period 3: Science</span>
                <span className="font-extrabold text-emerald-600">Present</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-500">Period 4: Gujarati</span>
                <span className="font-bold text-slate-400">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Monthly Interactive Calendar Card and Detailed Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          {/* Monthly Interactive Calendar Card matching Screen 27 */}
          <div className="bg-white rounded-[26px] p-6 shadow-neu border border-white/80">
            {/* Month Selector Bar */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => setSelectedMonth('April 2026')}
                aria-label="View previous month: April 2026"
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#FF3644]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <h3 className="font-extrabold text-slate-800 text-lg">{selectedMonth}</h3>
                <span className="text-[11px] text-slate-400 font-semibold">Term-2 Academic Session</span>
              </div>
              <button
                onClick={() => setSelectedMonth('June 2026')}
                aria-label="View next month: June 2026"
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#FF3644]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-xs font-extrabold text-slate-400 mb-3" aria-hidden="true">
              <span>SUN</span>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
            </div>

            {/* Calendar Grid for May 2026 (starts Friday) */}
            <div className="grid grid-cols-7 gap-y-2.5 text-center text-xs sm:text-sm font-bold text-slate-700" role="grid" aria-label={`Calendar grid for ${selectedMonth}`}>
              {/* Empty offset for Fri start (5 offset) */}
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />

              {/* Days 1 to 31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const status = dayStatusMap[day] || 'present';
                const isSelected = activeDate === day;

                let highlightStyle = 'hover:bg-slate-100 text-slate-700';

                if (day === 19) {
                  highlightStyle = 'bg-emerald-500 text-white shadow-neu-sm scale-105 ring-2 ring-emerald-300 font-extrabold';
                } else if (day === 21) {
                  highlightStyle = 'bg-[#FF3644] text-white shadow-neu-sm scale-105 ring-2 ring-red-300 font-extrabold animate-pulse';
                } else if (day === 28) {
                  highlightStyle = 'bg-amber-400 text-slate-900 shadow-neu-sm scale-105 ring-2 ring-amber-200 font-extrabold';
                } else if (isSelected) {
                  highlightStyle = 'bg-indigo-600 text-white shadow-neu-sm scale-105';
                }

                return (
                  <button
                    key={day}
                    onClick={() => setActiveDate(day)}
                    aria-label={`May ${day}, status: ${status}`}
                    className={`w-9 h-9 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 ${highlightStyle}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Present (e.g. 19th)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF3644]" />
                <span className="text-slate-600">Absent (e.g. 21st)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-slate-600">Late Arrival (e.g. 28th)</span>
              </div>
            </div>
          </div>

          {/* Recent Logs Section matching Screen 27 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-extrabold text-base text-slate-800">Recent Attendance Logs</h3>
              <span className="text-xs font-semibold text-slate-400">Verified Biometric &amp; Class Call</span>
            </div>

            {/* Log Item 1: 19th May Present */}
            <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#FF3644] flex items-center justify-center shadow-neu-inset-sm">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">19th MAY 2026/5</h4>
                  <p className="text-xs font-bold text-slate-500">TUESDAY</p>
                  <p className="text-[11px] text-slate-400">Normal check-in at 08:30 AM &bull; On-time</p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                PRESENT
              </span>
            </div>

            {/* Log Item 2: 21 May Absent with Parent Alert Trigger */}
            <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-red-200 flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF3644]" />
              <div className="flex items-center gap-3.5 pl-2">
                <div className="w-11 h-11 rounded-2xl bg-red-100 text-[#FF3644] flex items-center justify-center shadow-neu-inset-sm">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">21 MAY 2026/5</h4>
                  <p className="text-xs font-bold text-slate-500">THURSDAY</p>
                  <p className="text-xs text-red-500 font-bold">Uninformed Leave &bull; Instant SMS &amp; App Alert Sent to Parent</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#FF3644] bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200 animate-pulse">
                ABSENT
              </span>
            </div>

            {/* Log Item 3: 28 May Late Arrival */}
            <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-amber-200 flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
              <div className="flex items-center gap-3.5 pl-2">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-neu-inset-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800">28 MAY 2026/5</h4>
                  <p className="text-xs font-bold text-slate-500">THURSDAY</p>
                  <p className="text-[11px] text-amber-700 font-semibold">Late entry 09:12 AM &bull; Period 1 missed</p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                LATE (09:12)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
