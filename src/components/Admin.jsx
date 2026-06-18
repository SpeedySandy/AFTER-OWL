import { useState, useEffect } from 'react';
import { FALLBACK_PRODUCTS } from '../data/products.js';
import { driveThumb } from '../config.js';

const HASH_KEY    = 'ao_admin_hash';
const SESSION_KEY = 'ao_admin_ok';
const PRODUCTS_KEY = 'ao_admin_products';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const BLANK_PRODUCT = {
  sku: '', name: '', category: '', price: '', stock: '',
  handmade: false, driveId: '', description: '', tags: '',
  materials: '', size: '', weight: '',
  gradient: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
};

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!product) return BLANK_PRODUCT;
    return {
      ...product,
      price:    String(product.price ?? ''),
      stock:    String(product.stock ?? ''),
      tags:     (product.tags ?? []).join(', '),
      driveId:  product._driveId ?? '',
    };
  });

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const driveId = form.driveId.trim();
    onSave({
      ...form,
      id:       product?.id ?? Date.now(),
      price:    parseFloat(form.price) || 0,
      stock:    parseInt(form.stock, 10) || 0,
      tags:     form.tags.split(',').map(t => t.trim()).filter(Boolean),
      image:    driveId ? driveThumb(driveId) : (product?.image ?? null),
      _driveId: driveId || product?._driveId || null,
      gradient: form.gradient || BLANK_PRODUCT.gradient,
    });
  }

  const field = (label, key, opts = {}) => (
    <label className="af-label">
      {label}
      {opts.textarea
        ? <textarea value={form[key] ?? ''} onChange={e => set(key, e.target.value)} rows={opts.rows || 3} />
        : <input type={opts.type || 'text'} value={form[key] ?? ''} onChange={e => set(key, e.target.value)} placeholder={opts.placeholder || ''} />}
    </label>
  );

  return (
    <div className="af-overlay">
      <form className="af-form" onSubmit={handleSubmit}>
        <h3>{product ? 'Edit Product' : 'New Product'}</h3>

        <div className="af-row">
          {field('Name *', 'name')}
          {field('SKU', 'sku', { placeholder: 'e.g. ACC-FIRE-LEASH' })}
        </div>
        <div className="af-row">
          {field('Category', 'category', { placeholder: 'e.g. Accessories' })}
          {field('Price (€) *', 'price', { type: 'number', placeholder: '10' })}
          {field('Stock *', 'stock', { type: 'number', placeholder: '1' })}
        </div>

        {field('Description', 'description', { textarea: true, rows: 4 })}

        <div className="af-row">
          {field('Tags (comma-separated)', 'tags', { placeholder: 'festival, bag, neon' })}
          {field('Materials', 'materials', { placeholder: 'Nylon + metal' })}
        </div>
        <div className="af-row">
          {field('Size', 'size', { placeholder: '10 × 5 cm' })}
          {field('Weight', 'weight', { placeholder: '~50 g' })}
        </div>

        <label className="af-label">
          Google Drive File ID (photo)
          <input
            value={form.driveId}
            onChange={e => set('driveId', e.target.value.trim())}
            placeholder="Paste the ID from the Drive share URL"
          />
          {(form.driveId || form._driveId) && (
            <img
              src={driveThumb(form.driveId || form._driveId)}
              alt="preview"
              className="af-img-preview"
            />
          )}
        </label>

        <label className="af-label af-label--row">
          <input type="checkbox" checked={!!form.handmade} onChange={e => set('handmade', e.target.checked)} />
          Handmade
        </label>

        <label className="af-label">
          Gradient (CSS) — used when no photo
          <input value={form.gradient} onChange={e => set('gradient', e.target.value)} />
          <div className="af-gradient-preview" style={{ background: form.gradient }} />
        </label>

        <div className="af-form-actions">
          <button type="submit" className="af-btn af-btn--primary">Save</button>
          <button type="button" onClick={onCancel} className="af-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// ── Auth views ──────────────────────────────────────────────────────────────

function AuthView({ mode, onDone, onClose }) {
  const [pw,  setPw]  = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    if (mode === 'setup') {
      if (pw.length < 6) return setErr('Password must be at least 6 characters.');
      if (pw !== pw2)    return setErr('Passwords do not match.');
      localStorage.setItem(HASH_KEY, await sha256(pw));
      sessionStorage.setItem(SESSION_KEY, '1');
      onDone();
    } else {
      const ok = (await sha256(pw)) === localStorage.getItem(HASH_KEY);
      if (ok) { sessionStorage.setItem(SESSION_KEY, '1'); onDone(); }
      else setErr('Wrong password.');
    }
  }

  return (
    <div className="af-overlay">
      <div className="af-auth-box">
        <h3>{mode === 'setup' ? '🔐 Set Admin Password' : '🔐 Admin Login'}</h3>
        {mode === 'setup' && <p>First-time setup — choose a password to protect this panel.</p>}
        <form onSubmit={submit}>
          <input type="password" placeholder="Password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(''); }} autoFocus />
          {mode === 'setup' && (
            <input type="password" placeholder="Confirm password" value={pw2}
              onChange={e => { setPw2(e.target.value); setErr(''); }} />
          )}
          {err && <p className="af-error">{err}</p>}
          <div className="af-form-actions">
            <button type="submit" className="af-btn af-btn--primary">
              {mode === 'setup' ? 'Set Password' : 'Login'}
            </button>
            <button type="button" onClick={onClose} className="af-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Admin component ────────────────────────────────────────────────────

export default function Admin({ onClose }) {
  const [view,    setView]    = useState('loading'); // loading|setup|login|panel
  const [products, setProducts] = useState([]);
  const [editing, setEditing]  = useState(null);   // null = list, {} = new, {…} = existing
  const [search,  setSearch]   = useState('');
  const [changed, setChanged]  = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) { load(); setView('panel'); return; }
    setView(localStorage.getItem(HASH_KEY) ? 'login' : 'setup');
  }, []);

  function load() {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    setProducts(stored ? JSON.parse(stored) : structuredClone(FALLBACK_PRODUCTS));
  }

  function save(next) {
    setProducts(next);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
    setChanged(true);
  }

  function handleSave(product) {
    const next = editing?.id
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, product];
    save(next);
    setEditing(null);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    save(products.filter(p => p.id !== id));
  }

  function handleReset() {
    if (!window.confirm('Reset ALL products to defaults? All edits will be lost.')) return;
    localStorage.removeItem(PRODUCTS_KEY);
    load();
    setChanged(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setView('login');
  }

  if (view === 'loading') return null;

  if (view === 'setup' || view === 'login') {
    return (
      <AuthView
        mode={view}
        onDone={() => { load(); setView('panel'); }}
        onClose={onClose}
      />
    );
  }

  if (editing !== null) {
    return (
      <ProductForm
        product={editing.id ? editing : null}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  const q = search.toLowerCase();
  const visible = q
    ? products.filter(p => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
    : products;

  return (
    <div className="af-panel">
      <div className="af-panel-header">
        <h2>Admin — Products ({products.length})</h2>
        <div className="af-panel-actions">
          <button className="af-btn af-btn--primary" onClick={() => setEditing({})}>+ Add Product</button>
          <button className="af-btn" onClick={handleReset}>Reset to Defaults</button>
          <button className="af-btn" onClick={handleLogout}>Logout</button>
          <button className="af-btn af-btn--close" onClick={onClose}>✕ Close</button>
        </div>
      </div>

      {changed && (
        <div className="af-banner">
          Changes saved — reload the main page to see them in the shop.
        </div>
      )}

      <div className="af-search-bar">
        <input
          type="search"
          placeholder="Filter products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="af-product-list">
        {visible.map(p => (
          <div key={p.id} className="af-product-row">
            <div
              className="af-row-thumb"
              style={p.image ? undefined : { background: p.gradient || '#222' }}
            >
              {p.image && <img src={p.image} alt={p.name} />}
            </div>
            <div className="af-row-info">
              <strong>{p.name}</strong>
              <span>{p.category} · €{p.price} · Stock: {p.stock}</span>
              <code>{p.sku}</code>
            </div>
            <div className="af-row-actions">
              <button className="af-btn" onClick={() => setEditing(p)}>Edit</button>
              <button className="af-btn af-btn--danger" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
