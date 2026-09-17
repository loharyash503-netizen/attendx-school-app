/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, UserRole, RealtimeAlert, Teacher } from './types';
import { initialStudent, initialAlerts } from './data/mockData';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { NotificationModal } from './components/NotificationModal';
import { TeacherAttendanceModal } from './components/TeacherAttendanceModal';
import { SearchModal } from './components/SearchModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { OtpScreen } from './components/screens/OtpScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { PerformanceScreen } from './components/screens/PerformanceScreen';
import { ClassTestScreen } from './components/screens/ClassTestScreen';
import { StudentDetailsScreen } from './components/screens/StudentDetailsScreen';
import { TimeTableScreen } from './components/screens/TimeTableScreen';
import { HomeworkScreen } from './components/screens/HomeworkScreen';
import { SportsScreen } from './components/screens/SportsScreen';
import { CertificatesScreen } from './components/screens/CertificatesScreen';
import { PtmScreen } from './components/screens/PtmScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { BehaviourScreen } from './components/screens/BehaviourScreen';
import { TeacherContactScreen } from './components/screens/TeacherContactScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

import { Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userRole, setUserRole] = useState<UserRole>('parent');
  const [student, setStudent] = useState(initialStudent);
  const [attendancePercent, setAttendancePercent] = useState(85);

  // Alerts & Notifications
  const [alerts, setAlerts] = useState<RealtimeAlert[]>(initialAlerts);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search Engine State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Global keyboard shortcut to summon Search Engine (Cmd+K, Ctrl+K, or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchInitialQuery('');
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchInitialQuery('');
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // View frame mode: mobile phone mockup
  const [frameMode] = useState<'mobile' | 'wide'>('mobile');

  const unreadAlertsCount = alerts.filter((a) => a.isUnread).length;

  // Trigger Real-time Absence Alert matching problem statement
  const triggerAbsenceAlert = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert: RealtimeAlert = {
      id: `alert-${Date.now()}`,
      title: '🚨 Real-Time Absence Alert (Period 1)',
      message: `URGENT: Ajay Verma was recorded ABSENT for Mathematics at ${timestamp}. No prior leave was requested. Please check in with school.`,
      time: 'Just now',
      type: 'absence_alert',
      isUnread: true,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setAttendancePercent((prev) => Math.max(70, prev - 2));
    setToastMessage('⚠️ Real-time SMS & App Alert sent to parent: Ajay recorded absent!');
    setIsAlertsOpen(true);

    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleTeacherMarkAttendance = (
    status: 'present' | 'absent',
    subject: string,
    period: string
  ) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (status === 'absent') {
      const newAlert: RealtimeAlert = {
        id: `alert-${Date.now()}`,
        title: `🚨 Absence Alert: ${subject}`,
        message: `Teacher Ms. Vidhya recorded Ajay Verma ABSENT during ${period} at ${timestamp}.`,
        time: 'Just now',
        type: 'absence_alert',
        isUnread: true,
      };
      setAlerts((prev) => [newAlert, ...prev]);
      setAttendancePercent((prev) => Math.max(70, prev - 2));
      setToastMessage(`⚠️ Alert broadcast to Parent: Ajay Verma absent in ${subject}`);
    } else {
      setToastMessage(`✅ Ajay Verma marked PRESENT in ${subject} (${period})`);
    }

    setTimeout(() => setToastMessage(null), 4500);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => setCurrentScreen('login')} />;
      case 'login':
        return (
          <LoginScreen
            onBack={() => setCurrentScreen('splash')}
            onLoginSuccess={(role) => {
              setUserRole(role);
              setCurrentScreen('otp');
            }}
          />
        );
      case 'otp':
        return (
          <OtpScreen
            role={userRole}
            onBack={() => setCurrentScreen('login')}
            onVerifySuccess={() => setCurrentScreen('home')}
          />
        );
      case 'home':
        return (
          <HomeScreen
            student={student}
            onNavigate={(screen) => setCurrentScreen(screen)}
            attendancePercent={attendancePercent}
          />
        );
      case 'attendance':
        return (
          <AttendanceScreen
            student={student}
            attendancePercent={attendancePercent}
            onSimulateAbsence={triggerAbsenceAlert}
            onSimulatePresent={() => {
              setAttendancePercent((prev) => Math.min(100, prev + 1));
              setToastMessage('✅ Ajay Verma verified PRESENT today.');
              setTimeout(() => setToastMessage(null), 3000);
            }}
          />
        );
      case 'performance':
        return <PerformanceScreen />;
      case 'class-test':
        return <ClassTestScreen />;
      case 'student-details':
        return <StudentDetailsScreen student={student} />;
      case 'timetable':
        return <TimeTableScreen />;
      case 'homework':
        return <HomeworkScreen onNavigate={(screen) => setCurrentScreen(screen)} />;
      case 'sports':
        return <SportsScreen />;
      case 'certificates':
        return <CertificatesScreen />;
      case 'ptm':
        return <PtmScreen />;
      case 'results':
        return <ResultsScreen />;
      case 'behaviour':
        return <BehaviourScreen />;
      case 'teachers':
        return (
          <TeacherContactScreen
            onStartChat={() => setCurrentScreen('chat')}
          />
        );
      case 'chat':
        return <ChatScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'profile':
        return (
          <ProfileScreen
            student={student}
            onLogout={() => setCurrentScreen('login')}
          />
        );
      default:
        return (
          <HomeScreen
            student={student}
            onNavigate={(screen) => setCurrentScreen(screen)}
            attendancePercent={attendancePercent}
          />
        );
    }
  };

  const isAuthScreen =
    currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'otp';

  return (
    <div className="min-h-screen bg-[#E5E9F0] text-slate-800 flex flex-col items-center justify-start p-0 sm:py-3 selection:bg-rose-500 selection:text-white">
      {/* Real-time Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 z-50 max-w-sm mx-4 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 animate-slideDown">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Responsive App Container */}
      <div
        className={`w-full bg-[#F1F3F6] flex flex-col relative transition-all duration-300 min-h-screen ${
          frameMode === 'mobile'
            ? 'max-w-md my-0 sm:my-4 sm:rounded-[36px] shadow-2xl sm:border sm:border-slate-200/90 overflow-hidden'
            : 'max-w-7xl mx-auto my-0 sm:my-4 sm:rounded-[28px] shadow-2xl sm:border sm:border-slate-200/90 overflow-hidden'
        }`}
      >
        {/* Mobile Status Bar (9:41, Signal, Wifi, Battery) shown when in mobile phone frame mode */}
        {!isAuthScreen && frameMode === 'mobile' && (
          <div
            className={`px-7 pt-2.5 pb-1 flex items-center justify-between text-xs font-bold tracking-tight select-none transition-colors ${
              currentScreen === 'home' ? 'bg-[#FF4451] text-white' : 'bg-white text-slate-800'
            }`}
          >
            <span>9:41</span>
            {/* Dynamic Island Pill / Speaker Notch */}
            <div
              className={`w-20 h-3.5 rounded-full transition-colors ${
                currentScreen === 'home' ? 'bg-black/25' : 'bg-slate-200'
              }`}
            />
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        )}

        {/* Global Screen Header (Rendered on non-auth screens) */}
        {!isAuthScreen && (
          <TopHeader
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            student={student}
            unreadAlertsCount={unreadAlertsCount}
            onOpenAlerts={() => setIsAlertsOpen(true)}
            userRole={userRole}
            onToggleRole={() =>
              setUserRole((prev) => (prev === 'parent' ? 'teacher' : 'parent'))
            }
            onTriggerAbsenceAlert={triggerAbsenceAlert}
            onOpenSearch={(query) => {
              setSearchInitialQuery(query || '');
              setIsSearchOpen(true);
            }}
          />
        )}

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>

        {/* Floating Bottom Nav Dock */}
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      </div>

      {/* Notification Stream Modal */}
      <NotificationModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onMarkAllRead={() => {
          setAlerts((prev) => prev.map((a) => ({ ...a, isUnread: false })));
        }}
        onSimulateAbsence={triggerAbsenceAlert}
        onCallTeacher={() => {
          alert('Calling Shiv Ashish School / Ms. Vidhya Mam at +91 79 2685 4100...');
        }}
        onChatTeacher={() => {
          setCurrentScreen('chat');
        }}
      />

      {/* Teacher Live Register Modal */}
      <TeacherAttendanceModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        student={student}
        onMarkAttendance={handleTeacherMarkAttendance}
      />

      {/* Global Intelligent Search Engine Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        initialQuery={searchInitialQuery}
      />
    </div>
  );
}
