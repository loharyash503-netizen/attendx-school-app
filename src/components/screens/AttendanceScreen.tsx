import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Calendar,
  X,
  ChevronRight,
  UserCheck,
  BarChart2,
} from 'lucide-react';
import { ScreenType, StudentInfo } from '../../types';

interface AttendanceScreenProps {
  student: StudentInfo;
  attendancePercent: number;
  onSimulateAbsence: () => void;
  onSimulatePresent: () => void;
  onNavigate?: (screen: ScreenType) => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  student,
  attendancePercent,
  onSimulateAbsence,
  onSimulatePresent,
  onNavigate,
}) => {
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  // Today's Routine schedule preview inside the TimeTable Viewer card
  const todayClasses = [
    { period: 'Period 1', time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Ms. Vidhya', room: 'Room 204', status: 'Done' },
    { period: 'Period 2', time: '09:20 - 10:05', subject: 'Science (Lab)', teacher: 'Mr. Sharma', room: 'Lab 2', status: 'Live' },
    { period: 'Period 3', time: '10:20 - 11:05', subject: 'English Lit.', teacher: 'Mrs. Sen', room: 'Room 204', status: 'Upcoming' },
    { period: 'Period 4', time: '11:10 - 11:55', subject: 'Social Studies', teacher: 'Mr. Joshi', room: 'Room 204', status: 'Upcoming' },
  ];

  const handleCardClick = (target: ScreenType | 'attendance_details') => {
    if (target === 'attendance_details') {
      setShowAttendanceModal(true);
    } else if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-6 pt-3 sm:pt-4 w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none">
      {/* Section 1: TimeTable Viewer Title matching Image 2 */}
      <div>
        <div className="mb-2 px-1 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-extrabold text-slate-500 tracking-tight">
            TimeTable Viewer
          </h2>
          <button
            onClick={() => onNavigate && onNavigate('timetable')}
            className="text-[11px] font-bold text-[#FF3644] hover:underline flex items-center gap-0.5"
          >
            <span>Full Routine</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Large Rounded Neumorphic Card */}
        <div className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/90 min-h-[160px] flex flex-col justify-between">
          {/* Header row in viewer */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-slate-700 tracking-tight uppercase">
                Today's Schedule &bull; Thursday
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-[#FF3644] bg-red-50 px-2.5 py-0.5 rounded-full">
              4 of 6 Completed
            </span>
          </div>

          {/* Routine items preview */}
          <div className="grid grid-cols-2 gap-2.5">
            {todayClasses.slice(0, 2).map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-2xl bg-[#F9FBFC] border border-slate-100 shadow-inner flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{item.period}</span>
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                      item.status === 'Live'
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-xs font-black text-slate-800 truncate">{item.subject}</p>
                  <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{item.time}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive footer button */}
          <button
            onClick={() => onNavigate && onNavigate('timetable')}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-white text-[#FF3644] font-black text-[11px] tracking-wider shadow-neu-sm border border-slate-100/90 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>VIEW COMPLETE TIMETABLE</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Section 2: 4 Action Cards (2x2 Grid) with Feather Icons */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 w-full pt-1">
        {/* Card 1: Attendance */}
        <button
          onClick={() => handleCardClick('attendance_details')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none relative"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <UserCheck className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Attendance
          </span>
          {/* Percentage badge */}
          <span className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            {attendancePercent}%
          </span>
        </button>

        {/* Card 2: TimeTable */}
        <button
          onClick={() => handleCardClick('timetable')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Clock className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            TimeTable
          </span>
        </button>

        {/* Card 3: Calendar */}
        <button
          onClick={() => handleCardClick('calendar')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Calendar className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Calendar
          </span>
        </button>

        {/* Card 4: Record */}
        <button
          onClick={() => handleCardClick('results')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <BarChart2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Record
          </span>
        </button>
      </div>

      {/* Interactive Attendance Details & Simulator Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-[#FF3644]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-800 text-base">Attendance Status</h3>
              </div>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F9FBFC] border border-slate-100 text-center mb-4">
              <p className="text-3xl font-black text-[#FF3644]">{attendancePercent}%</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Overall Academic Attendance</p>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs font-semibold">
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Present: 182 Days
                </span>
                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Absent: 14 Days
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onSimulatePresent();
                  setShowAttendanceModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                Verify Present Today
              </button>

              <button
                onClick={() => {
                  onSimulateAbsence();
                  setShowAttendanceModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#FF3644] font-black text-xs transition-all active:scale-95"
              >
                Simulate Real-Time Absence Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
