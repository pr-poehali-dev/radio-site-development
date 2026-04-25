import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const STREAM_URL = 'https://stream.example.com/live'; // заглушка — замените реальным URL

const SHOWS = [
  { time: '08:00', name: 'Утренний заряд', host: 'DJ NOVA', active: true },
  { time: '10:00', name: 'TOP HIT MIX', host: 'DJ BEATS', active: false },
  { time: '13:00', name: 'Обеденный рейв', host: 'MC FLOW', active: false },
  { time: '16:00', name: 'Drive Time', host: 'DJ PULSE', active: false },
  { time: '20:00', name: 'Night Session', host: 'DJ DARK', active: false },
];

function Equalizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = [0.4, 0.7, 0.5, 1, 0.6, 0.8, 0.45, 0.9, 0.55, 0.75, 0.35, 0.65];
  return (
    <div className="flex items-end gap-[3px] h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[4px] rounded-sm bg-[var(--neon-pink)] origin-bottom"
          style={{
            height: `${h * 100}%`,
            animation: isPlaying ? `pulse-bar ${0.5 + Math.random() * 0.6}s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.07}s`,
            opacity: isPlaying ? 1 : 0.3,
            transform: isPlaying ? undefined : `scaleY(0.2)`,
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        />
      ))}
    </div>
  );
}

