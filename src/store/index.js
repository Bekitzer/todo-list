import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      {
        id: 1,
        title: 'Wake Up',
        done: false,
        dueDate: '2020-10-22'
      },
      {
        id: 2,
        title: 'Brush Teeth',
        done: false,
        dueDate: '2020-10-23'
      },
      {
        id: 3,
        title: 'Go To Work',
        done: false,
        dueDate: null
      },
      {
        id: 4,
        title: 'Delete All',
        done: false,
        dueDate: '2020-10-25'
      },
    ],
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
    addTask(state, newTaskTitle){
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
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
    updateTaskList(state, tasks) {
      state.tasks = tasks
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
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task added!')
    }, 
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    },
    updateTaskTitle({commit}, payload) {
      commit('updateTaskTitle', payload)
      commit('showSnackbar', 'Task Changed!')
    },
    updateTaskDueDate({commit}, payload) {
      commit('updateTaskDueDate', payload)
      commit('showSnackbar', 'Due Date Changed!')
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
})
