import React from 'react';
import { Home, FileText, BarChart2, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  // Hide bottom nav on splash, login, and chat screens for native feel
  if (currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'otp' || currentScreen === 'chat') {
    return null;
  }

  // Main tabs: Assignment, Attendance, Profile
  // Clicking any button from the Home screen (Student Details, Progress, Download, Contact, Performance Report)
  // is part of the Home screen flow, so the other bottom nav tabs must NOT be highlighted red.
  const isAssignmentActive = currentScreen === 'homework';
  const isAttendanceActive = currentScreen === 'attendance';
  const isProfileActive = currentScreen === 'profile';
  const isHomeActive = !isAssignmentActive && !isAttendanceActive && !isProfileActive;

  // 4 items with Home placed FIRST as requested, with Feather icons and visible names
  const navItems = [
    {
      id: 'home',
      screen: 'home' as ScreenType,
      icon: Home,
      isActive: isHomeActive,
      label: 'Home',
    },
    {
      id: 'assignment',
      screen: 'homework' as ScreenType,
      icon: FileText,
      isActive: isAssignmentActive,
      label: 'Assignment',
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
    <div className="fixed bottom-2 sm:bottom-3 left-0 right-0 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-3 sm:px-6 z-40 pointer-events-none">
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] px-2 sm:px-4 py-2 sm:py-2.5 shadow-neu flex items-center justify-around border border-white/80 relative"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              aria-label={item.label}
              className="relative transition-all duration-200 flex flex-col items-center justify-center group focus:outline-none flex-1 max-w-[78px] sm:max-w-[92px]"
            >
              <div
                className={`rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
                  item.isActive
                    ? 'w-10 h-10 sm:w-11 sm:h-11 bg-[#FF3644] text-white shadow-neu-red -translate-y-1 ring-2 ring-[#F1F3F6]'
                    : 'w-10 h-10 sm:w-11 sm:h-11 bg-[#F9FBFC] hover:bg-white text-[#FF3644] shadow-neu-sm border border-slate-100/90'
                }`}
              >
                <Icon
                  className={`transition-all duration-300 ${
                    item.isActive
                      ? 'w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.3]'
                      : 'w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.1]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] mt-1 tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  item.isActive
                    ? 'font-black text-[#FF3644]'
                    : 'font-bold text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
