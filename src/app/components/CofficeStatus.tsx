import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import BottomNav from './BottomNav';
import { 
  ArrowLeft, 
  Clock, 
  Zap,
  Users,
  AlertCircle,
  X,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const initialPeople = [
  { id: 1, name: 'Alena Nováková', role: 'Grafická designérka', avatar: 'https://i.pravatar.cc/150?img=15', online: true },
  { id: 2, name: 'Martin Svoboda', role: 'Typograf', avatar: 'https://i.pravatar.cc/150?img=16', online: true },
  { id: 3, name: 'Jakub Dvořák', role: 'Brand Designer', avatar: 'https://i.pravatar.cc/150?img=17', online: true },
  { id: 4, name: 'Tereza Černá', role: 'Ilustrátorka', avatar: 'https://i.pravatar.cc/150?img=18', online: true },
  { id: 5, name: 'David Procházka', role: 'UI Designer', avatar: 'https://i.pravatar.cc/150?img=19', online: true },
  { id: 6, name: 'Eva Malá', role: 'Motion Designer', avatar: 'https://i.pravatar.cc/150?img=20', online: true },
  { id: 7, name: 'Lukáš Horák', role: 'Art Director', avatar: 'https://i.pravatar.cc/150?img=21', online: true },
  { id: 8, name: 'Kristýna Veselá', role: 'Print Designer', avatar: 'https://i.pravatar.cc/150?img=22', online: true },
];

const myProfile = { id: 99, name: 'Jan Novák', role: 'Grafický designér', avatar: 'https://i.pravatar.cc/300?img=8', online: true };

export default function CofficeStatus() {
  const navigate = useNavigate();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [greetedIds, setGreetedIds] = useState<number[]>([]);

  const handleCheckIn = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  const handleGreet = (id: number) => {
    if (!greetedIds.includes(id)) {
      setGreetedIds([...greetedIds, id]);
    }
  };

  const currentlyHere = isCheckedIn ? [myProfile, ...initialPeople] : initialPeople;

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-28">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-8 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/dashboard')}
            className="w-12 h-12 bg-[#D0FADA] rounded-2xl flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-[#4C2058]" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-black text-[#4C2058]">Coffice Prostor</h1>
            <p className="text-[#4C2058]/60 mt-1">Coworkingový hub</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Alert Banner */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#4C2058] rounded-3xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-white">
                  <h3 className="font-black mb-1 text-base">Aktualizace rozvrhu</h3>
                  <p className="text-sm font-bold text-white/90 leading-relaxed">
                    Prodloužená otevírací doba o víkendu! Otevřeno v sobotu 10:00 - 22:00
                  </p>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-7">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-green-500 rounded-full"
              ></motion.div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#4C2058]">Otevřeno veřejnosti</h2>
              <p className="text-[#4C2058]/60 font-bold mt-1">Dnes, 13:00 - 19:00</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-7">
            <div className="bg-[#D0FADA]/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[#4C2058]" />
                <span className="text-xs font-bold text-[#4C2058]/60 tracking-wider">HODINY DNES</span>
              </div>
              <p className="font-black text-lg text-[#4C2058]">13:00 - 19:00</p>
            </div>
            <div className="bg-[#D0FADA]/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#4C2058]" />
                <span className="text-xs font-bold text-[#4C2058]/60 tracking-wider">KAPACITA</span>
              </div>
              <p className="font-black text-lg text-[#4C2058]">{currentlyHere.length} / 30</p>
            </div>
          </div>

          {/* Check-in Toggle */}
          <motion.div
            className={`rounded-2xl p-6 transition-all ${
              isCheckedIn 
                ? 'bg-[#4C2058]' 
                : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={isCheckedIn ? 'text-white' : 'text-[#4C2058]'}>
                <p className="text-xs font-bold opacity-70 mb-1 tracking-wider">VÁŠ STATUS</p>
                <p className="font-black text-lg">
                  {isCheckedIn ? "Jste zde právě teď! 🎉" : "Zaregistrujte se při příchodu"}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCheckIn}
                className={`relative w-16 h-9 rounded-full transition-colors ${
                  isCheckedIn ? 'bg-white/30' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: isCheckedIn ? 28 : 2 }}
                  className="absolute top-1 w-7 h-7 rounded-full shadow-lg bg-white"
                ></motion.div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Who's Here Right Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#4C2058]">Kdo je zde právě teď</h2>
            <div className="px-3 py-1.5 bg-[#D0FADA] rounded-full">
              <span className="text-[#4C2058] font-black text-sm">{currentlyHere.length} lidí</span>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto coffice-scrollbar pr-2">
            {currentlyHere.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => person.id !== 99 && navigate('/profile')}
                className={`flex items-center gap-4 rounded-2xl p-4 transition-colors cursor-pointer active:scale-[0.98] ${
                  person.id === 99 
                    ? 'bg-[#4C2058]/5 border-2 border-[#4C2058]/20' 
                    : 'bg-[#D0FADA]/30 hover:bg-[#D0FADA]/50'
                }`}
              >
                <div className="relative">
                  <img 
                    src={person.avatar} 
                    alt={person.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  {person.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-black text-[#4C2058]">
                    {person.name}
                    {person.id === 99 && <span className="text-xs font-bold text-[#4C2058]/50 ml-2">(Vy)</span>}
                  </p>
                  <p className="text-sm text-[#4C2058]/60 font-bold mt-0.5">{person.role}</p>
                </div>
                {person.id !== 99 && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); handleGreet(person.id); }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      greetedIds.includes(person.id)
                        ? 'bg-[#D0FADA] text-[#4C2058]'
                        : 'bg-[#4C2058] text-white hover:bg-[#4C2058]/90'
                    }`}
                  >
                    {greetedIds.includes(person.id) ? '✓ Pozdraveno' : 'Pozdravit'}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-7 shadow-xl"
        >
          <h2 className="text-xl font-black mb-5 text-[#4C2058]">Kontakt & Lokace</h2>
          <div className="space-y-4">
            <a 
              href="https://maps.google.com/?q=Kreativní+123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors group"
            >
              <div className="w-11 h-11 bg-[#D0FADA] rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#4C2058]" />
              </div>
              <div className="flex-1">
                <p className="font-black text-sm text-[#4C2058]">Kreativní 123</p>
                <p className="text-sm text-[#4C2058]/60">Centrum města, 3. patro</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#4C2058]/30 group-hover:text-[#4C2058]/60 transition-colors" />
            </a>
            <a 
              href="tel:+420123456789"
              className="flex items-center gap-4 p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors group"
            >
              <div className="w-11 h-11 bg-[#D0FADA] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#4C2058]" />
              </div>
              <div className="flex-1">
                <p className="font-black text-sm text-[#4C2058]">+420 123 456 789</p>
                <p className="text-sm text-[#4C2058]/60">Zavolat recepci</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#4C2058]/30 group-hover:text-[#4C2058]/60 transition-colors" />
            </a>
            <a 
              href="mailto:ahoj@creativehub.cz"
              className="flex items-center gap-4 p-4 bg-[#D0FADA]/30 rounded-2xl hover:bg-[#D0FADA]/50 transition-colors group"
            >
              <div className="w-11 h-11 bg-[#D0FADA] rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#4C2058]" />
              </div>
              <div className="flex-1">
                <p className="font-black text-sm text-[#4C2058]">ahoj@creativehub.cz</p>
                <p className="text-sm text-[#4C2058]/60">Napsat e-mail</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[#4C2058]/30 group-hover:text-[#4C2058]/60 transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
