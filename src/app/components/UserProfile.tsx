import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import BottomNav from './BottomNav';
import { 
  ArrowLeft, 
  Settings, 
  Instagram, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Trophy,
  Calendar,
  Zap,
  Star,
  Award,
  TrendingUp,
  Flame,
  Users,
  MessageCircle,
  Target,
  Heart,
  BookOpen,
  Lock,
  ChevronRight,
  Edit3
} from 'lucide-react';

const userInterests = [
  '🎨 Grafický design',
  '✏️ Ilustrace',
  '🔤 Typografie',
  '📐 Branding',
  '📱 UI/UX Design',
];

const eventHistory = [
  {
    id: 1,
    title: 'Workshop Typografie',
    date: '15. března 2026',
    streak: '+1 přednáška',
    image: 'https://images.unsplash.com/photo-1671127570462-89c3eb9d53ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBpbm5vdmF0aW9uJTIwbWVldGluZ3xlbnwxfHx8fDE3NzYzNzI5MTV8MA&ixlib=rb-4.1.0&q=80&w=400',
    badge: 'Dokončeno'
  },
  {
    id: 2,
    title: 'Branding & Identity Bootcamp',
    date: '8. března 2026',
    streak: '+1 přednáška',
    image: 'https://images.unsplash.com/photo-1519530720729-a2effdafab20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvbW11bml0eSUyMGV2ZW50JTIwY29sb3JmdWwlMjBjcm93ZHxlbnwxfHx8fDE3NzYzNzI5MTR8MA&ixlib=rb-4.1.0&q=80&w=400',
    badge: 'Nejlepší příspěvek'
  },
  {
    id: 3,
    title: 'AI v grafickém designu',
    date: '28. února 2026',
    streak: '+1 přednáška',
    image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3NjM3MjkxNXww&ixlib=rb-4.1.0&q=80&w=400',
    badge: 'Dokončeno'
  },
  {
    id: 4,
    title: 'Portfolio Review Night',
    date: '20. února 2026',
    streak: '+1 přednáška',
    image: 'https://images.unsplash.com/photo-1772587003187-65b32c91df91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlc3BvcnRzJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NzYzNzI5MTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    badge: 'Dokončeno'
  },
];

