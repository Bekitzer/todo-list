<template>
  <div>
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-tooltip
          bottom
          content-class="normal tooltip-bottom"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            outlined
            v-bind="attrs"
            v-on="on"
            class="spc-btn mr-4"
            @click="dialogs.create = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          </template>
          <span>הזמנה חדשה</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <list-orders v-if="$store.state.orders.length" @duplicateOrder="onDuplicateOrder"/>
    <no-orders v-else />

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
  .spc-btn
    color: #03616f !important
    transform: rotate(0deg)
    position: absolute
    right: 70px
    top: -3px
  .spc-btn:hover
    background: #03616f
    color: white !important
    transform: rotate(90deg)
  @media (max-width: 800px)
    .v-application .pl-16
      padding-left: 20px !important
    .v-application .pr-16
      padding-right: 20px !important
    .v-application .pt-10
      padding-top: 0px !important
</style>