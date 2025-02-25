export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  image: string
  reviews: Review[]
}

export interface AvailableDate {
  date: string
  available: boolean
}

