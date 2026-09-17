import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  ChevronDown,
  Book,
  Presentation,
  ListChecks,
  Heart,
  Award,
  Sparkles,
} from 'lucide-react';

interface MonthlyData {
  month: string;
  score: number;
  note: string;
  weeklyPoints: { week: string; value: number; color: string }[];
  categories: {
    id: string;
    name: string;
    score: number;
    max: number;
    color: string;
    icon: 'book' | 'participate' | 'homework' | 'heart';
  }[];
}

const MONTH_DATA: Record<string, MonthlyData> = {
  'JAN 2026': {
    month: 'JAN 2026',
    score: 8.2,
    note: '"Ajay has shown excellent growth in behaviour this month. He is actively participating and interacting positively with classmate".',
    weeklyPoints: [
      { week: '1st WEEK', value: 6.6, color: '#FF3644' },
      { week: '2nd WEEK', value: 7.3, color: '#F97316' },
      { week: '3rd WEEK', value: 7.9, color: '#EAB308' },
      { week: '4th WEEK', value: 8.7, color: '#22C55E' },
    ],
    categories: [
      {
        id: 'discipline',
        name: 'DISCIPLINE',
        score: 6.8,
        max: 10,
        color: 'bg-[#84CC16]', // Lime / yellow-green
        icon: 'book',
      },
      {
        id: 'participate',
        name: 'CLASS PARTICIPATE',
        score: 8.5,
        max: 10,
        color: 'bg-[#22C55E]', // Bright green
        icon: 'participate',
      },
      {
        id: 'homework',
        name: 'HOMEWORK DEADLINE',
        score: 5.8,
        max: 10,
        color: 'bg-[#D97706]', // Warm amber/orange
        icon: 'homework',
      },
      {
        id: 'respect',
        name: 'RESPECTFULNESS',
        score: 9.7,
        max: 10,
        color: 'bg-[#16A34A]', // Rich vibrant green
        icon: 'heart',
      },
    ],
  },
  'DEC 2025': {
    month: 'DEC 2025',
    score: 7.6,
    note: '"Good discipline overall during semester reviews. Needs slight punctuality improvements during morning assembly."',
    weeklyPoints: [
      { week: '1st WEEK', value: 7.0, color: '#FF3644' },
      { week: '2nd WEEK', value: 7.2, color: '#F97316' },
      { week: '3rd WEEK', value: 7.5, color: '#EAB308' },
      { week: '4th WEEK', value: 7.9, color: '#22C55E' },
    ],
    categories: [
      {
        id: 'discipline',
        name: 'DISCIPLINE',
        score: 7.2,
        max: 10,
        color: 'bg-[#84CC16]',
        icon: 'book',
      },
      {
        id: 'participate',
        name: 'CLASS PARTICIPATE',
        score: 7.8,
        max: 10,
        color: 'bg-[#22C55E]',
        icon: 'participate',
      },
      {
        id: 'homework',
        name: 'HOMEWORK DEADLINE',
        score: 6.5,
        max: 10,
        color: 'bg-[#D97706]',
        icon: 'homework',
      },
      {
        id: 'respect',
        name: 'RESPECTFULNESS',
        score: 9.2,
        max: 10,
        color: 'bg-[#16A34A]',
        icon: 'heart',
      },
    ],
  },
  'FEB 2026': {
    month: 'FEB 2026',
    score: 8.8,
    note: '"Outstanding leadership shown during inter-house events and laboratory team projects. Exemplary attitude."',
    weeklyPoints: [
      { week: '1st WEEK', value: 8.0, color: '#FF3644' },
      { week: '2nd WEEK', value: 8.4, color: '#F97316' },
      { week: '3rd WEEK', value: 8.9, color: '#EAB308' },
      { week: '4th WEEK', value: 9.2, color: '#22C55E' },
    ],
    categories: [
      {
        id: 'discipline',
        name: 'DISCIPLINE',
        score: 8.2,
        max: 10,
        color: 'bg-[#84CC16]',
        icon: 'book',
      },
      {
        id: 'participate',
        name: 'CLASS PARTICIPATE',
        score: 9.2,
        max: 10,
        color: 'bg-[#22C55E]',
        icon: 'participate',
      },
      {
        id: 'homework',
        name: 'HOMEWORK DEADLINE',
        score: 8.0,
        max: 10,
        color: 'bg-[#D97706]',
        icon: 'homework',
      },
      {
        id: 'respect',
        name: 'RESPECTFULNESS',
        score: 9.9,
        max: 10,
        color: 'bg-[#16A34A]',
        icon: 'heart',
      },
    ],
  },
};

