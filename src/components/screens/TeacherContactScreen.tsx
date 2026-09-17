import React, { useState } from 'react';
import { teacherList } from '../../data/mockData';
import { Teacher } from '../../types';
import { MessageSquare, Clock, Mail, GraduationCap, Phone, Search, Bell } from 'lucide-react';

interface TeacherContactScreenProps {
  onStartChat: (teacher: Teacher) => void;
}

export const TeacherContactScreen: React.FC<TeacherContactScreenProps> = ({ onStartChat }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unseen'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = teacherList.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'unseen') {
      return matchesSearch && (t.unreadCount || 0) > 0;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-5 pb-28 px-4 sm:px-8 pt-2 sm:pt-4 w-full max-w-7xl mx-auto">
      {/* Header and Filter Pills matching Screen 26 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl shadow-neu-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              activeTab === 'all'
                ? 'bg-[#FF3644] text-white shadow-neu-red'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Teachers
          </button>
          <button
            onClick={() => setActiveTab('unseen')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === 'unseen'
                ? 'bg-[#FF3644] text-white shadow-neu-red'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Unseen Notes</span>
            <span className="w-4 h-4 rounded-full bg-red-100 text-[#FF3644] text-[10px] flex items-center justify-center font-black">
              2
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search faculty, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF3644]"
          />
        </div>
      </div>

      {/* Teachers List matching Screen 17 & 26 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-[26px] p-5 shadow-neu-sm border border-slate-100 space-y-3 hover:shadow-neu transition-all flex flex-col justify-between"
          >
            {/* Top row: Avatar + Name + Chat Button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm border-2 border-red-100"
                  />
                  {(teacher.unreadCount || 0) > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3644] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {teacher.unreadCount}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 tracking-tight">
                    {teacher.name}
                  </h4>
                  <p className="text-[11px] text-[#FF3644] font-semibold">
                    {teacher.role}
                  </p>
                </div>
              </div>

              {/* Chat action button matching Screenshot 17 */}
              <button
                onClick={() => onStartChat(teacher)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-red-50 text-[#FF3644] hover:bg-[#FF3644] hover:text-white transition-all text-xs font-black shadow-neu-sm active:scale-95 border border-red-200"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>

            {/* Badges row: Subject + Available Time matching Screen 17 */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="font-bold text-slate-700">{teacher.subject}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end text-slate-500">
                <Clock className="w-3 h-3 text-[#FF3644]" />
                <span className="truncate">{teacher.availableTime}</span>
              </div>
            </div>

            {/* Details row: Email + Classes */}
            <div className="bg-slate-50/70 p-2.5 rounded-xl text-[10px] space-y-1 text-slate-500 shadow-neu-inset-sm">
              <p className="flex items-center gap-1.5 truncate">
                <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span>Email: <strong className="text-slate-700">{teacher.email}</strong></span>
              </p>
              <p className="flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span>Classes: <strong className="text-slate-700">{teacher.classes}</strong></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