function VinylRecord({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-64 h-64 mx-auto select-none">
      <div
        className="absolute inset-0 rounded-full border-4 border-[var(--neon-pink)/30]"
        style={{
          background: 'conic-gradient(from 0deg, #1a0a1e, #0d1a2e, #1a0a1e, #0a1a0d, #1a0a1e)',
          animation: isPlaying ? 'spin-slow 12s linear infinite' : 'none',
          boxShadow: isPlaying
            ? '0 0 30px rgba(255,45,120,0.4), 0 0 60px rgba(255,45,120,0.2), inset 0 0 30px rgba(0,0,0,0.8)'
            : '0 0 10px rgba(255,45,120,0.1), inset 0 0 30px rgba(0,0,0,0.8)',
          transition: 'box-shadow 0.5s',
        }}
      >
        {[60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map(r => (
          <div
            key={r}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${r}px`, height: `${r}px`,
              top: `${(256 - r) / 2}px`, left: `${(256 - r) / 2}px`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FF2D78 0%, #8B0033 60%, #3d001a 100%)',
              boxShadow: isPlaying ? '0 0 20px rgba(255,45,120,0.8)' : 'none',
              transition: 'box-shadow 0.5s',
            }}
          />
        </div>
      </div>
      {isPlaying && (
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(255,45,120,0.1) 0%, transparent 70%)' }}
        />
      )}
    </div>
  );
}

function HeroSection({ onScrollToPlayer }: { onScrollToPlayer: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-noise">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF2D78 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ border: '1px solid var(--neon-pink)', animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-3"
          style={{ border: '1px solid var(--neon-cyan)', animation: 'float 8s ease-in-out infinite reverse' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-8 border border-[var(--neon-pink)/30]"
          style={{ animation: 'fade-in 0.5s ease-out forwards' }}>
          <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
          <span className="text-sm font-rubik text-white/70 uppercase tracking-widest">В эфире прямо сейчас</span>
        </div>

        <h1
          className="font-oswald font-700 leading-none mb-4 uppercase"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 9rem)',
            letterSpacing: '-0.02em',
            animation: 'fade-in 0.7s ease-out 0.1s both',
          }}
        >
          <span className="neon-text-pink">RADIO</span>{' '}
          <span className="text-white">PULSE</span>
        </h1>

        <p
          className="font-rubik text-white/50 text-lg md:text-xl mb-12 max-w-lg mx-auto"
          style={{ animation: 'fade-in 0.7s ease-out 0.3s both' }}
        >
          Живая музыка без остановок — 24 часа в сутки, 7 дней в неделю
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fade-in 0.7s ease-out 0.5s both' }}>
          <button
            onClick={onScrollToPlayer}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-oswald font-600 text-lg uppercase tracking-wider text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF2D78, #8B0033)',
              boxShadow: '0 0 30px rgba(255,45,120,0.5), 0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <Icon name="Radio" size={20} />
            Слушать эфир
          </button>
          <button
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-oswald font-600 text-lg uppercase tracking-wider text-white/80 hover:text-white border border-white/20 hover:border-[var(--neon-cyan)] transition-all duration-300 glass"
          >
            <Icon name="Calendar" size={20} />
            Расписание
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center"
        style={{ animation: 'fade-in 1s ease-out 0.8s both' }}>
        <button
          onClick={onScrollToPlayer}
          className="text-white/30 hover:text-white/60 transition-colors animate-float"
          aria-label="Прокрутить вниз"
        >
          <Icon name="ChevronDown" size={32} />
        </button>
      </div>
    </section>
  );
}

function PlayerSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <section id="player" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-oswald text-sm uppercase tracking-widest neon-text-cyan mb-3 block">
            — Прямой эфир —
          </span>
          <h2 className="font-oswald font-700 text-5xl md:text-6xl text-white uppercase">
            Плеер
          </h2>
        </div>

        <div
          className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: isPlaying ? '0 0 60px rgba(255,45,120,0.15), 0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.5)', transition: 'box-shadow 0.5s' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <VinylRecord isPlaying={isPlaying} />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: isPlaying ? 'var(--neon-green)' : 'rgba(255,255,255,0.3)' }} />
                  <span className="text-xs font-rubik uppercase tracking-widest text-white/40">
                    {isPlaying ? 'В эфире' : 'Не в эфире'}
                  </span>
                </div>
                <h3 className="font-oswald font-600 text-3xl text-white uppercase mb-1">Утренний заряд</h3>
                <p className="font-rubik text-white/50">DJ NOVA · RADIO PULSE FM</p>
              </div>

              <Equalizer isPlaying={isPlaying} />

              <div className="flex items-center gap-6">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #FF2D78, #8B0033)',
                    boxShadow: isPlaying
                      ? '0 0 30px rgba(255,45,120,0.7), 0 0 60px rgba(255,45,120,0.3)'
                      : '0 0 15px rgba(255,45,120,0.3)',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Icon name="Volume2" size={18} className="text-white/40" />
                    <input
                      type="range"
                      min={0} max={100}
                      value={volume}
                      onChange={e => setVolume(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(90deg, var(--neon-pink) ${volume}%, rgba(255,255,255,0.15) ${volume}%)`,
                        WebkitAppearance: 'none',
                      }}
                    />
                    <span className="text-xs font-rubik text-white/40 w-8 text-right">{volume}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {['#HipHop', '#Electronic', '#Live', '#Bass'].map(tag => (
                  <span key={tag} className="text-xs font-rubik px-3 py-1 rounded-full text-white/60 border border-white/10 glass">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={STREAM_URL} preload="none" />
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="font-oswald text-sm uppercase tracking-widest neon-text-cyan mb-3 block">
            — Программа передач —
          </span>
          <h2 className="font-oswald font-700 text-5xl md:text-6xl text-white uppercase">
            Эфир сегодня
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {SHOWS.map((show, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 flex items-center gap-5 border transition-all duration-300 hover:border-[var(--neon-pink)/50] group cursor-pointer"
              style={{
                borderColor: show.active ? 'rgba(255,45,120,0.4)' : 'rgba(255,255,255,0.06)',
                background: show.active ? 'rgba(255,45,120,0.08)' : undefined,
                boxShadow: show.active ? '0 0 30px rgba(255,45,120,0.1)' : undefined,
                animation: `fade-in 0.5s ease-out ${i * 0.08}s both`,
              }}
            >
              <div className="text-center w-16 flex-shrink-0">
                <span className="font-oswald font-600 text-xl" style={{ color: show.active ? 'var(--neon-pink)' : 'rgba(255,255,255,0.4)' }}>
                  {show.time}
                </span>
              </div>

              <div className="w-px h-10 bg-white/10 flex-shrink-0" />

              <div className="flex-1">
                <div className="font-oswald font-600 text-white text-xl uppercase group-hover:text-[var(--neon-pink)] transition-colors">
                  {show.name}
                </div>
                <div className="font-rubik text-sm text-white/40">{show.host}</div>
              </div>

              {show.active && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
                  <span className="font-rubik text-xs text-[var(--neon-green)] uppercase tracking-widest">В эфире</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contacts" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 bottom-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF2D78 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="font-oswald text-sm uppercase tracking-widest neon-text-cyan mb-3 block">
            — Связь с нами —
          </span>
          <h2 className="font-oswald font-700 text-5xl md:text-6xl text-white uppercase">
            Контакты
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-oswald font-600 text-2xl text-white uppercase mb-6">
                Хочешь в эфир?
              </h3>
              <p className="font-rubik text-white/50 leading-relaxed">
                Присылай свои треки, предложения по программе или просто напиши нам — мы всегда рады новым голосам!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: 'Mail', label: 'Email', value: 'hello@radiopulse.fm' },
                { icon: 'Phone', label: 'Телефон', value: '+7 (800) 123-45-67' },
                { icon: 'MapPin', label: 'Студия', value: 'Москва, Арбат, 36' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 glass rounded-2xl p-4 border border-white/6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,45,120,0.15)' }}>
                    <Icon name={icon} fallback="CircleAlert" size={18} style={{ color: 'var(--neon-pink)' }} />
                  </div>
                  <div>
                    <div className="font-rubik text-xs text-white/30 uppercase tracking-wider">{label}</div>
                    <div className="font-rubik text-white/80">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />

            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8"
                style={{ animation: 'fade-in 0.4s ease-out' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(57,255,20,0.15)', border: '1px solid var(--neon-green)' }}>
                  <Icon name="Check" size={28} style={{ color: 'var(--neon-green)' }} />
                </div>
                <p className="font-oswald font-600 text-2xl text-white uppercase">Сообщение отправлено!</p>
                <p className="font-rubik text-white/40">Мы свяжемся с тобой в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-oswald font-600 text-2xl text-white uppercase mb-2">Написать нам</h3>
                {[
                  { key: 'name', placeholder: 'Твоё имя', type: 'text' },
                  { key: 'phone', placeholder: 'Телефон', type: 'tel' },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder-white/30 outline-none focus:border-[var(--neon-pink)] focus:shadow-[0_0_15px_rgba(255,45,120,0.2)] transition-all"
                  />
                ))}
                <textarea
                  placeholder="Сообщение..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder-white/30 outline-none focus:border-[var(--neon-pink)] focus:shadow-[0_0_15px_rgba(255,45,120,0.2)] transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-oswald font-600 text-lg uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #FF2D78, #8B0033)',
                    boxShadow: '0 0 20px rgba(255,45,120,0.3)',
                  }}
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  const links = [
    { id: 'hero', label: 'Главная' },
    { id: 'player', label: 'Плеер' },
    { id: 'schedule', label: 'Эфир' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-white/5">
      <button onClick={() => scrollTo('hero')} className="font-oswald font-700 text-xl uppercase tracking-wider">
        <span className="neon-text-pink">RADIO</span>
        <span className="text-white"> PULSE</span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {links.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="font-rubik text-sm uppercase tracking-widest transition-colors"
            style={{ color: activeSection === id ? 'var(--neon-pink)' : 'rgba(255,255,255,0.5)' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
        <span className="font-rubik text-xs text-white/40 uppercase tracking-wider">Live</span>
      </div>
    </nav>
  );
}

export default function RadioPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const playerRef = useRef<HTMLDivElement>(null);

  const scrollToPlayer = () => {
    document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'player', 'schedule', 'contacts'];
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (const id of [...sections].reverse()) {
        const el = id === 'hero' ? document.body : document.getElementById(id);
        if (el) {
          const top = id === 'hero' ? 0 : (el as HTMLElement).offsetTop;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} />
      <div id="hero">
        <HeroSection onScrollToPlayer={scrollToPlayer} />
      </div>
      <div ref={playerRef}>
        <PlayerSection />
      </div>
      <ScheduleSection />
      <ContactSection />

      <footer className="border-t border-white/5 py-10 px-6 text-center">
        <div className="font-oswald font-700 text-2xl uppercase mb-2">
          <span className="neon-text-pink">RADIO</span>
          <span className="text-white"> PULSE</span>
        </div>
        <p className="font-rubik text-xs text-white/20 uppercase tracking-widest">
          © 2025 · Живая музыка 24/7 · Все права защищены
        </p>
      </footer>
    </div>
  );
}