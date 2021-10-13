<template>
  <div>
    <v-btn
      :to="{ name: 'Orders' }"
    >
      חזרה לכל ההזמנות
    </v-btn>
    <p>{{ order.number }}</p>
    <p>{{ order.clientName }}</p>
    <p>{{ order.orderWork }}</p>
    <p>{{ order.supplierName }}</p>
    <p>{{ order.deliveryDate }}</p>
    <p>{{ order.deliveryType }}</p>
    <p>{{ order.orderCreationDate }}</p>
    <p>{{ order.orderUpdated }}</p>
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :order = 'order'
    />
  </div>
</template>

<script>
export default {
  name: 'Client',
  data: () => ({
    dialogs: {
      edit: false
    },
  }),
  computed: {
    order() {
      return this.$store.state.orders.find(order => order.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit.vue').default
  }
}
</script>