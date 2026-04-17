import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const interests = [
  { id: 1, emoji: '🎨', label: 'Grafický design' },
  { id: 2, emoji: '✏️', label: 'Ilustrace' },
  { id: 3, emoji: '🔤', label: 'Typografie' },
  { id: 4, emoji: '📐', label: 'Branding & Identity' },
  { id: 5, emoji: '📱', label: 'UI/UX Design' },
  { id: 6, emoji: '🖨️', label: 'Print & Packaging' },
  { id: 7, emoji: '🎬', label: 'Motion Graphics' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([1, 2, 4]);

  const toggleInterest = (id: number) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-36">
      <div className="px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="font-brand text-[#4C2058] text-3xl mb-6">Linserka Hub</p>
          <div className="inline-flex items-center gap-2 bg-[#4C2058] px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-bold">Krok 1 ze 3</span>
          </div>
          <h1 className="text-4xl font-black mb-5 leading-tight text-[#4C2058]">
            Jaké jsou vaše<br />hlavní zájmy?
          </h1>
          <p className="text-lg text-[#4C2058]/60 leading-relaxed">
            Vyberte vše, co vás zajímá. Přizpůsobíme vaše zážitky.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {interests.map((interest, index) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  relative overflow-hidden px-5 py-5 rounded-3xl font-bold text-left
                  transition-all duration-300 ease-out
                  ${isSelected 
                    ? 'bg-[#4C2058] text-white shadow-lg shadow-[#4C2058]/40' 
                    : 'bg-white text-[#4C2058] shadow-md hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{interest.emoji}</span>
                  <span className="text-sm">{interest.label}</span>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId={`check-${interest.id}`}
                    className="absolute top-2.5 right-2.5 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-[#4C2058] font-black text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sticky CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#D0FADA] via-[#D0FADA] to-transparent"
      >
        <button
          onClick={handleContinue}
          disabled={selectedInterests.length === 0}
          className={`
            w-full py-5 rounded-3xl font-black text-lg shadow-2xl
            transition-all duration-300
            ${selectedInterests.length > 0
              ? 'bg-[#4C2058] text-white hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Pokračovat {selectedInterests.length > 0 && `(${selectedInterests.length} vybráno)`}
        </button>
      </motion.div>
    </div>
  );
}