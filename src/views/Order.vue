<template>
  <div>
    <v-btn
      :to="{ name: 'Orders' }"
    >
      חזרה לכל הלקוחות
    </v-btn>
    <p>{{ order.name }}</p>
    <p>{{ order.number }}</p>
    <p>{{ order.companyName }}</p>
    <p>{{ order.phone }}</p>
    <p>{{ order.email }}</p>
    <p>{{ order.numberId }}</p>
    <p>{{ order.paymentTerms }}</p>
    <p>{{ order.paymentMethod }}</p>
    <p>{{ order.address }}</p>
    <p>{{ order.whatsapp }}</p>
    <p>{{ order.workingHours }}</p>
    <p>{{ order.deliveryType }}</p>
    <p>{{ order.status }}</p>
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