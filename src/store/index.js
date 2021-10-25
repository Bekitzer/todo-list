import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import Localbase from 'localbase'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import db from '@/firebase'
import { doc, deleteDoc, updateDoc, collection, setDoc, getDoc, getDocs } from "firebase/firestore";

// let db = new Localbase('db')
// db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    suppliers: [],
    clients: [],
    orders: [],
    accountings: [],
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
      state.tasks = state.tasks.filter(task => task.id != id)
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
    // ACCOUNTINGS
    addAccounting(state, newAccounting){
      state.accountings.push(newAccounting)
    },
    deleteAccounting(state, id){
      state.accountings = state.accountings.filter(accounting => accounting.id !== id)
    },
    updateAccounting(state, payload){
      let accounting = state.accountings.filter(accounting => accounting.id === payload.id)[0]
      Object.assign(accounting, payload)
    },
    setAccountings(state, accountings) {
      state.accountings = accountings
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
        id: uuid.v4(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Task added!')
      }).catch((error) => {
        console.log(error);
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc(id).delete().then(() => {
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
      db.collection('tasks').get().then(querySnapshot => {
        var tasks = [];
        querySnapshot.forEach(doc => {
          tasks.push(doc.data());
        })
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
        orderCreationDate: format(new Date(Date.now()), 'EEE, dd/MM/yy HH:mm', {locale: he}),
        orderUpdated: null
      }
      setDoc(doc(collection(db, "orders")), isOrder).then(() => {
        commit('addOrder', isOrder)
        commit('showSnackbar', 'הזמנה חדשה נוספה!')
      }).catch((error) => {
        console.log('Something went wrong - addOrder',error);
      })
    },
    deleteOrder({ commit }, id) {
      deleteDoc(doc(db, "orders", id)).then(() => {
        commit('deleteOrder', id)
        commit('showSnackbar', 'הזמנה נמחקה!')
      }).catch((error) => {
        console.log('Something went wrong - deleteOrder',error);
      })
    },
    updateOrder({commit}, payload) {
      updateDoc(doc(db, "orders", payload.id), payload).then(() => {
        commit('updateOrder', payload)
        commit('showSnackbar', 'הזמנה עודכנה!')
      }).catch((error) => {
        console.log('Something went wrong - updateOrder',error);
      })
    },

    getOrders({ commit }) {
      db.collection('orders').get().then(querySnapshot => {
        var orders = [];
        querySnapshot.forEach(doc => {
          orders.push({...doc.data(), id:doc.id})
        })
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - getOrders',error);
      })
    },
    setOrders({ commit }, orders) {
      setDoc(doc(collection(db, "orders")), orders).then(() => {
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - setOrders',error);
      })
    },
    // ACCOUNTINGS
    addAccounting({ commit }, accounting) {
      let isAccounting = {
        ...accounting,
        id: uuid.v4(),
        accountingCreationDate: format(new Date(Date.now()), 'EEE, dd/MM/yy HH:mm', {locale: he}),
        accountingUpdated: null
      }
      setDoc(doc(collection(db, "accountings")), isAccounting).then(() => {
        commit('addAccounting', isAccounting)
        commit('showSnackbar', 'חשבון חדש נוסף!')
      }).catch((error) => {
        console.log('Something went wrong - addAccounting',error);
      })
    },
    deleteAccounting({ commit }, id) {
      deleteDoc(doc(db, "accountings", id)).then(() => {
        commit('deleteAccounting', id)
        commit('showSnackbar', 'חשבון נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteAccounting',error);
      })
    },
    updateAccounting({commit}, payload) {
      updateDoc(doc(db, "accountings", payload.id), payload).then(() => {
        commit('updateAccounting', payload)
        commit('showSnackbar', 'חשבון עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateAccounting',error);
      })
    },
    getAccountings({ commit }) {
      db.collection('accountings').get().then(querySnapshot => {
        var accountings = [];
        querySnapshot.forEach(doc => {
          accountings.push({...doc.data(), id:doc.id})
        })
        commit('setAccountings', accountings)
      }).catch((error) => {
        console.log('Something went wrong - getAccountings',error);
      })
    },
    setAccountings({ commit }, accountings) {
      setDoc(doc(collection(db, "accountings")), accountings).then(() => {
        commit('setAccountings', accountings)
      }).catch((error) => {
        console.log('Something went wrong - setAccountings',error);
      })
    },
    // CLIENTS
    addClient({ commit }, client) {
      let isClient = {
        ...client,
        id: uuid.v4(),
        clientCreationDate: format(new Date(Date.now()), 'EEE, dd/MM/yy HH:mm', {locale: he}),
        clientUpdated: null
      }
      setDoc(doc(collection(db, "clients")), isClient).then(() => {
        commit('addClient', isClient)
        commit('showSnackbar', 'לקוח חדש נוסף!')
      }).catch((error) => {
        console.log('Something went wrong - addClient',error);
      })
    },
    deleteClient({ commit }, id) {
      deleteDoc(doc(db, "clients", id)).then(() => {
        commit('deleteClient', id)
        commit('showSnackbar', 'לקוח נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteClient',error);
      })
    },
    updateClient({commit}, payload) {
      updateDoc(doc(db, "clients", payload.id), payload).then(() => {
        commit('updateClient', payload)
        commit('showSnackbar', 'לקוח עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateClient',error);
      })
    },
    getClients({ commit }) {
      db.collection('clients').get().then(querySnapshot => {
        var clients = [];
        querySnapshot.forEach(doc => {
          clients.push({...doc.data(), id:doc.id})
        })
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - getClients',error);
      })
    },
    setClients({ commit }, clients) {
      setDoc(doc(collection(db, "clients")), clients).then(() => {
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - setClients',error);
      })
    },
    // SUPPLIERS
    addSupplier({ commit }, suppliers) {
      let isSupplier = {
        ...suppliers,
        id: uuid.v4(),
        supplierCreationDate: format(new Date(Date.now()), 'EEE, dd/MM/yy HH:mm', {locale: he}),
        supplierUpdated: null
      }
      setDoc(doc(collection(db, "suppliers")), isSupplier).then(() => {
        commit('addSupplier', isSupplier)
        commit('showSnackbar', 'ספק חדש נוסף!')
      }).catch((error) => {
        console.log('Something went wrong - addSupplier',error);
      })
    },
    deleteSupplier({ commit }, id) {
      deleteDoc(doc(db, "suppliers", id)).then(() => {
        commit('deleteSupplier', id)
        commit('showSnackbar', 'ספק נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteSupplier',error);
      })
    },
    updateSupplier({commit}, payload) {
      updateDoc(doc(db, "suppliers", payload.id), payload).then(() => {
        commit('updateSupplier', payload)
        commit('showSnackbar', 'ספק עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateSupplier',error);
      })
    },
    getSuppliers({ commit }) {
      db.collection('suppliers').get().then(querySnapshot => {
        var suppliers = [];
        querySnapshot.forEach(doc => {
          suppliers.push({...doc.data(), id:doc.id})
        })
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - getSuppliers',error);
      })
    },
    setSuppliers({ commit }, suppliers) {
      setDoc(doc(collection(db, "suppliers")), suppliers).then(() => {
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - setSuppliers',error);
      })
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
      return state.orders.filter(order => order.number.toLowerCase().includes(state.search.toLowerCase()))
    },
    accountingsFiltered(state) {
      if (!state.search) {
        return state.accountings
      }
      return state.accountings.filter(accounting => accounting.number.toLowerCase().includes(state.search.toLowerCase()))
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
