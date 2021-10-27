<template>
  <div>
    <span style="color:white;">בוקר טוב </span>
    <strong v-if="isLoggedIn" style="color:white;"> {{name}}</strong>
    <strong v-if="!isLoggedIn" style="color:white;"> אורח</strong>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";

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
  }
}
</script>

<style>
</style>
