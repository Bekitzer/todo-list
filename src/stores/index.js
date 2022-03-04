import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase'
import {doc, deleteDoc, updateDoc, collection, setDoc, addDoc, getDocs} from "firebase/firestore"
import firebase from 'firebase/compat/app'
import Client from "@/stores/Client.js";
import User from "@/stores/User.js";
import ProductsTags from "@/stores/ProductTag.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    supplier: null,
    suppliers: [],
    orders: [],
    products: [],
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    },
    sorting: false
  },
  mutations: {
    // PRODUCTS
    addProduct(state, newProduct) {
      state.products.push(newProduct)
    },
    deleteProduct(state, id) {
      state.products = state.products.filter(product => product.id !== id)
    },
    updateProduct(state, payload) {
      const product = state.products.find(product => product.id === payload.id)
      Object.assign(product, payload)
    },
    setProducts(state, products) {
      state.products = products
    },
    // Attribute
    setAttributes(state, attributes) {
      state.attributes = attributes
    },
    // ORDERS
    addOrder(state, newOrder) {
      state.orders.push(newOrder)
    },
    deleteOrder(state, id) {
      state.orders = state.orders.filter(order => order.id !== id)
    },
    updateOrder(state, payload) {
      let order = state.orders.filter(order => order.id === payload.id)[0]
      Object.assign(order, payload)
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    // SUPPLIER
    setSupplier(state, supplier) {
      state.supplier = supplier
    },
    // SUPPLIERS
    addSupplier(state, newSupplier) {
      state.suppliers.push(newSupplier)
    },
    deleteSupplier(state, id) {
      state.suppliers = state.suppliers.filter(supplier => supplier.id !== id)
    },
    updateSupplier(state, payload) {
      let supplier = state.suppliers.filter(supplier => supplier.id === payload.id)[0]
      Object.assign(supplier, payload)
    },
    setSuppliers(state, suppliers) {
      state.suppliers = suppliers
    },
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
  actions: {
    // PRODUCTS
    addProduct({commit}, product) {
      const incrementDocRef = db.collection('--stats--').doc('products');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
          .get(incrementDocRef)
          .then((incrementDoc) => {
            if (!incrementDoc.exists) {
              throw "Document does not exist!";
            }

            const incremented = incrementDoc.data().increment + 1;
            transaction.update(incrementDocRef, {increment: incremented});
            return incremented;
          })
          .then(async (number) => {
            let isProduct = {
              ...product,
              number: number,
              productCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              productUpdated: null
            }
            await setDoc(doc(collection(db, "products")), isProduct)
            commit('addProduct', isProduct)
            commit('showSnackbar', 'מוצר חדש נוסף!')
          }).catch((error) => {
            console.log('Something went wrong - addProduct', error);
          })
      })
    },
    deleteProduct({commit}, id) {
      deleteDoc(doc(db, "products", id)).then(() => {
        commit('deleteProduct', id)
        commit('showSnackbar', 'מוצר נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteProduct', error);
      })
    },
    updateProduct({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), payload).then(() => {
        commit('updateProduct', payload)
        commit('showSnackbar', 'מוצר עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateProduct', error);
      })
    },
    getProducts({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling products since no admin role')

      return db.collection('products').get().then(querySnapshot => {
        const products = [];
        querySnapshot.forEach(doc => {
          products.push({...doc.data(), id: doc.id})
        })
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - getProducts', error);
      })
    },
    setProducts({commit}, products) {
      setDoc(doc(collection(db, "products")), products).then(() => {
        commit('setProducts', products)
      }).catch((error) => {
        console.log('Something went wrong - setProducts', error);
      })
    },
    // Attributes
    updateAttributes({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), {attributes: payload.attributes})
        .then(() => {
          commit('setAttributes', payload.attributes)
          commit('showSnackbar', 'מאפיינים עודכנו!')
        })
        .catch(error => {
          console.error('Something went wrong - updateAttributes', error);
        })
    },
    // ORDERS
    async addOrder({commit}, order) {
      const incrementDocRef = db.collection('--stats--').doc('orders');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
          .get(incrementDocRef)
          .then((incrementDoc) => {
            if (!incrementDoc.exists) {
              throw "Document does not exist!";
            }

            const incremented = incrementDoc.data().increment + 1;
            transaction.update(incrementDocRef, {increment: incremented});
            return incremented;
          })
          .then(async (number) => {
            let isOrder = {
              ...order,
              number: number,
              orderCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              orderUpdated: null
            }

            await setDoc(doc(collection(db, "orders")), isOrder)
            commit('addOrder', isOrder)
            commit('showSnackbar', 'הזמנה חדשה נוספה!')
            console.log("Transaction successfully committed!");
          })
          .catch((error) => {
            console.log('Something went wrong - addOrder', error);
          });
      });
    },
    deleteOrder({commit}, id) {
      deleteDoc(doc(db, "orders", id)).then(() => {
        commit('deleteOrder', id)
        commit('showSnackbar', 'הזמנה נמחקה!')
      }).catch((error) => {
        console.log('Something went wrong - deleteOrder', error);
      })
    },
    updateOrder({commit}, payload) {
      updateDoc(doc(db, "orders", payload.id), payload).then(() => {
        commit('updateOrder', payload)
        commit('showSnackbar', 'הזמנה עודכנה!')
      }).catch((error) => {
        console.log('Something went wrong - updateOrder', error);
      })
    },
    getOrders({commit, rootGetters}) {
      //const allCapitalsRes = await citiesRef.where('capital', '==', true).get();
      let ordersRef = db.collection('orders')
      if (!rootGetters.user?.isAdmin) {
        ordersRef = ordersRef.where('orderSupplierRef', '==', rootGetters.user?.userSupplierRef)
      }
      ordersRef.get().then(querySnapshot => {
        // return ordersRef

        const orders = [];
        querySnapshot.forEach(doc => {
          orders.push({...doc.data(), id: doc.id})
        })
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - getOrders', error);
      })
    },
    setOrders({commit}, orders) {
      setDoc(doc(collection(db, "orders")), orders).then(() => {
        commit('setOrders', orders)
      }).catch((error) => {
        console.log('Something went wrong - setOrders', error);
      })
    },
    // SUPPLIERS
    addSupplier({commit}, suppliers) {
      const incrementDocRef = db.collection('--stats--').doc('suppliers');

      db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction
          .get(incrementDocRef)
          .then((incrementDoc) => {
            if (!incrementDoc.exists) {
              throw "Document does not exist!";
            }

            const incremented = incrementDoc.data().increment + 1;
            transaction.update(incrementDocRef, {increment: incremented});
            return incremented;
          })
          .then(async (number) => {
            let isSupplier = {
              ...suppliers,
              number: number,
              supplierCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              supplierUpdated: null
            }
            await setDoc(doc(collection(db, "suppliers")), isSupplier)
            commit('addSupplier', isSupplier)
            commit('showSnackbar', 'ספק חדש נוסף!')
          }).catch((error) => {
            console.log('Something went wrong - addSupplier', error);
          })
      })
    },
    deleteSupplier({commit}, id) {
      deleteDoc(doc(db, "suppliers", id)).then(() => {
        commit('deleteSupplier', id)
        commit('showSnackbar', 'ספק נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteSupplier', error);
      })
    },
    updateSupplier({commit}, payload) {
      const {removeUsersIds, usersIds, ...supplier} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "suppliers", supplier.id), supplier)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userSupplierRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {userSupplierRef: db.doc('suppliers/' + supplier.id)})
        })))
        .then(() => {
          commit('updateSupplier', supplier)
          removeUsersIds.map(id => commit('updateUser', {id, userSupplierRef: null}))
          usersIds.map(id => commit('updateUser', {id, userSupplierRef: db.doc('suppliers/' + supplier.id)}))
          commit('showSnackbar', 'ספק עודכן!')
        })
        .catch((error) => {
          console.log('Something went wrong - updateSupplier & updateUser', error);
        })
    },
    getSuppliers({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling suppliers since no admin role')

      return db.collection('suppliers').get().then(querySnapshot => {
        const suppliers = [];
        querySnapshot.forEach(doc => {
          suppliers.push({...doc.data(), id: doc.id})
        })
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - getSuppliers', error);
      })
    },
    getSupplier({commit, rootGetters}) {
      if (rootGetters.user?.userSupplierRef) {
        rootGetters.user.userSupplierRef.get().then(doc => {
          commit('setSupplier', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getSupplier', error);
        })
      }
    },
    setSuppliers({commit}, suppliers) {
      setDoc(doc(collection(db, "suppliers")), suppliers).then(() => {
        commit('setSuppliers', suppliers)
      }).catch((error) => {
        console.log('Something went wrong - setSuppliers', error);
      })
    },
  },
  getters: {
    user(state) {
      return state.User.list.find(item => item.id === state.User.auth?.uid)
    }
  },
  modules: {
    Client,
    User,
    ProductsTags,
  }
})