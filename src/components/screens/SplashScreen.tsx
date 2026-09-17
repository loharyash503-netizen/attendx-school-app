import React from 'react';
import { motion } from 'motion/react';
import { AttendxLogo } from '../AttendxLogo';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-[#F1F3F6] flex flex-col items-center justify-between p-8 relative select-none">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full flex justify-end">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white shadow-neu-sm text-slate-500 border border-slate-100">
          v2.4 &bull; Shiv Ashish
        </span>
      </div>

      {/* Central Iconic Logo matching Page 6 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center -mt-10"
      >
        <div className="p-8 rounded-[36px] bg-[#F1F3F6] shadow-neu flex items-center justify-center border border-white/60 mb-6">
          <AttendxLogo size="hero" showText={false} />
        </div>

        <div className="flex items-baseline font-serif">
          <span
            className="text-4xl font-black text-[#1D2129] tracking-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            ATTEND
          </span>
          <span
            className="text-4xl font-black italic text-[#FF3644] ml-1"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            x
          </span>
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-400 tracking-wider uppercase text-center max-w-xs">
          Real-Time Student Attendance & Performance Monitoring
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Real-time Parent &amp; Teacher Connect</span>
        </div>
      </motion.div>

      {/* Action button */}
      <div className="w-full max-w-xs space-y-3">
        <button
          onClick={onContinue}
          className="w-full py-4 bg-gradient-to-r from-[#FF3B47] to-[#F22938] text-white font-bold text-base rounded-2xl shadow-neu-red flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-center text-slate-400">
          Designed for students, parents, and faculties
        </p>
      </div>
    </div>
  );
};
