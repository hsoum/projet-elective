import { shallowMount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard', () => {
  it('shows formated regular and sale prices when both provided', () => {
    const wrapper = shallowMount(ProductCard, {
      global: {
        components: { BaseIcon: { template: '' } },
      },
      props: {
        id: 1,
        imageURL: '',
        name: 'White adriatic figs',
        rate: 5,
        price: [
          { name: 'regular', price: 4 },
          { name: 'sale', price: 2 },
        ],
        unit: 'lb',
      },
    })

    expect(wrapper.find('.card-prices__old').exists()).toBe(true)
    expect(wrapper.find('.card-prices__old').text()).toEqual('4.00')
    expect(wrapper.find('.card-prices__current').text()).toEqual('$ 2.00')
  })

  it('shows regular price as current when sale price is not provided', () => {
    const wrapper = shallowMount(ProductCard, {
      global: {
        components: { BaseIcon: { template: '' } },
      },
      props: {
        id: 1,
        imageURL: '',
        name: 'White adriatic figs',
        rate: 5,
        price: [{ name: 'regular', price: 4 }],
        unit: 'lb',
      },
    })

    expect(wrapper.find('.card-prices__old').exists()).toBe(false)
    expect(wrapper.find('.card-prices__current').text()).toEqual('$ 4.00')
  })
})
