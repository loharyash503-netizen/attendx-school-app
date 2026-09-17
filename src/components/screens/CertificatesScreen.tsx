import React, { useState } from 'react';
import { certificatesList, medalsList } from '../../data/mockData';
import { Award, Medal, Download, Check, Sparkles } from 'lucide-react';
import { CertificateItem } from '../../types';

export const CertificatesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'medals'>('certificates');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  return (
    <div className="space-y-4 pb-28 px-4 pt-2 max-w-md mx-auto">
      <div className="px-1">
        <h3 className="font-extrabold text-sm text-slate-800">Sports certificates / Medals</h3>
        <p className="text-[11px] text-slate-400">Official student achievements &amp; honours</p>
      </div>

      {/* Tab Switcher matching Screens 22 & 23 */}
      <div className="bg-white rounded-2xl p-1.5 shadow-neu-sm flex items-center border border-slate-100">
        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'certificates'
              ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-[#FF3644]" />
          <span>Certificates</span>
        </button>

        <button
          onClick={() => setActiveTab('medals')}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'medals'
              ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          <Medal className="w-4 h-4 text-[#FF3644]" />
          <span>Medals</span>
        </button>
      </div>

      {/* Mode A: Certificates Grid matching Screen 22 */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-2 gap-3.5">
          {certificatesList.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl p-3 shadow-neu-sm border border-slate-100 flex flex-col justify-between"
            >
              {/* Certificate Visual Miniature */}
              <div className="bg-[#FFFDF7] rounded-xl p-2.5 border-2 border-amber-300 shadow-neu-inset-sm text-center space-y-1 relative">
                <div className="flex justify-center text-amber-500">
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-[8px] font-black text-amber-900 tracking-wider">
                  {cert.organization}
                </p>
                <p className="text-[7px] text-slate-500 font-serif italic">
                  {cert.title}
                </p>
                <p className="text-[10px] font-extrabold text-[#FF3644] underline decoration-amber-400">
                  {cert.recipient}
                </p>
                <p className="text-[7px] text-slate-600 truncate">
                  {cert.event}
                </p>
                <div className="pt-1 flex justify-center gap-3 text-[6px] text-slate-400">
                  <span>Authorized Sign</span>
                  <span>Date: {cert.date}</span>
                </div>
              </div>

              {/* Download Action Button matching Screen 22 */}
              <button
                onClick={() => handleDownload(cert.id)}
                className="mt-3 w-full py-1.5 px-2 rounded-xl bg-white shadow-neu-sm hover:bg-slate-50 text-[11px] font-bold text-[#FF3644] flex items-center justify-center gap-1 active:scale-95 transition-all border border-red-100"
              >
                {downloadedId === cert.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Saved</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mode B: Medals Grid matching Screen 23 */}
      {activeTab === 'medals' && (
        <div className="grid grid-cols-2 gap-3.5">
          {medalsList.map((med) => {
            const isGold = med.medalType === 'gold';
            const isSilver = med.medalType === 'silver';

            return (
              <div
                key={med.id}
                className="bg-white rounded-2xl p-4 shadow-neu-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-neu transition-all"
              >
                {/* 3D Medal Graphic */}
                <div className="relative mb-2 flex flex-col items-center">
                  {/* Ribbon */}
                  <div className="w-8 h-4 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 rounded-t-sm shadow-xs -mb-1" />
                  {/* Medal Coin */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xs shadow-md border-2 ${
                      isGold
                        ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-amber-900 border-yellow-200'
                        : isSilver
                        ? 'bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 text-slate-800 border-slate-200'
                        : 'bg-gradient-to-tr from-amber-700 via-amber-600 to-yellow-800 text-amber-100 border-amber-600'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-extrabold tracking-tighter">
                      {med.medalType}
                    </span>
                  </div>
                </div>

                <h4 className="font-extrabold text-xs text-[#FF3644] mt-1">
                  {med.recipient}
                </h4>
                <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                  {med.title}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {med.date}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
