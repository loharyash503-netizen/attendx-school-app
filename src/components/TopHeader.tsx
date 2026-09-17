import React from 'react';
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

  const screenTitles: Partial<Record<ScreenType, string>> = {
    attendance: 'Attendance',
    performance: 'Performance Report',
    'class-test': 'Class test',
    'student-details': 'Student Details',
    timetable: 'TimeTable',
    homework: 'Assignment',
    sports: 'Sports',
    certificates: 'Certificates',
    ptm: 'P-T-M',
    results: 'Result',
    behaviour: 'Student behaviour',
    teachers: 'Teacher contact',
    chat: 'Vidhya mam',
    calendar: 'Calendar',
    profile: 'Profile',
  };

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Dashboard', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <Clock className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'timetable', label: 'TimeTable', icon: <Calendar className="w-4 h-4" /> },
    { id: 'homework', label: 'Assignment', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <FileText className="w-4 h-4" /> },
    { id: 'teachers', label: 'Teachers', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header role="banner" className="w-full bg-gradient-to-b from-[#FF4451] via-[#FF3644] to-[#F22938] text-white shadow-md rounded-b-[32px] sm:rounded-b-[36px] transition-all">
      {/* Responsive Header container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-3 pb-5">
        {isHomeScreen ? (
          <div>
            {/* Top row with curved white logo section and Notification Bell matching the user's design */}
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
                  className="relative p-1.5 text-white hover:opacity-85 transition-opacity active:scale-95"
                >
                  <Bell className="w-5 h-5 stroke-[2]" />
                  {unreadAlertsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full ring-2 ring-[#FF3644]" />
                  )}
                </button>
              </div>
            </div>

            {/* Middle row: Menu Button + Search Bar pill + Perfectly Centered Chat/Send Button */}
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

              {/* Center Search Bar - Clickable & Interactive with Search Engine Modal */}
              <div
                onClick={() => onOpenSearch()}
                className="flex-1 h-10 sm:h-11 bg-white/95 hover:bg-white rounded-full px-3.5 flex items-center gap-2 shadow-sm text-slate-700 cursor-pointer group transition-all ring-1 ring-black/5 hover:ring-slate-300 focus:outline-none focus:ring-0"
                role="search"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSearch();
                  }
                }}
              >
                <Search className="w-3.5 h-3.5 text-[#FF3644] stroke-[2.5] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  placeholder="Search subjects, homework, teachers..."
                  readOnly
                  onClick={() => onOpenSearch()}
                  className="w-full bg-transparent text-xs sm:text-sm focus:outline-none focus:ring-0 border-none placeholder:text-slate-400 font-semibold text-slate-700 cursor-pointer"
                />
                <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-400 shrink-0 pointer-events-none">
                  <span>⌘</span>
                  <span>K</span>
                </div>
              </div>

              {/* Chat / Send button - PERFECTLY CENTERED in white circle */}
              <button
                onClick={() => onNavigate('chat')}
                aria-label="Chat / Send Message"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#FF3644] shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                title="Teacher Chat"
              >
                <Send className="w-4 h-4 text-[#FF3644]" />
              </button>
            </div>

            {/* Hello! Good morning greeting matching design */}
            <div className="mt-3.5 sm:mt-4">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Hello! Good morning
              </h1>
            </div>
          </div>
        ) : (
          /* Inner screen header */
          <div>
            {(currentScreen === 'performance' ||
              currentScreen === 'student-details' ||
              currentScreen === 'behaviour') ? (
              <div>
                {/* Curved White Title Section matching reference image */}
                <div className="flex items-center justify-between -mx-4 -mt-3 mb-3">
                  <div className="relative bg-white pt-2.5 pb-2.5 pl-3 pr-6 rounded-br-[32px] flex items-center gap-1.5 shadow-xs">
                    <button
                      onClick={() => onNavigate('home')}
                      className="flex items-center gap-1 text-[#FF3644] font-bold text-sm sm:text-base active:scale-95 transition-transform"
                      aria-label="Back to Home"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                      <span className="font-extrabold tracking-tight">
                        {screenTitles[currentScreen] || 'Student Details'}
                      </span>
                    </button>
                    {/* Smooth inverted curve transitioning into red header */}
                    <div className="absolute -right-5 top-0 w-5 h-5 overflow-hidden pointer-events-none">
                      <svg viewBox="0 0 20 20" className="w-full h-full text-white fill-current">
                        <path d="M 0 0 C 0 11.046 8.954 20 20 20 L 0 20 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Top-Right Search, Notification Bell & 3-Dots */}
                  <div className="flex items-center gap-1.5 pr-4 pt-1">
                    <button
                      onClick={() => onOpenSearch()}
                      className="p-2 rounded-full hover:bg-white/15 transition-all text-white"
                      aria-label="Search"
                      title="Search Attendx (⌘K)"
                    >
                      <Search className="w-5 h-5 stroke-[2.2]" />
                    </button>
                    <button
                      onClick={onOpenAlerts}
                      className="p-2 rounded-full hover:bg-white/15 transition-all text-white"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onNavigate('profile')}
                      className="p-2 rounded-full hover:bg-white/15 transition-all text-white"
                      aria-label="Menu"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Student Profile Row matching reference image */}
                <div className="flex items-center gap-3 pt-1 px-1">
                  <div className="w-11 h-11 rounded-full border-2 border-white shadow-md ring-2 ring-white/30 overflow-hidden bg-white flex items-center justify-center shrink-0">
                    <StudentAvatar size="sm" className="w-full h-full" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-white leading-tight">
                      {student.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')}
                    </h2>
                    <p className="text-xs text-red-100 font-medium">
                      Class-{student.class.replace(/th$/i, '')}th {student.section}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-white/95 hover:text-white font-semibold text-base py-1 px-1 -ml-1 active:scale-95 transition-all"
                    aria-label="Go back to Home"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold tracking-wide text-sm sm:text-base">
                      {screenTitles[currentScreen] || 'Attendx'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => onOpenSearch()}
                      className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-all text-white"
                      aria-label="Search Attendx"
                      title="Search Attendx (⌘K)"
                    >
                      <Search className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    {onOpenA11y && (
                      <button
                        onClick={onOpenA11y}
                        aria-label="Accessibility Settings"
                        className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-all text-white"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={onOpenAlerts}
                      className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 transition-all text-white"
                      aria-label="Notifications"
                    >
                      <Bell className="w-4 h-4" />
                      {unreadAlertsCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
                      )}
                    </button>
                    <button
                      onClick={() => onNavigate('profile')}
                      className="p-1.5 rounded-full hover:bg-white/15 transition-all text-white"
                      aria-label="Menu Profile"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {currentScreen !== 'chat' && (
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h2 className="text-base font-extrabold tracking-tight text-white leading-tight">
                          {student.name}
                        </h2>
                        <p className="text-[11px] text-red-100 font-medium">
                          Class-{student.class} {student.section} &bull; Roll: {student.rollNo}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
                      Shiv Ashish School
                    </span>
                  </div>
                )}
              </>
            )}

            {currentScreen === 'chat' && (
              <div className="flex items-center gap-2.5 pt-1">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Vidhya Mam"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h2 className="text-sm font-bold text-white">Vidhya mam</h2>
                  <p className="text-[10px] text-red-100">Class teacher &bull; 10th-A</p>
                </div>
                <span className="ml-auto text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                  Online
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
