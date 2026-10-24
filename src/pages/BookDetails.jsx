import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingCart, BookX } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { Cover, Stars, StockBadge, EmptyState, money } from '../components/ui'

export default function BookDetails() {
  const { id } = useParams(), { getBook, addToCart, inCart } = useStore()
  const [qty, setQty] = useState(1), book = getBook(id)
  if (!book) return <EmptyState icon={BookX} title="Book not found" text="This book isn't in our catalogue." to="/books" cta="Back to Books" />
  const available = Math.max(0, book.stock - inCart(book.id)), out = book.stock === 0
  return <div className="space-y-6">
    <Link to="/books" className="btn-ghost"><ArrowLeft size={16} />Back to Books</Link>
    <div className="card grid gap-8 p-6 md:grid-cols-[320px_1fr]">
      <Cover book={book} className="mx-auto w-full max-w-xs" />
      <div className="space-y-4"><span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">{book.category}</span>
        <h1 className="font-display text-3xl md:text-4xl">{book.title}</h1><p className="text-slate-500">by {book.author}</p>
        <div className="flex items-center gap-3"><Stars value={book.rating} /><StockBadge stock={book.stock} /></div>
        <p className="max-w-prose text-slate-700 leading-relaxed">{book.description}</p>
        <p className="text-3xl font-bold">{money(book.price)}</p>
        <p className="text-sm text-slate-500">{out ? 'Out of Stock' : `${book.stock} copies available`}</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-xl border">
            <button aria-label="Decrease" className="p-3 disabled:opacity-40" disabled={out || qty <= 1} onClick={() => setQty(q => q - 1)}><Minus size={14} /></button>
            <span className="w-10 text-center">{out ? 0 : qty}</span>
            <button aria-label="Increase" className="p-3 disabled:opacity-40" disabled={out || qty >= available} onClick={() => setQty(q => q + 1)}><Plus size={14} /></button></div>
          <button className="btn-primary" disabled={out || available === 0} onClick={() => { addToCart(book.id, qty); setQty(1) }}><ShoppingCart size={16} />{out ? 'Out of Stock' : 'Add to Cart'}</button></div>
        {!out && available === 0 && <p className="text-sm text-amber-700">You already have every available copy in your cart.</p>}</div></div></div>
}
