import { shallowMount, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import BaseInputText from '@/components/BaseInputText.vue'

describe('BaseInputText', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  beforeEach(() => {
    const BaseIcon = {
      template: '<div v-bar>Foo</div>',
    }

    wrapper = shallowMount(BaseInputText, {
      global: {
        components: { BaseIcon },
      },
    })
  })

  it('renders icon when props.icon passed', async () => {
    const icon = { name: 'search' }
    await wrapper.setProps({ icon })

    const expectedElements = [
      '.input-text-wrapper__icon',
      '.input-text-wrapper--with-icon',
    ]

    expectedElements.forEach(cls => {
      expect(wrapper.find(cls).exists()).toBe(true)
    })
  })

  it('renders background when props.background passed', async () => {
    const icon = { name: 'search', background: true }
    await wrapper.setProps({ icon })

    const expectedElement = '.input-text-wrapper__icon--background'
    expect(wrapper.find(expectedElement).exists()).toBe(true)
  })

  it("doesn't render icon when props.icon is not passed", async () => {
    expect(wrapper.find('.input-text-wrapper__icon').exists()).toBe(false)
  })
})

describe('BaseInputText.validator()', () => {
  it("validate if props.icon doesn't match the expected structure", () => {
    const icon = { name: 'search' }
    const validator = BaseInputText.props.icon.validator
    expect(validator(icon)).toBe(true)

    const icon2 = { name: 'search', background: true }
    expect(validator(icon2)).toBe(true)

    const icon3 = { fullname: 'search' }
    expect(validator(icon3)).toBe(false)

    const icon4 = {}
    expect(validator(icon4)).toBe(false)

    const icon5 = { name: 'search', bg: true }
    expect(validator(icon5)).toBe(true)
  })
})
