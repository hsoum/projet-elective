export interface InputIcon {
  name: string
  background: boolean
}

export interface IconStyleObject {
  width: string
  height: string
}

export interface ProductPrice {
  name: string
  price: number
}

export interface ShoppingCartItem {
  id: number
  imageURL: string
  name: string
  price: ProductPrice[]
  unit: string
  rate: number
  quantity: number
}

export interface StandardCard {
  type: string
  title: string
  description: string
  callToAction: string
  callToActionURL: string
  imageURL: string
}

export interface CouponCard {
  type: string
  title: string
  coupon: string
  discount: number
  description: string
}

export interface NewsCardsObject {
  standard: StandardCard
  coupon: CouponCard
}

export interface RecipeCard {
  id: number
  title: string
  subtitle: string
  imageURL: string
}
