import React from 'react';
import { initialPTMRecords } from '../../data/mockData';
import { Calendar, Clock, User, School, CheckCircle2, XCircle, Users } from 'lucide-react';

export const PtmScreen: React.FC = () => {
  const upcoming = initialPTMRecords.find((r) => r.status === 'upcoming');
  const pastRecords = initialPTMRecords.filter((r) => r.status !== 'upcoming');

  return (
    <div className="space-y-4 pb-28 px-4 pt-2 max-w-md mx-auto">
      {/* Upcoming PTM Card matching Screen 25 */}
      <div className="bg-white rounded-[28px] p-5 shadow-neu border border-white/80 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-800">Upcoming PTM</h3>
        </div>

        {/* Meeting Illustration Banner */}
        <div className="w-full h-36 rounded-2xl bg-gradient-to-tr from-sky-50 via-rose-50 to-amber-50 border border-slate-100 shadow-neu-inset-sm flex flex-col items-center justify-center p-3 relative overflow-hidden">
          <div className="flex items-center justify-center gap-4 text-slate-700">
            {/* Parents illustration proxy */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-rose-200 border-2 border-white flex items-center justify-center text-rose-700">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1">Parents</span>
            </div>

            {/* Conference desk */}
            <div className="w-16 h-8 bg-amber-100 rounded-xl border border-amber-200 flex items-center justify-center text-[8px] font-black text-amber-800 shadow-xs">
              MEETING
            </div>

            {/* Teacher illustration proxy */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-emerald-700">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1">Vidhya Mam</span>
            </div>
          </div>
          <p className="text-[10px] font-medium text-slate-400 mt-2">
            One-on-one session regarding 1st Term Results &amp; Attendance
          </p>
        </div>

        {/* Details List matching Screen 25 */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Details
          </h4>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3644] w-20">DATE:-</span>
              <span className="font-semibold text-slate-700">{upcoming?.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3644] w-20">TIME:-</span>
              <span className="font-semibold text-slate-700">{upcoming?.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3644] w-20">STUDENT:-</span>
              <span className="font-semibold text-slate-700">Ajay Verma ( 10th A )</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3644] w-20">TEACHER:-</span>
              <span className="font-semibold text-slate-700">{upcoming?.teacher}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3644] w-20">SCHOOL:-</span>
              <span className="font-semibold text-slate-700">{upcoming?.school}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Previous PTMs Section matching Screen 25 */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-sm text-slate-800 px-1">Previous PTMs</h3>

        {pastRecords.map((ptm) => {
          const isAttended = ptm.status === 'attended';

          return (
            <div
              key={ptm.id}
              className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between"
            >
              <div>
                <h4 className="font-black text-xs text-slate-800">{ptm.date}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{ptm.time}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Faculty: {ptm.teacher}</p>
              </div>

              <div
                className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 ${
                  isAttended
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {isAttended ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ATTENDED</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>MISSED</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
