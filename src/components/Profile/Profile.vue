<template>
  <div class="text-center">
    <v-menu
      v-for="user in users" :key="user.id"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <span><day-period /> </span>
        <v-avatar
          class="profile"
          size="36px"
        >
          <v-img
            :src=user.avatar
            rounded
          ></v-img>
        </v-avatar>
        <v-btn
          plain
          v-bind="attrs"
          v-on="on"
        >
          <strong>{{user.username}}</strong>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src=user.avatar
                :alt=(user.username)
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{user.firstname}} {{user.lastname}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-title>טלפון: {{user.phone}}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>תפקיד: {{user.position}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'

export default {
  name: 'Profile',
  data: () => ({
    user:'',
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  created() {
    this.$vuetify.rtl = true
    const currentUserAuth = firebase.auth().currentUser

    if (currentUserAuth !== null) {
      this.name = currentUserAuth.displayName;
      this.email = currentUserAuth.email;
      this.photoURL = currentUserAuth.photoURL;
      this.emailVerified = currentUserAuth.emailVerified;
      this.uid = currentUserAuth.uid;
    }
  },
  computed: {
    users() {
      return this.$store.state.users.filter(user => user.uid === this.uid)
    },
  },
  components: {
    'day-period' : require('@/components/Tools/DayPeriod.vue').default
  }
}
</script>

<style>
</style>
