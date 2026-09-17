import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, Send, UserCheck, BellRing } from 'lucide-react';
import { StudentInfo } from '../types';

interface TeacherAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentInfo;
  onMarkAttendance: (status: 'present' | 'absent', subject: string, period: string) => void;
}

export const TeacherAttendanceModal: React.FC<TeacherAttendanceModalProps> = ({
  isOpen,
  onClose,
  student,
  onMarkAttendance,
}) => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedPeriod, setSelectedPeriod] = useState('Period 1 (08:00 AM - 09:00 AM)');
  const [markedStatus, setMarkedStatus] = useState<'present' | 'absent' | null>(null);

  if (!isOpen) return null;

  const handleAction = (status: 'present' | 'absent') => {
    setMarkedStatus(status);
    onMarkAttendance(status, selectedSubject, selectedPeriod);
    setTimeout(() => {
      onClose();
      setMarkedStatus(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#F1F3F6] rounded-[28px] p-5 w-full max-w-sm shadow-neu border border-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">Faculty Live Register</h3>
              <p className="text-[10px] text-slate-500">Real-Time Parent Broadcast Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-neu-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Class Selection */}
        <div className="space-y-3 my-4">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-white rounded-xl p-2.5 text-xs font-bold text-slate-800 shadow-neu-sm border border-slate-100 focus:outline-none"
            >
              <option value="Mathematics">Mathematics (Sunita Sharma)</option>
              <option value="Science">Science (Ms. Vidhya Mam)</option>
              <option value="English">English (Rakesh Sir)</option>
              <option value="Social Science">Social Science (Parag Sir)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Current Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-white rounded-xl p-2.5 text-xs font-bold text-slate-800 shadow-neu-sm border border-slate-100 focus:outline-none"
            >
              <option value="Period 1 (08:00 AM - 09:00 AM)">Period 1 (08:00 AM - 09:00 AM)</option>
              <option value="Period 2 (09:15 AM - 10:15 AM)">Period 2 (09:15 AM - 10:15 AM)</option>
              <option value="Period 3 (10:15 AM - 11:15 AM)">Period 3 (10:15 AM - 11:15 AM)</option>
              <option value="Period 5 (01:00 PM - 01:45 PM)">Period 5 (01:00 PM - 01:45 PM)</option>
            </select>
          </div>

          {/* Student Card to mark */}
          <div className="bg-white rounded-2xl p-3 shadow-neu-sm border border-slate-100 flex items-center justify-between mt-3">
            <div className="flex items-center gap-2.5">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-red-200"
              />
              <div>
                <p className="text-xs font-black text-slate-800">{student.name}</p>
                <p className="text-[10px] text-slate-400">Roll #21 &bull; Class 10th-A</p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Calling Roll
            </span>
          </div>
        </div>

        {/* Action Buttons to mark Present or Absent */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-slate-500 text-center">
            Tap to record attendance &amp; notify parent:
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAction('present')}
              className="py-3 px-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-xs shadow-neu-green active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Present</span>
            </button>

            <button
              onClick={() => handleAction('absent')}
              className="py-3 px-3 bg-gradient-to-r from-[#FF3B47] to-[#F22938] text-white rounded-2xl font-bold text-xs shadow-neu-red active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Mark Absent</span>
            </button>
          </div>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[10px] text-amber-800 flex items-start gap-2">
          <BellRing className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Problem Statement Solver:</strong> Marking a student absent automatically sends an urgent real-time SMS &amp; in-app notification to the parent immediately.
          </span>
        </div>
      </div>
    </div>
  );
};
