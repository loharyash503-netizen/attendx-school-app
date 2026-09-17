import React from 'react';
import { StudentInfo } from '../../types';
import { StudentAvatar } from '../StudentAvatar';

interface StudentDetailsProps {
  student: StudentInfo;
}

export const StudentDetailsScreen: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <div className="pb-32 px-4 sm:px-6 pt-3 sm:pt-4 max-w-md sm:max-w-lg mx-auto space-y-4 animate-fadeIn">
      {/* Profile Section matching iPhone 14 & 15 Pro - 16.png */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          Profile
        </h3>

        {/* Large Circular Avatar with Soft Neumorphic Ring */}
        <div className="flex justify-center py-2">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white p-2 shadow-[0_10px_25px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04),-3px_-3px_10px_rgba(255,255,255,0.95)] flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FF3644]/90 flex items-center justify-center bg-[#FFF5F5]">
              <StudentAvatar size="xl" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info Section matching iPhone 14 & 15 Pro - 16.png */}
      <div className="space-y-2.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          Basic Info :
        </h3>

        <div className="space-y-2.5">
          {/* Card 1: NAME & AGE */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            <span>NAME:- {student.name.toUpperCase()}</span>
            <span>AGE :- {student.age}</span>
          </div>

          {/* Card 2: CLASS & SECTION */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            <span>CLASS:- {student.class.toUpperCase()}</span>
            <span>SECTION:- {student.section.toUpperCase()}</span>
          </div>

          {/* Card 3: ROLL NO */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            ROLL NO:- {student.rollNo}
          </div>

          {/* Card 4: DATE OF BIRTH */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            DATE OF BIRTH:- {student.dob}
          </div>

          {/* Card 5: GENDER */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            GENDER :- {student.gender.toUpperCase()}
          </div>
        </div>
      </div>

      {/* School Name Section matching iPhone 14 & 15 Pro - 16.png */}
      <div className="space-y-2.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          School Name:-
        </h3>

        <div className="space-y-2.5">
          {/* Card 1: SCHOOL NAME */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            SCHOOL NAME:- {student.schoolName.toUpperCase()}
          </div>

          {/* Card 2: ADMISSION NUMBER */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            ADMISSION NUMBER:- {student.admissionNo}
          </div>

          {/* Card 3: ACADEMIC YEAR */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            ACADEMIC YEAR:- {student.academicYear}
          </div>
        </div>
      </div>

      {/* Parent's Info Section matching iPhone 14 & 15 Pro - 16.png */}
      <div className="space-y-2.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          Parent’s Info:-
        </h3>

        <div className="space-y-2.5">
          {/* Card 1: PARENTS NAME */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            PARENTS NAME:- {student.parentName.toUpperCase()}
          </div>

          {/* Card 2: CONTACT NO. */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            CONTACT NO.:- {student.parentContact}
          </div>

          {/* Card 3: EMAIL ID */}
          <div className="bg-[#EEF2F6] rounded-[18px] px-4.5 py-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,0.9)] border border-slate-200/50 text-xs sm:text-[13px] font-bold text-slate-600 tracking-wide">
            EMAIL ID:- {student.parentEmail}
          </div>
        </div>
      </div>
    </div>
  );
};
