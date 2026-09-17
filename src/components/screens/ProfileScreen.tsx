import React, { useState } from 'react';
import { StudentInfo } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  Bell,
  Smile,
  Check,
  ChevronRight,
  UserPlus,
  X,
} from 'lucide-react';
import { ParentAvatar } from '../ParentAvatar';
import { StudentAvatar } from '../StudentAvatar';
import { parentChildrenList } from '../../data/mockData';

interface ProfileScreenProps {
  student: StudentInfo;
  onLogout: () => void;
  onSelectStudent?: (student: StudentInfo) => void;
  onSwitchWard?: () => void;
  childrenList?: StudentInfo[];
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  onLogout,
  onSelectStudent,
  onSwitchWard,
  childrenList,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [isEditing, setIsEditing] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [phone, setPhone] = useState(student.parentContact || '+91 9565652302');
  const [email, setEmail] = useState(student.parentEmail || 'Ashok.verma@email.com');
  const [address, setAddress] = useState(student.parentAddress || '123, Green valley, ahmedabad');

  const children = childrenList || parentChildrenList;

  const cycleLanguage = () => {
    const languages = ['English', 'Hindi', 'Gujarati'];
    const nextIdx = (languages.indexOf(language) + 1) % languages.length;
    setLanguage(languages[nextIdx]);
  };

  const handleSwitchClick = () => {
    if (onSwitchWard) {
      onSwitchWard();
    }
    setShowSwitchModal(true);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 pb-24 select-none animate-fadeIn">
      {/* Main Profile Card matching iPhone 14 & 15 Pro - 34.png */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 shadow-neu border border-white/90">
        {/* Top Header Row: Profile title on left, Edit on right */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-bold text-slate-600">Profile</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm font-bold text-[#FF3644] hover:opacity-80 active:scale-95 transition-all"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Center: Parent Avatar, Name, Role, and Connected School */}
        <div className="flex flex-col items-center justify-center text-center mt-1">
          {/* Circular Illustrated Avatar with Golden/Amber border */}
          <ParentAvatar size="lg" className="w-28 h-28" />

          {/* Parent Name in bold coral red */}
          <h2 className="text-base sm:text-lg font-bold text-[#FF3644] tracking-tight mt-3">
            Ashok.K. verma
          </h2>

          {/* Subtitle */}
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Parents (2 Children Enrolled)
          </p>

          {/* Thin Pinkish-Red Horizontal Divider */}
          <div className="w-full h-[1px] bg-red-200/60 my-2.5" />

          {/* Connected School */}
          <p className="text-xs text-slate-600 font-medium">
            Connected to:{' '}
            <span className="text-[#FF3644] font-bold">Shiv Ashish School</span>
          </p>
        </div>

        {/* Contact Details Cards */}
        <div className="space-y-2.5 mt-4">
          {/* Phone Card */}
          <div className="w-full bg-[#F8FAFC] rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#FF3644] fill-[#FF3644] flex-shrink-0" />
            <div className="flex-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-700">PHONE:-</span>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 text-xs font-bold text-[#FF3644] bg-white border border-red-200 rounded px-2 py-0.5 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-bold text-[#FF3644]">{phone}</span>
              )}
            </div>
          </div>

          {/* Email Card */}
          <div className="w-full bg-[#F8FAFC] rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#FF3644] fill-[#FF3644] flex-shrink-0" />
            <div className="flex-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-700">EMAIL:-</span>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs font-bold text-[#FF3644] bg-white border border-red-200 rounded px-2 py-0.5 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-bold text-[#FF3644] truncate">{email}</span>
              )}
            </div>
          </div>

          {/* Address Card */}
          <div className="w-full bg-[#F8FAFC] rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#FF3644] fill-[#FF3644] flex-shrink-0" />
            <div className="flex-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-700">ADDRESS:-</span>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 text-xs font-bold text-[#FF3644] bg-white border border-red-200 rounded px-2 py-0.5 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-bold text-[#FF3644]">{address}</span>
              )}
            </div>
          </div>
        </div>

        {/* Thin Pinkish-Red Horizontal Divider */}
        <div className="w-full h-[1px] bg-red-200/60 my-4" />

        {/* Settings Section */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 text-left mb-3 px-1">
            Settings section
          </h4>

          <div className="space-y-2.5">
            {/* Language Card */}
            <button
              onClick={cycleLanguage}
              type="button"
              className="w-full bg-[#F8FAFC] hover:bg-slate-100/70 rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center gap-3 transition-colors text-left group"
              title="Click to change language"
            >
              <div className="flex items-center text-[#FF3644] font-black text-sm leading-none flex-shrink-0">
                <span>A</span>
                <span className="text-[11px] ml-0.5">अ</span>
              </div>
              <div className="flex-1 flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700">LANGUAGE:-</span>
                <span className="text-xs font-bold text-[#FF3644]">{language}</span>
              </div>
            </button>

            {/* Notification Card with Toggle Switch */}
            <div className="w-full bg-[#F8FAFC] rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#FF3644] fill-[#FF3644] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">NOTIFICATION</span>
              </div>

              {/* iOS-Style Toggle Switch matching image */}
              <button
                type="button"
                role="switch"
                aria-checked={notificationsEnabled}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                  notificationsEnabled ? 'bg-slate-200' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#FF3644] shadow-md transition-transform duration-200 ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0 bg-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* Switch Card - Targeted button to switch between children */}
            <button
              type="button"
              onClick={handleSwitchClick}
              className="w-full bg-[#F8FAFC] hover:bg-slate-100/70 rounded-2xl px-4 py-3.5 shadow-neu-sm border border-slate-100 flex items-center justify-between transition-colors text-left active:scale-[0.99] group cursor-pointer"
              title="Switch child profile"
            >
              <div className="flex items-center gap-3">
                <Smile className="w-4 h-4 text-[#FF3644] stroke-[2.2] flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-700">SWITCH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#FF3644] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100">
                  {student.name.split(' ')[0]} ({student.class})
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Logout Button matching image */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full mt-5 py-3.5 bg-white hover:bg-slate-50 text-[#FF3644] font-black text-sm tracking-wider uppercase rounded-2xl shadow-neu border border-slate-100/80 active:scale-95 transition-all text-center"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Switch Child / Ward Modal Dialog with 2 Children Options */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-black text-slate-800 text-base">Select Child</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Parent: Ashok K. Verma (2 Children)
                </p>
              </div>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of 2 options for parents */}
            <div className="space-y-3">
              {children.map((child) => {
                const isSelected =
                  child.admissionNo === student.admissionNo || child.name === student.name;
                return (
                  <button
                    key={child.admissionNo}
                    onClick={() => {
                      if (onSelectStudent) {
                        onSelectStudent(child);
                      }
                      setShowSwitchModal(false);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-red-50/70 border-[#FF3644] shadow-sm ring-1 ring-[#FF3644]'
                        : 'bg-[#F9FBFC] hover:bg-slate-50 border-slate-200/80 shadow-neu-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs bg-white shrink-0">
                      <StudentAvatar size="md" student={child} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-black text-slate-800 truncate">
                          {child.name}
                        </p>
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#FF3644] bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-full">
                            Switch
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                        Class-{child.class} {child.section} &bull; Roll #{child.rollNo}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">
                        Adm: {child.admissionNo}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Link another child option */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-semibold">Have another child?</span>
              <button
                type="button"
                onClick={() => {
                  setShowSwitchModal(false);
                  alert('Admission request for linking third child sent to School Office.');
                }}
                className="text-[11px] font-bold text-[#FF3644] hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Link Another Child</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
