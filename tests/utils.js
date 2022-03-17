const getComponentMethods = wrapper => {
  return Object.entries(wrapper.vm).filter(([k, v]) =>
    v && {}.toString.call(v) === '[object Function]' && !k.startsWith('_') && !k.startsWith('$'))
}

export const promiseFrom = (wrapper) => {
  const promises = []

  getComponentMethods(wrapper).forEach(([name, method]) => {

    wrapper.vm[name] = jest.fn((...args) => {
      const p = method(...args)
      promises.push(p)
      return p
    })

  })

  return promises
}