import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Place, PlacePhoto } from '@googlemaps/google-maps-services-js'
import { classNames } from '../utils'

// Used for tilting place cards slightly
const tilts = [0, -8, 8, -16, 16, -24, 24, -32, 32]

type FindPlaceResponse = Place & { photo: PlacePhoto & { src: string } }

const PlaceCard = ({
  name,
  location,
  coordinates,
}: {
  name: string
  location: string
  coordinates?: string
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [placeDetails, setPlaceDetails] = useState<FindPlaceResponse>()

  useEffect(() => {
    const findPlace = async () => {
      try {
        const response = await fetch('/api/find', {
          method: 'POST',
          body: JSON.stringify({ name, location, coordinates }),
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()

        setPlaceDetails(data)
      } catch (error) {
        console.error(error)
        toast.error('Error finding outing, try again', { icon: '⚠️' })
      } finally {
        setIsLoading(false)
      }
    }
    findPlace().then()
  }, [])

  return (
    <motion.div
      key={name}
      animate={{
        scale: 1,
        rotateZ: 360 + tilts[Math.floor(Math.random() * tilts.length)],
        opacity: 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.75,
        ease: 'easeOut',
        staggerChildren: 0.5,
      }}
      whileHover={{
        scale: 1.2,
        rotateZ: 360,
        zIndex: 10,
        transition: { duration: 0.25, ease: 'easeInOut' },
      }}
      onClick={() => {
        if (!placeDetails) return
        toast('Opening in Google Maps', {
          icon: '👉',
        })
      }}
      className="bg-black/20 relative overflow-hidden flex-shrink-0 rounded-xl shadow-md h-52 w-60 transform transition-all cursor-pointer border border-transparent dark:border-accent-2 shadow-md hover:shadow-xl group"
    >
      {placeDetails && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${placeDetails.name}&query_place_id=${placeDetails.place_id}`}
          target="_blank"
        >
          <div className="relative flex h-full text-white">
            <div className="relative z-20 self-end p-4">
              <h2 className="font-bold">{placeDetails.name}</h2>
              <p className="text-xs text-white/70">
                {placeDetails.formatted_address}
              </p>
              <p className="text-sm">
                ⭐ {placeDetails.rating}{' '}
                <span className="text-white/70">
                  ({placeDetails.user_ratings_total})
                </span>
              </p>
              <div className="flex justify-between mt-2">
                {placeDetails?.types && placeDetails?.types?.length > 0 && (
                  <span className="font-bold text-[9px] bg-gradient-to-b from-blue-light to-blue rounded px-1 py-px shadow-md">
                    {placeDetails.types[0].replaceAll('_', ' ').toUpperCase()}
                  </span>
                )}
                {placeDetails?.opening_hours?.hasOwnProperty('open_now') && (
                  <span
                    className={classNames(
                      'font-bold text-[9px] bg-gradient-to-b rounded px-1 py-px shadow-md',
                      placeDetails?.opening_hours?.open_now
                        ? 'from-green to-green-dark'
                        : 'from-red to-red-dark'
                    )}
                  >
                    {placeDetails?.opening_hours?.open_now ? 'OPEN' : 'CLOSED'}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute bg-gradient-to-b from-transparent to-black/90 z-10 w-full h-full group-hover:backdrop-blur-sm transition duration-700 group-hover:via-black/60 group-hover:to-black"></div>
            <Image
              src={placeDetails.photo?.src}
              alt={`Photo taken at ${placeDetails.name}`}
              fill
              quality={100}
              className="pointer-events-none"
              onError={(e) => {
                e.currentTarget.srcset = '/no-image.png'
                e.currentTarget.src = '/no-image.png'
              }}
            />
          </div>
        </a>
      )}

      {!isLoading && !placeDetails && (
        <div className="relative flex flex-col items-center justify-center h-full text-white bg-black p-4">
          <h2 className="text-2xl">🙀</h2>
          <p className="text-xs text-white/60">Error finding outing.</p>
        </div>
      )}

      {!isLoading && (
        <div className="relative flex flex-col items-center justify-center h-full bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="animate-spin text-white/40 h-8 w-8"
            fill="currentColor"
          >
            <path d="M12 24a12 12 0 1 1 12-12 1 1 0 0 1-2 0 10 10 0 1 0-1.818 5.751 1 1 0 0 1 1.636 1.15A12.022 12.022 0 0 1 12 24z"></path>
          </svg>
        </div>
      )}
    </motion.div>
  )
}

export default PlaceCard
