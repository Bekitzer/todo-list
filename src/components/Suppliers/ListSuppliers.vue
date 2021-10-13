<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th>#</th>
          <th>שם ספק</th>
          <th>שם חברה</th>
          <th>טלפון משרד</th>
          <th>מייל משרד</th>
          <!-- <th>ח.פ.</th> -->
          <!-- <th>תנאי תשלום</th> -->
          <!-- <th>אופן תשלום</th> -->
          <th>כתובת</th>
          <!-- <th>וואטסאפ</th> -->
          <!-- <th>שעות פעילות</th> -->
          <th>אופן אספקה</th>
          <th>סטטוס ספק</th>
          <!-- <th>תאריך רישום</th> -->
          <!-- <th>עודכן בתאריך ע״י</th> -->
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