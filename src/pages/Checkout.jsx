import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { OrderSummary } from '../components/Cart'
import { EmptyState } from '../components/ui'

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' }
const RULES = {
  name: v => v.trim().length >= 2 || 'Enter your full name',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email, like name@example.com',
  phone: v => /^[6-9]\d{9}$/.test(v) || 'Enter a 10-digit mobile number',
  address: v => v.trim().length >= 5 || 'Enter your street address',
  city: v => v.trim() !== '' || 'Enter your city',
  state: v => v.trim() !== '' || 'Enter your state',
  pincode: v => /^\d{6}$/.test(v) || 'Enter a 6-digit pincode',
}
const FIELDS = [['name', 'Full Name', 'sm:col-span-2'], ['email', 'Email'], ['phone', 'Phone Number'], ['address', 'Address', 'sm:col-span-2'], ['city', 'City'], ['state', 'State'], ['pincode', 'Pincode']]

export default function Checkout() {
  const { cartItems, placeOrder, toast } = useStore(), nav = useNavigate()
  const [form, setForm] = useState(EMPTY), [errors, setErrors] = useState({}), [busy, setBusy] = useState(false)
  if (!cartItems.length && !busy) return <EmptyState icon={ShoppingBag} title="Nothing to check out" text="Add a book to your cart first." to="/books" cta="Browse Books" />

  const validate = () => Object.fromEntries(Object.keys(RULES).map(k => [k, RULES[k](form[k])]).filter(([, r]) => r !== true))
  const change = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: RULES[k](v) === true ? undefined : e[k] })) }
  const submit = e => {
    e.preventDefault()
    const errs = validate(); setErrors(errs)
    if (Object.keys(errs).length) return toast('Please fill all required fields', 'error')
    setBusy(true)
    setTimeout(() => { const order = placeOrder(form); nav('/order-success', { state: { orderId: order.id }, replace: true }) }, 600)
  }
  return <form onSubmit={submit} noValidate className="space-y-6"><h1 className="font-display text-3xl">Checkout</h1>
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card grid gap-4 p-6 sm:grid-cols-2"><h2 className="font-display text-xl sm:col-span-2">Customer information</h2>
        {FIELDS.map(([k, label, span = '']) => <div key={k} className={span}>
          <label htmlFor={k} className="text-sm font-medium">{label}</label>
          <input id={k} value={form[k]} onChange={e => change(k, e.target.value)} aria-invalid={!!errors[k]}
            inputMode={['phone', 'pincode'].includes(k) ? 'numeric' : undefined} className={`input mt-1 ${errors[k] ? '!border-red-500' : ''}`} />
          {errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>}</div>)}</div>
      <OrderSummary showItems><button className="btn-primary w-full" disabled={busy}>{busy ? 'Placing order…' : 'Place Order'}</button></OrderSummary></div></form>
}
