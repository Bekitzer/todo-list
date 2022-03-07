<template>
  <div>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        open-on-hover
        :nudge-width="250"
        offset-y
        transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <span><day-period/> </span>
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
          <strong style="letter-spacing:0 !important;">{{ user.firstname }}</strong>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-row class="align-center pa-4">
          <v-col cols="12" md="3" sm="3">
            <v-avatar
                width="70"
                height="70"
            >
              <img
                  :src=user.avatar
                  :alt=(user.username)
              >
            </v-avatar>
          </v-col>
          <v-col cols="12" md="7" sm="7">
            <h4>{{ user.firstname }} {{ user.lastname }}</h4>
          </v-col>
          <v-col cols="12" md="2" sm="2">
            <v-tooltip
                top
                content-class="normal tooltip-top"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    @click.stop="a"
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-cog-outline
                </v-icon>
              </template>
              <span>עדכון פרופיל</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-list class="pa-4">
          <p class="ma-0">טלפון: {{ user.phone }}</p>
          <p class="ma-0">תפקיד: {{ user.position }}</p>
          <p class="ma-0">שם העסק: {{ user.username }}</p>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import {getAuth} from 'firebase/auth'

export default {
  name: 'Profile',
  data: () => ({
    menu: false,
  }),
  computed: {
    user() {
      return this.$store.getters.user || {}
    }
  },
  components: {
    'day-period': require('@/components/Tools/DayPeriod.vue').default
  }
}
</script>