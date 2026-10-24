import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar, Footer } from './components/Layout'
import { Toasts, EmptyState } from './components/ui'
import { SearchX } from 'lucide-react'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import { Orders, OrderDetails, OrderSuccess } from './pages/Orders'
import AdminStock from './pages/AdminStock'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return <div className="min-h-screen flex flex-col"><Navbar />
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8">
      <Routes>
        <Route path="/" element={<Home />} /><Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} /><Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} /><Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} /><Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/admin/stock" element={<AdminStock />} />
        <Route path="*" element={<EmptyState icon={SearchX} title="Page not found" text="That page doesn't exist." to="/" cta="Go home" />} />
      </Routes></main><Footer /><Toasts /></div>
}
