import { shallowMount } from '@vue/test-utils'
import ProductCarousel from '@/components/ProductCarousel.vue'

describe('ProductCarousel', () => {
  it('shift products when nav buttons clicked', async () => {
    const wrapper = shallowMount(ProductCarousel, {
      global: {
        components: { BaseIcon: { template: '' } },
      },
      props: {
        products: [
          {
            imageURL: '',
            name: 'White adriatic figs',
            rate: 5,
            price: [{ name: 'regular', price: 4 }],
            unit: '500g',
          },
          {
            imageURL: '',
            name: 'Blueberries',
            rate: 4.4,
            price: [{ name: 'regular', price: 6 }],
            unit: '500g',
          },
        ],
      },
    })

    await wrapper.find('.btn-nav--left').trigger('click')

    expect(wrapper.vm.products[0].name).toBe('Blueberries')
    expect(wrapper.vm.products[1].name).toBe('White adriatic figs')

    await wrapper.find('.btn-nav--right').trigger('click')

    expect(wrapper.vm.products[0].name).toBe('White adriatic figs')
    expect(wrapper.vm.products[1].name).toBe('Blueberries')
  })
})
