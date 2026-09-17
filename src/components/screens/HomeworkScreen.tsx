import React, { useState } from 'react';
import { initialHomeworkList } from '../../data/mockData';
import { Download, BookOpen, CheckCircle, Clock, FileText } from 'lucide-react';
import { HomeworkItem } from '../../types';

export const HomeworkScreen: React.FC = () => {
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(initialHomeworkList);
  const [downloadModalItem, setDownloadModalItem] = useState<HomeworkItem | null>(null);

  const toggleStatus = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'submitted' ? 'pending' : 'submitted' }
          : item
      )
    );
  };

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-800">Homework &amp; Assignment</h3>
          <p className="text-[11px] sm:text-xs text-slate-400">Term 1 syllabus and worksheets</p>
        </div>
        <span className="text-xs font-bold text-[#FF3644] bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
          Due: 6 April
        </span>
      </div>

      {/* Homework List responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {homeworkList.map((hw) => {
          const isSubmitted = hw.status === 'submitted';
          return (
            <div
              key={hw.id}
              className="bg-white rounded-[24px] p-4 shadow-neu-sm border border-slate-100 hover:shadow-neu transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Subject Icon in rounded red box */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 text-[#FF3644] flex items-center justify-center flex-shrink-0 shadow-neu-inset-sm">
                    <BookOpen className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-slate-800 tracking-tight">
                      {hw.subject}
                    </h4>
                    <p className="text-xs font-bold text-[#FF3644] mt-0.5">
                      {hw.chapter}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      assigned by: <span className="font-semibold text-slate-700">{hw.assignedBy}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Last date : <span className="text-slate-600 font-semibold">{hw.lastDate}</span>
                    </p>
                  </div>
                </div>

                {/* Download Button matching Screenshot */}
                <button
                  onClick={() => setDownloadModalItem(hw)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white shadow-neu-sm hover:bg-slate-50 text-xs font-bold text-slate-700 active:scale-95 transition-all border border-slate-100 flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF3644]" />
                  <span>Download</span>
                </button>
              </div>

              {/* Status footer with submission checkbox */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(hw.id)}
                  className={`text-xs font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
                    isSubmitted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed &amp; Submitted</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span>Pending &bull; Mark as Done</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] text-slate-400">PDF Worksheet &bull; 1.4 MB</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Download preview modal */}
      {downloadModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#F1F3F6] rounded-[28px] p-5 w-full max-w-sm shadow-neu border border-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#FF3644] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">{downloadModalItem.subject}</h4>
                <p className="text-xs text-slate-500">{downloadModalItem.chapter}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Worksheet file downloaded successfully to device storage. Please submit your answers before 6 April 2026.
            </p>
            <button
              onClick={() => setDownloadModalItem(null)}
              className="w-full py-2.5 bg-[#FF3644] text-white text-xs font-bold rounded-xl shadow-neu-red"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
