import React, { useState } from 'react';
import { initialSportsEvents, sportsRanks } from '../../data/mockData';
import { Trophy, Users, Clock, CheckCircle2, XCircle, Award, Check } from 'lucide-react';
import { SportsEvent } from '../../types';

export const SportsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'consent'>('events');
  const [events, setEvents] = useState<SportsEvent[]>(initialSportsEvents);

  const handleConsent = (id: string, status: 'approved' | 'declined') => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, parentConsentStatus: status } : e))
    );
  };

  return (
    <div className="space-y-4 pb-28 px-4 pt-2 max-w-md mx-auto">
      {/* Tab Switcher matching Screens 20 & 21 */}
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
          <span>UP-coming sports events</span>
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
          <span>Parent’s consent</span>
        </button>
      </div>

      {/* Mode A: UP-coming sports events matching Screen 20 */}
      {activeTab === 'events' && (
        <div className="space-y-5">
          {/* Upcoming Event Cards */}
          <div className="space-y-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-[24px] p-4 shadow-neu-sm border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#FF3644] flex items-center justify-center shadow-neu-inset-sm">
                    {evt.iconType === 'football' ? (
                      <span className="text-xl">⚽</span>
                    ) : evt.iconType === 'running' ? (
                      <span className="text-xl">🏃</span>
                    ) : (
                      <span className="text-xl">♟️</span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 tracking-tight">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      &bull; {evt.date} &bull; {evt.venue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-black text-[#FF3644] bg-red-50 px-2.5 py-1 rounded-xl">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{evt.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ranking Board Podium matching Screen 20 */}
          <div className="bg-white rounded-[28px] p-5 shadow-neu border border-white/80">
            <h4 className="font-extrabold text-xs text-slate-700 tracking-wider uppercase mb-4 text-center">
              RANKING BOARD
            </h4>

            {/* Podium Display (2 - 1 - 3) */}
            <div className="flex items-end justify-center gap-3 mb-6">
              {/* Rank 2 */}
              <div className="flex-1 bg-red-50/70 p-3 rounded-2xl text-center shadow-neu-sm border border-red-100">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center justify-center mb-1">
                  2
                </span>
                <p className="text-[11px] font-extrabold text-slate-800 truncate">
                  KARAN AUJHLA
                </p>
                <p className="text-[10px] text-slate-400">Grade 9B</p>
              </div>

              {/* Rank 1 (Tallest) */}
              <div className="flex-1 bg-[#FFD9DC] p-4 rounded-2xl text-center shadow-neu border-2 border-red-200 -mt-2">
                <span className="w-7 h-7 rounded-full bg-amber-400 text-white font-black text-xs inline-flex items-center justify-center mb-1 shadow-sm">
                  1
                </span>
                <p className="text-xs font-black text-[#FF2E44] truncate">
                  DEV PARMAR
                </p>
                <p className="text-[10px] font-bold text-red-600">Grade 10B</p>
                <Award className="w-4 h-4 text-amber-500 mx-auto mt-1" />
              </div>

              {/* Rank 3 */}
              <div className="flex-1 bg-red-50/70 p-3 rounded-2xl text-center shadow-neu-sm border border-red-100">
                <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs inline-flex items-center justify-center mb-1">
                  3
                </span>
                <p className="text-[11px] font-extrabold text-slate-800 truncate">
                  VIPUL JOSHI
                </p>
                <p className="text-[10px] text-slate-400">Grade 9A</p>
              </div>
            </div>

            {/* Students Table matching Screen 20 */}
            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-4 pb-2 text-[10px] font-bold text-slate-400 uppercase">
                <span>Students name</span>
                <span>Grade</span>
                <span>Events</span>
                <span className="text-right">Scores</span>
              </div>
              {sportsRanks.map((r, i) => (
                <div key={i} className="grid grid-cols-4 py-2 font-medium text-slate-700 items-center">
                  <span className="font-bold text-slate-800">{r.name}</span>
                  <span className="text-slate-500">{r.grade}</span>
                  <span className="text-slate-600">{r.event}</span>
                  <span className="text-right font-black text-[#FF3644]">{r.score.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Parent's Consent matching Screen 21 */}
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

                  {/* Consent Action Buttons matching Screen 21 */}
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
