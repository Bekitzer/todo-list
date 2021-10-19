<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th width="4%">#</th>
          <th width="10%">שם ספק</th>
          <th width="16%">שם חברה</th>
          <th width="8%">טלפון משרד</th>
          <th width="12%">מייל משרד</th>
          <th width="24%">כתובת</th>
          <th width="6%">אופן אספקה</th>
          <th width="6%">סטטוס ספק</th>
          <th width="6%">פעולות</th>
          <th width="8%">ה.פעילות</th>
        </tr>
      </thead>
      <tbody>
          <single-supplier
            v-for="supplier in suppliers"
            :key="supplier.id"
            :supplier="supplier"
          />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ListSuppliers',
  props: ['supplier'],
  computed: {
    suppliers: {
      get() {
        return this.$store.getters.suppliersFiltered
      },
      set(value) {
        this.$store.dispatch('setSuppliers', value)
      }
    }
  },
  components: {
    'single-supplier': require('@/components/Suppliers/Supplier.vue').default
  }
}
</script>