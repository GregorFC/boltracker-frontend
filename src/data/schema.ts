export type StockDatum = {
  date: Date
  id: string
  stock: number
  price: number
  ratingStars: number
  ratingCount: number   
}

export type Product = {
  id: string
  name: string
  url: string
  createdAt: Date
}

export type ProductInfo = {
  id: string
  price: number
  rating: number
  reviews: number
}