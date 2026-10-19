import React, { useState, useMemo } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Course } from '../types';
import {
  Search,
  Filter,
  Coins,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';

interface AcademyPageProps {
  onSelectCourse: (courseId: string) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onSelectCourse }) => {
  const { courses, enrollInCourse, enrollments } = useEcosystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = [
    'All',
    'AI Wealth',
    'Blockchain & DeFi',
    'Autonomous Robotics',
    'Africa AI Impact',
    'Prompts & Automation',
    'Autonomous Enterprise'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Mastery', 'Executive'];

  // Filter 100 courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const handleEnrollAndStart = (c: Course) => {
    enrollInCourse(c.id);
    onSelectCourse(c.id);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <Coins className="w-4 h-4 text-[#FFD700]" />
            100 Seeded Autonomous Courses
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            Billionaires AI Academy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Every course automatically credits <span className="text-[#FFD700] font-bold">10x your tuition into BaaCoin Networth</span>. Engage in Learn-to-Mine lectures, code labs, and capstones to unlock your capital and mint your NFT Certificate with BaaCoin Chip.
          </p>
        </div>

        {/* Total Available Stats */}
        <div className="flex items-center gap-4 bg-zinc-950 px-5 py-3 rounded-2xl border border-zinc-800 self-center sm:self-auto shrink-0 font-mono text-xs">
          <div>
            <span className="text-zinc-500 block">Total Curriculum</span>
            <span className="text-white font-bold text-base">{courses.length} Courses</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div>
            <span className="text-zinc-500 block">Networth Multiplier</span>
            <span className="text-[#FFD700] font-bold text-base">10x Locked</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search 100 courses (e.g. ChatGPT ATM, Nollywood, Memecoin, Upwork)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 outline-none font-mono transition"
            />
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-3 text-xs text-zinc-300 font-mono outline-none cursor-pointer"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level: {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-medium tracking-wide whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-[#FFD700] text-black font-bold shadow-md shadow-[#FFD700]/20'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Course Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Showing {filteredCourses.length} of {courses.length} Courses</span>
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
              className="text-[#00D4FF] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 100 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const isEnrolled = enrollments.some((e) => e.course_id === c.id);

            return (
              <div
                key={c.id}
                className="group relative bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <img
                    src={c.thumbnail_url}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300">
                    {c.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#FFD700] text-black px-2.5 py-1 rounded-full font-mono font-bold text-xs shadow-md">
                    ${c.price} USD
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider mb-1">
                      {c.category}
                    </div>
                    <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-[#FFD700] transition">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  {/* Instructor & Students count */}
                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span className="truncate max-w-[170px]">{c.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {c.students_count.toLocaleString()}
                    </span>
                  </div>

                  {/* 10x BaaCoin Networth Tag */}
                  <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-[#FFD700]/30 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">10x Networth:</span>
                    <span className="text-[#FFD700] font-bold">
                      +{c.baacoin_value} BaaCoin (${c.baacoin_value})
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleEnrollAndStart(c)}
                      className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition ${
                        isEnrolled
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-900'
                          : 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black hover:brightness-110 active:scale-95 shadow-md shadow-[#FFD700]/15'
                      }`}
                    >
                      {isEnrolled ? 'Open Learn & Mine' : 'Enroll & Mine'}
                    </button>

                    <button
                      onClick={() => onSelectCourse(c.id)}
                      className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AcademyPage;
