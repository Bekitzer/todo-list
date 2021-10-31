<template>
    <v-navigation-drawer
      v-model="drawer"
      width="70"
      :right="$vuetify.rtl"
      :mobile-breakpoint="800"
      permanent
      app
    >
      <v-list
        nav
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
        <v-list-item
          class='spc-menu'
          v-for="item in items"
          :key="item.title"
          :to= "item.to"
          link
        >
          <v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title><v-icon color="white">{{ item.icon }}</v-icon></v-list-item-title>
            <v-list-item-subtitle class="white--text">{{ item.title }}</v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'היכנס',    icon: 'mdi-login',       to: '/login' },
      { title: 'הירשם',     icon: 'mdi-account-plus', to: '/register' }
    ],
  })
}
</script>

<style lang="sass" scoped>
  .v-navigation-drawer__content
    background-color: #626262
  .spc-img .v-responsive__sizer
    padding-bottom: 70px !important
  .spc-img .v-image__image--cover
    background-size: 60% !important
  .v-list-item--link:before
    background-color: white !important
  .v-list-item--active::before
    opacity: 0.2 !important
  .v-list--nav .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item:not(:last-child):not(:only-child)
    margin-bottom: 1px !important
  a.v-list-item.v-list-item--link:after
    content: ""
    border-bottom: 1px solid rgb(255 255 255 / 30%)
    width: 30%
    position: absolute
    bottom: -1px
</style>

