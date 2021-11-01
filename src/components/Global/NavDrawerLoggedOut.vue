<template>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      :right="$vuetify.rtl"
      :mobile-breakpoint="800"
      permanent
      mini-variant-width="70"
      app
    >
      <v-list-item
        class="spc-logo"
        :to="{ name: 'Home' }"
      >
        <v-img
          src="/images/logojp.png"
          class="spc-img"
        ></v-img>
      </v-list-item>
      <v-list nav >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to= "item.to"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text" style="z-index: 1;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    mini: true,
    items: [
      { title: 'היכנס',    icon: 'mdi-login',       to: '/login' },
      { title: 'הירשם',     icon: 'mdi-account-plus', to: '/register' }
    ],
  })
}
</script>

<style lang="sass">
  </style>

