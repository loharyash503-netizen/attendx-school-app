import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ShieldCheck, Key, Lock, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface OtpScreenProps {
  onBack: () => void;
  onVerifySuccess: () => void;
  role: UserRole;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ onBack, onVerifySuccess, role }) => {
  const [otp, setOtp] = useState<string[]>(['4', '8', '2', '9']);
  const [timeLeft, setTimeLeft] = useState(45);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(45);
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex flex-col relative pb-8">
      {/* Top red curved header banner */}
      <div className="bg-gradient-to-b from-[#FF4451] via-[#FF3644] to-[#F22938] pt-4 pb-14 px-6 rounded-b-[40px] relative shadow-md">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#FF3644] shadow-neu-sm active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      <div className="px-6 -mt-8 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
        <div className="space-y-6">
          {/* Security Illustration Card matching Page 8 & 10 */}
          <div className="flex justify-center -mt-2">
            <div className="w-44 h-44 rounded-3xl bg-[#F1F3F6] shadow-neu flex flex-col items-center justify-center relative p-4 border border-white/80">
              {/* Stylized vector illustration */}
              <div className="w-20 h-24 bg-gradient-to-b from-red-400 to-[#FF3644] rounded-2xl flex flex-col items-center justify-center text-white shadow-md p-2 relative">
                <div className="w-10 h-1.5 bg-white/40 rounded-full mb-2" />
                <div className="w-8 h-1 bg-white/30 rounded-full mb-3" />
                <div className="w-12 h-5 bg-white rounded-lg flex items-center justify-center text-[9px] font-bold text-[#FF3644]">
                  LOGIN
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute bottom-3 left-4 p-1.5 rounded-full bg-white shadow-neu-sm text-amber-500">
                <Key className="w-3.5 h-3.5" />
              </div>
              <div className="absolute top-4 right-4 p-1.5 rounded-full bg-white shadow-neu-sm text-sky-500">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-[#FF3644] tracking-tight">
              Verify your number
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              We’ve sent a 4-digit OTP to
            </p>
            <p className="text-sm font-bold text-slate-800 tracking-wide mt-0.5">
              +91 9556623201
            </p>
          </div>

          {/* 4-Digit Inset OTP Input Boxes matching Screenshots 8 and 10 */}
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-2xl bg-white shadow-neu-inset flex items-center justify-center border border-slate-100/90"
              >
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full text-center text-xl font-black text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Expiry timer */}
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">
              OTP will expire in{' '}
              <span className="font-bold text-[#FF3644]">
                0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </p>
          </div>

          {/* Verify & Login Button */}
          <div>
            <button
              onClick={onVerifySuccess}
              className="w-full py-3.5 bg-gradient-to-r from-[#FF3B47] to-[#F22938] text-white font-bold text-base rounded-2xl shadow-neu-red active:scale-95 transition-transform"
            >
              Verify &amp; login
            </button>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <button
              type="button"
              disabled={timeLeft > 0}
              onClick={handleResend}
              className={`text-xs font-bold transition-colors ${
                timeLeft > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#FF3644] hover:underline'
              }`}
            >
              Resend OTP
            </button>
          </div>
        </div>

        {/* Footer Contact Admin */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => alert('School Admin Office: contact@shivashish.edu.in')}
              className="text-[#FF3644] font-bold hover:underline"
            >
              Contact school admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
