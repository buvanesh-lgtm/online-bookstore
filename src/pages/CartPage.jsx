import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { CartItem, OrderSummary } from '../components/Cart'
import { EmptyState } from '../components/ui'

export default function CartPage() {
  const { cartItems } = useStore(), nav = useNavigate()
  if (!cartItems.length) return <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Pick a few books you'd like to read." to="/books" cta="Browse Books" />
  return <div className="space-y-6"><h1 className="font-display text-3xl">Your cart</h1>
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><div className="space-y-4">{cartItems.map(i => <CartItem key={i.id} item={i} />)}</div>
      <OrderSummary><button className="btn-primary w-full" onClick={() => nav('/checkout')}>Proceed to Checkout</button>
        <Link to="/books" className="btn-ghost w-full">Continue Shopping</Link></OrderSummary></div></div>
}
