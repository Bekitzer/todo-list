<template>
  <div class="pa-10">
    <p>{{ order.number }}</p>
    <p>{{ order.clientName }}</p>
    <p>{{ order.orderWork }}</p>
    <p>{{ order.supplierName }}</p>
    <p>{{ order.deliveryDate }}</p>
    <p>{{ order.deliveryType }}</p>
    <p>{{ order.deliveryAgent }}</p>
    <p>{{ order.sellPrice }}</p>
    <p>{{ order.buyPrice }}</p>
    <p>{{ order.margin }}</p>
    <p>{{ order.orderCreationDate }}</p>
    <p>{{ order.orderUpdated }}</p>
    <v-speed-dial
      v-model="fab"
      bottom
      left
      fixed
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        :to="{ name: 'Orders' }"
      >
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="dialogs.delete = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :order = 'order'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :order = 'order'
    />
  </div>
</template>

<script>
export default {
  name: 'Client',
  data: () => ({
    pageName: '',
    fab: false,
    transition: 'slide-y-transition',
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
      'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default
  },
  mounted() {
    this.pageName = this.order.number
  }
}
</script>