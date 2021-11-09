<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
    <div class="text-center">
      <h1>{{email}}</h1>
      <h1>{{uid}}</h1>
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

  },
  created() {
    this.$vuetify.rtl = true
    const user = getAuth().currentUser

    if (user !== null) {
      this.email = user.email
      this.uid = user.uid
    }
  },
  components: {
    'nav-appbar' : require('@/components/Global/AppBar.vue').default,
    'location' : require('@/components/Tools/Places.vue').default
  }
}
</script>
<style lang="sass">
</style>
