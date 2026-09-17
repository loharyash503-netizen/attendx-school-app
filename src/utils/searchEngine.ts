import { SearchCategory, SearchResultItem } from '../types/search';
import {
  initialStudent,
  initialSubjectScores,
  classTestScores,
  initialHomeworkList,
  timetableSchedule,
  initialSportsEvents,
  sportsRanks,
  medalsList,
  certificatesList,
  initialPTMRecords,
  teacherList,
} from '../data/mockData';

// Build the global searchable database
export function buildSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. Academics - Subject Scores & Reports
  initialSubjectScores.forEach((sub) => {
    items.push({
      id: `acad-${sub.code}`,
      title: `${sub.name} (${sub.code}) - 1st Term Exam`,
      subtitle: `Score: ${sub.score} / ${sub.total} • Status: ${sub.status}`,
      description: `First term examination score for ${sub.name}. Student scored ${sub.score} out of 100 marks (${sub.score >= 80 ? 'Strong Area' : sub.score < 60 ? 'Needs Attention' : 'Good Progress'}).`,
      category: 'academics',
      categoryLabel: 'Academics',
      targetScreen: 'performance',
      badge: {
        text: `${sub.score}/100`,
        variant: sub.score >= 80 ? 'green' : sub.score < 60 ? 'red' : 'amber',
      },
      metadata: {
        score: `${sub.score}/100`,
        subject: sub.name,
        status: sub.status,
      },
      keywords: [
        'exam',
        'marks',
        'score',
        'result',
        'grade',
        sub.code.toLowerCase(),
        sub.name.toLowerCase(),
        'first term',
        'percentage',
      ],
      actionLabel: 'View Performance',
    });
  });

  // Class Tests
  classTestScores.forEach((test) => {
    items.push({
      id: `class-test-${test.subject}`,
      title: `${test.subject} - Class Test Score`,
      subtitle: `Scored: ${test.score} / ${test.max} marks`,
      description: `Recent weekly class test evaluation in ${test.subject}.`,
      category: 'academics',
      categoryLabel: 'Academics',
      targetScreen: 'class-test',
      badge: {
        text: `${test.score}/${test.max}`,
        variant: test.score >= 25 ? 'green' : test.score <= 15 ? 'red' : 'blue',
      },
      metadata: {
        score: `${test.score}/${test.max}`,
        subject: test.subject,
      },
      keywords: ['class test', 'weekly test', 'marks', test.subject.toLowerCase()],
      actionLabel: 'View Class Tests',
    });
  });

  // Overall Performance Summary item
  items.push({
    id: 'acad-summary-1',
    title: '1st Term Examination Report & Percentage',
    subtitle: 'Aggregate: 73% • Rank 4th in Class 10th-A',
    description: 'Strong areas in Science, Social Science, Hindi and English. Recommended focus on Mathematics and Gujarati.',
    category: 'academics',
    categoryLabel: 'Academics',
    targetScreen: 'performance',
    badge: {
      text: '73% Aggregate',
      variant: 'red',
    },
    metadata: {
      score: '73%',
      status: 'Passed with Distinction',
    },
    keywords: ['report card', 'percentage', 'rank', 'unit test', 'performance', 'strong areas', 'weak areas'],
    actionLabel: 'Open Report Card',
  });

  // 2. Homework & Assignments
  initialHomeworkList.forEach((hw) => {
    items.push({
      id: `hw-${hw.id}`,
      title: `${hw.subject}: ${hw.title}`,
      subtitle: `${hw.chapter} • Due: ${hw.lastDate}`,
      description: `Assigned by ${hw.assignedBy}. Current Status: ${hw.status.toUpperCase()}. Submit before the due date.`,
      category: 'homework',
      categoryLabel: 'Homework',
      targetScreen: 'homework',
      badge: {
        text: hw.status === 'submitted' ? 'Submitted' : 'Pending',
        variant: hw.status === 'submitted' ? 'green' : 'amber',
      },
      metadata: {
        subject: hw.subject,
        teacher: hw.assignedBy,
        date: hw.lastDate,
        status: hw.status,
      },
      keywords: [
        'homework',
        'assignment',
        'task',
        hw.subject.toLowerCase(),
        hw.chapter.toLowerCase(),
        hw.title.toLowerCase(),
        hw.assignedBy.toLowerCase(),
        hw.status,
      ],
      actionLabel: 'Open Assignment',
    });
  });

  // 3. Teachers & Faculty
  teacherList.forEach((t) => {
    items.push({
      id: `teacher-${t.id}`,
      title: t.name,
      subtitle: `${t.subject} • ${t.role}`,
      description: `Available hours: ${t.availableTime}. Classes handled: ${t.classes}. Contact: ${t.email}.`,
      category: 'teachers',
      categoryLabel: 'Faculty',
      targetScreen: 'teachers',
      badge: {
        text: t.subject,
        variant: 'purple',
      },
      metadata: {
        teacher: t.name,
        time: t.availableTime,
        email: t.email,
        subject: t.subject,
      },
      keywords: [
        'teacher',
        'faculty',
        'contact',
        'chat',
        'email',
        'phone',
        t.name.toLowerCase(),
        t.subject.toLowerCase(),
        t.role.toLowerCase(),
      ],
      actionLabel: 'View Faculty Profile',
    });
  });

  // 4. Timetable & Daily Schedule
  const dayNames: Record<string, string> = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
  };

  Object.entries(timetableSchedule).forEach(([dayKey, slots]) => {
    slots.forEach((slot, idx) => {
      if (slot.isBreak) {
        items.push({
          id: `tt-${dayKey}-break`,
          title: `${dayNames[dayKey] || dayKey} - Break Time (${slot.time})`,
          subtitle: 'Lunch and recreation break for students',
          description: `Scheduled at ${slot.time} on ${dayNames[dayKey]}.`,
          category: 'timetable',
          categoryLabel: 'Timetable',
          targetScreen: 'timetable',
          badge: {
            text: 'Break',
            variant: 'slate',
          },
          metadata: {
            time: slot.time,
            date: dayNames[dayKey],
            subject: 'Break Time',
          },
          keywords: ['timetable', 'routine', 'schedule', 'break', 'recess', 'lunch', dayKey.toLowerCase()],
          actionLabel: 'View Schedule',
        });
      } else {
        items.push({
          id: `tt-${dayKey}-${idx}`,
          title: `${dayNames[dayKey] || dayKey} (Period ${slot.period}): ${slot.subject}`,
          subtitle: `Time: ${slot.time} • Faculty: ${slot.teacher || 'Assigned Staff'}`,
          description: `Period ${slot.period} on ${dayNames[dayKey]} at ${slot.time}. Taught by ${slot.teacher}.`,
          category: 'timetable',
          categoryLabel: 'Timetable',
          targetScreen: 'timetable',
          badge: {
            text: slot.time,
            variant: 'blue',
          },
          metadata: {
            time: slot.time,
            teacher: slot.teacher,
            subject: slot.subject,
            period: slot.period,
            date: dayNames[dayKey],
          },
          keywords: [
            'timetable',
            'period',
            'class',
            'routine',
            'lecture',
            'schedule',
            dayKey.toLowerCase(),
            (dayNames[dayKey] || '').toLowerCase(),
            slot.subject.toLowerCase(),
            (slot.teacher || '').toLowerCase(),
          ],
          actionLabel: 'Open Timetable',
        });
      }
    });
  });

  // 5. Sports & Medals
  initialSportsEvents.forEach((ev) => {
    items.push({
      id: `sports-ev-${ev.id}`,
      title: ev.title,
      subtitle: `${ev.date} at ${ev.time} • Venue: ${ev.venue}`,
      description: `Official sports event scheduled at ${ev.venue}. Parent consent status: ${ev.parentConsentStatus.toUpperCase()}.`,
      category: 'sports',
      categoryLabel: 'Sports',
      targetScreen: 'sports',
      badge: {
        text: ev.iconType.toUpperCase(),
        variant: 'green',
      },
      metadata: {
        date: ev.date,
        time: ev.time,
        location: ev.venue,
        status: ev.parentConsentStatus,
      },
      keywords: [
        'sports',
        'game',
        'football',
        'tournament',
        'match',
        'athletics',
        ev.title.toLowerCase(),
        ev.venue.toLowerCase(),
        ev.iconType.toLowerCase(),
      ],
      actionLabel: 'View Sports Event',
    });
  });

  // Medals
  medalsList.forEach((med) => {
    items.push({
      id: `med-${med.id}`,
      title: `${med.event} - ${med.medalType?.toUpperCase()} MEDAL`,
      subtitle: `Awarded to ${med.recipient} • ${med.organization}`,
      description: `Medal achieved in ${med.event} on ${med.date} at ${med.organization}.`,
      category: 'certificates',
      categoryLabel: 'Awards & Medals',
      targetScreen: 'certificates',
      badge: {
        text: `${med.medalType?.toUpperCase()} MEDAL`,
        variant: med.medalType === 'gold' ? 'amber' : med.medalType === 'silver' ? 'slate' : 'red',
      },
      metadata: {
        date: med.date,
        subject: med.event,
      },
      keywords: [
        'medal',
        'gold',
        'silver',
        'bronze',
        'sports',
        'award',
        'achievement',
        med.recipient.toLowerCase(),
        med.event.toLowerCase(),
      ],
      actionLabel: 'View Medals & Awards',
    });
  });

  // Certificates
  certificatesList.forEach((cert) => {
    items.push({
      id: `cert-${cert.id}`,
      title: `${cert.title}: ${cert.event}`,
      subtitle: `Recipient: ${cert.recipient} • ${cert.organization}`,
      description: `Issued on ${cert.date} by ${cert.organization}. Verified official school achievement credential.`,
      category: 'certificates',
      categoryLabel: 'Certificates',
      targetScreen: 'certificates',
      badge: {
        text: 'Verified',
        variant: 'blue',
      },
      metadata: {
        date: cert.date,
        subject: cert.event,
      },
      keywords: [
        'certificate',
        'award',
        'achievement',
        'merit',
        cert.recipient.toLowerCase(),
        cert.event.toLowerCase(),
        cert.organization.toLowerCase(),
      ],
      actionLabel: 'View Certificate',
    });
  });

  // 6. Parent Teacher Meetings (PTM)
  initialPTMRecords.forEach((ptm) => {
    items.push({
      id: `ptm-${ptm.id}`,
      title: `Parent Teacher Meeting (${ptm.status === 'upcoming' ? 'UPCOMING' : 'PAST'})`,
      subtitle: `Date: ${ptm.date} • Time: ${ptm.time}`,
      description: `Host Teacher: ${ptm.teacher} at ${ptm.school}. Status: ${ptm.status.toUpperCase()}.`,
      category: 'ptm',
      categoryLabel: 'PTM',
      targetScreen: 'ptm',
      badge: {
        text: ptm.status.toUpperCase(),
        variant: ptm.status === 'upcoming' ? 'green' : ptm.status === 'attended' ? 'blue' : 'red',
      },
      metadata: {
        date: ptm.date,
        time: ptm.time,
        teacher: ptm.teacher,
        location: ptm.school,
        status: ptm.status,
      },
      keywords: [
        'ptm',
        'meeting',
        'parent',
        'conference',
        'discussion',
        ptm.teacher.toLowerCase(),
        ptm.status,
      ],
      actionLabel: 'View PTM Details',
    });
  });

  // 7. Student Profile & Records
  items.push({
    id: 'student-profile-main',
    title: `${initialStudent.name} - Student Record`,
    subtitle: `Class: ${initialStudent.class}-${initialStudent.section} • Roll No: ${initialStudent.rollNo} • Adm No: ${initialStudent.admissionNo}`,
    description: `Father: ${initialStudent.parentName} (${initialStudent.parentContact}). School: ${initialStudent.schoolName}. Academic Year: ${initialStudent.academicYear}.`,
    category: 'student',
    categoryLabel: 'Student Profile',
    targetScreen: 'student-details',
    badge: {
      text: `Roll #${initialStudent.rollNo}`,
      variant: 'purple',
    },
    metadata: {
      phone: initialStudent.parentContact,
      email: initialStudent.parentEmail,
      location: initialStudent.parentAddress,
    },
    keywords: [
      'student',
      'ajay',
      'verma',
      'profile',
      'roll number',
      'admission',
      'parent',
      'ashok',
      'phone',
      'address',
      '10th a',
    ],
    actionLabel: 'View Student Details',
  });

  // 8. Key Navigation & Portal Utilities
  const portalFeatures: {
    title: string;
    subtitle: string;
    description: string;
    screen: any;
    badge: string;
    keywords: string[];
  }[] = [
    {
      title: 'Real-Time Attendance Portal & Alerts',
      subtitle: '85% Current Attendance • Period-wise tracking & instant absence alert',
      description: 'Review monthly attendance calendar, day-by-day present/absent logs, and absence notification rules.',
      screen: 'attendance',
      badge: '85% Present',
      keywords: ['attendance', 'presence', 'absent', 'leave', 'present percentage', 'sms alert'],
    },
    {
      title: 'Student Behaviour & Progress Tracker',
      subtitle: '8.2 Monthly Score • Discipline, Participation & Respectfulness',
      description: 'Track monthly behavior trends, weekly score progression graph, teacher remarks, and category ratings.',
      screen: 'behaviour',
      badge: 'Score 8.2',
      keywords: ['behaviour', 'behavior', 'progress', 'trend', 'discipline', 'conduct', 'participation', 'monthly behavior', 'teacher note', 'score'],
    },
    {
      title: 'Academic Term Results & Marksheet Download',
      subtitle: 'Official PDF marksheets, grading breakdown, school seal',
      description: 'Download verified digital report cards and terminal examination certificates.',
      screen: 'results',
      badge: 'PDF Ready',
      keywords: ['result', 'download', 'pdf', 'marksheet', 'grades', 'score card'],
    },
    {
      title: 'School Academic Calendar & Holidays',
      subtitle: '2025-2026 Academic schedule, gazetted holidays & examination dates',
      description: 'Check vacation schedules, upcoming unit tests, sports day, and cultural festival dates.',
      screen: 'calendar',
      badge: 'Events',
      keywords: ['calendar', 'holidays', 'vacation', 'events', 'exam dates'],
    },
    {
      title: 'Faculty Direct Chat (Ms. Vidhya Mam)',
      subtitle: 'Direct messaging channel between parent and class teacher',
      description: 'Communicate directly with Class 10th-A faculty regarding doubts, progress or leave requests.',
      screen: 'chat',
      badge: 'Live Chat',
      keywords: ['chat', 'message', 'inbox', 'talk to teacher', 'vidhya'],
    },
  ];

  portalFeatures.forEach((feat, idx) => {
    items.push({
      id: `feature-${idx}`,
      title: feat.title,
      subtitle: feat.subtitle,
      description: feat.description,
      category: 'navigation',
      categoryLabel: 'Portal',
      targetScreen: feat.screen,
      badge: {
        text: feat.badge,
        variant: 'red',
      },
      keywords: ['app', 'screen', 'feature', ...feat.keywords],
      actionLabel: 'Navigate',
    });
  });

  return items;
}

