import {shallowMount} from '@vue/test-utils'
import Login from '@/components/Form/Login.vue'

describe('Login.vue', () => {
  it('renders correct title when passed', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.text()).toMatch('Login Component')
  })
})
