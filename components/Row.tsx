import { Movie } from '../typings'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import Thumbnail from './Thumbnail'
import { useRef, useState } from 'react'
interface Props {
  title: string
  movies: Movie[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }
  return (
    <div className="h-40 space-y-0.5 md:space-y-2 ">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white ">
        {title}
      </h2>
      <div className="group relative md:-ml-2 ">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 h-9 w-9 m-auto cursor-pointer  opacity-0 translate hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          } `}
          onClick={() => handleClick('left')}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center gap-x-0.5 overflow-x-scroll md:gap-x-2 md:p-2 "
        >
          {movies.map((movie) => {
            return <Thumbnail key={movie.id} movie={movie} />
          })}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 h-9 w-9 m-auto cursor-pointer  opacity-0 translate hover:scale-125 group-hover:opacity-100 "
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
