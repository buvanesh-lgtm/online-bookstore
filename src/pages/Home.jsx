import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/books'
import { BookGrid } from '../components/Books'
import { Cover } from '../components/ui'

export default function Home() {
  const { books } = useStore()
  return <div className="space-y-14">
    <section className="grid md:grid-cols-2 items-center gap-10 rounded-3xl bg-ink text-white px-6 py-12 md:px-12">
      <div><h1 className="font-display text-4xl md:text-6xl font-bold">BookNest</h1>
        <p className="mt-4 max-w-md text-slate-300 text-lg">Your neighbourhood bookshop, online. Novels, code, science and more, delivered to your door.</p>
        <Link to="/books" className="btn-primary mt-8 !bg-white !text-ink hover:!bg-brand-100">Explore Books</Link></div>
      <div className="relative h-64 md:h-80 hidden min-[480px]:block">
        {[books[0], books[5], books[7]].map((b, i) => <Cover key={b.id} book={b} className="absolute w-40 md:w-48"
          />).map((el, i) => <div key={i} className="absolute w-36 md:w-44" style={{ left: `${i * 28}%`, top: `${[10, 0, 14][i]}%`, transform: `rotate(${[-8, 0, 8][i]}deg)` }}>{el}</div>)}</div></section>
    <section><h2 className="font-display text-2xl mb-5">Featured books</h2><BookGrid books={books.slice(0, 4)} /></section>
    <section><h2 className="font-display text-2xl mb-5">Popular categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{CATEGORIES.map(c =>
        <Link key={c} to={`/books?category=${encodeURIComponent(c)}`} className="card px-4 py-5 font-medium hover:border-brand-600 hover:text-brand-800 transition">{c}</Link>)}</div></section>
    <section><h2 className="font-display text-2xl mb-5">Popular books</h2>
      <BookGrid books={[...books].sort((a, b) => b.rating - a.rating).slice(0, 8)} /></section></div>
}
