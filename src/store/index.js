import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase'
import {doc, deleteDoc, updateDoc, collection, setDoc} from "firebase/firestore"
import firebase from 'firebase/compat/app'
import {getAuth} from "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    supplier: null,
    suppliers: [],
    clients: [],
    orders: [],
    products: [],
    users: [],
    snackbar: {
      show: false,
      text: '',
      timeout: 2000
    },
    sorting: false,
    user: null,
    auth: null
  },
  mutations: {
    //USERS
    addUser(state, newUser) {
      state.users.push(newUser)
    },
    deleteUser(state, id) {
      state.users = state.users.filter(user => user.id !== id)
    },
    setUsers(state, users) {
      state.users = users
    },
    //USER
    setUser(state, payload) {
      state.user = payload
    },
    updateUser(state, payload) {
      const user = state.users.find(user => user.id === payload.id)
      Object.assign(user, payload)
    },
    setAuth(state, payload) {
      state.auth = payload
    },
    // SEARCH
    setSearch(state, value) {
      state.search = value
    },
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
    // CLIENTS
    addClient(state, newClient) {
      state.clients.push(newClient)
    },
    deleteClient(state, id) {
      state.clients = state.clients.filter(client => client.id !== id)
    },
    updateClient(state, payload) {
      let client = state.clients.filter(client => client.id === payload.id)[0]
      Object.assign(client, payload)
    },
    setClients(state, clients) {
      state.clients = clients
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
    signUserUp({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({user}) => {
          let newAuth = {
            ...payload,
            uid: user.uid
          }
          commit('setAuth', newAuth)
          firebase.auth().currentUser.updateProfile({
            displayName: payload.username
          }).then(() => {
            const {password, ...newUser} = payload
            return db.collection('users').doc(newAuth.uid).set(newUser)
              .then(() => commit('setUser', newUser))
              .catch((error) => {
                console.log('Something went wrong - signUserUp', error);
              })
          })
        })
    },
    // SIGNIN
    signUserIn({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(({user}) => {
          let newAuth = {
            ...payload,
            uid: user.uid
          }
          commit('setAuth', newAuth)
          return newAuth
        })
        .then((newAuth) => {
          db.collection('users').where("uid", "==", newAuth.uid).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const newUser = doc.data()
                commit('setUser', newUser)
              });
            })
            .catch((error) => {
              console.log('Something went wrong - signUserIn', error);
            })
        })

    },
    // USERS
    addUser({commit}, user) {
      const incrementDocRef = db.collection('--stats--').doc('users');

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
            let isUser = {
              ...user,
              number: number,
              userCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              userUpdated: null
            }
            await setDoc(doc(collection(db, "users")), isUser)
            commit('addUser', isUser)
            commit('showSnackbar', 'משתמש חדש נוסף!')
          }).catch((error) => {
            console.log('Something went wrong - addUser', error);
          })
      })
    },
    deleteUser({commit}, id) {
      deleteDoc(doc(db, "users", id)).then(() => {
        commit('deleteUser', id)
        commit('showSnackbar', 'משתמש נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteUser', error);
      })
    },
    updateUser({commit}, payload) {
      updateDoc(doc(db, "users", payload.id), payload).then(() => {
        commit('updateUser', payload)
        commit('showSnackbar', 'משתמש עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateUser', error);
      })
    },
    getUsers({commit, state}) {
      if (!state.user?.isAdmin) return console.debug('not pulling users since no admin role')

      db.collection('users').get().then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          users.push({...doc.data(), id: doc.id})
        })
        commit('setUsers', users)
      }).catch((error) => {
        console.log('Something went wrong - getUsers', error);
      })
    },
    setUsers({commit}, users) {
      setDoc(doc(collection(db, "users")), users).then(() => {
        commit('setUsers', users)
      }).catch((error) => {
        console.log('Something went wrong - setUsers', error);
      })
    },
    // USER
    getUser({commit}) {
      const user = getAuth().currentUser
      if (!user) return console.log('no user authenticated')
      return db.collection('users').doc(user.uid).get()
        .then(doc => {
          const newUser = doc.data()
          commit('setUser', newUser)
        })
        .catch((error) => {
          console.log('Something went wrong - getUser', error);
        })
    },
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
    // Attributes
    updateAttributes({commit}, payload) {
      updateDoc(doc(db, "products", payload.id), {attributes: payload.attributes}).then(() => {
        commit('setAttributes', payload.attributes)
        commit('showSnackbar', 'מאפיינים עודכנו!')
      }).catch((error) => {
        console.log('Something went wrong - updateAttributes', error);
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
    getProducts({commit, state}) {
      if (!state.user?.isAdmin) return console.debug('not pulling products since no admin role')

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
    getOrders({commit, state}) {
      // if (!state.user?.isAdmin) return console.debug('not pulling orders since no admin role')

      //const allCapitalsRes = await citiesRef.where('capital', '==', true).get();
       let ordersRef = db.collection('orders')
      if (!state.user?.isAdmin) {
        ordersRef = ordersRef.where('orderSupplierRef', '==', db.doc('suppliers/1jBRwGvpXzX7keqNk5te'))
      }
      ordersRef.get().then(querySnapshot => {
      // return ordersRef

        const orders = [];
        querySnapshot.forEach(doc => {
          //if(doc.data().id === "zeBBSwcFbL9JxPRKcJB8") {
          //   const sup = doc.data()
            // const {supplierName, ...rest} = sup
            // console.log(doc.ref.set(rest))
          // if(supplierName) {
          //   console.log(doc.ref.set({orderSupplierRef: db.doc(`suppliers/${supplierName}`), ...rest}))
          // }
          // }
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
    // CLIENTS
    addClient({commit}, client) {
      const incrementDocRef = db.collection('--stats--').doc('clients');

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
            let isClient = {
              ...client,
              number: number,
              clientCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
              clientUpdated: null
            }
            await setDoc(doc(collection(db, "clients")), isClient)
            commit('addClient', isClient)
            commit('showSnackbar', 'לקוח חדש נוסף!')
          }).catch((error) => {
            console.log('Something went wrong - addClient', error);
          })
      })
    },
    deleteClient({commit}, id) {
      deleteDoc(doc(db, "clients", id)).then(() => {
        commit('deleteClient', id)
        commit('showSnackbar', 'לקוח נמחק!')
      }).catch((error) => {
        console.log('Something went wrong - deleteClient', error);
      })
    },
    updateClient({commit}, payload) {
      const {removeUsersIds, usersIds, ...client} = payload
      // TODO: batch those requests to a transaction
      updateDoc(doc(db, "clients", client.id), client)
        .then(() => Promise.all(removeUsersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {clientRef: null})
        })))
        .then(() => Promise.all(usersIds.map(userId => {
          return updateDoc(doc(db, "users", userId), {clientRef: client.id})
        })))
        .then(() => {
          commit('updateClient', client)
          removeUsersIds.map(id => commit('updateUser', {id, clientRef: null}))
          usersIds.map(id => commit('updateUser', {id, clientRef: client.id}))
          commit('showSnackbar', 'לקוח עודכן!')
        })
        .catch((error) => {
          console.log('Something went wrong - updateClient & updateUser', error);
        })
    },
    getClients({commit, state}) {
      if (!state.user?.isAdmin) return console.debug('not pulling clients since no admin role')

      return db.collection('clients').get().then(querySnapshot => {
        const clients = [];
        querySnapshot.forEach(doc => {
          clients.push({...doc.data(), id: doc.id})
        })
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - getClients', error);
      })
    },
    setClients({commit}, clients) {
      setDoc(doc(collection(db, "clients")), clients).then(() => {
        commit('setClients', clients)
      }).catch((error) => {
        console.log('Something went wrong - setClients', error);
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
    getSuppliers({commit, state}) {
      if (!state.user?.isAdmin) return console.debug('not pulling suppliers since no admin role')

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
    getSupplier({commit, state}) {
      if (state.user?.userSupplierRef) {
        state.user.userSupplierRef.get().then(doc => {
          commit('setSupplier', {...doc.data(), id: doc.id})
        }).catch((error) => {
          console.log('Something went wrong - getSuppliers', error);
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
      return state.user
    }
  }
})