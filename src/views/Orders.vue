<template>
  <div class="pr-16 pt-10 pl-16">
    <nav-appbar :pname="pageName"/>
    <list-orders v-if="$store.state.orders.length" />
    <no-orders v-else />
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.create = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
  </div>
</template>

<script>
  export default {
    name: 'Orders',
    hidden: false,
    data: () => ({
      pageName: 'הזמנות',
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-orders': require('@/components/Orders/ListOrders.vue').default,
      'no-orders': require('@/components/Orders/NoOrders.vue').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate.vue').default,
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
<style lang="sass">
@media (max-width: 800px)
  .v-application .pl-16
    padding-left: 20px !important
  .v-application .pr-16
    padding-right: 20px !important
  .v-application .pt-10
    padding-top: 0px !important
</style>

