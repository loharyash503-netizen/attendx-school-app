export type ScreenType =
  | 'splash'
  | 'login'
  | 'otp'
  | 'home'
  | 'attendance'
  | 'timetable'
  | 'performance'
  | 'class-test'
  | 'student-details'
  | 'homework'
  | 'sports'
  | 'certificates'
  | 'ptm'
  | 'results'
  | 'behaviour'
  | 'teachers'
  | 'chat'
  | 'calendar'
  | 'profile';

export type UserRole = 'parent' | 'teacher';

export interface StudentInfo {
  name: string;
  age: number;
  class: string;
  section: string;
  rollNo: number;
  dob: string;
  gender: string;
  schoolName: string;
  admissionNo: string;
  academicYear: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
  parentAddress: string;
  avatarUrl: string;
  parentAvatarUrl: string;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  status: 'present' | 'absent' | 'late' | 'holiday' | 'none';
  checkInTime?: string;
  notes?: string;
}

export interface SubjectScore {
  code: string;
  name: string;
  score: number;
  total: number;
  color: string;
  status: 'PASS' | 'FAIL';
}

export interface HomeworkItem {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  assignedBy: string;
  lastDate: string;
  status: 'submitted' | 'pending';
}

export interface SportsEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  time: string;
  iconType: 'football' | 'running' | 'chess';
  parentConsentStatus: 'pending' | 'approved' | 'declined';
}

export interface SportsRank {
  rank: number;
  name: string;
  grade: string;
  event: string;
  score: number;
}

export interface CertificateItem {
  id: string;
  title: string;
  recipient: string;
  organization: string;
  event: string;
  date: string;
  type: 'certificate' | 'medal';
  medalType?: 'gold' | 'silver' | 'bronze';
}

export interface PTMRecord {
  id: string;
  date: string;
  time: string;
  teacher: string;
  school: string;
  status: 'upcoming' | 'attended' | 'missed';
}

export interface TimetableSlot {
  subject: string;
  teacher: string;
  time: string;
  period: number;
  isBreak?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  classes: string;
  subject: string;
  availableTime: string;
  email: string;
  avatar: string;
  unreadCount?: number;
  lastMessage?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'parent' | 'teacher';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface RealtimeAlert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'absence_alert' | 'homework' | 'announcement' | 'ptm';
  isUnread: boolean;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  highLegibilityFont: boolean;
  screenReaderAnnouncements: boolean;
}
