// @flow
export type Coordinates = {
    lat: number,
    lng: number
}

export type Organization = {
    id: string,
    name: string,
    categoryautosortscript: () => void,
    overview: string,
    location: string,
    website: string,
    facebookUrl: string,
    instagramUrl: string,
    twitterUrl: string,
    phone: string,
    coordinates: Coordinates,
    // some: (resource: Organization) => boolean
    some: any
}