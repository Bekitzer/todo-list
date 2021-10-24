<template>
  <v-app id="inspire">
    <nav-drawer />
    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>


<script>
import db from '@/firebase'
export default {
  mounted() {
    this.$store.dispatch('getTasks'),
    this.$store.dispatch('getClients'),
    this.$store.dispatch('getSuppliers'),
    this.$store.dispatch('getOrders'),
    this.$store.dispatch('getAccountings')
  },
  components: {
    'nav-drawer'          : require('@/components/Global/NavDrawer.vue').default,
    'nav-appbar'          : require('@/components/Global/AppBar.vue').default,
    'snackbar'          : require('@/components/Global/Snackbar.vue').default
  },
  created() {
    this.$vuetify.rtl = true;
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
  a.v-list-item.v-list-item--link
    justify-content: center !important
  .v-application .justify-center, .v-application--is-rtl .v-list-item__action:first-child, .v-application--is-rtl .v-list-item__icon:first-child
    margin: 0 !important
  .v-list-item__content
    justify-content: center
    flex-direction: column !important
  .v-list-item__subtitle
    font-size: 12px !important
  .v-list--nav
    padding-left: 0 !important
    padding-right: 0 !important
  .v-list--nav .v-list-item, .v-list--nav .v-list-item:before
    border-radius: 0 !important
  .spc-logo
    background: #006D7B !important
    margin: 0 !important
    padding: 8px 10px !important
  .v-list.v-sheet.theme--light.v-list--nav
    padding-top: 0 !important
  .header-container .row
    align-items: center
  .theme--light.v-data-table > .v-data-table__ wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:not(.v-data-table__mobile-row)
    border-bottom: none !important
  .v-data-table>.v-data-table__wrapper>table>tbody>tr:nth-child(odd)>td
    background-color: #f1f1f1
  .v-data-table>.v-data-table__wrapper>table>tbody>tr:nth-child(odd)>td:last-child
    background-color: #ffffff
  .v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(odd)>td:first-child
    border-radius: 0px 10px 10px 0px !important
  .v-data-table > .v-data-table__wrapper > table > tbody > tr:nth-child(odd)>td:nth-last-child(2)
    border-radius: 10px 0px 0px 10px !important
  .v-application--is-rtl .v-data-table > .v-data-table__wrapper > table > thead > tr > th
    border-bottom: none !important
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: transparent
</style>
