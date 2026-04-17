import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Share2, 
  Heart,
  Calendar,
  Users,
  Star,
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

const eventData: any = {
  1: {
    title: 'Workshop Typografie & Letteringu',
    coverImage: 'https://images.unsplash.com/photo-1671127570462-89c3eb9d53ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBpbm5vdmF0iW5pb24JTIwbWVldGluZ3xlbnwxfHx8fDE3NzYzNzI5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Čtvrtek, 16. dubna 2026',
    time: '18:00 - 21:00',
    location: 'Studio A, 2. patro',
    price: 'Vstup zdarma',
    attendees: 24,
    description: 'Připojte se k nám na workshop zaměřený na typografii a lettering. Naučíte se základy písmové tvorby, kerning, tracking a jak vytvořit vlastní písmový systém. Ideální pro grafické designéry všech úrovní!',
    tags: ['🔤 Typografie', '🎨 Grafický design'],
    organizer: 'Linserka Hub',
    attended: true,
  },
  2: {
    title: 'Branding & Identity Konference',
    coverImage: 'https://images.unsplash.com/photo-1610900538035-b04c4d957d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbCUyMHN0YWdlJTIwbGlnaHRzfGVufDF8fHx8MTc3NjM3MjkxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Sobota, 18. dubna 2026',
    time: '14:00 - 23:00',
    location: 'Hlavní sál, přízemí',
    price: '650 Kč',
    attendees: 156,
    description: 'Zažijte den plný inspirace na konferenci o brandingu a vizuální identitě. Přednášky od předních grafických designérů, workshopy na tvorbu loga a case studies světových značek.',
    tags: ['📐 Branding'],
    organizer: 'Linserka Hub',
    attended: false,
  },
};

