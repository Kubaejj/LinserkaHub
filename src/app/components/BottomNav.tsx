import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Home, Calendar, Briefcase, User } from 'lucide-react';

const navItems = [
  { id: 'home', path: '/dashboard', icon: Home, label: 'Domů' },
  { id: 'calendar', path: '/calendar', icon: Calendar, label: 'Kalendář' },
  { id: 'coffice', path: '/coffice', icon: Briefcase, label: 'Coffice' },
  { id: 'profile', path: '/profile', icon: User, label: 'Profil' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 px-4 py-4 safe-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-colors relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-4 w-8 h-1 bg-[#4C2058] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive ? 'text-[#4C2058] scale-110' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-bold transition-colors ${
                  isActive ? 'text-[#4C2058]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
