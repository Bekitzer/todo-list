<template>
  <div>
    <span><day-period /> </span>
    <strong v-if="isLoggedIn"> {{name}}</strong>
    <strong v-if="!isLoggedIn"> אורח</strong>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Name',
  data: () => ({
    isLoggedIn: false,
    currentUser: false
  }),
  created() {
    this.$vuetify.rtl = true
    if(firebase.auth().currentUser){
      this.isLoggedIn = true
    }
    const user = getAuth().currentUser;
    if (user !== null) {
      this.name = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.uid = user.uid;
    }
  },
  components: {
    'day-period' : require('@/components/Tools/DayPeriod.vue').default
  }
}
</script>

<style>
</style>
