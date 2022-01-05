<template>
  <div>
    <span><day-period /> </span>
    <strong v-if="isLoggedIn"> {{name}}</strong>
    <strong v-if="!isLoggedIn"> אורח</strong>
    <v-avatar
      class="profile"
      size="36px"
      style="margin-right:10px"
    >
      <v-img
        src="/images/radik.jpg"
        rounded
      ></v-img>
    </v-avatar>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Profile',
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
  computed: {
    // user() {
    //   return this.$store.state.user
    // }
  },
  components: {
    'day-period' : require('@/components/Tools/DayPeriod.vue').default
  }
}
</script>

<style>
</style>
