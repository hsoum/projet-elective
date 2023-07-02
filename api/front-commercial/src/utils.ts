import type { ProductPrice } from '@/types'

function getSalePrice(
  prices: ProductPrice[],
): number | undefined {
  const price = prices.find((p) => p.name === 'sale')
  return price?.price
}

function getRegularPrice(
  prices: ProductPrice[],
): number | undefined {
  const price = prices.find((p) => p.name === 'regular')
  return price?.price
}

function getCurrentPrice(
  prices: ProductPrice[],
): number | undefined {
  return getSalePrice(prices) || getRegularPrice(prices)
}

export { getSalePrice, getRegularPrice, getCurrentPrice }
