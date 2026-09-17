import React from 'react';
import { X, Bell, AlertTriangle, BookOpen, Calendar, CheckCircle2, Phone, MessageSquare, Plus } from 'lucide-react';
import { RealtimeAlert } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: RealtimeAlert[];
  onMarkAllRead: () => void;
  onSimulateAbsence: () => void;
  onCallTeacher: () => void;
  onChatTeacher: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkAllRead,
  onSimulateAbsence,
  onCallTeacher,
  onChatTeacher,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#F1F3F6] rounded-[28px] w-full max-w-sm p-5 shadow-neu border border-white/80 max-h-[85vh] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#FF3644]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Real-Time Alerts</h3>
              <p className="text-[11px] text-slate-500">Live Parent-Teacher Notification Stream</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-neu-sm transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time simulation bar */}
        <div className="mt-3 p-3 bg-red-50/80 border border-red-200/80 rounded-2xl shadow-neu-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF3644]">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Instant Absence Detection</span>
            </div>
            <button
              onClick={onSimulateAbsence}
              className="text-[11px] font-bold bg-[#FF3644] text-white px-2.5 py-1 rounded-full shadow-neu-red hover:bg-red-600 transition-all flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Trigger Alert
            </button>
          </div>
          <p className="text-[10px] text-slate-600 mt-1 leading-tight">
            Simulates a teacher marking Ajay absent in class, sending an instant SMS & App notification to parent.
          </p>
        </div>

        {/* Alerts list */}
        <div className="flex-1 overflow-y-auto space-y-3 my-3 pr-1">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
              <p className="text-sm font-medium">No alerts at the moment</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const isAbsence = alert.type === 'absence_alert';
              return (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-2xl transition-all ${
                    isAbsence
                      ? 'bg-white border-2 border-red-400 shadow-neu'
                      : 'bg-white shadow-neu-sm border border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {isAbsence ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <h4
                        className={`text-xs font-bold ${
                          isAbsence ? 'text-[#FF3644]' : 'text-slate-800'
                        }`}
                      >
                        {alert.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{alert.time}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>

                  {/* Actions for Absence alert */}
                  {isAbsence && (
                    <div className="mt-2.5 pt-2 border-t border-red-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onChatTeacher();
                          onClose();
                        }}
                        className="flex-1 py-1.5 px-2 bg-[#FF3644] text-white text-[11px] font-bold rounded-xl shadow-neu-red flex items-center justify-center gap-1 hover:bg-red-600 transition-all"
                      >
                        <MessageSquare className="w-3 h-3" /> Chat Teacher
                      </button>
                      <button
                        onClick={onCallTeacher}
                        className="py-1.5 px-3 bg-white text-slate-700 text-[11px] font-semibold rounded-xl shadow-neu-sm border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-all"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" /> Call School
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
          <button
            onClick={onMarkAllRead}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#FF3644] hover:underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
