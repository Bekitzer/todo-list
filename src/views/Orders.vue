<template>
  <div class="mr-16 ml-16">
    <nav-appbar :pname="pageName"/>
    <list-orders v-if="$store.state.orders.length" @duplicateOrder="onDuplicateOrder"/>
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
      :order="order"
      @close = 'dialogs.create = false'
    />
  </div>
</template>

<script>
  export default {
    name: 'Orders',
    hidden: false,
    data: () => ({
      order: null,
      search: '',
      pageName: 'הזמנות',
      dialogs: {
        create: false
      },
    }),
    watch: {
      'dialogs.create': function (val) {
        if(!val) {
          this.order = null
        }
      }
    },
    methods: {
      onDuplicateOrder(item) {
        this.order = JSON.parse(JSON.stringify(item))
        this.dialogs.create = true
      }
    },
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

