import React, { useState } from 'react';
import { ChevronLeft, Lock, Eye, EyeOff, Users, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('parent');
  const [parentIdentifier, setParentIdentifier] = useState('+91 9565652302');
  const [facultyCode, setFacultyCode] = useState('FAC-102-VIDHYA');
  const [password, setPassword] = useState('pass1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(activeTab);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex flex-col relative pb-8">
      {/* Top red header curved section matching design */}
      <div className="bg-gradient-to-b from-[#FF4451] via-[#FF3644] to-[#F22938] pt-4 pb-14 px-6 rounded-b-[40px] relative shadow-md">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#FF3644] shadow-neu-sm active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Main card container */}
      <div className="px-6 -mt-8 flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
        <div className="space-y-6">
          {/* Welcome Text */}
          <div className="text-center mt-2">
            <h1 className="text-3xl font-extrabold text-[#FF3644] tracking-tight">
              Welcome Dear!
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Login to continue further
            </p>
          </div>

          {/* Segmented Switcher (Parents Login vs Teacher Login) */}
          <div className="bg-white rounded-2xl p-1.5 shadow-neu-sm flex items-center border border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('parent')}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                activeTab === 'parent'
                  ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-[#FF3644]" />
              <span>Parents Login</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('teacher')}
              className={`flex-1 py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                activeTab === 'teacher'
                  ? 'bg-[#FFD9DC] text-[#FF2E44] shadow-neu-inset-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#FF3644]" />
              <span>Teacher Login</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'parent' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                  Email / Mobile Number
                </label>
                <div className="bg-white rounded-2xl shadow-neu-inset p-3.5 border border-slate-100 focus-within:ring-2 focus-within:ring-red-400">
                  <input
                    type="text"
                    value={parentIdentifier}
                    onChange={(e) => setParentIdentifier(e.target.value)}
                    placeholder="Enter your email or mobile number"
                    className="w-full bg-transparent text-sm text-slate-800 font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                  Faculties code
                </label>
                <div className="bg-white rounded-2xl shadow-neu-inset p-3.5 border border-slate-100 focus-within:ring-2 focus-within:ring-red-400">
                  <input
                    type="text"
                    value={facultyCode}
                    onChange={(e) => setFacultyCode(e.target.value)}
                    placeholder="Enter your faculties code"
                    className="w-full bg-transparent text-sm text-slate-800 font-medium focus:outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="bg-white rounded-2xl shadow-neu-inset p-3.5 border border-slate-100 flex items-center focus-within:ring-2 focus-within:ring-red-400">
                <Lock className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-slate-800 font-medium focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                    rememberMe ? 'bg-[#FF3644] text-white shadow-xs' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold text-slate-600">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered mobile/email')}
                className="text-xs font-bold text-[#FF3644] hover:underline"
              >
                Forget Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#FF3B47] to-[#F22938] text-white font-bold text-base rounded-2xl shadow-neu-red active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Demo credential hints for testing */}
          <div className="p-3 bg-white/70 rounded-2xl border border-slate-200/80 shadow-neu-sm text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              Demo Credentials Pre-filled: Click <span className="font-bold text-[#FF3644]">Login</span> to proceed to OTP verification.
            </p>
          </div>
        </div>

        {/* Footer Contact Admin */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => alert('School Admin Office: contact@shivashish.edu.in | Tel: +91 79 2685 4100')}
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
