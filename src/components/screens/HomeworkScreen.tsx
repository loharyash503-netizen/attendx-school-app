import React, { useState } from 'react';
import {
  BookOpen,
  Dribbble,
  Award,
  Users,
  Calculator,
  Download,
  CheckCircle,
  Clock,
  FileText,
  X,
} from 'lucide-react';
import { ScreenType, HomeworkItem } from '../../types';
import { initialHomeworkList } from '../../data/mockData';

interface HomeworkScreenProps {
  onNavigate?: (screen: ScreenType) => void;
}

export const HomeworkScreen: React.FC<HomeworkScreenProps> = ({ onNavigate }) => {
  // Status filter: 'pending' or 'submitted'
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'submitted'>('pending');
  // Mathematics homework completion state
  const [mathSubmitted, setMathSubmitted] = useState<boolean>(false);
  // Full homework assignments modal
  const [showWorksheetsModal, setShowWorksheetsModal] = useState<boolean>(false);
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(initialHomeworkList);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleMathStatus = (status: 'submitted' | 'pending') => {
    setSelectedStatus(status);
    if (status === 'submitted') {
      setMathSubmitted(true);
      showToast('✅ Chapter-5: Life process marked as SUBMITTED!');
    } else {
      setMathSubmitted(false);
      showToast('⏳ Chapter-5: Life process marked as PENDING.');
    }
  };

  const toggleHomeworkItem = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'submitted' ? 'pending' : 'submitted' }
          : item
      )
    );
  };

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-6 pt-3 sm:pt-4 w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Section 1: Submission Date Scorecard */}
      <div>
        <div className="mb-2 px-1">
          <h2 className="text-xs sm:text-sm font-extrabold text-slate-500 tracking-tight">
            Submission Date
          </h2>
        </div>

        {/* Neomorphic White Card with Math details & Status Pills */}
        <div className="bg-white rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 shadow-neu border border-white/90">
          {/* Upper row: Math Icon Badge + Chapter & Due Date Details */}
          <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
            {/* Math Icon Badge using Feather Calculator icon */}
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#F8FAFC] shadow-neu-inset-sm border border-slate-200/90 flex items-center justify-center flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF4755] to-[#FF2A3A] text-white flex items-center justify-center shadow-sm">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
              </div>
            </div>

            {/* Information Column */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-black text-slate-700 tracking-tight uppercase">
                MATHEMATICS
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">
                submission date :{' '}
                <span className="text-[#FF3644] font-bold">6 april 2026 (Mon)</span>
              </p>
              <p className="text-xs sm:text-sm font-black text-[#FF3644] tracking-tight mt-0.5">
                Chapter-5: Life process
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5">
                Time left: <span className="text-[#FF3644] font-bold">6 april 2026 (Mon)</span>
              </p>
            </div>
          </div>

          {/* Lower row: Two interactive pills: Submitted and Pending */}
          <div className="flex items-center gap-3 w-full">
            {/* Submitted Pill */}
            <button
              onClick={() => toggleMathStatus('submitted')}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                selectedStatus === 'submitted' || mathSubmitted
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-neu-sm ring-1 ring-emerald-200'
                  : 'bg-[#F8FAFC] border-slate-100 hover:bg-white shadow-neu-sm'
              }`}
            >
              <CheckCircle
                className={`w-4 h-4 transition-colors ${
                  selectedStatus === 'submitted' || mathSubmitted
                    ? 'text-[#10B981] stroke-[2.5]'
                    : 'text-slate-400 stroke-[2.2]'
                }`}
              />
              <span className="text-xs sm:text-sm font-extrabold text-slate-600">
                Submitted
              </span>
            </button>

            {/* Pending Pill */}
            <button
              onClick={() => toggleMathStatus('pending')}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-2xl border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                selectedStatus === 'pending' && !mathSubmitted
                  ? 'bg-rose-50/60 border-rose-300 shadow-neu-sm ring-1 ring-rose-200'
                  : 'bg-[#F8FAFC] border-slate-100 hover:bg-white shadow-neu-sm'
              }`}
            >
              <Clock
                className={`w-4 h-4 transition-colors ${
                  selectedStatus === 'pending' && !mathSubmitted
                    ? 'text-[#FF3644] stroke-[2.5]'
                    : 'text-slate-400 stroke-[2.2]'
                }`}
              />
              <span className="text-xs sm:text-sm font-extrabold text-slate-600">
                Pending
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: 4 Claymorphic Action Cards (2x2 Grid) with Feather Icons */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4.5 w-full pt-1">
        {/* Card 1: Assignment H.W - Feather BookOpen */}
        <button
          onClick={() => setShowWorksheetsModal(true)}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Assignment H.W
          </span>
        </button>

        {/* Card 2: Sports - Feather Dribbble (Basketball with Seams) */}
        <button
          onClick={() => onNavigate?.('sports')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Dribbble className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Sports
          </span>
        </button>

        {/* Card 3: Certificates - Feather Award */}
        <button
          onClick={() => onNavigate?.('certificates')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Award className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            Certificates
          </span>
        </button>

        {/* Card 4: P.T.M - Feather Users */}
        <button
          onClick={() => onNavigate?.('ptm')}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-neu border border-white/90 flex flex-col items-center justify-center gap-3 sm:gap-4 text-center aspect-square transition-all hover:scale-[1.02] active:scale-95 group focus:outline-none"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#FF3644] group-hover:scale-110 transition-transform">
            <Users className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm text-slate-600">
            P.T.M
          </span>
        </button>
      </div>

      {/* Interactive Assignment Worksheets Modal */}
      {showWorksheetsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#F8FAFC] rounded-t-[32px] sm:rounded-[32px] w-full max-w-lg shadow-neu border border-white p-5 sm:p-6 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-800">
                    Assignment H.W Worksheets
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    Term 1 Subject Worksheets &amp; Submissions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWorksheetsModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Subject Worksheets List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {homeworkList.map((hw) => {
                const isSubmitted = hw.status === 'submitted';
                return (
                  <div
                    key={hw.id}
                    className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-800 uppercase">
                          {hw.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">
                          Due: {hw.lastDate}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#FF3644] truncate mt-0.5">
                        {hw.chapter}
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        Assigned by {hw.assignedBy}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Toggle status */}
                      <button
                        onClick={() => toggleHomeworkItem(hw.id)}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border flex items-center gap-1 active:scale-95 transition-all ${
                          isSubmitted
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Submitted</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-rose-500" />
                            <span>Pending</span>
                          </>
                        )}
                      </button>

                      {/* Download PDF button */}
                      <button
                        onClick={() => showToast(`📥 Downloading ${hw.subject} Worksheet PDF...`)}
                        className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 text-[#FF3644] border border-slate-200/80 active:scale-95 transition-all shadow-xs"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">
                {homeworkList.filter((h) => h.status === 'submitted').length} of{' '}
                {homeworkList.length} completed
              </span>
              <button
                onClick={() => setShowWorksheetsModal(false)}
                className="py-2 px-5 bg-[#FF3644] text-white text-xs font-extrabold rounded-xl shadow-neu-red active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
