import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'Wake Up',
        done: false
      },
      {
        id: 2,
        title: 'Brush Teeth',
        done: false
      },
      {
        id: 3,
        title: 'Go To Work',
        done: false
      },
      {
        id: 4,
        title: 'Delete All',
        done: false
      },
    ],
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    }
  },
  mutations: {
    addTask(state, newTaskTitle){
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false        
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
    }
  },
  getters: {
  }
})
