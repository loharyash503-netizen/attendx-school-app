import React, { useState, useEffect } from 'react';
import {
  Bell,
  MoreVertical,
  ChevronLeft,
  Search,
  Send,
  ShieldAlert,
  Sliders,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  FileText,
  Users,
  UserCheck,
  Menu,
} from 'lucide-react';
import { ScreenType, StudentInfo, UserRole } from '../types';
import { AttendxLogo } from './AttendxLogo';
import { StudentAvatar } from './StudentAvatar';

const WISHING_WORDS = [
  'Hello! Good morning',
  'Hello! Good afternoon',
  'Hello! Good evening',
  'Hello! Welcome back',
  'Hello! Have a great day',
];

const getInitialWishIndex = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 0; // Morning
  if (hour >= 12 && hour < 17) return 1; // Afternoon
  if (hour >= 17 && hour < 22) return 2; // Evening
  return 0;
};

interface TopHeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  student: StudentInfo;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
  userRole: UserRole;
  onToggleRole: () => void;
  onTriggerAbsenceAlert: () => void;
  onOpenA11y?: () => void;
  onOpenSearch: (initialQuery?: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  onNavigate,
  student,
  unreadAlertsCount,
  onOpenAlerts,
  userRole,
  onToggleRole,
  onTriggerAbsenceAlert,
  onOpenA11y,
  onOpenSearch,
}) => {
  const isHomeScreen = currentScreen === 'home';

  const [wishIndex, setWishIndex] = useState(getInitialWishIndex);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (!isHomeScreen) return;
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setWishIndex((prev) => (prev + 1) % WISHING_WORDS.length);
        setFadeState('in');
      }, 350);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHomeScreen]);

  const screenTitles: Partial<Record<ScreenType, string>> = {
    attendance: 'Attendance',
    performance: 'Performance Report',
    'class-test': 'Class test',
    'student-details': 'Student Details',
    timetable: 'TimeTable',
    homework: 'Homework',
    sports: 'Sports',
    certificates: 'Certificates',
    ptm: 'P.T.M',
    results: 'Result',
    behaviour: 'Student behaviour',
    teachers: 'Teacher contact',
    chat: 'Teacher contact',
    calendar: 'Calendar',
    profile: 'Profile',
  };

  const handleBack = () => {
    if (
      currentScreen === 'sports' ||
      currentScreen === 'certificates' ||
      currentScreen === 'ptm'
    ) {
      onNavigate('homework');
    } else if (currentScreen === 'class-test') {
      onNavigate('performance');
    } else if (currentScreen === 'chat') {
      onNavigate('teachers');
    } else {
      onNavigate('home');
    }
  };

  return (
    <header role="banner" className="w-full bg-gradient-to-b from-[#FF4451] via-[#FF3644] to-[#F22938] text-white shadow-md rounded-b-[28px] sm:rounded-b-[32px] overflow-hidden transition-all select-none">
      {isHomeScreen ? (
        /* Home Dashboard Header Container */
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-3 pb-5">
          <div>
            {/* Top row with curved white logo section and Notification Bell */}
            <div className="flex items-center justify-between -mx-4 -mt-3 mb-3">
              {/* Curved White Logo Area */}
              <div className="relative bg-white pt-2.5 pb-2.5 pl-4 pr-6 rounded-br-[32px] flex items-center gap-2 shadow-xs">
                <AttendxLogo size="sm" lightText={false} />
                {/* Smooth inverted curve transitioning into the red header */}
                <div className="absolute -right-5 top-0 w-5 h-5 overflow-hidden pointer-events-none">
                  <svg viewBox="0 0 20 20" className="w-full h-full text-white fill-current">
                    <path d="M 0 0 C 0 11.046 8.954 20 20 20 L 0 20 Z" />
                  </svg>
                </div>
              </div>

              {/* Top-Right Notification Bell & Quick Controls */}
              <div className="flex items-center gap-2 pr-4 pt-1">
                {/* Accessibility Button */}
                {onOpenA11y && (
                  <button
                    onClick={onOpenA11y}
                    title="Accessibility Tools"
                    aria-label="Accessibility Settings"
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Role Switcher */}
                <button
                  onClick={onToggleRole}
                  title="Switch between Parent and Teacher view"
                  className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition-all flex items-center gap-1 border border-white/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  {userRole === 'parent' ? 'Parent' : 'Teacher'}
                </button>

                {/* Notification Bell matching design */}
                <button
                  onClick={onOpenAlerts}
                  aria-label="View notifications"
                  className="relative p-1.5 text-white hover:opacity-90 transition-opacity active:scale-95"
                >
                  <Bell className="w-6 h-6 stroke-[2.2] text-white" />
                  {unreadAlertsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full ring-2 ring-[#FF3644]" />
                  )}
                </button>
              </div>
            </div>

            {/* Middle row: Menu Button + Search Bar pill + Centered Chat/Send Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 max-w-2xl">
              {/* Menu button */}
              <button
                onClick={() => onNavigate('timetable')}
                aria-label="Menu"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#FF3644] shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                title="Timetable & Routine"
              >
                <Menu className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Center Search Bar */}
              <div
                onClick={() => onOpenSearch()}
                className="flex-1 h-10 sm:h-11 bg-white/95 hover:bg-white rounded-full px-3.5 flex items-center gap-2.5 shadow-sm text-slate-700 cursor-pointer group transition-all ring-1 ring-black/5 hover:ring-slate-300 focus:outline-none focus:ring-0"
                role="search"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSearch();
                  }
                }}
              >
                <Search className="w-4 h-4 text-[#FF3644] stroke-[2.5] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  placeholder="Search"
                  readOnly
                  onClick={() => onOpenSearch()}
                  className="w-full bg-transparent text-xs sm:text-sm focus:outline-none focus:ring-0 border-none placeholder:text-slate-400 font-semibold text-slate-700 cursor-pointer"
                />
              </div>

              {/* Chat / Send button */}
              <button
                onClick={() => onNavigate('chat')}
                aria-label="Chat / Send Message"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#FF3644] shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                title="Teacher Chat"
              >
                <Send className="w-4 h-4 text-[#FF3644]" />
              </button>
            </div>

            {/* Automatic changing wishing words */}
            <div className="mt-3.5 sm:mt-4 min-h-[32px] flex items-center">
              <h1
                className={`text-xl sm:text-2xl font-black text-white tracking-tight transition-all duration-350 transform ${
                  fadeState === 'out'
                    ? 'opacity-0 -translate-y-2'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {WISHING_WORDS[wishIndex]}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        /* Inner Screen Upper Design matching user reference image exactly across all screens */
        <div className="w-full max-w-7xl mx-auto pb-4">
          {/* Top Navigation Row: White Tab on Left with S-Curve, Bell & 3-Dots on Right */}
          <div className="flex items-start justify-between w-full">
            {/* Left: White tab with `< [Screen Name]` and smooth S-curve */}
            <div className="flex items-start flex-shrink-0">
              <div className="bg-white h-11 sm:h-12 pl-3 sm:pl-4 pr-2.5 flex items-center shadow-xs">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 sm:gap-1.5 text-[#FF3644] hover:text-[#E02636] font-extrabold text-[15px] sm:text-base active:scale-95 transition-all"
                  aria-label={`Back from ${screenTitles[currentScreen] || 'screen'}`}
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.8]" />
                  <span className="tracking-tight">{screenTitles[currentScreen] || 'Details'}</span>
                </button>
              </div>

              {/* Smooth inverted S-curve transition from white tab to top red edge */}
              <div className="w-12 sm:w-16 h-11 sm:h-12 flex-shrink-0 overflow-hidden pointer-events-none -ml-[1px]">
                <svg
                  viewBox="0 0 60 48"
                  className="w-full h-full text-white fill-current"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 0 L 60 0 C 38 0 22 48 0 48 Z" />
                </svg>
              </div>
            </div>

            {/* Right: Notification Bell & 3-Dots in red area matching reference */}
            <div className="flex items-center gap-1 sm:gap-2 pr-3 sm:pr-5 pt-1.5 sm:pt-2">
              <button
                onClick={onOpenAlerts}
                className="p-2 rounded-full hover:bg-white/15 transition-all text-white relative active:scale-95"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5 stroke-[2.2]" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full ring-2 ring-[#FF3644]" />
                )}
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="p-2 rounded-full hover:bg-white/15 transition-all text-white active:scale-95"
                aria-label="More options"
                title="Settings & Profile"
              >
                <MoreVertical className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Student Profile Row: Avatar + Name + Class matching user reference image */}
          <div className="flex items-center gap-3.5 px-4 sm:px-6 pt-2.5 pb-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm ring-2 ring-white/40 overflow-hidden bg-white flex items-center justify-center shrink-0">
              <StudentAvatar size="sm" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                {student.name
                  .split(' ')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                  .join(' ')}
              </h2>
              <p className="text-xs sm:text-[13px] text-white/90 font-semibold mt-0.5">
                Class-{student.class.replace(/th$/i, '')}th {student.section}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
