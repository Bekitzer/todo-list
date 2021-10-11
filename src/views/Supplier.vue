<template>
  <div>
    <v-btn
      :to="{ name: 'Suppliers' }"
    >
      חזרה לכל הספקים
    </v-btn>
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
      :supplier = 'supplier'
    />
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data: () => ({
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
      'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default
  }
}
</script>