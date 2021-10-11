import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import Localbase from 'localbase'
import { format } from 'date-fns'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    suppliers: [],
    clients: [],
    orders: [],
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    // TASKS
    addTask(state, newTask){
      state.tasks.push(newTask)
    },
    taskDone(state, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      Object.assign(task, payload)
    },
    updateTaskDueDate(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    // ORDERS
    addOrder(state, newOrder){
      state.orders.push(newOrder)
    },
    deleteOrder(state, id){
      state.orders = state.orders.filter(order => order.id !== id)
    },
    updateOrder(state, payload){
      let order = state.orders.filter(order => order.id === payload.id)[0]
      Object.assign(order, payload)
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    // CLIENTS
    addClient(state, newClient){
      state.clients.push(newClient)
    },
    deleteClient(state, id){
      state.clients = state.clients.filter(client => client.id !== id)
    },
    updateClient(state, payload){
      let client = state.clients.filter(client => client.id === payload.id)[0]
      Object.assign(client, payload)
    },
    setClients(state, clients) {
      state.clients = clients
    },
    // SUPPLIERS
    addSupplier(state, newSupplier){
      state.suppliers.push(newSupplier)
    },
    deleteSupplier(state, id){
      state.suppliers = state.suppliers.filter(supplier => supplier.id !== id)
    },
    updateSupplier(state, payload){
      let supplier = state.suppliers.filter(supplier => supplier.id === payload.id)[0]
      Object.assign(supplier, payload)
    },
    setSuppliers(state, suppliers) {
      state.suppliers = suppliers
    },
    // GLOBALS
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    },
  },
  actions: {
    // TASKS
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Task deleted!')
      })
    },
    updateTaskTitle({commit}, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task Changed!')
      })
    },
    updateTaskDueDate({commit}, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due Date Changed!')
      })
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },
    taskDone({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('taskDone', id)
      })
    },
    setTasks ({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    // ORDERS
    addOrder({ commit }, order) {
      let isOrder = {
        ...order,
        id: uuid.v4(),
        orderCreationDate: format(new Date(Date.now()), 'dd/MM/yyyy'),
        orderUpdated: null
      }
      db.collection('orders').add(isOrder).then(() => {
        commit('addOrder', isOrder)
        commit('showSnackbar', 'Order added!')
      })
    },
    deleteOrder({ commit }, id) {
      db.collection('orders').doc({ id: id }).delete().then(() => {
        commit('deleteOrder', id)
        commit('showSnackbar', 'Order deleted!')
      })
    },
    updateOrder({commit}, payload) {
      db.collection('orders').doc({ id: payload.id }).update(payload).then(() => {
        commit('updateOrder', payload)
        commit('showSnackbar', 'Order Updated!')
      })
    },
    getOrders({ commit }) {
      db.collection('orders').get().then(orders => {
        commit('setOrders', orders)
      })
    },
    setOrders({ commit }, orders) {
      db.collection('orders').set(orders)
      commit('setOrders', orders)
    },
    // CLIENTS
    addClient({ commit }, client) {
      let isClient = {
        ...client,
        id: uuid.v4(),
        clientCreationDate: format(new Date(Date.now()), 'dd/MM/yyyy'),
        clientUpdated: null
      }
      db.collection('clients').add(isClient).then(() => {
        commit('addClient', isClient)
        commit('showSnackbar', 'Client added!')
      })
    },
    deleteClient({ commit }, id) {
      db.collection('clients').doc({ id: id }).delete().then(() => {
        commit('deleteClient', id)
        commit('showSnackbar', 'Client deleted!')
      })
    },
    updateClient({commit}, payload) {
      db.collection('clients').doc({ id: payload.id }).update(payload).then(() => {
        commit('updateClient', payload)
        commit('showSnackbar', 'Client Updated!')
      })
    },
    getClients({ commit }) {
      db.collection('clients').get().then(clients => {
        commit('setClients', clients)
      })
    },
    setClients({ commit }, clients) {
      db.collection('clients').set(clients)
      commit('setClients', clients)
    },
    // SUPPLIERS
    addSupplier({ commit }, suppliers) {
      let isSupplier = {
        ...suppliers,
        id: uuid.v4(),
        supplierCreationDate: format(new Date(Date.now()), 'dd/MM/yyyy'),
        supplierUpdated: null
      }
      db.collection('suppliers').add(isSupplier).then(() => {
        commit('addSupplier', isSupplier)
        commit('showSnackbar', 'Supplier added!')
      })
    },
    deleteSupplier({ commit }, id) {
      db.collection('suppliers').doc({ id: id }).delete().then(() => {
        commit('deleteSupplier', id)
        commit('showSnackbar', 'Supplier deleted!')
      })
    },
    updateSupplier({commit}, payload) {
      db.collection('suppliers').doc({ id: payload.id }).update(payload).then(() => {
        commit('updateSupplier', payload)
        commit('showSnackbar', 'Supplier Updated!')
      })
    },
    getSuppliers({ commit }) {
      db.collection('suppliers').get().then(suppliers => {
        commit('setSuppliers', suppliers)
      })
    },
    setSuppliers({ commit }, suppliers) {
      db.collection('suppliers').set(suppliers)
      commit('setSuppliers', suppliers)
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    },
    ordersFiltered(state) {
      if (!state.search) {
        return state.orders
      }
      return state.orders.filter(order => order.name.toLowerCase().includes(state.search.toLowerCase()))
    },
    clientsFiltered(state) {
      if (!state.search) {
        return state.clients
      }
      return state.clients.filter(client => client.name.toLowerCase().includes(state.search.toLowerCase()))
    },
    suppliersFiltered(state) {
      if (!state.search) {
        return state.suppliers
      }
      return state.suppliers.filter(supplier => supplier.name.toLowerCase().includes(state.search.toLowerCase()))
    },
  }
})
