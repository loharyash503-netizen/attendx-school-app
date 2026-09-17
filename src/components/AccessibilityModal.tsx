import React from 'react';
import {
  Eye,
  Type,
  Sparkles,
  Volume2,
  X,
  Keyboard,
  Check,
  Contrast,
  Sliders,
  Maximize,
  HelpCircle,
} from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onSpeakCurrentScreen: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onSpeakCurrentScreen,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 shadow-2xl max-w-lg w-full border border-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#FF3644] flex items-center justify-center shadow-neu-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 id="a11y-modal-title" className="text-lg font-extrabold text-slate-800">
                Accessibility Center
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Adjust display and assistive preferences for your device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close accessibility modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="py-4 space-y-5">
          {/* Text Size Scaling */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-[#FF3644]" />
              Text Size Scaling
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {[
                { id: 'normal', label: 'Default', sizeClass: 'text-xs' },
                { id: 'large', label: 'Large (115%)', sizeClass: 'text-sm' },
                { id: 'xlarge', label: 'Extra Large (125%)', sizeClass: 'text-base font-bold' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    onUpdateSettings({ fontSize: opt.id as AccessibilitySettings['fontSize'] })
                  }
                  className={`py-2.5 px-3 rounded-2xl border text-center transition-all ${
                    settings.fontSize === opt.id
                      ? 'bg-[#FF3644] text-white border-[#FF3644] shadow-neu-red font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
                  }`}
                >
                  <span className={opt.sizeClass}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                <Contrast className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">High Contrast Mode</h3>
                <p className="text-xs text-slate-500">Increases border definition and text contrast</p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              role="switch"
              aria-checked={settings.highContrast}
              aria-label="Toggle High Contrast Mode"
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.highContrast ? 'bg-[#FF3644]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Reduced Motion</h3>
                <p className="text-xs text-slate-500">Limits animations and pulsing indicators</p>
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              role="switch"
              aria-checked={settings.reducedMotion}
              aria-label="Toggle Reduced Motion"
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.reducedMotion ? 'bg-[#FF3644]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Speech Assistant / Screen Reader Helper */}
          <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FF3644] text-white flex items-center justify-center shadow-xs">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Read Screen Aloud</h3>
                <p className="text-xs text-slate-500">Audio narration of attendance, alerts, and stats</p>
              </div>
            </div>
            <button
              onClick={onSpeakCurrentScreen}
              className="px-3 py-1.5 rounded-xl bg-[#FF3644] text-white font-bold text-xs hover:bg-red-600 transition-colors shadow-xs active:scale-95"
            >
              Listen
            </button>
          </div>

          {/* Keyboard Shortcuts Cheatsheet */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
              <Keyboard className="w-4 h-4 text-slate-500" />
              <span>Keyboard Shortcuts for Fast Navigation:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + H</kbd> : Home</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + A</kbd> : Attendance</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + P</kbd> : Performance</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + T</kbd> : TimeTable</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + W</kbd> : Homework</div>
              <div><kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Alt + S</kbd> : A11y Center</div>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all active:scale-98"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
