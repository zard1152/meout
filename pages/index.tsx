import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Toaster, resolveValue } from 'react-hot-toast'
import Footer from '../components/Footer'
import Github from '../components/GitHub'
import Header from '../components/Header'
import LoadingDots from '../components/LoadingDots'
import ResizablePanel from '../components/ResizablePanel'
import Option, { Option as OptionType } from '../components/Option'
import { classNames } from '../utils'
import Input from '../components/Input'
import PlaceCard from '../components/PlaceCard'
import Question from '../components/Question'

// Prompt "The places should ..."
const placeOptions: OptionType[] = [
  {
    label: 'Food',
    icon: '😋',
    prompt: 'serve food (restaurants, cafes, etc.)',
  },
  {
    label: 'Drinks',
    icon: '🥛',
    prompt: 'serve specialty drinks (alcohol, cocktails, coffee, juice, etc.)',
  },
]

// Prompt "That serves ___ cuisine."
const foodOptions: OptionType[] = [
  { label: 'Whatever', icon: '😒' },
  // Google's List of Cuisines
  { label: 'American', icon: '🍗' },
  { label: 'Barbecue', icon: '🍖' },
  { label: 'Chinese', icon: '🥡' },
  { label: 'French', icon: '🥖' },
  { label: 'Hamburger', icon: '🍔' },
  { label: 'Indian', icon: '🥘' },
  { label: 'Italian', icon: '🍝' },
  { label: 'Japanese', icon: '🍱' },
  { label: 'Mexican', icon: '🌮' },
  { label: 'Pizza', icon: '🍕' },
  { label: 'Seafood', icon: '🦞' },
  { label: 'Steak', icon: '🥩' },
  { label: 'Sushi', icon: '🍣' },
  { label: 'Thai', icon: '🍲' },
  // End Google's List of Cuisines
  { label: 'Other', icon: '🍽' },
]

// Prompt "is great for..."
const groupOptions: OptionType[] = [
  {
    label: 'Solo',
    icon: '🧑‍🚀',
    prompt: 'meeting new people and making friends or for going out alone',
  },
  {
    label: 'Friends',
    icon: '🧑‍🤝‍🧑',
    prompt: 'going out with friends',
  },
  {
    label: 'Family',
    icon: '👪',
    prompt: 'going out with family (kid friendly)',
  },
  {
    label: 'Date',
    icon: '💑‍',
    prompt: 'going out on a date',
  },
  {
    label: 'The Biz',
    icon: '🧑‍💼',
    prompt: 'a company outing',
  },
  {
    label: 'Its a party... buckle up',
    icon: '👯',
    prompt: 'a large group of friends looking for fun',
  },
]

// Prompt "The places should be open in the... "
const timeOptions: OptionType[] = [
  { label: 'Morning', icon: '🌅' },
  { label: 'Afternoon', icon: '🏙️' },
  { label: 'Evening', icon: '🌇' },
  { label: 'Night', icon: '🌃' },
]

