import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    clients: [],
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
    //TASKS
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
      task.title = payload.title
    },
    updateTaskDueDate(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    //CLIENTS
    addClient(state, isClient){
      state.clients.push(isClient)      
    },
    clientDone(state, id){
      let client = state.clients.filter(client => client.id === id)[0]
      client.done = !client.done 
    },
    deleteClient(state, id){
      state.clients = state.clients.filter(client => client.id !== id)
    },
    updateClient(state, payload){
      let client = state.clients.filter(client => client.id === payload.id)[0]
      client.name = payload.name
    },
    updateClientCreationDate(state, payload){
      let client = state.clients.filter(client => client.id === payload.id)[0]
      client.creationDate = payload.creationDate
    },
    setClients(state, clients) {
      state.clients = clients      
    },
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
    }
  },
  actions: {
    //TASKS
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

    //CLIENTS
    addClient({ commit }, client) {
      
      let isClient = {
        ...client,
        id: uuid.v4(),
        done: false,
        creationDate: Date.now(),
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
      db.collection('clients').doc({ id: payload.id }).update({
        name: payload.name
      }).then(() => {
        commit('updateClient', payload)
        commit('showSnackbar', 'Client Changed!')
      })      
    },
    updateClientCreationDate({commit}, payload) {
      db.collection('clients').doc({ id: payload.id }).update({
        creationDate: payload.creationDate
      }).then(() => {
        commit('updateClientCreationDate', payload)
        commit('showSnackbar', 'Creation Date Changed!')
      })            
    },
    getClients({ commit }) {
      db.collection('clients').get().then(clients => {
        commit('setClients', clients)
      })
    },
    clientDone({ state, commit }, id) {
      let client = state.clients.filter(client => client.id === id)[0]
      db.collection('clients').doc({ id: id }).update({
        done: !client.done
      }).then(() => {
        commit('clientDone', id)
      })
    },
    setClients ({ commit }, clients) {
      db.collection('clients').set(clients)
      commit('setClients', clients)
    },    
  },
  getters: {
    //TASKS
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    },
    //CLIENTS
    clientsFiltered(state) {
      if (!state.search) {
        return state.clients
      }
      return state.clients.filter(client => client.name.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
})
