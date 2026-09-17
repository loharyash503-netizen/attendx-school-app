import React from 'react';
import { Home, ClipboardList, BarChart2, User } from 'lucide-react';
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

  const isAssignmentActive = currentScreen === 'homework' || currentScreen === 'results' || currentScreen === 'certificates';
  const isHomeActive = currentScreen === 'home' || currentScreen === 'timetable' || currentScreen === 'sports' || currentScreen === 'ptm' || currentScreen === 'teachers' || currentScreen === 'calendar';
  const isAttendanceActive = currentScreen === 'attendance' || currentScreen === 'performance' || currentScreen === 'class-test' || currentScreen === 'behaviour';
  const isProfileActive = currentScreen === 'profile' || currentScreen === 'student-details';

  const navItems = [
    {
      id: 'assignment',
      label: 'Assignment',
      screen: 'homework' as ScreenType,
      icon: ClipboardList,
      isActive: isAssignmentActive,
    },
    {
      id: 'home',
      label: 'Home',
      screen: 'home' as ScreenType,
      icon: Home,
      isActive: isHomeActive,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      screen: 'attendance' as ScreenType,
      icon: BarChart2,
      isActive: isAttendanceActive,
    },
    {
      id: 'profile',
      label: 'Profile',
      screen: 'profile' as ScreenType,
      icon: User,
      isActive: isProfileActive,
    },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-3 sm:px-6 z-40 pointer-events-none">
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-full px-2 sm:px-6 py-2 shadow-neu flex items-center justify-around border border-white/60 relative"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              aria-label={item.label}
              className="relative flex-1 py-1 px-1 transition-all duration-200 flex flex-col items-center group focus:outline-none"
            >
              {/* Uplifted Icon: Lifts up when clicked/active, resting at baseline when inactive */}
              <div
                className={`transition-all duration-300 ease-out transform ${
                  item.isActive
                    ? '-translate-y-4 sm:-translate-y-5'
                    : 'translate-y-0'
                }`}
              >
                <div
                  className={`rounded-2xl flex items-center justify-center transition-all duration-300 active:scale-95 ${
                    item.isActive
                      ? 'w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-[#FF2E44] to-[#FF5463] text-white shadow-neu-red ring-3 ring-[#F1F3F6] scale-105'
                      : 'w-9 h-9 sm:w-10 sm:h-10 text-slate-400 hover:text-slate-600 bg-transparent hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`transition-all duration-300 ${
                      item.isActive
                        ? 'w-5 h-5 stroke-[2.2]'
                        : 'w-4 h-4 stroke-[2]'
                    }`}
                  />
                </div>
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] tracking-tight transition-colors duration-200 mt-0.5 ${
                  item.isActive ? 'text-[#FF3644] font-black' : 'text-slate-400 font-semibold'
                }`}
              >
                {item.label}
              </span>

              {/* Red Indicator Dot */}
              {item.isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF3644] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