const mockAttendees = [
  { id: 1, name: 'Sarah K.', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Mike R.', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emma L.', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Alex T.', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Jordan M.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const mockReviews = [
  {
    id: 1,
    author: 'Jessica Williams',
    avatar: 'https://i.pravatar.cc/150?img=10',
    rating: 5,
    date: 'Minulý měsíc',
    comment: 'Naprosto úžasný workshop! Lektoři byli znalí a praktický přístup to udělal super poutavé. Už jsem se přihlásila na další!'
  },
  {
    id: 2,
    author: 'David Chen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: 'Před 2 měsíci',
    comment: 'Perfektní kombinace kreativity a technických dovedností. Potkal jsem úžasné lidi a za jeden večer jsem se toho hodně naučil.'
  },
  {
    id: 3,
    author: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 4,
    date: 'Před 3 měsíci',
    comment: 'Skvělá akce! Ocenila bych trochu víc času na závěrečný projekt, ale celkově fantastický zážitek.'
  },
];

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isInterested, setIsInterested] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<{rating: number; text: string} | null>(null);
  const [shareTooltip, setShareTooltip] = useState(false);

  const event = eventData[id as string] || eventData['1'];

  const handleSubmitReview = () => {
    if (rating > 0 && reviewText.trim()) {
      setSubmittedReview({ rating, text: reviewText });
      setReviewSubmitted(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Podívej se na ${event.title}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareTooltip(true);
      setTimeout(() => setShareTooltip(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#D0FADA] pb-36">
      {/* Header Image */}
      <div className="relative h-72">
        <img 
          src={event.coverImage} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-14 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-12 h-12 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg relative"
            >
              {shareTooltip ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
              {shareTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded-lg whitespace-nowrap"
                >
                  Zkopírováno!
                </motion.div>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="w-12 h-12 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-5 right-6">
          <div className={`px-5 py-2.5 rounded-full font-black shadow-xl ${
            event.price === 'Vstup zdarma' 
              ? 'bg-green-500 text-white' 
              : 'bg-white text-[#4C2058]'
          }`}>
            {event.price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Title & Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag: string, index: number) => (
              <span key={index} className="px-4 py-1.5 bg-white rounded-full text-sm font-black shadow-md text-[#4C2058]">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-black text-[#4C2058] leading-tight">{event.title}</h1>
        </motion.div>

        {/* Info Cards */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/calendar')}
            className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-[#4C2058]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#4C2058]/50 font-bold tracking-wider">DATUM A ČAS</p>
              <p className="font-black text-[#4C2058] mt-0.5">{event.date}</p>
              <p className="text-sm text-[#4C2058]/60 font-bold mt-0.5">{event.time}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#4C2058]/30 flex-shrink-0" />
          </motion.button>

          <motion.a
            href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="block bg-white rounded-3xl p-6 shadow-lg flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <div className="w-14 h-14 bg-[#D0FADA] rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-7 h-7 text-[#4C2058]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#4C2058]/50 font-bold tracking-wider">MÍSTO</p>
              <p className="font-black text-[#4C2058] mt-0.5">{event.location}</p>
              <p className="text-xs text-[#4C2058]/40 font-bold mt-1">Otevřít v mapách →</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#4C2058]/30 flex-shrink-0" />
          </motion.a>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-7 shadow-lg"
        >
          <h2 className="text-xl font-black mb-4 text-[#4C2058]">O této přednášce</h2>
          <p className="text-[#4C2058]/70 leading-relaxed text-base">
            {event.description}
          </p>
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-sm text-[#4C2058]/50 font-bold">Pořádá</p>
            <p className="font-black text-[#4C2058] mt-1">{event.organizer}</p>
          </div>
        </motion.div>

        {/* Attendees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-7 shadow-lg"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-[#4C2058]">Kdo přijde?</h2>
            <span className="text-sm text-[#4C2058]/50 font-bold">{event.attendees} lidí</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {mockAttendees.map((attendee, index) => (
                <motion.div
                  key={attendee.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden"
                >
                  <img src={attendee.avatar} alt={attendee.name} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Users className="w-5 h-5 text-[#4C2058]" />
              <span className="font-black text-[#4C2058]">+{event.attendees - 5} dalších</span>
            </div>
          </div>
        </motion.div>

        {/* Rating & Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-7 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-5">
            <MessageCircle className="w-6 h-6 text-[#4C2058]" />
            <h2 className="text-xl font-black text-[#4C2058]">Ohodnoťte tuto přednášku</h2>
          </div>
          
          {event.attended ? (
            <AnimatePresence mode="wait">
              {reviewSubmitted && submittedReview ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="font-black text-lg text-[#4C2058] mb-3">Děkujeme za hodnocení!</h3>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= submittedReview.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[#4C2058]/60 text-sm italic">"{submittedReview.text}"</p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, scale: 0.9 }}>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoveredStar || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </motion.button>
                    ))}
                    {rating > 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-3 text-sm font-bold text-[#4C2058]/70"
                      >
                        {rating === 1 && 'Slabé'}
                        {rating === 2 && 'Nic moc'}
                        {rating === 3 && 'Dobré'}
                        {rating === 4 && 'Velmi dobré'}
                        {rating === 5 && 'Výborné!'}
                      </motion.span>
                    )}
                  </div>

                  {/* Review Text Area */}
                  <AnimatePresence>
                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-5"
                      >
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Napište svůj názor na přednášku..."
                          className="w-full p-5 bg-[#D0FADA]/30 rounded-2xl border-2 border-transparent focus:border-[#4C2058]/30 focus:outline-none resize-none text-[#4C2058] placeholder:text-[#4C2058]/40 font-bold text-sm"
                          rows={3}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSubmitReview}
                          disabled={!reviewText.trim()}
                          className={`mt-3 w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all ${
                            reviewText.trim()
                              ? 'bg-[#4C2058] text-white shadow-lg shadow-[#4C2058]/30 hover:shadow-xl'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-5 h-5" />
                          Odeslat hodnocení
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="text-center py-8 bg-[#D0FADA]/20 rounded-2xl">
              <Clock className="w-8 h-8 text-[#4C2058]/40 mx-auto mb-3" />
              <p className="font-bold text-[#4C2058]/50 text-sm">
                Hodnocení bude dostupné po absolvování přednášky
              </p>
            </div>
          )}

          {/* Past Reviews */}
          <div className="space-y-4 pt-6 mt-5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#4C2058]">Minulé recenze</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-black text-[#4C2058]">4.8</span>
                <span className="text-sm text-[#4C2058]/50">(127)</span>
              </div>
            </div>

            {mockReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-[#D0FADA]/30 rounded-2xl p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src={review.avatar} 
                    alt={review.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-sm text-[#4C2058]">{review.author}</p>
                      <span className="text-xs text-[#4C2058]/50">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#4C2058]/70 leading-relaxed pl-13">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky RSVP Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#D0FADA] via-[#D0FADA] to-transparent">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsInterested(!isInterested)}
          className={`w-full py-5 rounded-3xl font-black text-lg shadow-2xl transition-all ${
            isInterested
              ? 'bg-gray-200 text-[#4C2058]'
              : 'bg-[#4C2058] text-white'
          }`}
        >
          {isInterested ? "✓ Mám zájem" : "Mám zájem"}
        </motion.button>
      </div>
    </div>
  );
}