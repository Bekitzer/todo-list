import Vue from 'vue'
import Vuex from 'vuex'
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import db from '@/firebase'
import { doc, deleteDoc, updateDoc, collection, setDoc, runTransaction, getDoc, getDocs } from "firebase/firestore"
import authStore from './modules/authStore'
import firebase from 'firebase/compat/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authStore,
  },
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    suppliers: [],
    clients: [],
    orders: [],
    products: [],
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    },
    sorting: false,
    user: null
  },
  mutations: {
    //USER
    setUser(state, payload){
      state.user = payload
    },
    // SEARCH
    setSearch(state, value) {
      state.search = value
    },
    // PRODUCTS
    addProduct(state, newProduct){
      state.products.push(newProduct)
    },
    deleteProduct(state, id){
      state.products = state.products.filter(product => product.id !== id)
    },
    updateProduct(state, payload){
      let product = state.products.filter(product => product.id === payload.id)[0]
      Object.assign(product, payload)
    },
    setProducts(state, products) {
      state.products = products
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
    // SIGNUP
    signUserUp ({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(({user}) => {
        let newUser = {
          ...payload,
          uid: user.uid
        }
        commit('setUser', newUser),
        firebase.auth().currentUser.updateProfile({
            displayName: payload.username
        }).then(() => {
          db.collection('users').add({
            firstname: payload.firstname,
            lastname: payload.lastname,
            username: payload.username,
            email: payload.email,
            uid: newUser.uid
          })
        })
      })
    },
    // SIGNIN
    signUserIn ({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        let newUser = {
          ...payload,
        }
        commit('setUser', newUser)
      })
    },
    // PRODUCTS
    addProduct({ commit }, product) {
      const incrementDocRef = db.collection('--stats--').doc('products');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
        .get(incrementDocRef)
        .then((incrementDoc) => {
          if (!incrementDoc.exists) {
              throw "Document does not exist!";
          }

          var incremented = incrementDoc.data().increment + 1;
          transaction.update(incrementDocRef, { increment: incremented });
          return incremented;
        })
        .then(async (number) => {
          let isProduct = {
            ...product,
            number: number,
            productCreationDate: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}),
            productUpdated: null
          }
          await setDoc(doc(collection(db, "products")), isProduct)
          commit('addProduct', isProduct)
          commit('showSnackbar', 'מוצר חדש נוסף!')
        }).catch((error) => {
          console.log('Something went wrong - addProduct',error);
        })
      })
    },
    deleteProduct({ commit }, id) {
      deleteDoc(doc(db, "products", id)).then(() => {
        commit('deleteProduct', id)
        commit('showSnackbar', 'מוצר נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteProduct',error);
      })
    },
    updateProduct({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), payload).then(() => {
        commit('updateProduct', payload)
        commit('showSnackbar', 'מוצר עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateProduct',error);
      })
    },
    getProducts({ commit }) {
      db.collection('products').get().then(querySnapshot => {
        var products = [];
        querySnapshot.forEach(doc => {
          products.push({...doc.data(), id:doc.id})
        })
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - getProducts',error);
      })
    },
    setProducts({ commit }, products) {
      setDoc(doc(collection(db, "products")), products).then(() => {
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - setProducts',error);
      })
    },
    // ORDERS
    async addOrder({ commit }, order) {
      const incrementDocRef = db.collection('--stats--').doc('orders');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
        .get(incrementDocRef)
        .then((incrementDoc) => {
          if (!incrementDoc.exists) {
              throw "Document does not exist!";
          }

          var incremented = incrementDoc.data().increment + 1;
          transaction.update(incrementDocRef, { increment: incremented });
          return incremented;
        })
        .then(async (number) => {
          let isOrder = {
            ...order,
            number: number,
            orderCreationDate: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}),
            orderUpdated: null
          }

          await setDoc(doc(collection(db, "orders")), isOrder)
          commit('addOrder', isOrder)
          commit('showSnackbar', 'הזמנה חדשה נוספה!')
          console.log("Transaction successfully committed!");
        })
        .catch((error) => {
          console.log('Something went wrong - addOrder',error);
        });
      });
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
    // CLIENTS
    addClient({ commit }, client) {
      const incrementDocRef = db.collection('--stats--').doc('clients');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
        .get(incrementDocRef)
        .then((incrementDoc) => {
          if (!incrementDoc.exists) {
              throw "Document does not exist!";
          }

          var incremented = incrementDoc.data().increment + 1;
          transaction.update(incrementDocRef, { increment: incremented });
          return incremented;
        })
        .then(async (number) => {
          let isClient = {
            ...client,
            number: number,
            clientCreationDate: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}),
            clientUpdated: null
          }
          await setDoc(doc(collection(db, "clients")), isClient)
          commit('addClient', isClient)
          commit('showSnackbar', 'לקוח חדש נוסף!')
        }).catch((error) => {
          console.log('Something went wrong - addClient',error);
        })
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
      const incrementDocRef = db.collection('--stats--').doc('suppliers');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
        .get(incrementDocRef)
        .then((incrementDoc) => {
          if (!incrementDoc.exists) {
              throw "Document does not exist!";
          }

          var incremented = incrementDoc.data().increment + 1;
          transaction.update(incrementDocRef, { increment: incremented });
          return incremented;
        })
        .then(async (number) => {
          let isSupplier = {
            ...suppliers,
            number: number,
            supplierCreationDate: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}),
            supplierUpdated: null
          }
          await setDoc(doc(collection(db, "suppliers")), isSupplier)
            commit('addSupplier', isSupplier)
            commit('showSnackbar', 'ספק חדש נוסף!')
        }).catch((error) => {
          console.log('Something went wrong - addSupplier',error);
        })
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
    user (state) {
      return state.user
    },
    productsFiltered(state) {
      if (!state.search) {
        return state.products
      }
      return state.products.filter(product => product.name.toLowerCase().includes(state.search.toLowerCase()))

    },
    // ordersFiltered(state) {
    //   if (!state.search) {
    //     return state.orders
    //   }
    //   return state.orders.filter(order => order.clientName.toLowerCase().includes(state.search.toLowerCase()))

    // },
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

    }
  }
})
