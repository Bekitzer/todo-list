<template>
  <div>
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-tooltip
          left
          content-class="normal tooltip-left"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            filled
            v-bind="attrs"
            v-on="on"
            class="spc-btn"
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
      'nav-appbar': require('@/components/Global/AppBar.vue').default
    }
  }
</script>