import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])
  console.log(movie)
  return (
    <div className="flex flex-col gap-y-2 py-16 md:gap-y-4 lg:h-[64vh] lg:justify-end lg:pb-12 ">
      <div className="absolute top-0 left-0 -z-50 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl  ">
        {movie?.overview}
      </p>
      <div
        className="flex gap-x-2
      "
      >
        <button className="bannerButton bg-white text-black">
          <PlayIcon className="w-6 h-6 text-black" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <InformationCircleIcon className="w-6 h-6 flex translate-y-[2px]" />
        </button>
      </div>
    </div>
  )
}

export default Banner