const Home: NextPage = () => {
  const [allowedLocation, setAllowedLocation] = useState(true)
  const [loading, setLoading] = useState(false)
  const [generatedPlaces, setGeneratedPlaces] = useState(new Set<string>())
  const [generatedString, setGeneratedString] = useState('')

  const [location, setLocation] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [coordinates, setCoordinates] = useState<[number, number]>()

  const [otherFood, setOtherFood] = useState('')
  const [foodOption, setFoodOption] = useState<OptionType>()
  const [groupOption, setGroupOption] = useState<OptionType>()
  const [placeOption, setPlaceOption] = useState<OptionType>()
  const [timeOption, setTimeOption] = useState<OptionType>()

  useEffect(() => {
    setGeneratedPlaces((prev) => {
      const places = generatedString.split(',')
      places.forEach((place, index) => {
        const cleanPlace = place.trim()
        // Note: ignore last index unless it ends with a period
        // because it's probably still typing the name of a place
        if (
          cleanPlace.length !== 0 &&
          (index !== places.length - 1 || cleanPlace.endsWith('.'))
        ) {
          prev.add(cleanPlace)
        }
      })
      return prev
    })
  }, [generatedString])

  // TODO: Bit of mess constructing prompt...
  const coordString = coordinates
    ? `these latitude and longitude coordinates ${coordinates.join(', ')}`
    : undefined
  const locationString =
    location.trim() && postalCode.trim()
      ? `${location.trim()} with postal code ${postalCode.trim()}`
      : `${location.trim()}`

  const postalCodeString =
    !locationString && postalCode && `postal code ${postalCode}`
  const fullLocationString = [coordString, locationString, postalCodeString]
    .filter(Boolean)
    .join(' ')

  const foodString =
    foodOption?.label === 'Other' ? otherFood.trim() : foodOption?.label ?? ''
  const placeString = [
    placeOption?.prompt,
    placeOption?.label === 'Food' &&
      foodString !== 'Whatever' &&
      `with ${foodString} cuisine`,
  ]
    .filter(Boolean)
    .join(' ')

  let prompt = `Give at list of popular places (just their name)`
  prompt += ` that should ${placeString} be near ${fullLocationString}.`
  prompt += ` The places should be a prefect setting during the ${timeOption?.label}.`
  prompt += ` The places should also be great for ${groupOption?.prompt}.`
  prompt += ` Return the list of seperated by just a comma and add period at the end of the list.`

  const generatePlaces = async (e: any) => {
    e.preventDefault()
    setGeneratedString('')
    setGeneratedPlaces(new Set<string>())
    setLoading(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedString((prev) => prev + chunkValue)
    }

    setLoading(false)
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Allowed
        setCoordinates([coords.latitude, coords.longitude])
      },
      () => {
        // Error/Denied
        setAllowedLocation(false)
      }
    )
  }

  console.log('generatedString', generatedString)
  console.log('generatedPlaces', generatedPlaces)

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Meout - Find your outing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-accent-2 hover:border-accent-5 bg-background px-4 py-2 text-sm shadow-md dark:shadow-none mb-5 text-accent-4 hover:text-accent-8 duration-300 ease-in-out transition-colors"
          href="https://github.com/keisto/meout"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p className="text-accent-8">Star on GitHub</p>
        </a>
        <h1 className="sm:text-7xl text-5xl max-w-2xl font-bold">
          Find your next outing in{' '}
          <span className="bg-gradient-to-r from-red-dark to-red-light bg-clip-text text-transparent">
            seconds.
          </span>
        </h1>
        <p className="text-accent-6 mt-5">
          <span className="text-accent-4">8 out of </span>9 served so far.
        </p>
        <div className="max-w-xl w-full mt-10">
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div>
                <ol id="questions" className="space-y-10">
                  <li>
                    <Question number={1}>
                      The location?{' '}
                      <span className="text-accent-6">or get my </span>
                      <button
                        onClick={getCurrentLocation}
                        className="break-all text-blue hover:text-blue-light inline-flex items-center space-x-1 transition-colors duration-300 disabled:text-blue-light disabled:cursor-not-allowed"
                        disabled={!allowedLocation}
                      >
                        current location
                      </button>
                      <button
                        onClick={() => {
                          setAllowedLocation(false)
                          setCoordinates(undefined)
                        }}
                        className={classNames(
                          'ml-1 text-xs hover:opacity-60 transition-opacity duration-300',
                          coordinates ? 'inline' : 'hidden'
                        )}
                      >
                        ❌
                      </button>
                    </Question>
                    <div className="flex justify-center items-center space-x-0 sm:space-x-5 space-y-3 sm:space-y-0 flex-col sm:flex-row">
                      {coordinates && allowedLocation ? (
                        <>
                          <Input
                            type="number"
                            placeholder="Latitude"
                            value={coordinates[0]}
                            disabled
                            readOnly
                            className="cursor-not-allowed"
                          />
                          <Input
                            type="number"
                            placeholder="Longitude"
                            value={coordinates[1]}
                            disabled
                            readOnly
                            className="cursor-not-allowed"
                          />
                        </>
                      ) : (
                        <>
                          <Input
                            placeholder="City, State"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                          <span className="text-accent-4 mx-5">or</span>
                          <Input
                            placeholder="Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </>
                      )}
                    </div>
                  </li>
                  <li>
                    <Question number={2}>I'm looking for ...</Question>
                    <div className="flex justify-center items-center flex-wrap gap-5 mt-5">
                      {placeOptions.map((option) => (
                        <Option
                          key={option.label}
                          option={option}
                          onClick={() => setPlaceOption(option)}
                          selected={placeOption === option}
                        />
                      ))}
                    </div>
                    {placeOption?.label === 'Food' && (
                      <ol className="list-alpha space-y-5 mt-5 ml-10">
                        <li>
                          <p className="text-left font-medium">
                            Because we are picky eaters, any particular cuisine?
                          </p>
                          <div className="flex justify-center items-center flex-wrap gap-5 mt-5">
                            {foodOptions.map((option) => (
                              <Option
                                key={option.label}
                                option={option}
                                onClick={() => setFoodOption(option)}
                                selected={foodOption === option}
                              />
                            ))}
                            {foodOption?.label === 'Other' && (
                              <Input
                                placeholder="Other cuisine"
                                value={otherFood}
                                autoFocus
                                onChange={(e) => setOtherFood(e.target.value)}
                              />
                            )}
                          </div>
                        </li>
                      </ol>
                    )}
                  </li>
                  <li>
                    <Question number={3}>I'm with?</Question>
                    <div className="flex justify-center items-center flex-wrap gap-5 mt-5">
                      {groupOptions.map((option) => (
                        <Option
                          key={option.label}
                          option={option}
                          onClick={() => setGroupOption(option)}
                          selected={groupOption === option}
                        />
                      ))}
                    </div>
                  </li>
                  <li>
                    <Question number={4}>What time?</Question>
                    <div className="flex justify-center items-center flex-wrap gap-5 mt-5">
                      {timeOptions.map((option) => (
                        <Option
                          key={option.label}
                          option={option}
                          onClick={() => setTimeOption(option)}
                          selected={timeOption === option}
                        />
                      ))}
                    </div>
                  </li>
                </ol>
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
          {!loading && (
            <button
              className="sm:mt-10 mt-8 w-full rounded-xl text-white font-medium px-4 h-10 transition-colors duration-300 ease-in-out bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground"
              onClick={(e) => generatePlaces(e)}
            >
              Find your next outing &rarr;
            </button>
          )}
          {loading && (
            <button
              className="sm:mt-10 mt-8 w-full rounded-xl text-white font-medium px-4 h-10 transition-colors duration-300 ease-in-out bg-background text-foreground border border-background hover:bg-accent-1 hover:bg-opacity-75"
              disabled
            >
              <LoadingDots />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        >
          {(t) => (
            <div
              className={classNames(
                t.visible ? 'opacity-100' : 'opacity-0',
                'bg-background p-4 rounded-xl shadow-md text-foreground border border-accent-2 shadow-md space-x-3'
              )}
            >
              <span>{t.icon}</span>
              <span>{resolveValue(t.message, t)}</span>
            </div>
          )}
        </Toaster>

        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedPlaces.size > 0 && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Okay, this is what we found:
                    </h2>
                  </div>
                  <div className="space-y-1 -space-x-10 flex flex-row flex-wrap items-center justify-center w-full mx-auto py-4">
                    {Array.from(generatedPlaces).map((nameOfPlace) => {
                      return (
                        <PlaceCard
                          key={nameOfPlace}
                          name={nameOfPlace}
                          location={`${location.trim()} ${postalCode.trim()}`}
                          coordinates={
                            coordinates ? coordinates.join(',') : undefined
                          }
                        />
                      )
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  )
}

export default Home
