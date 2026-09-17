import React, { useState } from 'react';
import { TrendingDown, TrendingUp, ChevronRight, X, BarChart2, Award, CheckCircle2 } from 'lucide-react';

interface UnitTestScore {
  name: string;
  code: string;
  color: string;
  scores: [number, number, number, number]; // UT1, UT2, UT3, UT4
  maxScore: number;
}

export const PerformanceScreen: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedTestIndex, setSelectedTestIndex] = useState<number | null>(null);
  const [showDashboardModal, setShowDashboardModal] = useState<boolean>(false);

  // 6 Main Subjects from the reference design
  const subjects = [
    { code: 'ENG', name: 'ENG', score: 84, color: '#10B981' },
    { code: 'GUJ', name: 'GUJ', score: 68, color: '#F59E0B' },
    { code: 'MATHS', name: 'MATHS', score: 51, color: '#EF4444' },
    { code: 'HINDI', name: 'HINDI', score: 71, color: '#EAB308' },
    { code: 'SCI', name: 'SCIENCE', score: 92, color: '#06B6D4' },
    { code: 'S.S', name: 'S.S', score: 90, color: '#3B82F6' },
  ];

  // Subjects for the Unit Test Score Dashboard
  const unitTestSubjects: UnitTestScore[] = [
    { name: 'Maths', code: 'MATHS', color: '#EF4444', scores: [19, 20, 22, 27], maxScore: 30 },
    { name: 'English', code: 'ENG', color: '#F59E0B', scores: [22, 24, 25, 26], maxScore: 30 },
    { name: 'Sci', code: 'SCI', color: '#EAB308', scores: [25, 26, 28, 29], maxScore: 30 },
    { name: 'Hindi', code: 'HINDI', color: '#10B981', scores: [18, 20, 21, 23], maxScore: 30 },
    { name: 'S.S', code: 'S.S', color: '#3B82F6', scores: [24, 25, 27, 28], maxScore: 30 },
  ];

  // Y-axis ticks for Performance Bar (100 down to 10)
  const yTicksPerformance = [
    { value: 100, y: 20 },
    { value: 90, y: 35 },
    { value: 80, y: 50 },
    { value: 70, y: 65 },
    { value: 60, y: 80 },
    { value: 50, y: 95 },
    { value: 40, y: 110 },
    { value: 30, y: 125 },
    { value: 20, y: 140 },
    { value: 10, y: 155 },
  ];

  // Subject Score Unit Tests Y-axis ticks (30 down to 0)
  const yTicksUnitTests = [
    { value: 30, y: 14 },
    { value: 25, y: 31 },
    { value: 20, y: 48 },
    { value: 15, y: 65 },
    { value: 10, y: 82 },
    { value: 5, y: 99 },
    { value: 0, y: 116 },
  ];

  const unitTestCols = [
    { name: 'Unit Test-1', x: 62, index: 0 },
    { name: 'Unit Test-2', x: 142, index: 1 },
    { name: 'Unit Test-3', x: 222, index: 2 },
    { name: 'Unit Test-4', x: 302, index: 3 },
  ];

  // Curve 1 (upper trend): 19, 20, 22, 27
  const upperPoints = [
    { x: 62, y: 116 - 19 * 3.4, val: 19 },
    { x: 142, y: 116 - 20 * 3.4, val: 20 },
    { x: 222, y: 116 - 22 * 3.4, val: 22 },
    { x: 302, y: 116 - 27 * 3.4, val: 27 },
  ];

  // Curve 2 (lower trend): 12, 11, 13, 17
  const lowerPoints = [
    { x: 62, y: 116 - 12 * 3.4, val: 12 },
    { x: 142, y: 116 - 11 * 3.4, val: 11 },
    { x: 222, y: 116 - 13 * 3.4, val: 13 },
    { x: 302, y: 116 - 17 * 3.4, val: 17 },
  ];

  // Get score for selected subject in current unit test
  const activeSubjectData = unitTestSubjects.find((s) => s.name === selectedSubject);

  return (
    <div className="space-y-4 pb-28 px-3.5 sm:px-6 pt-3 sm:pt-4 w-full max-w-md sm:max-w-xl md:max-w-2xl mx-auto select-none">
      {/* Section 1: Performance Report */}
      <div>
        <h2 className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide mb-2 px-1">
          Performance Report
        </h2>

        {/* 1st Card: Bar Chart & 1st Term Exam Report */}
        <div className="bg-white rounded-[26px] sm:rounded-[28px] p-3 sm:p-4 shadow-neu border border-white/80 space-y-4">
          {/* Top Bar Chart Container with Inset Claymorphic Style */}
          <div className="bg-[#FAFAFA] rounded-2xl p-2 sm:p-3 border border-slate-200/80 shadow-inner">
            <div className="w-full">
              <svg
                viewBox="0 0 340 195"
                className="w-full h-auto overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glossy Coral-to-Ruby Gradient matching reference image */}
                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6875" />
                    <stop offset="35%" stopColor="#FF3848" />
                    <stop offset="100%" stopColor="#BA1C2B" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {yTicksPerformance.map((tick) => (
                  <line
                    key={tick.value}
                    x1="26"
                    y1={tick.y}
                    x2="335"
                    y2={tick.y}
                    stroke="#E2E8F0"
                    strokeWidth="0.8"
                  />
                ))}

                {/* Baseline at 0 (15px below 10) */}
                <line x1="26" y1="170" x2="335" y2="170" stroke="#E2E8F0" strokeWidth="1" />

                {/* Vertical Separator Line between Y-axis numbers and grid */}
                <line x1="26" y1="20" x2="26" y2="170" stroke="#E2E8F0" strokeWidth="1" />

                {/* Y-Axis Numbers (100 down to 10) - centered to line */}
                {yTicksPerformance.map((tick) => (
                  <text
                    key={tick.value}
                    x="21"
                    y={tick.y}
                    textAnchor="end"
                    dominantBaseline="central"
                    fill="#94A3B8"
                    style={{ fontSize: '8.5px', fontWeight: 700 }}
                  >
                    {tick.value}
                  </text>
                ))}

                {/* 6 Vertical Bars */}
                {subjects.map((sub, idx) => {
                  const slotWidth = 309 / 6;
                  const centerX = 26 + slotWidth * idx + slotWidth / 2;
                  const barWidth = 26;
                  const barX = centerX - barWidth / 2;

                  const barHeight = sub.score * 1.5;
                  const barTopY = 170 - barHeight;

                  return (
                    <g key={sub.code} className="transition-all duration-300">
                      {/* Score Number above the bar with matching color */}
                      <text
                        x={centerX}
                        y={barTopY - 7}
                        textAnchor="middle"
                        dominantBaseline="auto"
                        fill={sub.color}
                        style={{ fontSize: '10px', fontWeight: 900 }}
                      >
                        {sub.score}
                      </text>

                      {/* Small Downward Caret pointing at the top of the bar */}
                      <polygon
                        points={`${centerX - 3.5},${barTopY - 4.5} ${centerX + 3.5},${barTopY - 4.5} ${centerX},${barTopY - 1.5}`}
                        fill={sub.color}
                      />

                      {/* Coral Red Gradient Bar */}
                      <rect
                        x={barX}
                        y={barTopY}
                        width={barWidth}
                        height={barHeight}
                        rx="2"
                        fill="url(#barGradient)"
                        className="filter drop-shadow-xs"
                      />

                      {/* Bottom Legend: Dot + Code */}
                      <circle cx={centerX - 10} cy="184" r="2.5" fill={sub.color} />
                      <text
                        x={centerX - 5}
                        y="184"
                        dominantBaseline="central"
                        fill="#475569"
                        style={{ fontSize: '8.5px', fontWeight: 800 }}
                      >
                        {sub.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Bottom Breakdown: 1ST TERM EXAMINATION REPORT */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-black tracking-wider text-slate-600 uppercase mb-2 px-0.5">
              1ST TERM EXAMINATION REPORT
            </h3>

            <div className="flex flex-row items-stretch justify-between gap-3">
              {/* Left Column: Exact Subject Marks & Percentage */}
              <div className="flex-1 flex flex-col justify-between space-y-1.5">
                <div className="space-y-1.5 text-[11px] sm:text-xs font-bold text-slate-700">
                  {subjects.map((sub) => (
                    <div key={sub.code} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: sub.color }}
                        />
                        <span className="text-slate-600 font-extrabold">{sub.name}</span>
                      </span>
                      <span className="text-slate-800 font-extrabold tracking-tight">
                        : {sub.score} / 100
                      </span>
                    </div>
                  ))}
                </div>

                {/* Percentage Button Badge */}
                <div className="pt-2">
                  <div className="py-1.5 px-3 bg-red-50/90 border border-red-200/70 rounded-xl text-center shadow-neu-sm">
                    <span className="text-[10px] sm:text-[11px] font-black text-[#FF3644] tracking-wide">
                      PERCENTAGE : 73%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Inset Box with STRONG AREAS & WEAK AREAS */}
              <div className="w-[145px] sm:w-[165px] bg-[#F1F3F5] rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 shadow-inner flex justify-between">
                {/* Strong Areas */}
                <div className="flex-1 text-center pr-1 border-r border-slate-200/70">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-700 leading-tight">STRONG</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-black text-slate-700 leading-tight">AREAS</span>
                      <TrendingUp className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="space-y-1 pt-2.5 text-[10px] sm:text-[11px] font-extrabold text-slate-600">
                    <p>ENG</p>
                    <p>HINDI</p>
                    <p>SCI</p>
                    <p>S.S</p>
                  </div>
                </div>

                {/* Weak Areas */}
                <div className="flex-1 text-center pl-1">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-slate-700 leading-tight">WEAK</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-black text-slate-700 leading-tight">AREAS</span>
                      <TrendingDown className="w-3 h-3 text-[#FF3644] stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="space-y-1 pt-2.5 text-[10px] sm:text-[11px] font-extrabold text-slate-600">
                    <p>MATHS</p>
                    <p>GUJ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Subjects Score - Interactive Dashboard Button Feel */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide">
              Subjects Score
            </h2>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-100/70 text-[#FF3644] border border-red-200/60">
              Interactive
            </span>
          </div>

          {/* Direct Dashboard Button Trigger */}
          <button
            onClick={() => setShowDashboardModal(true)}
            className="flex items-center gap-1.5 py-1 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#FF3644] text-[10px] sm:text-[11px] font-black rounded-xl shadow-neu-sm border border-slate-200/80 active:scale-95 transition-all cursor-pointer group"
            aria-label="Open Full Score Dashboard"
          >
            <span>Scorecard</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 2nd Card: Unit Tests Trend Line Chart with Interactive Button Touch & Affordances */}
        <div className="bg-white rounded-[26px] sm:rounded-[28px] p-3.5 sm:p-4 shadow-neu border border-white/80 space-y-3 relative overflow-hidden transition-all duration-200">
          {/* Top Subject Selector Buttons with Tactile Claymorphic Pill Feel */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap px-0.5">
            {/* 'ALL' Toggle Button */}
            <button
              onClick={() => setSelectedSubject('ALL')}
              className={`py-1 px-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-95 ${
                selectedSubject === 'ALL'
                  ? 'bg-slate-800 text-white shadow-neu-sm ring-2 ring-slate-800/20'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 shadow-neu-sm border border-slate-200/70'
              }`}
            >
              All
            </button>

            {/* Individual Subject Buttons */}
            {unitTestSubjects.map((sub) => {
              const isSelected = selectedSubject === sub.name;
              return (
                <button
                  key={sub.name}
                  onClick={() => setSelectedSubject(isSelected ? 'ALL' : sub.name)}
                  className={`py-1 px-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-neu ring-2 ring-[#FF3644] border-transparent font-black'
                      : 'bg-slate-50/90 hover:bg-slate-100 text-slate-600 shadow-neu-sm border border-slate-200/70'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0 transition-transform"
                    style={{ backgroundColor: sub.color }}
                  />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Line Chart Inset Container - Clickable Chart Area */}
          <div
            onClick={() => setShowDashboardModal(true)}
            className="bg-[#FAFAFA] rounded-2xl p-2 sm:p-3 border border-slate-200/80 shadow-inner cursor-pointer hover:border-red-200 transition-colors group relative"
            title="Click to view detailed score breakdown"
          >
            {/* Floating indicator tag that subtly hints interactivity */}
            <div className="absolute top-2 right-2 opacity-75 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[9px] font-bold text-slate-400 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-xs pointer-events-none">
              <BarChart2 className="w-2.5 h-2.5 text-[#FF3644]" />
              <span>Tap to inspect</span>
            </div>

            <div className="w-full">
              <svg
                viewBox="0 0 340 145"
                className="w-full h-auto overflow-visible"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Horizontal Grid lines */}
                {yTicksUnitTests.map((tick) => (
                  <line
                    key={tick.value}
                    x1="22"
                    y1={tick.y}
                    x2="335"
                    y2={tick.y}
                    stroke="#E2E8F0"
                    strokeWidth="0.8"
                  />
                ))}

                {/* Vertical Separator Line between Y-axis numbers and grid */}
                <line x1="22" y1="14" x2="22" y2="116" stroke="#E2E8F0" strokeWidth="1" />

                {/* Y-axis numbers (30, 25, 20, 15, 10, 5, 0) - centered to line */}
                {yTicksUnitTests.map((tick) => (
                  <text
                    key={tick.value}
                    x="17"
                    y={tick.y}
                    textAnchor="end"
                    dominantBaseline="central"
                    fill="#94A3B8"
                    style={{ fontSize: '8.5px', fontWeight: 700 }}
                  >
                    {tick.value}
                  </text>
                ))}

                {/* Vertical Dashed Lines for each Unit Test */}
                {unitTestCols.map((col) => {
                  const isSelectedCol = selectedTestIndex === col.index;
                  return (
                    <g key={col.name}>
                      <line
                        x1={col.x}
                        y1="14"
                        x2={col.x}
                        y2="116"
                        stroke={isSelectedCol ? '#FF3644' : '#94A3B8'}
                        strokeWidth={isSelectedCol ? '1.8' : '1.2'}
                        strokeDasharray="3 3"
                      />
                    </g>
                  );
                })}

                {/* Top Curve (Upper trend line) */}
                <path
                  d={`M ${upperPoints[0].x},${upperPoints[0].y} C ${upperPoints[0].x + 40},${upperPoints[0].y} ${upperPoints[1].x - 40},${upperPoints[1].y} ${upperPoints[1].x},${upperPoints[1].y} C ${upperPoints[1].x + 40},${upperPoints[1].y} ${upperPoints[2].x - 40},${upperPoints[2].y} ${upperPoints[2].x},${upperPoints[2].y} C ${upperPoints[2].x + 40},${upperPoints[2].y} ${upperPoints[3].x - 40},${upperPoints[3].y} ${upperPoints[3].x},${upperPoints[3].y}`}
                  fill="none"
                  stroke="#FF3644"
                  strokeWidth="1.6"
                  strokeDasharray="3 3"
                  className={selectedSubject !== 'ALL' && selectedSubject !== 'Maths' ? 'opacity-40' : 'opacity-100'}
                />

                {/* Lower Curve (Lower trend line) */}
                <path
                  d={`M ${lowerPoints[0].x},${lowerPoints[0].y} C ${lowerPoints[0].x + 40},${lowerPoints[0].y} ${lowerPoints[1].x - 40},${lowerPoints[1].y} ${lowerPoints[1].x},${lowerPoints[1].y} C ${lowerPoints[1].x + 40},${lowerPoints[1].y} ${lowerPoints[2].x - 40},${lowerPoints[2].y} ${lowerPoints[2].x},${lowerPoints[2].y} C ${lowerPoints[2].x + 40},${lowerPoints[2].y} ${lowerPoints[3].x - 40},${lowerPoints[3].y} ${lowerPoints[3].x},${lowerPoints[3].y}`}
                  fill="none"
                  stroke="#FF3644"
                  strokeWidth="1.6"
                  strokeDasharray="3 3"
                  className={selectedSubject !== 'ALL' && selectedSubject !== 'Maths' ? 'opacity-40' : 'opacity-100'}
                />

                {/* Upper Curve Red Diamond Data Points */}
                {upperPoints.map((pt, i) => (
                  <g key={`upper-${i}`}>
                    <polygon
                      points={`${pt.x},${pt.y - 3.5} ${pt.x + 3.5},${pt.y} ${pt.x},${pt.y + 3.5} ${pt.x - 3.5},${pt.y}`}
                      fill="#FF3644"
                      className="cursor-pointer hover:scale-125 transition-transform"
                    />
                  </g>
                ))}

                {/* Lower Curve Red Diamond Data Points */}
                {lowerPoints.map((pt, i) => (
                  <g key={`lower-${i}`}>
                    <polygon
                      points={`${pt.x},${pt.y - 3.5} ${pt.x + 3.5},${pt.y} ${pt.x},${pt.y + 3.5} ${pt.x - 3.5},${pt.y}`}
                      fill="#FF3644"
                      className="cursor-pointer hover:scale-125 transition-transform"
                    />
                  </g>
                ))}

                {/* X-axis Unit Test Labels in Red Bold Font with button indicator */}
                {unitTestCols.map((col) => (
                  <text
                    key={col.name}
                    x={col.x}
                    y="132"
                    textAnchor="middle"
                    fill="#FF3644"
                    style={{ fontSize: '9px', fontWeight: 800 }}
                    className="cursor-pointer hover:opacity-80"
                  >
                    {col.name}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Action Button: VIEW FULL DASHBOARD */}
          <button
            onClick={() => setShowDashboardModal(true)}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-red-50/80 active:bg-red-100/90 text-[#FF3644] text-xs font-black rounded-xl shadow-neu-sm border border-slate-200/80 hover:border-red-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 stroke-[2.2]" />
            <span>VIEW DETAILED SCORE DASHBOARD</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Interactive Modal: Detailed Subjects Score Dashboard */}
      {showDashboardModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-white rounded-t-[32px] sm:rounded-[30px] w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto space-y-4 animate-slideUp"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-red-50 flex items-center justify-center text-[#FF3644]">
                  <Award className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800 leading-tight">
                    Subjects Score Dashboard
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    Class 10th A &bull; Ajay Verma &bull; All Unit Tests
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDashboardModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Summary Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-[#FAFAFA] rounded-xl border border-slate-200/70 text-center shadow-inner">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Avg Score</span>
                <p className="text-sm font-black text-slate-800">24.1 / 30</p>
              </div>
              <div className="p-2.5 bg-[#FAFAFA] rounded-xl border border-slate-200/70 text-center shadow-inner">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Class Rank</span>
                <p className="text-sm font-black text-emerald-600">4th of 48</p>
              </div>
            </div>

            {/* Comprehensive Unit Test Breakdown Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wider text-slate-500 uppercase px-1">
                Score By Subject &amp; Test (Out of 30)
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-neu-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Subject</th>
                      <th className="py-2.5 px-2 text-center">UT-1</th>
                      <th className="py-2.5 px-2 text-center">UT-2</th>
                      <th className="py-2.5 px-2 text-center">UT-3</th>
                      <th className="py-2.5 px-2 text-center">UT-4</th>
                      <th className="py-2.5 px-3 text-right">Avg %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {unitTestSubjects.map((sub) => {
                      const total = sub.scores.reduce((a, b) => a + b, 0);
                      const pct = Math.round((total / (sub.maxScore * 4)) * 100);
                      return (
                        <tr key={sub.code} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2 px-3 font-extrabold text-slate-700 flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: sub.color }}
                            />
                            {sub.name}
                          </td>
                          <td className="py-2 px-2 text-center font-bold text-slate-600">{sub.scores[0]}</td>
                          <td className="py-2 px-2 text-center font-bold text-slate-600">{sub.scores[1]}</td>
                          <td className="py-2 px-2 text-center font-bold text-slate-600">{sub.scores[2]}</td>
                          <td className="py-2 px-2 text-center font-black text-[#FF3644] bg-red-50/40">
                            {sub.scores[3]}
                          </td>
                          <td className="py-2 px-3 text-right font-black text-slate-800">
                            {pct}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Teacher Feedback Note */}
            <div className="p-3 bg-emerald-50/80 border border-emerald-200/70 rounded-2xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-emerald-950 font-medium">
                <span className="font-bold">Faculty Assessment:</span> Ajay has demonstrated steady upward
                progression in Mathematics and Science across Unit Test-3 &amp; 4.
              </div>
            </div>

            {/* Modal Close Action */}
            <button
              onClick={() => setShowDashboardModal(false)}
              className="w-full py-2.5 px-4 bg-[#FF3644] hover:bg-[#e02d3a] active:scale-[0.98] text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer text-center"
            >
              Close Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
