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
    <list-orders v-if="$store.state.Order.list.length" @duplicateOrder="onDuplicateOrder" @openOrderFile="onOpenOrderFile"/>
    <no-orders v-else />
    <dialog-create
      v-if="dialogs.create"
      v-model="dialogs.create"
      :order="order"
      @close="dialogs.create = false"
    />
    <dialog-image
      v-if="dialogs.image"
      v-model="dialogs.image"
      :order="order"
      @close="dialogs.image = false"
    />
  </div>
</template>

<script>
  import { deepCopy } from "@/stores/utils"

  export default {
    name: 'Orders',
    hidden: false,
    data: () => ({
      order: null,
      search: '',
      pageName: 'הזמנות',
      dialogs: {
        create: false,
        image: false
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
        this.order = deepCopy(item)
        this.dialogs.create = true
      },
      onOpenOrderFile(item) {
        this.order = deepCopy(item)
        this.dialogs.image = true
      }
    },
    components: {
      'list-orders': require('@/components/Orders/ListOrders').default,
      'no-orders': require('@/components/Orders/NoOrders').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate').default,
      'nav-appbar': require('@/components/Global/AppBar').default,
      'dialog-image': require('@/components/Orders/Dialogs/DialogImage').default
    }
  }
</script>