const MONTH_OPTIONS = ['JAN 2026', 'DEC 2025', 'FEB 2026'];

export const BehaviourScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('JAN 2026');
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const data = MONTH_DATA[selectedMonth] || MONTH_DATA['JAN 2026'];

  // SVG Chart calculation parameters
  // Width 340, Height 140
  // Y-axis: 0 to 10 (top is 15px, bottom is 120px, height = 105px)
  // X values for 4 weeks: 45, 125, 205, 285
  const chartW = 340;
  const chartH = 140;
  const paddingLeft = 36;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 22;

  const getX = (index: number) => {
    const availableW = chartW - paddingLeft - paddingRight;
    return paddingLeft + (index / 3) * availableW;
  };

  const getY = (val: number) => {
    const availableH = chartH - paddingTop - paddingBottom;
    // 0 is bottom, 10 is top
    return paddingTop + (1 - Math.min(10, Math.max(0, val)) / 10) * availableH;
  };

  const p0 = { x: getX(0), y: getY(data.weeklyPoints[0].value) };
  const p1 = { x: getX(1), y: getY(data.weeklyPoints[1].value) };
  const p2 = { x: getX(2), y: getY(data.weeklyPoints[2].value) };
  const p3 = { x: getX(3), y: getY(data.weeklyPoints[3].value) };

  const pathD = `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`;
  const baselineY = chartH - paddingBottom;
  const areaD = `M ${p0.x} ${baselineY} L ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p3.x} ${baselineY} Z`;

  // Circular gauge for score: circumference = 2 * PI * r = 2 * 3.14159 * 26 ≈ 163.36
  const gaugeR = 26;
  const gaugeCircumference = 2 * Math.PI * gaugeR;
  const scorePercent = (data.score / 10);
  const strokeDashoffset = gaugeCircumference * (1 - scorePercent);

  const renderCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'book':
        return <Book className="w-5 h-5 text-[#FF3644] stroke-[2.2]" />;
      case 'participate':
        return <Presentation className="w-5 h-5 text-[#FF3644] stroke-[2.2]" />;
      case 'homework':
        return <ListChecks className="w-5 h-5 text-[#FF3644] stroke-[2.2]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-[#FF3644] fill-[#FF3644] stroke-[1]" />;
      default:
        return <Award className="w-5 h-5 text-[#FF3644]" />;
    }
  };

  return (
    <div className="pb-32 px-4 sm:px-6 pt-3 sm:pt-4 max-w-md sm:max-w-lg mx-auto space-y-4 animate-fadeIn">
      {/* Behaviour Trend Section matching iPhone 14 & 15 Pro - 25.png */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          Behaviour trend
        </h3>

        {/* Outer Card */}
        <div className="bg-white rounded-[26px] p-4 sm:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06),-2px_-2px_8px_rgba(255,255,255,0.95)] border border-slate-200/70 space-y-4">
          {/* Inner Chart Container with Inset Appearance */}
          <div className="bg-[#F8FAFC] rounded-[22px] p-3.5 sm:p-4 border border-slate-200/80 shadow-inner">
            {/* Header: Monthly Behavior + Month Dropdown */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#FF3644] text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-700">
                  Monthly Behavior
                </h4>
              </div>

              {/* Month Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-black rounded-lg border border-slate-200/90 shadow-xs transition-all active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FF3644]" />
                  <span>{selectedMonth}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isMonthPickerOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 min-w-[120px] animate-fadeIn">
                    {MONTH_OPTIONS.map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedMonth(m);
                          setIsMonthPickerOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors ${
                          selectedMonth === m
                            ? 'bg-red-50 text-[#FF3644]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Area Line Chart */}
            <div className="w-full relative mt-2 select-none">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Linear Gradient for Chart Area */}
                  <linearGradient id="behAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF3644" stopOpacity="0.55" />
                    <stop offset="40%" stopColor="#FF6B78" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#FFE4E6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines & Y-Axis Labels: 10, 8, 6, 4, 2, 0 */}
                {[10, 8, 6, 4, 2, 0].map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val}>
                      <text
                        x="24"
                        y={y + 3}
                        fontSize="8"
                        fontWeight="bold"
                        fill="#94A3B8"
                        textAnchor="end"
                      >
                        {val}
                      </text>
                      <line
                        x1="32"
                        y1={y}
                        x2={chartW - paddingRight}
                        y2={y}
                        stroke="#E2E8F0"
                        strokeWidth="0.8"
                      />
                    </g>
                  );
                })}

                {/* Vertical Dashed Lines dropping from each week to baseline */}
                {[p0, p1, p2, p3].map((pt, i) => (
                  <line
                    key={i}
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={baselineY}
                    stroke="#94A3B8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Red Area Fill */}
                <path d={areaD} fill="url(#behAreaGrad)" />

                {/* Spline Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FF3644"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Colored Data Points on Line matching image: 1st red, 2nd orange, 3rd yellow, 4th green */}
                {data.weeklyPoints.map((pt, i) => {
                  const coord = [p0, p1, p2, p3][i];
                  return (
                    <g key={i}>
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="3.8"
                        fill={pt.color}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}

                {/* X-Axis Labels: 1st WEEK, 2nd WEEK, 3rd WEEK, 4th WEEK */}
                {data.weeklyPoints.map((pt, i) => {
                  const coord = [p0, p1, p2, p3][i];
                  return (
                    <text
                      key={i}
                      x={coord.x}
                      y={chartH - 4}
                      fontSize="8"
                      fontWeight="bold"
                      fill="#64748B"
                      textAnchor="middle"
                    >
                      {pt.week}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Bottom Row: SCORE + TEACHER NOTE */}
          <div className="grid grid-cols-12 gap-3 pt-1">
            {/* Left Card: SCORE */}
            <div className="col-span-4 bg-[#F8FAFC] rounded-2xl p-3 border border-slate-200/70 shadow-inner flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                SCORE
              </span>

              {/* Circular Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  {/* Background Track */}
                  <circle
                    cx="32"
                    cy="32"
                    r={gaugeR}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="5.5"
                  />
                  {/* Animated Score Arc */}
                  <circle
                    cx="32"
                    cy="32"
                    r={gaugeR}
                    fill="none"
                    stroke="#FF3644"
                    strokeWidth="5.5"
                    strokeDasharray={gaugeCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-black text-slate-800 tracking-tight">
                    {data.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card: TEACHER NOTE */}
            <div className="col-span-8 bg-[#F8FAFC] rounded-2xl p-3.5 border border-slate-200/70 shadow-inner flex flex-col justify-start">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                TEACHER NOTE
              </span>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                {data.note}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Behaviour Categories Section matching iPhone 14 & 15 Pro - 25.png */}
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-500 px-1">
          Behaviour categories
        </h3>

        {/* Categories Card */}
        <div className="bg-white rounded-[26px] p-4 sm:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06),-2px_-2px_8px_rgba(255,255,255,0.95)] border border-slate-200/70 space-y-4">
          {data.categories.map((cat) => {
            const percent = (cat.score / cat.max) * 100;

            return (
              <div key={cat.id} className="flex items-center gap-3">
                {/* Left Inset Square Icon Box */}
                <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-slate-200/80 shadow-inner flex items-center justify-center shrink-0">
                  {renderCategoryIcon(cat.icon)}
                </div>

                {/* Middle: Title & Progress Bar */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="text-xs font-black text-slate-700 tracking-wide block">
                    {cat.name}
                  </span>

                  {/* Progress Track */}
                  <div className="h-3 sm:h-3.5 bg-slate-200/70 rounded-full overflow-hidden shadow-inner p-0.5">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full rounded-full transition-all duration-700 shadow-xs ${cat.color}`}
                    />
                  </div>
                </div>

                {/* Right: Score X.X/10 in Red */}
                <div className="shrink-0 text-right pl-1">
                  <span className="text-xs sm:text-sm font-black text-[#FF3644] tracking-tight">
                    {cat.score}/{cat.max}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
