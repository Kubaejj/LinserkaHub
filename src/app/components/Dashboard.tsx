import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  Zap,
  Flame,
  Clock,
  MapPin,
  ChevronRight,
  Star,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import BottomNav from './BottomNav';

const upcomingEvents = [
  {
    id: 1,
    title: 'Workshop Typografie & Letteringu',
    date: 'Dnes',
    time: '18:00 - 21:00',
    location: 'Studio A, 2. patro',
    tag: '🔤 Typografie',
    attendees: 24,
    image: 'https://images.unsplash.com/photo-1671127570462-89c3eb9d53ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBpbm5vdmF0iW5pb24JTIwbWVldGluZ3xlbnwxfHx8fDE3NzYzNzI5MTV8MA&ixlib=rb-4.1.0&q=80&w=400',
    isLive: true,
    price: 'Zdarma',
    attended: true,
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Branding & Identity Konference',
    date: 'So 18. dubna',
    time: '14:00 - 23:00',
    location: 'Hlavní sál, přízemí',
    tag: '📐 Branding',
    attendees: 156,
    image: 'https://images.unsplash.com/photo-1610900538035-b04c4d957d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbCUyMHN0YWdlJTIwbGlnaHRzfGVufDF8fHx8MTc3NjM3MjkxNHww&ixlib=rb-4.1.0&q=80&w=400',
    isLive: false,
    price: '650 Kč',
    attended: false,
    rating: null,
  },
  {
    id: 1,
    title: 'Logo Design Masterclass',
    date: 'Út 22. dubna',
    time: '10:00 - 13:00',
    location: 'Učebna 3, 1. patro',
    tag: '🎨 Grafický design',
    attendees: 18,
    image: 'https://images.unsplash.com/photo-1519530720729-a2effdafab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvbW11bml0eSUyMGV2ZW50JTIwY29sb3JmdWwlMjBjcm93ZHxlbnwxfHx8fDE3NzYzNzI5MTR8MA&ixlib=rb-4.1.0&q=80&w=400',
    isLive: false,
    price: 'Zdarma',
    attended: false,
    rating: null,
  },
  {
    id: 1,
    title: 'AI v Grafickém Designu',
    date: 'Čt 24. dubna',
    time: '17:00 - 19:00',
    location: 'Přednáškový sál',
    tag: '🎨 Grafický design',
    attendees: 42,
    image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3NjM3MjkxNXww&ixlib=rb-4.1.0&q=80&w=400',
    isLive: false,
    price: 'Zdarma',
    attended: false,
    rating: null,
  },
];

// Quick stats for the user
const quickStats = [
  { label: 'Tento týden', value: '3', sublabel: 'akce', icon: Sparkles, color: 'bg-yellow-100 text-yellow-600' },
  { label: 'Série', value: '12', sublabel: 'přednášek', icon: Flame, color: 'bg-orange-100 text-orange-600' },
  { label: 'Úroveň', value: '7', sublabel: 'pokročilý', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentStreak] = useState(12);
  const [longestStreak] = useState(28);
  const [qrScanned, setQrScanned] = useState(false);

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-28">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-8 shadow-sm">
        <p className="font-brand text-[#4C2058]/50 text-xl tracking-wider mb-3">Linserka Hub</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#4C2058]">Dobrý večer! 👋</h1>
            <p className="text-[#4C2058]/60 mt-2 text-base">Co dnes vytvoříte?</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/profile')}
            className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-[#4C2058]/20"
          >
            <img 
              src="https://i.pravatar.cc/300?img=8" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate('/profile')}
                className="bg-white rounded-2xl p-4 shadow-lg text-center cursor-pointer active:scale-[0.97] transition-transform"
              >
                <div className={`w-11 h-11 ${stat.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-[#4C2058]">{stat.value}</p>
                <p className="text-[10px] font-bold text-[#4C2058]/50 uppercase tracking-wider mt-1">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Streak Progress Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/profile')}
          className="bg-[#4C2058] rounded-3xl p-7 shadow-xl relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-6 h-6 text-orange-400" />
                <span className="text-white/80 text-sm font-bold">Vaše Série</span>
              </div>
              <h2 className="text-6xl font-black text-white mb-2">{currentStreak}</h2>
              <p className="text-white/90 font-bold text-lg mb-1">Přednášek v řadě</p>
              <p className="text-white/60 text-sm">Nejdelší série: {longestStreak} přednášek</p>
              
              {/* Streak Calendar */}
              <div className="mt-5 flex gap-1.5">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-lg ${
                      i < 6 ? 'bg-white' : 'bg-white/30'
                    } flex items-center justify-center`}
                  >
                    {i < 6 && <Flame className="w-4 h-4 text-orange-500" />}
                  </div>
                ))}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); setQrScanned(!qrScanned); }}
              className="ml-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative"
            >
              <AnimatePresence mode="wait">
                {qrScanned ? (
                  <motion.div
                    key="scanned"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="text-2xl"
                  >
                    ✅
                  </motion.div>
                ) : (
                  <motion.div
                    key="qr"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <QrCode className="w-8 h-8 text-[#4C2058]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Coffice Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/coffice')}
          className="bg-white rounded-3xl p-6 shadow-xl cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-[#4C2058]" />
              </div>
              <div>
                <h3 className="font-black text-[#4C2058] text-lg">Coffice Prostor</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-bold">Otevřeno · 13 lidí</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#4C2058]/30" />
          </div>
        </motion.div>

        {/* Upcoming Events Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between pt-2"
        >
          <h2 className="text-xl font-black text-[#4C2058]">Pro vás doporučené</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/calendar')}
            className="flex items-center gap-1 text-sm font-black text-[#4C2058]/60 hover:text-[#4C2058] transition-colors"
          >
            Vše <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Personalized Event Cards */}
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={`${event.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              onClick={() => navigate(`/event/${event.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer active:scale-[0.98] transition-transform"
            >
              {/* Event image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {event.isLive && (
                  <div className="absolute top-4 left-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4C2058] rounded-full"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-black">PRÁVĚ TEĎ</span>
                    </motion.div>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-black ${
                    event.price === 'Zdarma' ? 'bg-green-500 text-white' : 'bg-white text-[#4C2058]'
                  }`}>
                    {event.price}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-black text-[#4C2058]">
                    {event.tag}
                  </span>
                </div>

                {event.attended && event.rating && (
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-black text-[#4C2058]">{event.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-black text-[#4C2058] text-lg mb-3">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[#4C2058]/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">{event.date} · {event.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5 text-sm text-[#4C2058]/60">
                    <MapPin className="w-4 h-4" />
                    <span className="font-bold">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#4C2058]/50">{event.attendees} účastníků</span>
                    <ChevronRight className="w-5 h-5 text-[#4C2058]/40" />
                  </div>
                </div>

                {event.attended && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-black text-green-600">Zúčastněno</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/event/${event.id}`); }}
                      className="text-xs font-black text-[#4C2058]/60 flex items-center gap-1 hover:text-[#4C2058] transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Ohodnotit přednášku →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
