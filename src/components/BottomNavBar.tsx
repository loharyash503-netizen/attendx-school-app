import React from 'react';
import { Home, FileText, BarChart2, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  // Hide bottom nav on splash, login, and chat screens for native feel
  if (
    currentScreen === 'splash' ||
    currentScreen === 'login' ||
    currentScreen === 'otp' ||
    currentScreen === 'chat'
  ) {
    return null;
  }

  // Active state mapping:
  const isHomeworkActive =
    currentScreen === 'homework' ||
    currentScreen === 'sports' ||
    currentScreen === 'certificates' ||
    currentScreen === 'ptm';
  const isAttendanceActive =
    currentScreen === 'attendance' ||
    currentScreen === 'class-test' ||
    currentScreen === 'timetable' ||
    currentScreen === 'calendar';
  const isProfileActive = currentScreen === 'profile';
  const isHomeActive =
    !isHomeworkActive &&
    !isAttendanceActive &&
    !isProfileActive &&
    currentScreen !== 'student-details' &&
    currentScreen !== 'performance' &&
    currentScreen !== 'teachers';

  // 4 items with Home screen first (Feather icons from lucide-react):
  // 1: Home
  // 2: Tasks / Homework
  // 3: Attendance / Analytics
  // 4: Profile
  const navItems = [
    {
      id: 'home',
      screen: 'home' as ScreenType,
      icon: Home,
      isActive: isHomeActive,
      label: 'Home',
    },
    {
      id: 'homework',
      screen: 'homework' as ScreenType,
      icon: FileText,
      isActive: isHomeworkActive,
      label: 'Tasks',
    },
    {
      id: 'attendance',
      screen: 'attendance' as ScreenType,
      icon: BarChart2,
      isActive: isAttendanceActive,
      label: 'Attendance',
    },
    {
      id: 'profile',
      screen: 'profile' as ScreenType,
      icon: User,
      isActive: isProfileActive,
      label: 'Profile',
    },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 z-40 pointer-events-none">
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[26px] sm:rounded-[30px] px-3 sm:px-5 py-2 shadow-neu flex items-center justify-around border border-white/80 relative"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              aria-label={item.label}
              className="relative transition-all duration-200 flex items-center justify-center group focus:outline-none flex-1 py-1"
            >
              <div
                className={`flex items-center justify-center transition-all duration-300 active:scale-95 ${
                  item.isActive
                    ? 'w-11 h-11 sm:w-12 sm:h-12 bg-[#FF3644] text-white rounded-[18px] sm:rounded-[20px] shadow-lg -translate-y-2.5 ring-4 ring-[#F1F3F6]'
                    : 'w-10 h-10 sm:w-11 sm:h-11 bg-[#F9FBFC] hover:bg-white text-[#FF3644] rounded-[16px] sm:rounded-[18px] shadow-neu-sm border border-slate-100/90'
                }`}
              >
                <Icon
                  className={`transition-all duration-300 ${
                    item.isActive
                      ? 'w-5.5 h-5.5 text-white stroke-[2.4]'
                      : 'w-5 h-5 text-[#FF3644] stroke-[2.2]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
