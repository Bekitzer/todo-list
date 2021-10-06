<template>
  <div>
    <v-btn
      :to="{ name: 'Suppliers' }"
    >
      back to suppliers
    </v-btn>
    <p>{{ supplier.name }}</p>
    <p>{{ supplier.phone }}</p>
    <p>{{ supplier.email }}</p>
    <p>{{ supplier.number }}</p>
    <p>{{ supplier.type }}</p>
    <p>{{ supplier.address }}</p>
    <p>{{ supplier.contactPerson }}</p>
    <p>{{ supplier.contactPersonPhone }}</p>
    <p>{{ supplier.supplierCreationDate }}</p>
    <p>{{ supplier.supplierUpdated }}</p>
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  computed: {
    supplier() {
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$route.params.id)
    }
  }
}
</script>