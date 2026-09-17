import React, { useState } from 'react';
import {
  User,
  UserCheck,
  Calendar,
  Clock,
  BookOpen,
  Award,
  Trophy,
  Users,
  MessageCircle,
  FileDown,
  Download,
  TrendingUp,
  ChevronRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Phone,
} from 'lucide-react';
import { ScreenType, StudentInfo } from '../../types';

interface HomeScreenProps {
  student: StudentInfo;
  onNavigate: (screen: ScreenType) => void;
  attendancePercent: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  onNavigate,
  attendancePercent,
}) => {
  const [showAllModules, setShowAllModules] = useState(false);

  return (
    <div className="space-y-4 pb-28 px-3.5 sm:px-6 pt-3 sm:pt-4 w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
      {/* Section 1: Performance Report Header */}
      <div>
        <h2 className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide mb-2 px-1">
          Performance Report
        </h2>

        {/* Performance Report Card matching design */}
        <div className="bg-white rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 shadow-neu border border-white/80">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Left Graph Box with Y-axis and 5 Vertical Bars */}
            <div className="flex-1 bg-[#FAFAFA] rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-inner">
              <div className="flex gap-2">
                {/* Y-axis grid numbers (100 down to 10) */}
                <div className="flex flex-col justify-between text-[8px] font-bold text-slate-400 py-0.5 pr-1 border-r border-slate-200 select-none">
                  <span>100</span>
                  <span>90</span>
                  <span>80</span>
                  <span>70</span>
                  <span>60</span>
                  <span>50</span>
                  <span>40</span>
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                </div>

                {/* 5 Vertical Bars with horizontal gridlines */}
                <div className="flex-1 relative flex items-end justify-between gap-1.5 sm:gap-2 pt-2 pb-0.5 h-36">
                  {/* Subtle horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-full border-b border-slate-200" />
                    ))}
                  </div>

                  {/* Bar 1: ENG 84% */}
                  <div className="relative z-10 flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: '84%' }}
                      className="w-full bg-[#4ADE80] rounded-t-sm flex items-center justify-center relative shadow-xs"
                    >
                      <span className="text-[9px] font-black text-slate-800 absolute top-1">84%</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 mt-1.5">ENG</span>
                  </div>

                  {/* Bar 2: GUJ 68% */}
                  <div className="relative z-10 flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: '68%' }}
                      className="w-full bg-[#4ADE80] rounded-t-sm flex items-center justify-center relative shadow-xs"
                    >
                      <span className="text-[9px] font-black text-slate-800 absolute top-1">68%</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 mt-1.5">GUJ</span>
                  </div>

                  {/* Bar 3: MATHS 51% (Red Bar) */}
                  <div className="relative z-10 flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: '51%' }}
                      className="w-full bg-[#FF3644] rounded-t-sm flex items-center justify-center relative shadow-xs"
                    >
                      <span className="text-[9px] font-black text-white absolute top-1">51%</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 mt-1.5">MATHS</span>
                  </div>

                  {/* Bar 4: HINDI 71% */}
                  <div className="relative z-10 flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: '71%' }}
                      className="w-full bg-[#4ADE80] rounded-t-sm flex items-center justify-center relative shadow-xs"
                    >
                      <span className="text-[9px] font-black text-slate-800 absolute top-1">71%</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 mt-1.5">HINDI</span>
                  </div>

                  {/* Bar 5: SCI 92% */}
                  <div className="relative z-10 flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: '92%' }}
                      className="w-full bg-[#4ADE80] rounded-t-sm flex items-center justify-center relative shadow-xs"
                    >
                      <span className="text-[9px] font-black text-slate-800 absolute top-1">92%</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-600 mt-1.5">SCI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Info & View Report Button */}
            <div className="w-full sm:w-44 flex flex-col justify-between py-1 px-1">
              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                  OVERALL GRADE
                </p>
                <p className="text-xs sm:text-sm font-black text-slate-700">
                  1st SEM : <span className="font-black text-slate-800">73.2%</span>
                </p>

                <div className="pt-2 space-y-1 text-xs">
                  <p className="text-slate-700 font-bold flex items-center gap-1.5">
                    <span className="text-slate-500 font-bold text-[11px]">BEST :</span>
                    <span className="text-emerald-600 font-black">SCIENCE</span>
                  </p>
                  <p className="text-slate-700 font-bold flex items-center gap-1.5">
                    <span className="text-slate-500 font-bold text-[11px]">WEAK :</span>
                    <span className="text-[#FF3644] font-black">MATHS</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('performance')}
                className="mt-3 sm:mt-4 w-full py-2 px-3 bg-white/95 sm:bg-slate-50 hover:bg-slate-100 text-[#FF3644] text-[11px] font-black rounded-xl shadow-neu-sm border border-slate-100 transition-all active:scale-95 text-center tracking-wide"
              >
                VIEW REPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: 4 Main Claymorphic Action Cards (2x2 Grid) with Feather Icons */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 w-full">
        {/* Card 1: Student Details */}
        <button
          onClick={() => onNavigate('student-details')}
          className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/80 flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center aspect-[1/0.95] sm:aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <User className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-700">Student Details</span>
        </button>

        {/* Card 2: Progress */}
        <button
          onClick={() => onNavigate('behaviour')}
          className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/80 flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center aspect-[1/0.95] sm:aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <TrendingUp className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-700">Progress</span>
        </button>

        {/* Card 3: Download */}
        <button
          onClick={() => onNavigate('results')}
          className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/80 flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center aspect-[1/0.95] sm:aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Download className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-700">Download</span>
        </button>

        {/* Card 4: Contact */}
        <button
          onClick={() => onNavigate('teachers')}
          className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/80 flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center aspect-[1/0.95] sm:aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Phone className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-700">Contact</span>
        </button>
      </div>

      {/* Quick Access to Additional School Modules */}
      <div className="pt-2">
        <button
          onClick={() => setShowAllModules(!showAllModules)}
          className="w-full py-2.5 px-4 bg-white/70 hover:bg-white rounded-2xl text-slate-600 text-xs font-bold border border-slate-200/80 shadow-neu-sm flex items-center justify-between transition-all"
        >
          <span>More School Services &amp; Routine</span>
          <span className="text-slate-400 text-xs">{showAllModules ? '▲ Hide' : '▼ View All'}</span>
        </button>

        {showAllModules && (
          <div className="grid grid-cols-3 gap-2.5 mt-3 pt-1 animate-fadeIn">
            <button
              onClick={() => onNavigate('attendance')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-[11px] font-bold text-slate-700">Attendance</span>
              <span className="text-[9px] text-emerald-600 font-semibold">{attendancePercent}% Rate</span>
            </button>

            <button
              onClick={() => onNavigate('timetable')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-[11px] font-bold text-slate-700">TimeTable</span>
              <span className="text-[9px] text-slate-400">Periods</span>
            </button>

            <button
              onClick={() => onNavigate('homework')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <BookOpen className="w-5 h-5 text-[#FF3644]" />
              <span className="text-[11px] font-bold text-slate-700">Assignment</span>
              <span className="text-[9px] text-slate-400">H.W &amp; Tasks</span>
            </button>

            <button
              onClick={() => onNavigate('sports')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <Trophy className="w-5 h-5 text-indigo-500" />
              <span className="text-[11px] font-bold text-slate-700">Sports</span>
              <span className="text-[9px] text-slate-400">Events</span>
            </button>

            <button
              onClick={() => onNavigate('ptm')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-[11px] font-bold text-slate-700">P.T.M</span>
              <span className="text-[9px] text-slate-400">Meetings</span>
            </button>

            <button
              onClick={() => onNavigate('calendar')}
              className="bg-white p-3 rounded-2xl shadow-neu-sm border border-slate-100 flex flex-col items-center text-center gap-1.5"
            >
              <Calendar className="w-5 h-5 text-rose-500" />
              <span className="text-[11px] font-bold text-slate-700">Calendar</span>
              <span className="text-[9px] text-slate-400">Holidays</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
