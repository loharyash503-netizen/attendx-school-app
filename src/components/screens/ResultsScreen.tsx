import React, { useState } from 'react';
import { initialSubjectScores, initialStudent } from '../../data/mockData';
import { Download, CheckCircle, FileText, Printer, X, Award } from 'lucide-react';

export const ResultsScreen: React.FC = () => {
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const subjects = initialSubjectScores;

  return (
    <div className="space-y-6 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      <div className="px-1">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-800">Result Downloads</h3>
        <p className="text-[11px] sm:text-xs text-slate-400">Term 1 Official Academic Grade Sheet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Circular Progress Meter */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[28px] p-6 shadow-neu border border-white/80 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="#F1F3F6"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="#10B981"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - 0.73)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-800">73%</span>
              </div>
            </div>

            <p className="text-xs font-black text-[#FF3644] mt-3 tracking-wide">
              Semester-1 Overall Score
            </p>
            <span className="mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Grade B1 &bull; Passed
            </span>
          </div>

          {/* Download Result Button matching Screen 15 */}
          <div>
            <button
              onClick={() => setShowReportCardModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-[#FF3B47] to-[#F22938] text-white font-black text-xs tracking-wider uppercase rounded-2xl shadow-neu-red active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>DOWNLOAD OFFICIAL REPORT CARD</span>
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Col: Subject Cards Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subjects.map((sub) => (
              <div
                key={sub.code}
                className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between hover:shadow-neu transition-all"
              >
                {/* Left box: Subject code and marks */}
                <div className="w-20 pr-2 border-r border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block">{sub.code}</span>
                  <span className="text-xs font-black text-[#FF3644] block mt-0.5">
                    {sub.score}/100
                  </span>
                </div>

                {/* Center: Full Name & Class Info */}
                <div className="flex-1 px-3">
                  <h4 className="font-extrabold text-xs text-[#FF3644] tracking-tight">
                    {sub.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Class- 10th Roll No- 21
                  </p>
                </div>

                {/* Right: PASS status pill */}
                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200">
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Card Certificate Modal */}
      {showReportCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[28px] p-6 max-w-sm w-full shadow-2xl border-4 border-[#FFD9DC] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowReportCardModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-3 border-b-2 border-red-100 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center text-[#FF3644] mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base text-slate-800">SHIV ASHISH SCHOOL</h3>
              <p className="text-xs text-slate-500">First Term Examination Report Card</p>
            </div>

            <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl mb-4 font-medium">
              <p><span className="font-bold text-slate-700">Student:</span> {initialStudent.name}</p>
              <p><span className="font-bold text-slate-700">Class:</span> 10th - A | <span className="font-bold text-slate-700">Roll:</span> 21</p>
              <p><span className="font-bold text-slate-700">Academic Year:</span> 2025-2026</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs mb-4">
              {subjects.map((s) => (
                <div key={s.code} className="py-1.5 flex justify-between">
                  <span className="font-semibold text-slate-700">{s.name}</span>
                  <span className="font-bold text-[#FF3644]">{s.score} / 100</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-black text-sm text-slate-800">
                <span>Grand Total:</span>
                <span>456 / 600 (73%)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert('Generating official PDF file and saving to downloads...');
                  setShowReportCardModal(false);
                }}
                className="flex-1 py-2.5 bg-[#FF3644] text-white text-xs font-bold rounded-xl shadow-neu-red flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Save PDF
              </button>
              <button
                onClick={() => window.print()}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
