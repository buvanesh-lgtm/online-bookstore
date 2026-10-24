import { Link, useLocation, useParams } from 'react-router-dom'
import { CheckCircle2, ClipboardList, ArrowLeft } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { StatusBadge, EmptyState, money, fmtDate } from '../components/ui'

function OrderCard({ order }) {
  const count = order.items.reduce((n, i) => n + i.qty, 0)
  return <div className="card flex flex-wrap items-center gap-4 p-5">
    <div className="flex-1 min-w-[180px]"><p className="font-semibold">{order.id}</p><p className="text-sm text-slate-500">{fmtDate(order.date)} · {count} {count === 1 ? 'item' : 'items'}</p></div>
    <StatusBadge status={order.status} /><p className="font-bold w-24 text-right">{money(order.total)}</p>
    <Link to={`/orders/${order.id}`} className="btn-ghost">View Details</Link></div>
}
export function Orders() {
  const { orders } = useStore()
  if (!orders.length) return <EmptyState icon={ClipboardList} title="No orders yet" text="Your orders will show up here." to="/books" cta="Browse Books" />
  return <div className="space-y-4"><h1 className="font-display text-3xl">Your orders</h1>{orders.map(o => <OrderCard key={o.id} order={o} />)}</div>
}
function Items({ order }) {
  return <div className="divide-y">{order.items.map(i => <div key={i.id} className="flex justify-between gap-3 py-2 text-sm"><span>{i.title} × {i.qty}</span><span>{money(i.price * i.qty)}</span></div>)}
    <div className="flex justify-between py-2 text-sm text-slate-500"><span>Delivery</span><span>{order.delivery ? money(order.delivery) : 'Free'}</span></div>
    <div className="flex justify-between pt-3 font-bold"><span>Total</span><span>{money(order.total)}</span></div></div>
}
export function OrderDetails() {
  const { id } = useParams(), { orders } = useStore(), order = orders.find(o => o.id === id)
  if (!order) return <EmptyState icon={ClipboardList} title="Order not found" text="We couldn't find that order." to="/orders" cta="View Orders" />
  const c = order.customer
  return <div className="space-y-6"><Link to="/orders" className="btn-ghost"><ArrowLeft size={16} />All orders</Link>
    <div className="card space-y-5 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="font-display text-2xl">{order.id}</h1><p className="text-sm text-slate-500">Placed on {fmtDate(order.date)}</p></div><StatusBadge status={order.status} /></div>
      <Items order={order} />
      <div className="text-sm text-slate-600"><p className="font-semibold text-ink">Delivering to</p>{c.name}, {c.address}, {c.city}, {c.state} {c.pincode}</div></div></div>
}
export function OrderSuccess() {
  const { state } = useLocation(), { orders } = useStore()
  const order = orders.find(o => o.id === state?.orderId)
  if (!order) return <EmptyState icon={ClipboardList} title="No recent order" text="Place an order to see its confirmation here." to="/books" cta="Browse Books" />
  return <div className="card mx-auto max-w-xl space-y-5 p-8 text-center"><CheckCircle2 size={56} className="mx-auto text-emerald-600" />
    <h1 className="font-display text-3xl">Order Placed Successfully</h1>
    <p className="text-slate-500">Order ID <b className="text-ink">{order.id}</b> · {fmtDate(order.date)}</p>
    <div className="text-left"><Items order={order} /></div>
    <p className="text-sm text-slate-600">Estimated delivery in 3–5 days to {order.customer.city}, {order.customer.pincode}.</p>
    <div className="flex flex-wrap justify-center gap-3"><Link to="/orders" className="btn-primary">View Orders</Link><Link to="/books" className="btn-ghost">Continue Shopping</Link></div></div>
}
