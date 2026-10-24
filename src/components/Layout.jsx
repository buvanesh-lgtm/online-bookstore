import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BookOpen, ShoppingCart, Search, User, Menu, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const links = [['/', 'Home'], ['/books', 'Books'], ['/cart', 'Cart'], ['/orders', 'Orders'], ['/admin/stock', 'Admin/Stock']]

export function Navbar() {
  const { itemCount } = useStore(), nav = useNavigate()
  const [open, setOpen] = useState(false), [q, setQ] = useState('')
  const cls = ({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-100'}`
  const search = e => { e.preventDefault(); nav(`/books?q=${encodeURIComponent(q)}`); setOpen(false) }
  const searchBox = <form onSubmit={search} className="relative">
    <Search size={16} className="absolute left-3 top-3 text-slate-400" />
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search title or author" className="input pl-9 !py-2 lg:w-60" /></form>
  return <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
    <div className="mx-auto max-w-7xl flex items-center gap-4 px-4 h-16">
      <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold"><BookOpen className="text-brand-700" />BookNest</Link>
      <nav className="hidden md:flex gap-1 ml-4">{links.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={cls}>{l}</NavLink>)}</nav>
      <div className="ml-auto flex items-center gap-3"><div className="hidden md:block">{searchBox}</div>
        <Link to="/cart" aria-label="Cart" className="relative p-2"><ShoppingCart size={20} />
          {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-700 px-1 text-[11px] text-white">{itemCount}</span>}</Link>
        <button className="p-2 hidden sm:block" aria-label="Account"><User size={20} /></button>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button></div></div>
    {open && <div className="md:hidden border-t px-4 py-3 space-y-2 bg-white">{searchBox}
      {links.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={cls}>{l}</NavLink>)}</div>}
  </header>
}
export const Footer = () => <footer className="mt-16 border-t bg-white"><div className="mx-auto max-w-7xl px-4 py-8 flex flex-wrap justify-between gap-4 text-sm text-slate-500">
  <span className="font-display text-lg text-ink">BookNest</span><span>Free delivery above ₹500 · Demo project, no real payments</span></div></footer>
