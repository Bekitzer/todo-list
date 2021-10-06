<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th>שם ספק</th>
          <th>טלפון</th>
          <th>אימייל</th>
          <th>מספר עוסק</th>
          <th>סוג חברה</th>
          <th>כתובת</th>
          <th>איש קשר</th>
          <th>טלפון איש הקשר</th>
          <th>תאריך יצירה</th>
          <th>תאריך עדכון</th>
          <th>פעולות</th>
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