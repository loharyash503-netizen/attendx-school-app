import React, { useState } from 'react';
import { StudentInfo } from '../../types';
import { Phone, Mail, MapPin, Globe, Bell, LogOut, Edit3, School, Check } from 'lucide-react';

interface ProfileScreenProps {
  student: StudentInfo;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ student, onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(student.parentContact);
  const [address, setAddress] = useState(student.parentAddress);

  return (
    <div className="space-y-6 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top Profile Card matching Screen 24 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[28px] p-6 shadow-neu border border-white/80 flex flex-col items-center justify-center relative">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile</span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-[#FF3644] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            {/* Parent Avatar with ring */}
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#FF3B47] to-[#FF7582] shadow-neu">
                <img
                  src={student.parentAvatarUrl}
                  alt={student.parentName}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>

            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {student.parentName}
            </h2>
            <p className="text-xs font-extrabold text-[#FF3644] tracking-wide mt-0.5">
              Parents
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1 text-center">
              Connected to: <strong className="text-slate-700">{student.schoolName}</strong>
            </p>

            {/* Student Connected Tag */}
            <div className="mt-3 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-neu-inset-sm">
              Ward: {student.name} (Class {student.class}th-{student.section})
            </div>
          </div>

          {/* Logout Button matching Screen 24 */}
          <div className="pt-2">
            <button
              onClick={onLogout}
              className="w-full py-3.5 bg-white border border-red-200 text-[#FF3644] hover:bg-red-50 font-black text-xs tracking-wider uppercase rounded-2xl shadow-neu-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Right Column: Contact Cards and Settings matching Screen 24 */}
        <div className="lg:col-span-7 space-y-4">
          {/* Contact Cards matching Screen 24 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold text-slate-700 tracking-wide px-1">
              Contact Details
            </h4>
            {/* Phone */}
            <div className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400">PHONE:-</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs font-black text-slate-800 bg-slate-50 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-xs font-black text-slate-800">{phone}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400">EMAIL:-</p>
                <p className="text-xs font-black text-slate-800 truncate">{student.parentEmail}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#FF3644] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400">ADDRESS:-</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs font-black text-slate-800 bg-slate-50 px-2 py-1 rounded"
                  />
                ) : (
                  <p className="text-xs font-black text-slate-800">{address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Settings Section matching Screen 24 */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-700 tracking-wide px-1">
              Settings section
            </h4>

            {/* Language */}
            <div className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#FF3644]" />
                <span className="text-xs font-bold text-slate-700">LANGUAGE:-</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs font-black text-[#FF3644] bg-red-50 border border-red-200 px-3 py-1 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
              </select>
            </div>

            {/* Notification Switch matching Screen 24 */}
            <div className="bg-white rounded-2xl p-3.5 shadow-neu-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#FF3644]" />
                <span className="text-xs font-bold text-slate-700">NOTIFICATION</span>
              </div>

              {/* Switch Toggle */}
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                  notificationsEnabled ? 'bg-[#FF3644]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
