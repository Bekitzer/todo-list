<template>
  <div class="pa-10">
    <p>{{ supplier.name }}</p>
    <p>{{ supplier.number }}</p>
    <p>{{ supplier.companyName }}</p>
    <p>{{ supplier.phone }}</p>
    <p>{{ supplier.email }}</p>
    <p>{{ supplier.numberId }}</p>
    <p>{{ supplier.paymentTerms }}</p>
    <p>{{ supplier.paymentMethod }}</p>
    <p>{{ supplier.address }}</p>
    <p>{{ supplier.whatsapp }}</p>
    <p>{{ supplier.workingHours }}</p>
    <p>{{ supplier.deliveryType }}</p>
    <p>{{ supplier.status }}</p>
    <p>{{ supplier.supplierCreationDate }}</p>
    <p>{{ supplier.supplierUpdated }}</p>
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
        :to="{ name: 'Suppliers' }"
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
      :supplier = 'supplier'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :supplier = 'supplier'
    />
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data: () => ({
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false
    },
  }),
  computed: {
    supplier() {
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default
  }
}
</script>