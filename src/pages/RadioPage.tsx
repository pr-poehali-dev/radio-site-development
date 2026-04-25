import { useRef, useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const RADIO_ID = '55119';


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
        <div className="flex justify-center mb-6" style={{ animation: 'fade-in 0.4s ease-out forwards' }}>
          <img
            src="https://cdn.poehali.dev/projects/6e50eadb-0f09-4bb9-ae52-5bf9e159fd4c/bucket/1bdd6d6a-68f6-42bf-8034-66dd5febd8fa.jpg"
            alt="AFisht Radio"
            className="w-24 h-24 rounded-2xl object-cover"
            style={{ boxShadow: '0 0 30px rgba(255,45,120,0.5), 0 0 60px rgba(255,45,120,0.2)' }}
          />
        </div>

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
          <span className="neon-text-pink">AFisht</span>{' '}
          <span className="text-white">Radio</span>
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
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement('script');
    script.src = `https://myradio24.com/player/player.js?v3.31`;
    script.setAttribute('data-radio', RADIO_ID);
    script.setAttribute('data-interval', '15');
    script.setAttribute('data-vmid', RADIO_ID);
    script.setAttribute('data-lang', 'ru');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

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
          style={{ boxShadow: '0 0 60px rgba(255,45,120,0.15), 0 20px 60px rgba(0,0,0,0.5)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Левая: обложка трека + инфо */}
            <div className="flex flex-col items-center gap-6">
              <div
                className="relative w-56 h-56 rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: '0 0 30px rgba(255,45,120,0.25)' }}
              >
                <div
                  data-myinfo="img"
                  style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'linear-gradient(135deg,#1a0a1e,#0d1a2e)' }}
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
                  <span className="text-xs font-rubik uppercase tracking-widest text-white/40">В эфире</span>
                  <span className="text-xs font-rubik text-white/30" data-myinfo="isonline" />
                </div>
                <div className="font-oswald font-600 text-xl text-white uppercase mb-1" data-myinfo="song">
                  Загрузка...
                </div>
                <div className="font-rubik text-sm text-white/40" data-myinfo="streamname" />
                <div className="font-rubik text-xs text-white/30 mt-1">
                  <span data-myinfo="listeners" /> слушателей · <span data-myinfo="kbps" /> kbps
                </div>
              </div>
            </div>

            {/* Правая: плеер + визуализатор + последние треки */}
            <div className="flex flex-col gap-6">
              {/* Плеер myradio24 */}
              <div className="flex justify-center">
                <div
                  id="my_player"
                  className="my_player"
                  data-player="energy"
                  data-skin="blue"
                  data-width="280"
                  data-autoplay="1"
                  data-volume="70"
                  data-streamurl={`https://myradio24.org/${RADIO_ID}`}
                />
              </div>

              {/* Визуализатор */}
              <div className="flex justify-center rounded-xl overflow-hidden"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,45,120,0.15)' }}>
                <canvas
                  className="my_visualizer"
                  width={280}
                  height={80}
                  data-size={64}
                  data-revert={0}
                  data-color="rgb"
                  style={{ display: 'block' }}
                />
              </div>

            </div>
          </div>
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
              <a href="mailto:fisht@mail.ru" className="flex items-center gap-4 glass rounded-2xl p-4 border border-white/6 hover:border-[rgba(255,45,120,0.4)] transition-colors group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,45,120,0.15)' }}>
                  <Icon name="Mail" size={18} style={{ color: 'var(--neon-pink)' }} />
                </div>
                <div>
                  <div className="font-rubik text-xs text-white/30 uppercase tracking-wider">Email</div>
                  <div className="font-rubik text-white/80 group-hover:text-white transition-colors">fisht@mail.ru</div>
                </div>
              </a>
              <a href="https://t.me/afisht" target="_blank" rel="noreferrer" className="flex items-center gap-4 glass rounded-2xl p-4 border border-white/6 hover:border-[rgba(0,245,255,0.4)] transition-colors group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,245,255,0.1)' }}>
                  <Icon name="Send" size={18} style={{ color: 'var(--neon-cyan)' }} />
                </div>
                <div>
                  <div className="font-rubik text-xs text-white/30 uppercase tracking-wider">Telegram</div>
                  <div className="font-rubik text-white/80 group-hover:text-white transition-colors">@afisht</div>
                </div>
              </a>
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
      <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
        <img
          src="https://cdn.poehali.dev/projects/6e50eadb-0f09-4bb9-ae52-5bf9e159fd4c/bucket/1bdd6d6a-68f6-42bf-8034-66dd5febd8fa.jpg"
          alt="AFisht Radio"
          className="w-9 h-9 rounded-lg object-cover"
          style={{ boxShadow: '0 0 10px rgba(255,45,120,0.4)' }}
        />
        <span className="font-oswald font-700 text-xl uppercase tracking-wider">
          <span className="neon-text-pink">AFisht</span>
          <span className="text-white"> Radio</span>
        </span>
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
      const sections = ['hero', 'player', 'contacts'];
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

      <ContactSection />

      <footer className="border-t border-white/5 py-10 px-6 text-center">
        <div className="font-oswald font-700 text-2xl uppercase mb-2">
          <span className="neon-text-pink">AFisht</span>
          <span className="text-white"> Radio</span>
        </div>
        <p className="font-rubik text-xs text-white/20 uppercase tracking-widest">
          © 2025 · Живая музыка 24/7 · Все права защищены
        </p>
      </footer>
    </div>
  );
}