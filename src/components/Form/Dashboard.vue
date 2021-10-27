<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
      <div class="text-center">
        <h1>{{email}}</h1>

        <v-btn
          color="primary"
          @click.prevent.stop="logout"
        >
          Logout
        </v-btn>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";
import db from '@/firebase'

export default {
  name: "Dashboard",
  data: () => ({
    pageName: 'לוח בקרה',
  }),
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
          this.$router.go({path: this.$router.path})
      });
    }
  },
  created() {
    this.$vuetify.rtl = true
    const user = getAuth().currentUser;
    if (user !== null) {
      this.email = user.email;
    }
  },
  components: {
    'nav-appbar' : require('@/components/Global/AppBar.vue').default,
    'location' : require('@/components/Tools/Places.vue').default
  }
}
</script>