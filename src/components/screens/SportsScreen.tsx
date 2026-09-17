import React, { useState } from 'react';
import { initialSportsEvents, sportsRanks } from '../../data/mockData';
import { Trophy, Users, Clock, CheckCircle2, XCircle, Award, Dribbble, Activity, Target } from 'lucide-react';
import { SportsEvent } from '../../types';

export const SportsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'consent'>('events');
  const [events, setEvents] = useState<SportsEvent[]>(initialSportsEvents);

  const handleConsent = (id: string, status: 'approved' | 'declined') => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, parentConsentStatus: status } : e))
    );
  };

  // Top 3 for podium
  const rank1 = sportsRanks.find((r) => r.rank === 1) || sportsRanks[0];
  const rank2 = sportsRanks.find((r) => r.rank === 2) || sportsRanks[1];
  const rank3 = sportsRanks.find((r) => r.rank === 3) || sportsRanks[2];

  return (
    <div className="space-y-4 pb-28 px-4 sm:px-6 pt-2 max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none">
      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl p-1.5 shadow-neu-sm flex items-center border border-slate-100">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'events'
              ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-[#FF3644]" />
          <span>Upcoming Sports Events</span>
        </button>

        <button
          onClick={() => setActiveTab('consent')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'consent'
              ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#FF3644]" />
          <span>Parent’s Consent</span>
        </button>
      </div>

      {/* Mode A: Upcoming Sports Events & Ranking Board */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {/* Upcoming Event Cards */}
          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-[24px] p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#FF3644] flex items-center justify-center shadow-neu-inset-sm flex-shrink-0">
                    {evt.iconType === 'football' ? (
                      <Dribbble className="w-6 h-6 stroke-[2.2]" />
                    ) : evt.iconType === 'running' ? (
                      <Activity className="w-6 h-6 stroke-[2.2]" />
                    ) : (
                      <Target className="w-6 h-6 stroke-[2.2]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 tracking-tight truncate">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      &bull; {evt.date} &bull; {evt.venue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-black text-[#FF3644] bg-red-50 px-2.5 py-1 rounded-xl flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ranking Board */}
          <div className="bg-white rounded-[28px] p-4 sm:p-5 shadow-neu border border-white/90">
            {/* Header Title */}
            <div className="flex items-center justify-between mb-4 px-1 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-50 text-[#FF3644] flex items-center justify-center">
                  <Trophy className="w-3.5 h-3.5 stroke-[2.4]" />
                </div>
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-700 tracking-wider uppercase">
                  RANKING BOARD
                </h3>
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                Current Term
              </span>
            </div>

            {/* Podium Display (2 - 1 - 3) with completely visible names & balanced layout */}
            <div className="flex items-end justify-center gap-2 sm:gap-3 mb-5 pt-3">
              {/* Rank 2 (Silver) */}
              <div className="flex-1 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] pt-3 pb-3 px-2 rounded-2xl text-center shadow-neu-sm border border-slate-200/80 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black text-xs inline-flex items-center justify-center shadow-xs border border-white mb-1.5">
                  2
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-800 tracking-tight text-center leading-snug px-0.5">
                  {rank2.name}
                </p>
                <p className="text-[10.5px] text-slate-500 font-semibold mt-0.5">
                  {rank2.grade}
                </p>
                <div className="w-full pt-2 mt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-black text-slate-700 bg-white px-2 py-0.5 rounded-full shadow-xs border border-slate-200 inline-block">
                    {rank2.score.toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* Rank 1 (Gold - Champion) */}
              <div className="flex-1 bg-gradient-to-b from-[#FFF1F2] to-[#FFE4E6] pt-4 pb-4 px-2 rounded-2xl text-center shadow-neu border-2 border-[#FFA4AD] flex flex-col items-center relative -mt-3">
                {/* Crown / Trophy Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white rounded-full p-1 shadow-sm border-2 border-white">
                  <Award className="w-3.5 h-3.5 stroke-[2.8]" />
                </div>

                <span className="w-7 h-7 rounded-full bg-amber-400 text-white font-black text-xs inline-flex items-center justify-center shadow-sm border border-white mb-1.5">
                  1
                </span>
                <p className="text-xs sm:text-sm font-black text-[#FF2E44] tracking-tight text-center leading-snug px-0.5">
                  {rank1.name}
                </p>
                <p className="text-[10.5px] text-red-600/90 font-bold mt-0.5">
                  {rank1.grade}
                </p>
                <div className="w-full pt-2 mt-2 border-t border-red-200/60">
                  <span className="text-[10.5px] font-black text-[#FF2E44] bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-red-200 inline-block">
                    {rank1.score.toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="flex-1 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] pt-3 pb-3 px-2 rounded-2xl text-center shadow-neu-sm border border-slate-200/80 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-amber-700/80 text-white font-black text-xs inline-flex items-center justify-center shadow-xs border border-white mb-1.5">
                  3
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-800 tracking-tight text-center leading-snug px-0.5">
                  {rank3.name}
                </p>
                <p className="text-[10.5px] text-slate-500 font-semibold mt-0.5">
                  {rank3.grade}
                </p>
                <div className="w-full pt-2 mt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-black text-slate-700 bg-white px-2 py-0.5 rounded-full shadow-xs border border-slate-200 inline-block">
                    {rank3.score.toFixed(1)} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Students Table with Column Proportions & Visible Names */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden bg-[#FAFBFD]">
              {/* Table Column Headers */}
              <div className="flex items-center px-3 py-2.5 bg-slate-50 border-b border-slate-200/80 text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider">
                <span className="w-8 text-center flex-shrink-0">Rank</span>
                <span className="flex-1 pl-2 text-left">Student</span>
                <span className="w-20 sm:w-24 text-center flex-shrink-0">Event</span>
                <span className="w-16 sm:w-20 text-right pr-2 flex-shrink-0">Score</span>
              </div>

              {/* Table Body Rows */}
              <div className="divide-y divide-slate-100 text-xs">
                {sportsRanks.map((r) => {
                  const isTop3 = r.rank <= 3;
                  return (
                    <div
                      key={r.rank}
                      className={`flex items-center px-3 py-2.5 transition-colors hover:bg-slate-50/80 ${
                        r.rank === 1 ? 'bg-red-50/30' : 'bg-white'
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="w-8 flex items-center justify-center flex-shrink-0">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-black inline-flex items-center justify-center shadow-xs ${
                            r.rank === 1
                              ? 'bg-amber-400 text-white'
                              : r.rank === 2
                              ? 'bg-slate-300 text-slate-800'
                              : r.rank === 3
                              ? 'bg-amber-700/80 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {r.rank}
                        </span>
                      </div>

                      {/* Student Name & Grade Column */}
                      <div className="flex-1 pl-2 text-left pr-2 min-w-0">
                        <span
                          className={`font-black text-xs sm:text-sm block tracking-tight ${
                            r.rank === 1 ? 'text-[#FF2E44]' : 'text-slate-800'
                          }`}
                        >
                          {r.name}
                        </span>
                        <span className="text-[10.5px] font-semibold text-slate-400 block">
                          {r.grade}
                        </span>
                      </div>

                      {/* Event */}
                      <div className="w-20 sm:w-24 text-center flex-shrink-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-[11px]">
                          {r.event}
                        </span>
                      </div>

                      {/* Score */}
                      <div className="w-16 sm:w-20 text-right pr-2 flex-shrink-0">
                        <span
                          className={`font-black text-xs sm:text-sm tabular-nums ${
                            isTop3 ? 'text-[#FF3644]' : 'text-slate-700'
                          }`}
                        >
                          {r.score.toFixed(1)}{' '}
                          <span className="text-[10px] font-semibold text-slate-400">pts</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Parent's Consent */}
      {activeTab === 'consent' && (
        <div className="space-y-4">
          <div className="px-1">
            <h3 className="font-extrabold text-sm text-slate-800">Parent’s Approval</h3>
            <p className="text-xs text-slate-500">Provide official consent for upcoming sports meets</p>
          </div>

          <div className="space-y-3.5">
            {events.map((evt) => {
              const isApproved = evt.parentConsentStatus === 'approved';
              const isDeclined = evt.parentConsentStatus === 'declined';

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-[24px] p-4 shadow-neu border border-slate-100 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-[#FF3644] tracking-tight">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        &bull; {evt.date} &bull; {evt.venue}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF3644]" />
                      {evt.time}
                    </span>
                  </div>

                  {/* Consent Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleConsent(evt.id, 'declined')}
                      className={`py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-neu-sm ${
                        isDeclined
                          ? 'bg-rose-100 text-rose-800 ring-2 ring-rose-400'
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Not Now</span>
                    </button>

                    <button
                      onClick={() => handleConsent(evt.id, 'approved')}
                      className={`py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-neu-sm ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-400'
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isApproved ? 'Consent Given' : 'Give consent'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
