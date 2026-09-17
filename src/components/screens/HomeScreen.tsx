import React from 'react';
import { User, TrendingUp, Download, Phone } from 'lucide-react';
import { ScreenType, StudentInfo } from '../../types';

interface HomeScreenProps {
  student: StudentInfo;
  onNavigate: (screen: ScreenType) => void;
  attendancePercent: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // 5 subjects matching the reference image
  const chartSubjects = [
    { code: 'ENG', score: 84, color: '#4ADE80' },
    { code: 'GUJ', score: 68, color: '#4ADE80' },
    { code: 'MATHS', score: 51, color: '#FF3644' },
    { code: 'HINDI', score: 71, color: '#4ADE80' },
    { code: 'SCI', score: 92, color: '#4ADE80' },
  ];

  // Y-axis ticks for the graph (100 down to 10)
  const yTicks = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-6 pt-3 sm:pt-4 w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none">
      {/* Section 1: Performance Report Scorecard Dashboard */}
      <div>
        <div className="mb-2 px-1">
          <h2 className="text-xs sm:text-sm font-extrabold text-slate-500 tracking-tight">
            Performance Report
          </h2>
        </div>

        {/* Neomorphic White Card with Left Graph & Right Grade Details */}
        <div className="bg-white rounded-[26px] sm:rounded-[30px] p-3.5 sm:p-4 shadow-neu border border-white/90">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Left Inset Bar Chart Container */}
            <div className="w-[58%] bg-[#F9FBFC] rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-inner flex-shrink-0">
              <svg
                viewBox="0 0 190 148"
                className="w-full h-auto overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Horizontal Grid lines */}
                {yTicks.map((val, idx) => {
                  const y = 14 + idx * 11.5;
                  return (
                    <line
                      key={val}
                      x1="22"
                      y1={y}
                      x2="185"
                      y2={y}
                      stroke="#CBD5E1"
                      strokeWidth="0.75"
                    />
                  );
                })}

                {/* Vertical Y-axis line */}
                <line x1="22" y1="14" x2="22" y2="129" stroke="#94A3B8" strokeWidth="1" />

                {/* Baseline at 0 */}
                <line x1="22" y1="129" x2="185" y2="129" stroke="#94A3B8" strokeWidth="1" />

                {/* Y-Axis numbers (100 down to 10) */}
                {yTicks.map((val, idx) => {
                  const y = 14 + idx * 11.5;
                  return (
                    <text
                      key={val}
                      x="18"
                      y={y}
                      textAnchor="end"
                      dominantBaseline="central"
                      fill="#64748B"
                      style={{ fontSize: '7px', fontWeight: 700 }}
                    >
                      {val}
                    </text>
                  );
                })}

                {/* 5 Subject Bars with labels & percentages inside */}
                {chartSubjects.map((sub, idx) => {
                  const slotWidth = 163 / 5;
                  const centerX = 22 + slotWidth * idx + slotWidth / 2;
                  const barWidth = 19;
                  const barX = centerX - barWidth / 2;

                  // Height calculation based on max 100 = 115px
                  const barHeight = (sub.score / 100) * 115;
                  const barTopY = 129 - barHeight;

                  return (
                    <g key={sub.code}>
                      {/* Vertical Bar */}
                      <rect
                        x={barX}
                        y={barTopY}
                        width={barWidth}
                        height={barHeight}
                        rx="2"
                        fill={sub.color}
                      />

                      {/* Percentage inside the top of the bar */}
                      <text
                        x={centerX}
                        y={barTopY + 7}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#0F172A"
                        style={{ fontSize: '6.5px', fontWeight: 900 }}
                      >
                        {sub.score}%
                      </text>

                      {/* Subject label at the bottom */}
                      <text
                        x={centerX}
                        y="139"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#475569"
                        style={{ fontSize: '7.5px', fontWeight: 800 }}
                      >
                        {sub.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Side: Overall Grade Details and View Report Button */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-1 space-y-2.5">
              {/* Overall Grade */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OVERALL GRADE
                </p>
                <p className="text-xs sm:text-[13px] font-black text-slate-700 mt-0.5">
                  1st SEM : 73.2%
                </p>
              </div>

              {/* Best & Weak Areas */}
              <div className="space-y-1 text-[11px] font-bold">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-500 font-extrabold text-[10.5px]">BEST :</span>
                  <span className="text-[#10B981] font-black text-[10.5px] tracking-tight">
                    SCIENCE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-500 font-extrabold text-[10.5px]">WEAK :</span>
                  <span className="text-[#FF3644] font-black text-[10.5px] tracking-tight">
                    MATHS
                  </span>
                </div>
              </div>

              {/* View Report Pill Button */}
              <button
                onClick={() => onNavigate('performance')}
                className="w-full py-2 px-2.5 rounded-xl bg-[#F8FAFC] hover:bg-white text-[#FF3644] font-black text-[10px] sm:text-[11px] tracking-wider shadow-neu-sm border border-slate-100/90 active:scale-95 transition-all text-center"
              >
                VIEW REPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: 4 Big Claymorphic Action Cards (2x2 Grid) with Feather Icons */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 w-full pt-1">
        {/* Card 1: Student Details */}
        <button
          onClick={() => onNavigate('student-details')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <User className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Student Details
          </span>
        </button>

        {/* Card 2: Progress */}
        <button
          onClick={() => onNavigate('behaviour')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Progress
          </span>
        </button>

        {/* Card 3: Download */}
        <button
          onClick={() => onNavigate('results')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Download className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Download
          </span>
        </button>

        {/* Card 4: Contact */}
        <button
          onClick={() => onNavigate('teachers')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Phone className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Contact
          </span>
        </button>
      </div>
    </div>
  );
};
