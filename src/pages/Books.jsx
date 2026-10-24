import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/books'
import { BookGrid } from '../components/Books'
import { EmptyState } from '../components/ui'

const DEFAULTS = { q: '', category: 'All', maxPrice: '1500', minRating: '0', inStock: '', sort: 'name' }

export default function Books() {
  const { books } = useStore()
  const [params, setParams] = useSearchParams()          // filters live in the URL, so they survive navigation
  const f = { ...DEFAULTS, ...Object.fromEntries(params) }
  const set = (k, v) => setParams(p => { const n = new URLSearchParams(p); v === DEFAULTS[k] ? n.delete(k) : n.set(k, v); return n }, { replace: true })

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase()
    return books.filter(b => (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
      && (f.category === 'All' || b.category === f.category) && b.price <= +f.maxPrice && b.rating >= +f.minRating && (!f.inStock || b.stock > 0))
      .sort((a, b) => ({ 'price-asc': a.price - b.price, 'price-desc': b.price - a.price, rating: b.rating - a.rating, name: a.title.localeCompare(b.title) })[f.sort])
  }, [books, params])

  const Field = ({ label, children }) => <label className="block text-sm font-medium space-y-1"><span>{label}</span>{children}</label>
  return <div className="space-y-6">
    <h1 className="font-display text-3xl">Books</h1>
    <div className="relative"><Search size={18} className="absolute left-3 top-3 text-slate-400" />
      <input className="input pl-10" placeholder="Search by title or author" value={f.q} onChange={e => set('q', e.target.value)} /></div>
    <div className="card grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-6 items-end">
      <Field label="Category"><select className="input" value={f.category} onChange={e => set('category', e.target.value)}><option>All</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></Field>
      <Field label={`Max price: ₹${f.maxPrice}`}><input type="range" min="300" max="1500" step="50" className="w-full accent-brand-700" value={f.maxPrice} onChange={e => set('maxPrice', e.target.value)} /></Field>
      <Field label="Rating"><select className="input" value={f.minRating} onChange={e => set('minRating', e.target.value)}><option value="0">Any</option><option value="4">4★ & up</option><option value="4.5">4.5★ & up</option></select></Field>
      <Field label="Sort by"><select className="input" value={f.sort} onChange={e => set('sort', e.target.value)}>
        <option value="name">Name</option><option value="price-asc">Price: Low → High</option><option value="price-desc">Price: High → Low</option><option value="rating">Rating</option></select></Field>
      <label className="flex items-center gap-2 text-sm py-2"><input type="checkbox" className="accent-brand-700" checked={!!f.inStock} onChange={e => set('inStock', e.target.checked ? '1' : '')} />In stock only</label>
      <button className="btn-ghost" onClick={() => setParams({})}>Clear filters</button></div>
    <p className="text-sm text-slate-500">{results.length} {results.length === 1 ? 'book' : 'books'} found</p>
    {results.length ? <BookGrid books={results} /> :
      <EmptyState icon={SearchX} title="No books match" text="Try a different title or author, or clear the filters." />}</div>
}
