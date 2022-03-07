import NavDrawer from '@/components/Global/NavDrawer.vue'
import {mount} from '@vue/test-utils'

describe('NavDrawer', () => {
  test('Logged Out', () => {
    const wrapper = mount(NavDrawer)
    expect(wrapper.find('v-list-item').isVisible()).toBe(false)
  })
  test('Logged In', async () => {
    const wrapper = mount(NavDrawer)
    wrapper.setData({loggedIn: true})
    await wrapper.vm.$nextTick()
    expect(wrapper.find('v-list-item').isVisible()).toBe(true)
  })
})
