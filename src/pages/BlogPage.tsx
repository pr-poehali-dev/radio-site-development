import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API = 'https://functions.poehali.dev/bacdb4c1-d79e-4045-bfec-54f6c043082e';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ─── Публичный блог ────────────────────────────────────────────────────────

function PostCard({ post, onClick }: { post: Post; onClick: () => void }) {
  const preview = post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content;
  return (
    <div
      onClick={onClick}
      className="glass rounded-2xl p-6 border border-white/8 hover:border-[rgba(255,45,120,0.4)] transition-all duration-300 cursor-pointer group"
      style={{ animation: 'fade-in 0.5s ease-out both' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-rubik text-white/30 uppercase tracking-widest">{formatDate(post.created_at)}</span>
      </div>
      <h3 className="font-oswald font-600 text-xl text-white uppercase mb-3 group-hover:text-[var(--neon-pink)] transition-colors">
        {post.title}
      </h3>
      <p className="font-rubik text-white/50 text-sm leading-relaxed whitespace-pre-wrap">{preview}</p>
      {post.content.length > 200 && (
        <span className="mt-3 inline-block font-rubik text-xs neon-text-pink">Читать далее →</span>
      )}
    </div>
  );
}

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative glass rounded-3xl border border-white/10 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        style={{ boxShadow: '0 0 60px rgba(255,45,120,0.15)', animation: 'fade-in 0.3s ease-out' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>
        <span className="text-xs font-rubik text-white/30 uppercase tracking-widest block mb-3">{formatDate(post.created_at)}</span>
        <h2 className="font-oswald font-700 text-3xl text-white uppercase mb-5">{post.title}</h2>
        <p className="font-rubik text-white/70 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
}

// ─── Админка ───────────────────────────────────────────────────────────────

function AdminPanel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const headers = { 'Content-Type': 'application/json', 'X-Admin-Password': password };

  const loadPosts = async () => {
    setLoading(true);
    const res = await fetch(API);
    setPosts(await res.json());
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const openCreate = () => {
    setForm({ title: '', content: '' });
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (p: Post) => {
    setForm({ title: p.title, content: p.content });
    setEditing(p);
    setCreating(false);
  };

  const closeForm = () => { setCreating(false); setEditing(null); setError(''); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) { setError('Заполни заголовок и текст'); return; }
    setSaving(true);
    setError('');
    if (creating) {
      const res = await fetch(API, { method: 'POST', headers, body: JSON.stringify(form) });
      if (!res.ok) { setError('Ошибка сохранения'); setSaving(false); return; }
    } else if (editing) {
      const res = await fetch(`${API}?id=${editing.id}`, { method: 'PUT', headers, body: JSON.stringify(form) });
      if (!res.ok) { setError('Ошибка сохранения'); setSaving(false); return; }
    }
    setSaving(false);
    closeForm();
    loadPosts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот пост?')) return;
    await fetch(`${API}?id=${id}`, { method: 'DELETE', headers });
    loadPosts();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="font-oswald text-sm uppercase tracking-widest neon-text-cyan block mb-1">— Управление —</span>
          <h2 className="font-oswald font-700 text-4xl text-white uppercase">Блог</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-oswald font-600 text-sm uppercase tracking-wider text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #8B0033)', boxShadow: '0 0 20px rgba(255,45,120,0.3)' }}
          >
            <Icon name="Plus" size={16} /> Новый пост
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-rubik text-sm text-white/40 hover:text-white glass border border-white/10 transition-all"
          >
            <Icon name="LogOut" size={16} /> Выйти
          </button>
        </div>
      </div>

      {/* Форма создания/редактирования */}
      {(creating || editing) && (
        <div className="glass rounded-2xl border border-white/10 p-6 mb-8 relative overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(255,45,120,0.1)', animation: 'fade-in 0.3s ease-out' }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />
          <h3 className="font-oswald font-600 text-xl text-white uppercase mb-5">
            {creating ? 'Новый пост' : 'Редактировать'}
          </h3>
          <div className="flex flex-col gap-4">
            <input
              placeholder="Заголовок"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder-white/30 outline-none focus:border-[var(--neon-pink)] transition-all"
            />
            <textarea
              placeholder="Текст поста..."
              rows={8}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder-white/30 outline-none focus:border-[var(--neon-pink)] transition-all resize-none"
            />
            {error && <p className="text-red-400 font-rubik text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl font-oswald font-600 text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #FF2D78, #8B0033)' }}
              >
                {saving ? 'Сохраняю...' : 'Сохранить'}
              </button>
              <button
                onClick={closeForm}
                className="px-6 py-3 rounded-xl font-rubik text-sm text-white/50 hover:text-white glass border border-white/10 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Список постов */}
      {loading ? (
        <div className="text-center py-20 text-white/30 font-rubik">Загрузка...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-oswald text-xl text-white/30 uppercase">Постов пока нет</p>
          <p className="font-rubik text-white/20 text-sm mt-2">Нажми «Новый пост» чтобы начать</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map(post => (
            <div key={post.id} className="glass rounded-2xl p-5 border border-white/8 flex items-start gap-4 group">
              <div className="flex-1 min-w-0">
                <div className="font-oswald font-600 text-lg text-white uppercase truncate">{post.title}</div>
                <div className="font-rubik text-xs text-white/30 mt-1">{formatDate(post.created_at)}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(post)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center glass border border-white/10 hover:border-[var(--neon-cyan)] transition-all"
                  title="Редактировать"
                >
                  <Icon name="Pencil" size={15} style={{ color: 'var(--neon-cyan)' }} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center glass border border-white/10 hover:border-red-500 transition-all"
                  title="Удалить"
                >
                  <Icon name="Trash2" size={15} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': pwd },
      body: JSON.stringify({ title: '_check_', content: '_check_' }),
    });
    setLoading(false);
    if (res.status === 403) { setError('Неверный пароль'); return; }
    // Если 201 — успех (тестовый пост создан), сразу удалим его
    if (res.status === 201) {
      const data = await res.json();
      await fetch(`${API}?id=${data.id}`, { method: 'DELETE', headers: { 'X-Admin-Password': pwd } });
    }
    onLogin(pwd);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass rounded-3xl border border-white/10 p-10 w-full max-w-sm relative overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(255,45,120,0.1)', animation: 'fade-in 0.4s ease-out' }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--neon-pink), transparent)' }} />
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(255,45,120,0.15)', border: '1px solid rgba(255,45,120,0.3)' }}>
            <Icon name="Lock" size={24} style={{ color: 'var(--neon-pink)' }} />
          </div>
          <h2 className="font-oswald font-700 text-2xl text-white uppercase">Вход для админа</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Пароль"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-white placeholder-white/30 outline-none focus:border-[var(--neon-pink)] transition-all"
            autoFocus
          />
          {error && <p className="text-red-400 font-rubik text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !pwd}
            className="w-full py-3 rounded-xl font-oswald font-600 text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #FF2D78, #8B0033)', boxShadow: '0 0 20px rgba(255,45,120,0.3)' }}
          >
            {loading ? 'Проверяю...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Главная страница блога ────────────────────────────────────────────────

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Post | null>(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPwd, setAdminPwd] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); });
  }, [adminMode]);

  const handleLogin = (pwd: string) => {
    setAdminPwd(pwd);
    setAdminMode(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setAdminMode(false);
    setAdminPwd('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Навбар */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-dark border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
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
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="font-rubik text-sm text-white/50 hover:text-white uppercase tracking-widest transition-colors">
            ← На главную
          </a>
          {!adminMode && (
            <button
              onClick={() => setShowLogin(true)}
              className="font-rubik text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              <Icon name="Settings" size={16} />
            </button>
          )}
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        {adminMode ? (
          <AdminPanel password={adminPwd} onLogout={handleLogout} />
        ) : showLogin ? (
          <div className="max-w-3xl mx-auto">
            <LoginForm onLogin={handleLogin} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16" style={{ animation: 'fade-in 0.5s ease-out' }}>
              <span className="font-oswald text-sm uppercase tracking-widest neon-text-cyan mb-3 block">
                — Новости и анонсы —
              </span>
              <h1 className="font-oswald font-700 text-5xl md:text-6xl text-white uppercase">Блог</h1>
            </div>

            {loading ? (
              <div className="text-center py-20 text-white/30 font-rubik">Загрузка...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-oswald text-2xl text-white/20 uppercase">Постов пока нет</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => setSelected(post)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
