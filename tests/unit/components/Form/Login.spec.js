import {mount} from '@vue/test-utils'
import Login from '@/components/Form/Login.vue'
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import {options} from '@/stores';
import {cloneDeep} from 'lodash'
import {promiseFrom} from '../../../utils'

const localVue = global.localVue

describe('Login.vue', () => {
  let store
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    store = new Vuex.Store(cloneDeep(options))
  })

  const mountFunction = options => {
    const wrapper = mount(Login, {store, localVue, vuetify, ...options})
    const promises = promiseFrom(wrapper)
    return {wrapper, promises}
  }

  it('renders correct title when passed', async () => {
    const {wrapper, promises} = mountFunction()

    await wrapper.find('input[type=email]').setValue('test@just-print-ngs-test.web.app')
    await wrapper.find('input[type=password]').setValue('123456')
    await wrapper.find('.teststestse').trigger('click')

    expect(wrapper.vm.loginUser).toHaveBeenCalledTimes(1);

    await Promise.all(promises)

    expect(wrapper.text()).toMatch('Login Component')
  })

  it('retrieve user information when successful login', () => {

  })

  it('renders an error when wrong credentials', () => {

  })
})
