import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { books as seed } from '../data/books'

const Ctx = createContext()
export const useStore = () => useContext(Ctx)
export const FREE_DELIVERY_ABOVE = 500, DELIVERY_FEE = 49

// Persist any state slice in localStorage
function usePersist(key, initial) {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial } })
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v])
  return [v, setV]
}
const demoCustomer = { name:'Demo User', city:'Chennai', state:'Tamil Nadu', pincode:'600001', address:'12 Lake View Road' }
const seedOrders = [
  { id:'BN-100231', date:'2026-10-02T10:30:00', status:'Delivered', items:[{id:6,title:'Atomic Habits',price:499,qty:1}], subtotal:499, delivery:49, total:548, customer:demoCustomer },
  { id:'BN-100317', date:'2026-10-18T16:05:00', status:'Shipped', items:[{id:2,title:'Clean Code',price:899,qty:1},{id:8,title:'The Hobbit',price:420,qty:2}], subtotal:1739, delivery:0, total:1739, customer:demoCustomer },
]

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersist('bn_cart', [])       // [{id, qty}]
  const [orders, setOrders] = usePersist('bn_orders', seedOrders)
  const [stock, setStock] = usePersist('bn_stock', Object.fromEntries(seed.map(b => [b.id, b.stock])))
  const [toasts, setToasts] = useState([])

  // Books merged with live stock. Swap for fetch('/api/books') when a backend exists.
  const books = seed.map(b => ({ ...b, stock: stock[b.id] ?? b.stock }))
  const getBook = id => books.find(b => b.id === Number(id))

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  const inCart = id => cart.find(c => c.id === id)?.qty || 0
  const addToCart = (id, qty = 1) => {
    const book = getBook(id)
    if (!book || book.stock === 0) return toast('Book is out of stock', 'error')
    if (inCart(id) + qty > book.stock) return toast(`Only ${book.stock} in stock`, 'error')
    setCart(c => c.some(x => x.id === id) ? c.map(x => x.id === id ? { ...x, qty: x.qty + qty } : x) : [...c, { id, qty }])
    toast('Book added to cart')
  }
  const setQty = (id, qty) => {
    const book = getBook(id)
    if (qty < 1) return
    if (qty > book.stock) return toast(`Only ${book.stock} in stock`, 'error')
    setCart(c => c.map(x => x.id === id ? { ...x, qty } : x))
  }
  const removeFromCart = id => { setCart(c => c.filter(x => x.id !== id)); toast('Item removed from cart', 'info') }

  const cartItems = cart.map(c => ({ ...getBook(c.id), qty: Math.min(c.qty, getBook(c.id)?.stock ?? 0) })).filter(i => i.id && i.qty > 0)
  const itemCount = cartItems.reduce((n, i) => n + i.qty, 0)
  const subtotal = cartItems.reduce((n, i) => n + i.qty * i.price, 0)
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  const placeOrder = customer => {
    const order = { id: 'BN-' + Math.floor(100000 + Math.random() * 900000), date: new Date().toISOString(), status: 'Confirmed',
      items: cartItems.map(({ id, title, price, qty }) => ({ id, title, price, qty })), subtotal, delivery, total, customer }
    setOrders(o => [order, ...o])
    setStock(s => { const n = { ...s }; cartItems.forEach(i => { n[i.id] = Math.max(0, (n[i.id] ?? 0) - i.qty) }); return n })
    setCart([])
    toast('Order placed successfully')
    return order
  }
  const updateStock = (id, value) => { setStock(s => ({ ...s, [id]: Math.max(0, Math.floor(value)) })); toast('Stock updated successfully') }

  return <Ctx.Provider value={{ books, getBook, cartItems, itemCount, subtotal, delivery, total, inCart,
    addToCart, setQty, removeFromCart, placeOrder, orders, updateStock, toasts, toast }}>{children}</Ctx.Provider>
}
