import firebase from 'firebase/compat';
import {collection, deleteDoc, doc, setDoc, updateDoc} from 'firebase/firestore';
import db from '@/firebase'
import {getAuth} from 'firebase/auth';

export default {
  namespaced: true,
  state: {
    auth: null,
    list: []
  },
  mutations: {
    deleteUser(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    upsertUser(state, payload) {
      let found = false

      let items = state.list.map(item => {
        if (item.id === payload.id) found = true

        return found ? payload : item
      })

      if (!found) items = state.list.concat(payload)

      state.list = items
    },
    setUsers(state, items) {
      if(!Array.isArray(items)) items = [items]

      state.list = state.list.concat(...items)
    },
    setAuth(state, payload) {
      state.auth = payload
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
              .then(() => commit('upsertUser', newUser))
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
                commit('upsertUser', newUser)
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
            commit('setUsers', isUser)
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
        commit('upsertUser', payload)
        commit('showSnackbar', 'משתמש עודכן!')
      }).catch((error) => {
        console.log('Something went wrong - updateUser', error);
      })
    },
    getUsers({commit, rootGetters}) {
      if (!rootGetters.user?.isAdmin) return console.debug('not pulling users since no admin role')

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
      if (!user) return console.debug('no user authenticated')
      return db.collection('users').doc(user.uid).get()
        .then(doc => {
          const newUser = doc.data()
          commit('upsertUser', newUser)
        })
        .catch((error) => {
          console.log('Something went wrong - getUser', error);
        })
    },
  },
  modules: {}
}