import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Cover, money } from './ui'
import { useStore, FREE_DELIVERY_ABOVE } from '../context/StoreContext'

export function CartItem({ item }) {
  const { setQty, removeFromCart } = useStore()
  return <div className="card flex gap-4 p-4">
    <Link to={`/books/${item.id}`} className="w-20 shrink-0"><Cover book={item} className="!p-2 [&_p]:text-[10px] [&_span]:hidden" /></Link>
    <div className="flex-1 min-w-0"><h3 className="font-semibold truncate">{item.title}</h3><p className="text-sm text-slate-500">{item.author} · {money(item.price)}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-xl border">
          <button aria-label="Decrease" className="p-2 disabled:opacity-40" disabled={item.qty <= 1} onClick={() => setQty(item.id, item.qty - 1)}><Minus size={14} /></button>
          <span className="w-8 text-center text-sm">{item.qty}</span>
          <button aria-label="Increase" className="p-2" onClick={() => setQty(item.id, item.qty + 1)}><Plus size={14} /></button></div>
        <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 inline-flex items-center gap-1"><Trash2 size={14} />Remove</button>
        <span className="ml-auto font-bold">{money(item.price * item.qty)}</span></div></div></div>
}
export function OrderSummary({ children, showItems }) {
  const { cartItems, itemCount, subtotal, delivery, total } = useStore()
  const Row = ({ a, b, bold }) => <div className={`flex justify-between gap-3 ${bold ? 'text-lg font-bold pt-3 border-t' : 'text-slate-600'}`}><span>{a}</span><span>{b}</span></div>
  return <aside className="card p-5 space-y-3 lg:sticky lg:top-24 h-fit"><h2 className="font-display text-xl">Order summary</h2>
    {showItems ? cartItems.map(i => <Row key={i.id} a={`${i.title} × ${i.qty}`} b={money(i.price * i.qty)} />) : <Row a="Total items" b={itemCount} />}
    <Row a="Subtotal" b={money(subtotal)} /><Row a="Delivery" b={delivery ? money(delivery) : 'Free'} />
    {delivery > 0 && <p className="text-xs text-brand-700">Add {money(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery</p>}
    <Row a="Final total" b={money(total)} bold />{children}</aside>
}
