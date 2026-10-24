import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Cover, Stars, StockBadge, money } from './ui'
import { useStore } from '../context/StoreContext'

export function BookCard({ book }) {
  const { addToCart } = useStore(), out = book.stock === 0
  return <article className="card p-4 flex flex-col">
    <Link to={`/books/${book.id}`}><Cover book={book} className="mx-auto w-full max-w-[180px]" /></Link>
    <div className="mt-4 flex-1"><h3 className="font-semibold leading-snug line-clamp-2">{book.title}</h3>
      <p className="text-sm text-slate-500">{book.author}</p>
      <div className="mt-2 flex items-center justify-between"><Stars value={book.rating} /><StockBadge stock={book.stock} /></div>
      <p className="mt-2 text-lg font-bold">{money(book.price)}</p></div>
    <div className="mt-3 grid grid-cols-2 gap-2">
      <Link to={`/books/${book.id}`} className="btn-ghost !px-2">Details</Link>
      <button disabled={out} onClick={() => addToCart(book.id)} className="btn-primary !px-2"><ShoppingCart size={15} />{out ? 'Sold out' : 'Add'}</button></div></article>
}
export const BookGrid = ({ books }) => <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">{books.map(b => <BookCard key={b.id} book={b} />)}</div>
