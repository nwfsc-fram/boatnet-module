import { shallowMount } from '@vue/test-utils'
import TestComponents from '@/components/TestComponents.vue'

describe('TestComponents.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TestComponents, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
