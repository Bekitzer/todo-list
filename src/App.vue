<template>
  <v-app id="inspire">
    <nav-drawer-logged-in v-if="isLoggedIn" />
    <nav-drawer-logged-out v-if="!isLoggedIn" />
    <v-main>
      <router-view style="padding: 4px 4%;"></router-view>
      <snackbar />
    </v-main>
    <nav-footer style="padding: 4px 4%;" />
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
    'nav-footer' : require('@/components/Global/FooterBar.vue').default,
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
  .v-input--selection-controls__input
    transform: rotate(180deg)
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
    padding: 0 5px !important
  .tooltip-top::before
    border-right: solid 8px transparent
    border-left: solid 8px transparent
    transform: translateX(-50%)
    position: absolute
    z-index: -21
    content: ''
    top: 100%
    left: 50%
    height: 0
    width: 0
  .tooltip-top.error::before
    border-top: solid 8px #ff6060
  .tooltip-top.success::before
    border-top: solid 8px #1B5E20
  .tooltip-top.secondary::before
    border-top: solid 8px #3f3f3f
  .tooltip-top.primary::before
    border-top: solid 8px #246fb3
  .tooltip-top.normal::before
    border-top: solid 8px #616161e6
  .tooltip-top.info::before
    border-top: solid 8px #2196f3
  .tooltip-bottom::before
    border-right: solid 8px transparent
    border-left: solid 8px transparent
    transform: translateX(-50%)
    position: absolute
    z-index: -21
    content: ''
    bottom: 100%
    left: 50%
    height: 0
    width: 0
  .tooltip-bottom.error::before
    border-bottom: solid 8px #ff6060
  .tooltip-bottom.success::before
    border-bottom: solid 8px #1B5E20
  .tooltip-bottom.secondary::before
    border-bottom: solid 8px #3f3f3f
  .tooltip-bottom.primary::before
    border-bottom: solid 8px #246fb3
  .tooltip-bottom.normal::before
    border-bottom: solid 8px #616161e6
  .tooltip-bottom.info::before
    border-bottom: solid 8px #2196f3
  .tooltip-right::before
    content: " "
    position: absolute
    top: 50%
    right: 100%
    margin-top: -8px
    border-width: 8px
    border-style: solid
    border-top: solid 8px transparent
    border-bottom: solid 8px transparent
    border-left: solid 8px transparent
  .tooltip-right.error::before
    border-right: solid 8px #ff6060 !important
  .tooltip-right.success::before
    border-right: solid 8px #1B5E20 !important
  .tooltip-right.secondary::before
    border-right: solid 8px #3f3f3f !important
  .tooltip-right.primary::before
    border-right: solid 8px #246fb3 !important
  .tooltip-right.normal::before
    border-right: solid 8px #616161e6 !important
  .tooltip-right.info::before
    border-right: solid 8px #2196f3 !important
  .tooltip-left::before
    content: " "
    position: absolute
    top: 50%
    left: 100%
    margin-top: -8px
    border-width: 8px
    border-style: solid
    border-top: solid 8px transparent
    border-bottom: solid 8px transparent
    border-right: solid 8px transparent
  .tooltip-left.error::before
    border-left: solid 8px #ff6060 !important
  .tooltip-left.success::before
    border-left: solid 8px #1B5E20 !important
  .tooltip-left.secondary::before
    border-left: solid 8px #3f3f3f !important
  .tooltip-left.primary::before
    border-left: solid 8px #246fb3 !important
  .tooltip-left.normal::before
    border-left: solid 8px #616161e6 !important
  .tooltip-left.info::before
    border-left: solid 8px #2196f3 !important
  .v-input--switch__thumb.theme--light.primary--text,
  .v-input--switch__track.theme--light.primary--text,
  .v-input--selection-controls__ripple.primary--text
    color: #03616f !important
    caret-color: #03616f !important
  .v-data-table__wrapper tr
    height: 60px !important
  .spc-status-dot
    width: 12px
    margin-left: 6px
    line-height: 0.1 !important
  th.spc-status-dot
    border-bottom: none !important
</style>
