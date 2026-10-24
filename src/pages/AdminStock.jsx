import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { StockBadge, ConfirmationDialog, money } from '../components/ui'

export default function AdminStock() {
  const { books, updateStock, toast } = useStore()
  const [draft, setDraft] = useState({}), [pending, setPending] = useState(null)   // pending = {book, value}
  const request = (book, value) => {
    if (value < 0) return toast('Stock cannot be negative', 'error')
    if (!Number.isInteger(value)) return toast('Enter a whole number', 'error')
    setPending({ book, value })
  }
  const confirm = () => { updateStock(pending.book.id, pending.value); setDraft(d => ({ ...d, [pending.book.id]: undefined })); setPending(null) }
  return <div className="space-y-6"><h1 className="font-display text-3xl">Stock management</h1>
    <div className="card overflow-x-auto"><table className="w-full min-w-[760px] text-sm">
      <thead className="bg-slate-50 text-left text-slate-500"><tr>{['ID', 'Title', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
      <tbody className="divide-y">{books.map(b => <tr key={b.id}>
        <td className="px-4 py-3">{b.id}</td><td className="px-4 py-3 font-medium">{b.title}</td><td className="px-4 py-3">{b.category}</td>
        <td className="px-4 py-3">{money(b.price)}</td><td className="px-4 py-3 font-semibold">{b.stock}</td><td className="px-4 py-3"><StockBadge stock={b.stock} /></td>
        <td className="px-4 py-3"><div className="flex items-center gap-2">
          <button aria-label="Decrease stock" className="btn-ghost !p-2" disabled={b.stock === 0} onClick={() => request(b, b.stock - 1)}><Minus size={14} /></button>
          <button aria-label="Increase stock" className="btn-ghost !p-2" onClick={() => request(b, b.stock + 1)}><Plus size={14} /></button>
          <input type="number" min="0" aria-label="New stock" placeholder="Set" className="input !w-20 !py-1.5" value={draft[b.id] ?? ''} onChange={e => setDraft(d => ({ ...d, [b.id]: e.target.value }))} />
          <button className="btn-primary !py-1.5" disabled={draft[b.id] === undefined || draft[b.id] === ''} onClick={() => request(b, Number(draft[b.id]))}>Update</button></div></td></tr>)}</tbody></table></div>
    <ConfirmationDialog open={!!pending} title="Update stock?" onCancel={() => setPending(null)} onConfirm={confirm}
      message={pending && `Change "${pending.book.title}" from ${pending.book.stock} to ${pending.value} copies.${pending.value === 0 ? ' It will be marked Out of Stock.' : ''}`} /></div>
}
