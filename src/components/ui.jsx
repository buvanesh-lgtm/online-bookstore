import { Star, CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export const money = n => '₹' + Number(n).toLocaleString('en-IN')
export const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
export const stockStatus = n => n === 0 ? { label:'Out of Stock', cls:'bg-red-50 text-red-700' } : n <= 5 ? { label:'Low Stock', cls:'bg-amber-50 text-amber-700' } : { label:'In Stock', cls:'bg-emerald-50 text-emerald-700' }

export function Cover({ book, className = '' }) {
  const bg = `linear-gradient(145deg, hsl(${book.hue} 55% 32%), hsl(${(book.hue + 40) % 360} 60% 20%))`
  return <div style={{ background: bg }} className={`relative aspect-[3/4] rounded-lg shadow-md text-white flex flex-col justify-between p-4 overflow-hidden ${className}`}>
    <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/25" />
    <span className="text-[10px] opacity-70 pl-1">{book.category}</span>
    <p className="font-display font-bold leading-tight text-lg pl-1">{book.title}</p>
    <span className="text-xs opacity-80 pl-1">{book.author}</span></div>
}
export const Stars = ({ value }) => <span className="inline-flex items-center gap-1 text-sm"><Star size={14} className="fill-amber-400 text-amber-400" />{value.toFixed(1)}</span>
export const StockBadge = ({ stock }) => { const s = stockStatus(stock); return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span> }

const STATUS = { Pending:'bg-slate-100 text-slate-700', Confirmed:'bg-blue-50 text-blue-700', Shipped:'bg-violet-50 text-violet-700', Delivered:'bg-emerald-50 text-emerald-700', Cancelled:'bg-red-50 text-red-700' }
export const StatusBadge = ({ status }) => <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS[status]}`}>{status}</span>

export function EmptyState({ icon: Icon, title, text, to, cta }) {
  return <div className="card flex flex-col items-center text-center px-6 py-16 mx-auto max-w-lg">
    <div className="rounded-full bg-brand-50 p-4 text-brand-700 mb-4"><Icon size={32} /></div>
    <h2 className="font-display text-2xl">{title}</h2><p className="text-slate-500 mt-2 mb-6">{text}</p>
    {to && <Link to={to} className="btn-primary">{cta}</Link>}</div>
}
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
    <div role="dialog" aria-modal="true" className="card pop w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between mb-3"><h3 className="font-display text-xl">{title}</h3>
        <button onClick={onClose} aria-label="Close"><X size={18} /></button></div>{children}</div></div>
}
export const ConfirmationDialog = ({ open, title, message, onConfirm, onCancel }) =>
  <Modal open={open} onClose={onCancel} title={title}>
    <p className="text-slate-600 mb-5">{message}</p>
    <div className="flex justify-end gap-2"><button className="btn-ghost" onClick={onCancel}>Cancel</button><button className="btn-primary" onClick={onConfirm}>Confirm</button></div></Modal>

export function Toasts() {
  const { toasts } = useStore()
  const icon = { success: <CheckCircle2 size={18} className="text-emerald-600" />, error: <AlertCircle size={18} className="text-red-600" />, info: <Info size={18} className="text-blue-600" /> }
  return <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[60] flex flex-col gap-2 sm:w-80" aria-live="polite">
    {toasts.map(t => <div key={t.id} className="card pop flex items-center gap-2 px-4 py-3 text-sm shadow-lg">{icon[t.type]}{t.message}</div>)}</div>
}
