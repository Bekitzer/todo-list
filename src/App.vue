<template>
  <v-app id="inspire">
    <nav-drawer-logged-in v-if="isLoggedIn" />
    <nav-drawer-logged-out v-if="!isLoggedIn" />
    <v-main style="padding-top: 102px;">
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>


<script>
import db from '@/firebase'
import firebase from 'firebase/compat/app'
export default {
  data: () => ({
    isLoggedIn: false
  }),
  mounted() {
    this.$store.dispatch('getClients'),
    this.$store.dispatch('getSuppliers'),
    this.$store.dispatch('getOrders'),
    this.$store.dispatch('getProducts'),
    this.$store.dispatch('getUser'),
    this.$store.dispatch('getUsers')
  },
  components: {
    'nav-drawer-logged-in' : require('@/components/Global/NavDrawerLoggedIn.vue').default,
    'nav-drawer-logged-out' : require('@/components/Global/NavDrawerLoggedOut.vue').default,
    'nav-appbar' : require('@/components/Global/AppBar.vue').default,
    'snackbar' : require('@/components/Global/Snackbar.vue').default
  },
  created() {
    this.$vuetify.rtl = true
    if(firebase.auth().currentUser){
      this.isLoggedIn = true
    }
  }
}
</script>
<style lang="sass">
  @font-face
    font-family: 'Ploni-Regular'
    src: url('/fonts/Ploni-Regular-AAA.eot')
    src: local('☺'), url('/fonts/Ploni-Regular-AAA.woff') format('woff'), url('/fonts/Ploni-Regular-AAA.ttf') format('truetype'), url('/fonts/Ploni-Regular-AAA.svg') format('svg')
    font-weight: normal
    font-style: normal
  .v-application
    font-family: 'Ploni-Regular' !important


  .v-list-item__content
    justify-content: center
    padding: 20px 0 !important
    flex-direction: column !important

  .spc-logo
    background: #006D7B !important
  .v-list.v-sheet.theme--light.v-list--nav
    padding-top: 0 !important
  .theme--light.v-app-bar.v-toolbar.v-sheet
    background-color: #ffffff !important
  .theme--light.v-data-table > .v-data-table__ wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:not(.v-data-table__mobile-row)
    border-bottom: 1px solid #f1efef !important
  .v-application--is-rtl .v-data-table > .v-data-table__wrapper > table > thead > tr > th
    border-bottom: none !important
    cursor: pointer !important
  .ngs-button .v-btn__content
    text-transform: capitalize !important
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: #f5f5f5 !important
    cursor: pointer
  .spc-titles
    color: #797979
  th.text-start,td.text-start
    padding: 0 10px 0 0 !important
</style>
