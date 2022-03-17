import Vuex from 'vuex'
import Client from "@/stores/Client.js";
import Supplier from "@/stores/Supplier.js";
import Order from "@/stores/Order.js";
import Product from "@/stores/Product.js";
import Variation from "@/stores/Variation.js";
import User from "@/stores/User.js";
import ProductTag from "@/stores/ProductTag.js";
import Rate from "@/stores/Rate.js";
import Vue from 'vue';

Vue.use(Vuex)

export const options = {
  state: () => ({
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    },
    sorting: false
  }),
  mutations: {
    // GLOBALS
    setSearch(state, value) {
      state.search = value
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
    },
  },
  actions: {},
  getters: {
    user(state) {
      return state.User.list.find(item => item.id === state.User.auth?.uid)
    }
  },
  modules: {
    Client,
    Supplier,
    Order,
    Product,
    Variation,
    User,
    ProductTag,
    Rate
  }
}

export default new Vuex.Store(options)