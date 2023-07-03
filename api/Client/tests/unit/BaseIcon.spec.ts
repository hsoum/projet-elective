import { shallowMount } from '@vue/test-utils'
import BaseIcon from '@/components/BaseIcon.vue'

describe('BaseIcon', () => {
  it('renders svg when valid props.name passed', () => {
    const wrapper = shallowMount(BaseIcon, {
      props: {
        name: 'search',
      },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})

describe('BaseIcon.validator()', () => {
  it('returns true if props.name is a valid icon name', () => {
    const validator = BaseIcon.props.name.validator
    expect(validator('search')).toBe(true)
    expect(validator('idontexist')).toBe(false)
  })
})