// Global cached index
let cachedIndex: SearchResultItem[] | null = null;

export function getSearchIndex(): SearchResultItem[] {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }
  return cachedIndex;
}

// Search Query Algorithm
export function executeSearch(
  query: string,
  category: SearchCategory = 'all',
  limit: number = 30
): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  const index = getSearchIndex();

  if (!cleanQuery) {
    // If no query and category is specific, return category items
    if (category !== 'all') {
      return index.filter((item) => item.category === category).slice(0, limit);
    }
    return [];
  }

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  const scoredResults = index
    .filter((item) => {
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      return true;
    })
    .map((item) => {
      let score = 0;
      const lowerTitle = item.title.toLowerCase();
      const lowerSub = item.subtitle.toLowerCase();
      const lowerDesc = (item.description || '').toLowerCase();
      const lowerCat = item.categoryLabel.toLowerCase();

      // Exact title match (Highest)
      if (lowerTitle === cleanQuery) {
        score += 150;
      } else if (lowerTitle.startsWith(cleanQuery)) {
        score += 80;
      } else if (lowerTitle.includes(cleanQuery)) {
        score += 50;
      }

      // Check all query terms (e.g. "maths teacher", "hw science")
      let matchedTermsCount = 0;
      for (const term of queryTerms) {
        let termMatched = false;

        if (lowerTitle.includes(term)) {
          score += 30;
          termMatched = true;
        }
        if (lowerSub.includes(term)) {
          score += 18;
          termMatched = true;
        }
        if (lowerDesc.includes(term)) {
          score += 10;
          termMatched = true;
        }
        if (lowerCat.includes(term)) {
          score += 15;
          termMatched = true;
        }
        if (item.keywords.some((k) => k.includes(term))) {
          score += 20;
          termMatched = true;
        }

        if (termMatched) matchedTermsCount++;
      }

      // Boost if all multi-word terms matched
      if (matchedTermsCount === queryTerms.length) {
        score += 40;
      }

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return scoredResults.slice(0, limit);
}

// Category Counter helper
export function getCategoryCounts(query: string = ''): Record<SearchCategory, number> {
  const index = getSearchIndex();
  const counts: Record<SearchCategory, number> = {
    all: 0,
    academics: 0,
    homework: 0,
    teachers: 0,
    timetable: 0,
    sports: 0,
    certificates: 0,
    ptm: 0,
    student: 0,
    navigation: 0,
  };

  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    counts.all = index.length;
    index.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }

  // Count matches per category for current query
  index.forEach((item) => {
    const hay = `${item.title} ${item.subtitle} ${item.description || ''} ${item.keywords.join(' ')}`.toLowerCase();
    const isMatch = cleanQuery.split(/\s+/).every((term) => hay.includes(term));
    if (isMatch) {
      counts.all++;
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    }
  });

  return counts;
}
