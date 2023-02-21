const baseUrl = 'https://maps.googleapis.com/maps/api/place/'

if (!process.env.GOOGLEMAPS_API_KEY) {
  throw new Error('Missing env var from GoogleMaps')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const { name, location, coordinates } = (await req.json()) as {
    name?: string
    location?: string
    coordinates?: string
  }

  if (!name) {
    return new Response('No place to search for in the request', {
      status: 400,
    })
  }

  const place = await findPlaceFromText(`${name} ${location}`, coordinates)

  if (place && place?.photos?.length > 0) {
    place.photo = place.photos[0]
    delete place.photos
    place.photo.src = getPhotoSrc(place.photo.photo_reference)
  }

  return new Response(JSON.stringify(place))
}

const findPlaceFromText = async (input: string, coordinates?: string) => {
  const params = new URLSearchParams({
    input,
    inputtype: 'textquery',
    key: process.env.GOOGLEMAPS_API_KEY!,
    fields:
      'formatted_address,name,photos,types,opening_hours,price_level,rating,user_ratings_total,place_id',
  })

  if (coordinates) {
    params.set('locationbias', `circle:50000@${coordinates}`)
  }

  try {
    const response = await fetch(
      `${baseUrl}findplacefromtext/json?${params.toString()}`
    )

    const data = await response.json()

    if (!data?.candidates?.length) {
      console.info('No place found', data)
      return undefined
    }

    return data.candidates[0] ?? undefined
  } catch (e) {
    console.error(e)
  }

  return undefined
}

const getPhotoSrc = (photoReference: string) => {
  const params = new URLSearchParams({
    photo_reference: photoReference,
    key: process.env.GOOGLEMAPS_API_KEY!,
    maxwidth: '400',
  })

  return `${baseUrl}photo?${params.toString()}`
}

export default handler
