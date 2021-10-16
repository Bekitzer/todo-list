<template>
  <div class="pa-5">
    <h1>הזמנות</h1>
    <list-orders v-if="$store.state.orders" />
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
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-orders': require('@/components/Orders/ListOrders.vue').default,
      'no-orders': require('@/components/Orders/NoOrders.vue').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate.vue').default
    }
  }
</script>
