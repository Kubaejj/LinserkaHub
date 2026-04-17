import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  MapPin,
  Calendar,
  Users,
  Sparkles
} from 'lucide-react';
import BottomNav from './BottomNav';

// Calendar event data with actual dates
const calendarEvents: Record<string, Array<{
  id: number;
  title: string;
  time: string;
  location: string;
  tag: string;
  tagEmoji: string;
  tagColor: string;
  attendees: number;
  price: string;
  image: string;
}>> = {
  '2026-04-16': [
    { id: 1, title: 'Workshop Typografie & Letteringu', time: '18:00 - 21:00', location: 'Studio A, 2. patro', tag: 'Typo', tagEmoji: '🔤', tagColor: 'bg-purple-100 text-purple-700', attendees: 24, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1671127570462-89c3eb9d53ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-18': [
    { id: 2, title: 'Branding & Identity Konference', time: '14:00 - 23:00', location: 'Hlavní sál, přízemí', tag: 'Branding', tagEmoji: '📐', tagColor: 'bg-pink-100 text-pink-700', attendees: 156, price: '650 Kč', image: 'https://images.unsplash.com/photo-1610900538035-b04c4d957d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-19': [
    { id: 1, title: 'Design Brunch & Networking', time: '11:00 - 14:00', location: 'Terasa, 4. patro', tag: 'Social', tagEmoji: '🤝', tagColor: 'bg-yellow-100 text-yellow-700', attendees: 35, price: '250 Kč', image: 'https://images.unsplash.com/photo-1519530720729-a2effdafab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-22': [
    { id: 1, title: 'Logo Design Masterclass', time: '10:00 - 13:00', location: 'Učebna 3, 1. patro', tag: 'Design', tagEmoji: '🎨', tagColor: 'bg-orange-100 text-orange-700', attendees: 18, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1519530720729-a2effdafab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-24': [
    { id: 1, title: 'AI v Grafickém Designu', time: '17:00 - 19:00', location: 'Přednáškový sál', tag: 'Design', tagEmoji: '🎨', tagColor: 'bg-orange-100 text-orange-700', attendees: 42, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-25': [
    { id: 1, title: 'Portfolio Review Night', time: '19:00 - 21:30', location: 'Galerie, 3. patro', tag: 'Design', tagEmoji: '🎨', tagColor: 'bg-orange-100 text-orange-700', attendees: 32, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-04-28': [
    { id: 1, title: 'Ilustrace: Od skici k finálnímu dílu', time: '09:00 - 16:00', location: 'Workshop Room B', tag: 'Ilustrace', tagEmoji: '✏️', tagColor: 'bg-blue-100 text-blue-700', attendees: 20, price: '450 Kč', image: 'https://images.unsplash.com/photo-1519530720729-a2effdafab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
    { id: 2, title: 'Motion Graphics večer', time: '20:00 - 22:30', location: 'Kino sál', tag: 'Motion', tagEmoji: '🎬', tagColor: 'bg-green-100 text-green-700', attendees: 65, price: '150 Kč', image: 'https://images.unsplash.com/photo-1610900538035-b04c4d957d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-05-02': [
    { id: 1, title: 'Print & Packaging Design Jam', time: '15:00 - 20:00', location: 'Studio A, 2. patro', tag: 'Print', tagEmoji: '🖨️', tagColor: 'bg-purple-100 text-purple-700', attendees: 30, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1671127570462-89c3eb9d53ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-05-05': [
    { id: 1, title: 'UI/UX Design Trends 2026', time: '18:00 - 20:00', location: 'Přednáškový sál', tag: 'UI/UX', tagEmoji: '📱', tagColor: 'bg-indigo-100 text-indigo-700', attendees: 55, price: 'Zdarma', image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
  '2026-05-10': [
    { id: 1, title: 'Color Theory & Palety', time: '10:00 - 16:00', location: 'Studio B', tag: 'Design', tagEmoji: '🎨', tagColor: 'bg-orange-100 text-orange-700', attendees: 40, price: '300 Kč', image: 'https://images.unsplash.com/photo-1772587003187-65b32c91df91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60' },
  ],
};

const CATEGORIES = [
  { id: 'all', label: 'Vše', emoji: '✨' },
  { id: 'Design', label: 'Design', emoji: '🎨' },
  { id: 'Typo', label: 'Typografie', emoji: '🔤' },
  { id: 'Branding', label: 'Branding', emoji: '📐' },
  { id: 'Ilustrace', label: 'Ilustrace', emoji: '✏️' },
  { id: 'UI/UX', label: 'UI/UX', emoji: '📱' },
  { id: 'Motion', label: 'Motion', emoji: '🎬' },
  { id: 'Print', label: 'Print', emoji: '🖨️' },
  { id: 'Social', label: 'Social', emoji: '🤝' },
];

const DAYS_CZ = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const MONTHS_CZ = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;
  const days: Array<{ date: Date | null; dayNum: number | null }> = [];
  for (let i = 0; i < startDayOfWeek; i++) days.push({ date: null, dayNum: null });
  for (let d = 1; d <= daysInMonth; d++) days.push({ date: new Date(year, month, d), dayNum: d });
  return days;
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isToday(date: Date): boolean {
  const t = new Date();
  return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear();
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

function getAllUpcomingEvents() {
  const today = new Date();
  const todayKey = formatDateKey(today);
  const entries = Object.entries(calendarEvents)
    .filter(([key]) => key >= todayKey)
    .sort(([a], [b]) => a.localeCompare(b));
  
  const result: Array<{ dateKey: string; dateLabel: string; events: typeof calendarEvents[string] }> = [];
  
  for (const [key, events] of entries) {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const dayNames = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
    let label: string;
    if (key === todayKey) {
      label = 'Dnes';
    } else {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (key === formatDateKey(tomorrow)) {
        label = 'Zítra';
      } else {
        label = `${dayNames[date.getDay()]}, ${d}. ${MONTHS_CZ[m - 1].toLowerCase()}`;
      }
    }
    result.push({ dateKey: key, dateLabel: label, events });
  }
  return result;
}

export default function CalendarPage() {
  const navigate = useNavigate();
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const monthDays = useMemo(() => getMonthDays(calYear, calMonth), [calYear, calMonth]);
  const selectedDateKey = formatDateKey(selectedDate);
  const selectedDayEvents = (calendarEvents[selectedDateKey] || [])
    .filter(e => activeCategory === 'all' || e.tag === activeCategory);

  const allUpcoming = useMemo(() => {
    const grouped = getAllUpcomingEvents();
    if (activeCategory === 'all') return grouped;
    return grouped
      .map(g => ({ ...g, events: g.events.filter(e => e.tag === activeCategory) }))
      .filter(g => g.events.length > 0);
  }, [activeCategory]);

  // Count events this month
  const monthEventCount = useMemo(() => {
    let count = 0;
    for (const [key, events] of Object.entries(calendarEvents)) {
      const [y, m] = key.split('-').map(Number);
      if (y === calYear && m === calMonth + 1) count += events.length;
    }
    return count;
  }, [calYear, calMonth]);

  const goToPrevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const goToNextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };
  const goToToday = () => {
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
    setSelectedDate(today);
  };

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-28">
      {/* Header */}
      <div className="bg-[#4C2058] px-6 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full -ml-8 -mb-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Calendar className="w-7 h-7 text-white/80" />
              <h1 className="text-2xl font-black text-white">Kalendář</h1>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goToToday}
                className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-black text-white hover:bg-white/30 transition-colors"
              >
                Dnes
              </motion.button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold text-white">{monthEventCount} akcí tento měsíc</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="px-6 pt-6 pb-3">
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-lg">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
              viewMode === 'calendar'
                ? 'bg-[#4C2058] text-white shadow-md'
                : 'text-[#4C2058]/60 hover:text-[#4C2058]'
            }`}
          >
            📅 Měsíc
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${
              viewMode === 'list'
                ? 'bg-[#4C2058] text-white shadow-md'
                : 'text-[#4C2058]/60 hover:text-[#4C2058]'
            }`}
          >
            📋 Seznam
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 py-4">
        <div className="flex gap-2.5 overflow-x-auto pb-1 coffice-scrollbar">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-black text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#4C2058] text-white shadow-lg shadow-[#4C2058]/20'
                  : 'bg-white text-[#4C2058] shadow-md hover:shadow-lg'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-6">
        <AnimatePresence mode="wait">
          {viewMode === 'calendar' ? (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Calendar Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Month Navigation */}
                <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={goToPrevMonth}
                    className="w-11 h-11 bg-[#D0FADA] rounded-xl flex items-center justify-center hover:bg-[#D0FADA]/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#4C2058]" />
                  </motion.button>
                  <motion.h3
                    key={`${calYear}-${calMonth}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-black text-[#4C2058]"
                  >
                    {MONTHS_CZ[calMonth]} {calYear}
                  </motion.h3>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={goToNextMonth}
                    className="w-11 h-11 bg-[#D0FADA] rounded-xl flex items-center justify-center hover:bg-[#D0FADA]/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#4C2058]" />
                  </motion.button>
                </div>

                {/* Day headers */}
                <div className="px-6 grid grid-cols-7 gap-1 mb-3">
                  {DAYS_CZ.map((day) => (
                    <div key={day} className="text-center">
                      <span className="text-xs font-black text-[#4C2058]/40">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="px-6 pb-5">
                  <motion.div
                    key={`${calYear}-${calMonth}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-7 gap-1.5"
                  >
                    {monthDays.map((day, index) => {
                      if (!day.date) return <div key={`empty-${index}`} className="aspect-square" />;
                      const dateKey = formatDateKey(day.date);
                      const dayEvents = calendarEvents[dateKey] || [];
                      const filteredEvents = activeCategory === 'all' 
                        ? dayEvents 
                        : dayEvents.filter(e => e.tag === activeCategory);
                      const hasEvents = filteredEvents.length > 0;
                      const isTodayDate = isToday(day.date);
                      const isSelected = isSameDay(day.date, selectedDate);
                      const isPast = day.date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                      return (
                        <motion.button
                          key={dateKey}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setSelectedDate(day.date!)}
                          className={`
                            aspect-square rounded-xl flex flex-col items-center justify-center relative
                            transition-all duration-200 
                            ${isSelected
                              ? 'bg-[#4C2058] text-white shadow-lg shadow-[#4C2058]/30'
                              : isTodayDate
                                ? 'bg-[#D0FADA] text-[#4C2058]'
                                : isPast
                                  ? 'text-[#4C2058]/30 hover:bg-gray-50'
                                  : 'text-[#4C2058] hover:bg-[#D0FADA]/40'
                            }
                          `}
                        >
                          <span className={`text-sm font-black ${isSelected ? 'text-white' : ''}`}>
                            {day.dayNum}
                          </span>
                          {hasEvents && (
                            <div className="flex gap-0.5 mt-0.5">
                              {[...Array(Math.min(filteredEvents.length, 3))].map((_, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#4C2058]'}`} />
                              ))}
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Selected Day Detail */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDateKey + activeCategory}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-black text-[#4C2058]/60">
                          {selectedDate.getDate()}. {MONTHS_CZ[selectedDate.getMonth()].toLowerCase()} {selectedDate.getFullYear()}
                        </p>
                        {selectedDayEvents.length > 0 && (
                          <span className="px-2.5 py-1 bg-[#4C2058] text-white text-xs font-black rounded-full">
                            {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'akce' : 'akcí'}
                          </span>
                        )}
                      </div>

                      {selectedDayEvents.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDayEvents.map((event, i) => (
                            <motion.div
                              key={`${event.id}-${i}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              onClick={() => navigate(`/event/${event.id}`)}
                              className="flex items-center gap-4 p-4 bg-[#D0FADA]/30 rounded-2xl cursor-pointer hover:bg-[#D0FADA]/50 active:scale-[0.98] transition-all"
                            >
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${event.tagColor}`}>
                                    {event.tagEmoji} {event.tag}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                    event.price === 'Zdarma' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {event.price}
                                  </span>
                                </div>
                                <p className="font-black text-sm text-[#4C2058] truncate">{event.title}</p>
                                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#4C2058]/50">
                                  <span className="flex items-center gap-1 font-bold">
                                    <Clock className="w-3 h-3" /> {event.time}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#4C2058]/30 flex-shrink-0" />
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-14 h-14 bg-[#D0FADA]/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <Calendar className="w-7 h-7 text-[#4C2058]/30" />
                          </div>
                          <p className="text-sm font-bold text-[#4C2058]/30">Žádné akce v tento den</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* LIST VIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {allUpcoming.length > 0 ? (
                allUpcoming.map((group, gi) => (
                  <div key={group.dateKey}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-[#4C2058] rounded-full"></div>
                      <h3 className="font-black text-[#4C2058] capitalize">{group.dateLabel}</h3>
                      <div className="flex-1 h-px bg-[#4C2058]/10"></div>
                    </div>
                    <div className="space-y-3">
                      {group.events.map((event, ei) => (
                        <motion.div
                          key={`${group.dateKey}-${event.id}-${ei}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: gi * 0.1 + ei * 0.05 }}
                          onClick={() => navigate(`/event/${event.id}`)}
                          className="bg-white rounded-2xl p-5 shadow-xl cursor-pointer active:scale-[0.98] transition-transform"
                        >
                          <div className="flex gap-4">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-18 h-18 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${event.tagColor}`}>
                                  {event.tagEmoji} {event.tag}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  event.price === 'Zdarma' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {event.price}
                                </span>
                              </div>
                              <p className="font-black text-sm text-[#4C2058] truncate">{event.title}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-[#4C2058]/50">
                                <span className="flex items-center gap-1 font-bold">
                                  <Clock className="w-3 h-3" /> {event.time}
                                </span>
                                <span className="flex items-center gap-1 font-bold">
                                  <MapPin className="w-3 h-3" /> {event.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-2 text-xs text-[#4C2058]/40">
                                <Users className="w-3 h-3" />
                                <span className="font-bold">{event.attendees} účastníků</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#4C2058]/30 flex-shrink-0 self-center" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
                  <div className="w-16 h-16 bg-[#D0FADA]/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-[#4C2058]/30" />
                  </div>
                  <p className="font-black text-[#4C2058]/30">Žádné nadcházející akce v této kategorii</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
