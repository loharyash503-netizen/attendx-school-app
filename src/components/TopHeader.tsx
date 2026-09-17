import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  MoreVertical,
  ChevronLeft,
  User,
  Users,
  Calendar,
  ShieldAlert,
  Sliders,
  Menu,
  Search,
  Send,
} from 'lucide-react';
import { ScreenType, StudentInfo, UserRole } from '../types';
import { StudentAvatar } from './StudentAvatar';
import { AttendxLogo } from './AttendxLogo';

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
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowOptionsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const screenTitles: Record<ScreenType, string> = {
    splash: 'Attendx',
    login: 'Login',
    otp: 'Verification',
    home: 'Home',
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
    if (currentScreen === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (
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

  const isHome = currentScreen === 'home';
  const isAttendance = currentScreen === 'attendance';
  const isBrandedHeader = isHome || isAttendance;

  return (
    <header
      role="banner"
      className="w-full bg-gradient-to-b from-[#FF4451] via-[#FF3644] to-[#F22938] text-white shadow-md rounded-b-[30px] sm:rounded-b-[36px] overflow-visible transition-all select-none relative"
    >
      <div className="w-full max-w-7xl mx-auto pb-4">
        {/* Top Navigation Row: White Tab on Left with S-Curve, Bell & Controls on Right */}
        <div className="flex items-start justify-between w-full">
          {/* Left: White tab with ATTENDX Logo or `< [Screen Name]` and smooth S-curve */}
          <div className="flex items-start flex-shrink-0">
            <div className="bg-white h-11 sm:h-12 pl-3 sm:pl-4 pr-3 flex items-center shadow-xs">
              {isBrandedHeader ? (
                <div className="flex items-center gap-1.5 py-0.5 select-none">
                  <AttendxLogo size="sm" showText={true} className="scale-90 origin-left" />
                </div>
              ) : (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 sm:gap-1.5 text-[#FF3644] hover:text-[#E02636] font-extrabold text-[15px] sm:text-base active:scale-95 transition-all"
                  aria-label={`Back from ${screenTitles[currentScreen] || 'screen'}`}
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.8]" />
                  <span className="tracking-tight">{screenTitles[currentScreen] || 'Home'}</span>
                </button>
              )}
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

          {/* Right: Notification Bell & Menu Options */}
          <div className="flex items-center gap-1 sm:gap-2 pr-3 sm:pr-5 pt-1.5 sm:pt-2 relative">
            {/* Accessibility Shortcut */}
            {onOpenA11y && (
              <button
                onClick={onOpenA11y}
                className="p-1.5 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-all active:scale-95 hidden sm:inline-flex"
                title="Accessibility Tools"
                aria-label="Accessibility Settings"
              >
                <Sliders className="w-4 h-4 stroke-[2]" />
              </button>
            )}

            {/* Notification Bell */}
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

            {/* 3-Dots Menu Button (visible on non-branded screens) */}
            {!isBrandedHeader && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                  className="p-2 rounded-full hover:bg-white/15 transition-all text-white active:scale-95"
                  aria-label="More options"
                  title="Options Menu"
                >
                  <MoreVertical className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Branded Screen Header Controls (Home: Menu + Search + Send; Attendance: Menu + Search) */}
        {isBrandedHeader ? (
          <div className="px-4 sm:px-6 pt-3 space-y-3">
            {/* Action Row */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full relative" ref={menuRef}>
              {/* White Circular Hamburger Menu Button */}
              <button
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                aria-label="Menu"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#FF3644] flex items-center justify-center shadow-md active:scale-95 transition-all flex-shrink-0"
              >
                <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.8]" />
              </button>

              {/* White Pill Search Bar */}
              <div
                onClick={() => onOpenSearch()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenSearch();
                }}
                className="flex-1 bg-white hover:bg-slate-50 h-11 sm:h-12 rounded-full px-4 flex items-center gap-2.5 shadow-md cursor-pointer transition-all active:scale-[0.99]"
              >
                <Search className="w-4.5 h-4.5 text-slate-400 stroke-[2.5]" />
                <span className="text-sm font-semibold text-slate-400 tracking-tight select-none">
                  Search
                </span>
              </div>

              {/* White Circular Send Button (Present in Image 1 Home Screen) */}
              {isHome && (
                <button
                  onClick={() => onNavigate('teachers')}
                  aria-label="Messages and teacher contact"
                  title="Teacher Contact & Chat"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#FF3644] flex items-center justify-center shadow-md active:scale-95 transition-all flex-shrink-0"
                >
                  <Send className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.5] -translate-x-0.5 translate-y-0.5" />
                </button>
              )}

              {/* Quick Menu Dropdown when Hamburger is clicked */}
              {showOptionsMenu && (
                <div className="absolute left-0 top-14 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 text-slate-700 border border-slate-100 text-xs animate-fadeIn font-semibold">
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700"
                  >
                    <User className="w-4 h-4 text-[#FF3644]" />
                    <span>Parent Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onToggleRole();
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700"
                  >
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>Switch Role ({userRole === 'parent' ? 'Teacher' : 'Parent'})</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('timetable');
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-2.5 text-left text-slate-700"
                  >
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>Timetable & Routine</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      onTriggerAbsenceAlert();
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-red-50 text-[#FF3644] flex items-center gap-2.5 text-left font-bold"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#FF3644]" />
                    <span>Test Absence Alert</span>
                  </button>
                </div>
              )}
            </div>

            {/* "Hello! Good morning" Greeting matching Image 1 & 2 */}
            <div className="pt-1 pb-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Hello! Good morning
              </h1>
            </div>
          </div>
        ) : (
          /* Student Profile Header for Inner Pages */
          <div className="flex items-center gap-3.5 px-4 sm:px-6 pt-2.5 pb-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm ring-2 ring-white/40 overflow-hidden bg-white flex items-center justify-center shrink-0">
              <StudentAvatar size="sm" student={student} className="w-full h-full object-cover" />
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
        )}
      </div>
    </header>
  );
};
