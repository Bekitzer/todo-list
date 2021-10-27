<template>
  <div>
    <h1>{{ this.$store.state.authStore.test }}</h1>
    <a @click.prevent.stop="logout">Logout</a>
</div>
</template>
<script>
import firebase from 'firebase/compat/app'
export default {
  name: "Dashboard",
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
          this.$router.replace('login');
      });
    }
  }
}
</script>