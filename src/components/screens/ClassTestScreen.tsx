import React from 'react';
import { classTestScores, unitTestComparison } from '../../data/mockData';
import { BookOpen, AlertCircle, Award, CheckCircle2 } from 'lucide-react';

export const ClassTestScreen: React.FC = () => {
  return (
    <div className="space-y-6 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Class Test Grade Chart Card matching Screen 14 */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-5 shadow-neu border border-white/80">
        <h3 className="font-extrabold text-sm text-slate-800 mb-2">Class Test Grade</h3>

        <div className="bg-slate-50/70 p-4 rounded-2xl shadow-neu-inset-sm border border-slate-100">
          <div className="relative h-44 w-full flex items-end justify-between pt-6 pb-2">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8px] font-semibold text-slate-300">
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>30</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>25</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>20</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>15</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>10</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>5</span></div>
              <div className="border-b border-slate-200/60 w-full flex justify-between"><span>0</span></div>
            </div>

            {/* Test Grade Bars */}
            <div className="w-full flex items-end justify-around relative z-10 pl-5 pr-1">
              {classTestScores.map((item) => {
                const heightPercent = (item.score / item.max) * 100;
                return (
                  <div key={item.subject} className="flex flex-col items-center flex-1 max-w-[36px]">
                    <span className="text-[9px] font-black text-slate-700 mb-1">
                      {item.score}/{item.max}
                    </span>
                    <div
                      style={{ height: `${(heightPercent / 100) * 110}px` }}
                      className="w-full bg-gradient-to-t from-[#FF3B47] to-[#FF6B78] rounded-t-lg shadow-neu-sm"
                    />
                    <span className="text-[9px] font-bold text-slate-600 mt-2">
                      {item.subject}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chapters & Class Test List matching Screen 14 */}
      <div className="bg-white rounded-[28px] p-5 shadow-neu border border-white/80">
        <div className="grid grid-cols-2 gap-4 items-center">
          {/* Textbook Thumbnail */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-neu-inset-sm text-center flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-2">
              CHAPTERS
            </span>
            <div className="w-20 h-24 bg-amber-100 rounded-xl border border-amber-300 shadow-sm flex flex-col items-center justify-center p-2 text-center text-amber-900">
              <BookOpen className="w-6 h-6 text-amber-700 mb-1" />
              <span className="text-[8px] font-black uppercase">Mathematics</span>
              <span className="text-[7px] text-amber-800 mt-0.5">NCERT 10th</span>
            </div>
            <span className="text-[10px] font-bold text-[#FF3644] mt-2">
              CHAPTER-1, 2
            </span>
          </div>

          {/* Marks Breakdown */}
          <div className="space-y-1.5 text-xs font-bold text-slate-700 pl-1">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-2">
              CLASS TEST
            </span>
            {classTestScores.map((c) => (
              <div key={c.subject} className="flex items-center justify-between">
                <span className="text-slate-600">&bull; {c.subject}</span>
                <span className="text-slate-900 font-extrabold">{c.score} / {c.max}</span>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Right Col: Total Marks, Re-marks, and Comparison */}
        <div className="lg:col-span-5 space-y-6">
          {/* Total Marks & Re-marks Row matching Screen 14 */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Total Marks */}
            <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                TOTAL MARKS
              </p>
              <p className="text-xl font-black text-[#FF3644] mt-1 tracking-tight">
                129/180
              </p>
            </div>

            {/* Re-Marks */}
            <div className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                RE-MARKS
              </p>
              <p className="text-xs font-bold text-amber-600 mt-0.5">
                Need Improvement
              </p>
              <p className="text-[11px] font-extrabold text-slate-800 mt-0.5">
                MATHS : <span className="line-through text-slate-400">30</span> <span className="text-emerald-600">25/30</span>
              </p>
            </div>
          </div>

          {/* Subject Comparison Line Chart matching Screen 14 */}
          <div className="bg-white rounded-[28px] p-5 shadow-neu border border-white/80 space-y-3">
            <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
              Subject Comparison
            </h4>

            <div className="bg-slate-50/70 p-3 rounded-2xl shadow-neu-inset-sm border border-slate-100">
              <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 110">
                {/* Class Average line (dashed emerald) */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  points="30,70 110,68 190,45 270,30"
                />
                {/* Student line (solid red) */}
                <polyline
                  fill="none"
                  stroke="#FF3644"
                  strokeWidth="2.5"
                  points="30,85 110,88 190,80 270,60"
                />
                <circle cx="30" cy="85" r="3.5" fill="#FF3644" />
                <circle cx="110" cy="88" r="3.5" fill="#FF3644" />
                <circle cx="190" cy="80" r="3.5" fill="#FF3644" />
                <circle cx="270" cy="60" r="4" fill="#FF3644" />
              </svg>

              <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2 px-2">
                <span>Unit Test-1</span>
                <span>Unit Test-2</span>
                <span>Unit Test-3</span>
                <span>Unit Test-4</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-3 h-0.5 bg-emerald-500 border-dashed" /> Class Average
              </span>
              <span className="flex items-center gap-1.5 text-[#FF3644]">
                <span className="w-3 h-1 bg-[#FF3644] rounded-full" /> Your Performance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
