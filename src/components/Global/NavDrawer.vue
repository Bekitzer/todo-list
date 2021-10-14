<template>
  <v-img
    src="images/logojp.png"
    class="spc-img"
  ></v-img>
</template>

<script>
export default {}
</script>

<style lang="sass">
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
  .v-list-item__content
    padding: 26px 0 !important
  .v-list--nav .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item:not(:last-child):not(:only-child)
    margin-bottom: 1px !important
  a.v-list-item.v-list-item--link:after
    content: ""
    border-bottom: 1px solid rgb(255 255 255 / 30%)
    width: 30%
    position: absolute
    bottom: -1px
</style>