const achievements = [
  // Unlocked achievements
  { id: 1, icon: Trophy, label: 'Prvotřídní', description: 'Zúčastněte se první přednášky', color: 'yellow', unlocked: true },
  { id: 2, icon: Flame, label: 'Žhavá série', description: 'Série 7 přednášek v řadě', color: 'orange', unlocked: true },
  { id: 3, icon: Star, label: '10 událostí', description: 'Navštivte 10 přednášek', color: 'pink', unlocked: true },
  { id: 4, icon: Award, label: 'Networker', description: 'Propojte se s 5 lidmi', color: 'purple', unlocked: true },
  // Locked achievements
  { id: 5, icon: Users, label: 'Komunitní hrdina', description: 'Propojte se s 25 lidmi', color: 'blue', unlocked: false },
  { id: 6, icon: MessageCircle, label: 'Recenzent', description: 'Napište 10 recenzí', color: 'green', unlocked: false },
  { id: 7, icon: Target, label: 'Přesný zásah', description: 'Navštivte 5 přednášek po sobě s 5★ hodnocením', color: 'red', unlocked: false },
  { id: 8, icon: Heart, label: 'Věrný fanoušek', description: 'Navštivte 50 přednášek', color: 'pink', unlocked: false },
  { id: 9, icon: BookOpen, label: 'Vševěd', description: 'Navštivte přednášku z každé kategorie', color: 'teal', unlocked: false },
  { id: 10, icon: TrendingUp, label: 'Na vrcholu', description: 'Série 30 přednášek v řadě', color: 'orange', unlocked: false },
  { id: 11, icon: Zap, label: 'Blesk', description: 'Zaregistrujte se na 3 přednášky za jeden den', color: 'yellow', unlocked: false },
  { id: 12, icon: Calendar, label: 'Měsíční maraton', description: 'Navštivte přednášku každý týden po dobu měsíce', color: 'purple', unlocked: false },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'achievements'>('events');
  const [showSettings, setShowSettings] = useState(false);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-28">
      {/* Header */}
      <div className="bg-[#4C2058] px-6 pt-14 pb-36 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/dashboard')}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center"
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative w-32 h-32 mx-auto mb-5"
          >
            <img 
              src="https://i.pravatar.cc/300?img=8" 
              alt="Profile"
              className="w-full h-full rounded-3xl object-cover shadow-2xl border-4 border-white"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#D0FADA] rounded-xl flex items-center justify-center shadow-lg border-2 border-white"
            >
              <Edit3 className="w-4 h-4 text-[#4C2058]" />
            </motion.button>
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">Jan Novák</h1>
          <p className="text-white/80 text-lg font-bold mb-5">Grafický designér</p>
          <div className="flex items-center justify-center gap-3">
            <div className="px-4 py-2.5 bg-white/20 backdrop-blur rounded-full">
              <span className="text-white font-bold text-sm">Úroveň 7</span>
            </div>
            <div className="px-4 py-2.5 bg-white/20 backdrop-blur rounded-full flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-white font-bold text-sm">12 přednášek</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-20 relative z-20 space-y-8">
        {/* Settings Panel (collapsible) */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-7 shadow-xl space-y-3"
          >
            <h3 className="font-black text-[#4C2058] mb-3">Nastavení</h3>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-between p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors text-left active:scale-[0.98]"
            >
              <span className="font-bold text-[#4C2058] text-sm">✏️ Upravit profil</span>
              <ChevronRight className="w-4 h-4 text-[#4C2058]/30" />
            </button>
            <button
              onClick={() => alert('Notifikace zapnuty!')}
              className="w-full flex items-center justify-between p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors text-left active:scale-[0.98]"
            >
              <span className="font-bold text-[#4C2058] text-sm">🔔 Notifikace</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Zapnuto</span>
            </button>
            <button
              onClick={() => alert('Nastavení soukromí')}
              className="w-full flex items-center justify-between p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors text-left active:scale-[0.98]"
            >
              <span className="font-bold text-[#4C2058] text-sm">🔒 Soukromí</span>
              <ChevronRight className="w-4 h-4 text-[#4C2058]/30" />
            </button>
            <button
              onClick={() => alert('Jazyk: Čeština')}
              className="w-full flex items-center justify-between p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors text-left active:scale-[0.98]"
            >
              <span className="font-bold text-[#4C2058] text-sm">🌐 Jazyk</span>
              <span className="text-xs font-bold text-[#4C2058]/60 bg-[#D0FADA] px-2 py-1 rounded-full">Čeština 🇨🇿</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-between p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors text-left active:scale-[0.98]"
            >
              <span className="font-bold text-red-600 text-sm">🚪 Odhlásit se</span>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </motion.div>
        )}

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <div className="grid grid-cols-3 gap-5">
            <button onClick={() => setActiveTab('events')} className="text-center group">
              <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="w-7 h-7 text-[#4C2058]" />
              </div>
              <p className="text-2xl font-black mb-1 text-[#4C2058]">24</p>
              <p className="text-xs text-[#4C2058]/60 font-bold">Přednášky</p>
            </button>
            <button onClick={() => setActiveTab('achievements')} className="text-center group">
              <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Trophy className="w-7 h-7 text-[#4C2058]" />
              </div>
              <p className="text-2xl font-black mb-1 text-[#4C2058]">{unlockedCount}/{achievements.length}</p>
              <p className="text-xs text-[#4C2058]/60 font-bold">Odznaky</p>
            </button>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-500" />
              </div>
              <p className="text-2xl font-black mb-1 text-[#4C2058]">28</p>
              <p className="text-xs text-[#4C2058]/60 font-bold">Nejdelší</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <h2 className="text-xl font-black mb-5 text-[#4C2058]">Moje zájmy</h2>
          <div className="flex flex-wrap gap-3">
            {userInterests.map((interest, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="px-4 py-2.5 bg-[#4C2058] text-white rounded-full font-bold text-sm"
              >
                {interest}
              </motion.span>
            ))}
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2.5 bg-[#D0FADA] text-[#4C2058] rounded-full font-bold text-sm hover:bg-[#D0FADA]/70 transition-colors"
            >
              + Přidat další
            </button>
          </div>
        </motion.div>

        {/* Social Connections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <h2 className="text-xl font-black mb-5 text-[#4C2058]">Propojte se se mnou</h2>
          <div className="space-y-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between bg-[#4C2058] text-white rounded-2xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Instagram className="w-6 h-6" />
                <span className="font-black">Instagram</span>
              </div>
              <ExternalLink className="w-5 h-5 opacity-60" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between bg-[#4C2058] text-white rounded-2xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-6 h-6" />
                <span className="font-black">LinkedIn</span>
              </div>
              <ExternalLink className="w-5 h-5 opacity-60" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between bg-[#4C2058] text-white rounded-2xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Twitter className="w-6 h-6" />
                <span className="font-black">Twitter</span>
              </div>
              <ExternalLink className="w-5 h-5 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-3.5 rounded-2xl font-black transition-all ${
              activeTab === 'events'
                ? 'bg-[#4C2058] text-white shadow-lg'
                : 'bg-white text-[#4C2058] hover:bg-gray-50'
            }`}
          >
            Historie přednášek
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-3.5 rounded-2xl font-black transition-all ${
              activeTab === 'achievements'
                ? 'bg-[#4C2058] text-white shadow-lg'
                : 'bg-white text-[#4C2058] hover:bg-gray-50'
            }`}
          >
            Úspěchy ({unlockedCount}/{achievements.length})
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'events' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pb-8"
          >
            {eventHistory.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/event/${event.id}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex gap-4 p-5">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-black mb-1 text-sm text-[#4C2058]">{event.title}</h3>
                        <p className="text-xs text-[#4C2058]/50 font-bold">{event.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#D0FADA] text-[#4C2058] rounded-full text-xs font-black flex-shrink-0 ml-2">
                        {event.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-black text-[#4C2058]">{event.streak}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4C2058]/30 self-center flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pb-8"
          >
            {/* Unlocked section */}
            <div className="bg-white rounded-3xl p-7 shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-5 h-5 text-[#4C2058]" />
                <h3 className="font-black text-[#4C2058]">Odemčené ({unlockedCount})</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.filter(a => a.unlocked).map((achievement, index) => {
                  const Icon = achievement.icon;
                  const colorMap: any = {
                    yellow: 'bg-yellow-100 text-yellow-600',
                    orange: 'bg-orange-100 text-orange-600',
                    pink: 'bg-pink-100 text-pink-600',
                    purple: 'bg-purple-100 text-purple-600',
                    blue: 'bg-blue-100 text-blue-600',
                    green: 'bg-green-100 text-green-600',
                    red: 'bg-red-100 text-red-600',
                    teal: 'bg-teal-100 text-teal-600',
                  };
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 bg-[#D0FADA]/30 rounded-2xl"
                    >
                      <div className={`w-14 h-14 ${colorMap[achievement.color]} rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className="font-black text-sm text-[#4C2058] mb-1">{achievement.label}</p>
                      <p className="text-xs text-[#4C2058]/50 font-bold leading-relaxed">{achievement.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Locked section */}
            <div className="bg-white rounded-3xl p-7 shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <Lock className="w-5 h-5 text-[#4C2058]/40" />
                <h3 className="font-black text-[#4C2058]/40">Zamčené ({achievements.length - unlockedCount})</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.filter(a => !a.unlocked).map((achievement, index) => {
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.08 }}
                      className="text-center p-6 bg-gray-50 rounded-2xl relative overflow-hidden"
                    >
                      {/* Lock overlay */}
                      <div className="w-14 h-14 bg-gray-200 rounded-2xl mx-auto mb-3 flex items-center justify-center relative">
                        <Lock className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="font-black text-sm text-[#4C2058]/30 mb-1">{achievement.label}</p>
                      <p className="text-xs text-[#4C2058]/25 font-bold leading-relaxed">{achievement.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
