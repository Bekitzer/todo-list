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
          <th>ח.פ.</th>
          <th>תנאי תשלום</th>
          <th>אופן תשלום</th>
          <th>כתובת</th>
          <th>וואטסאפ</th>
          <th>שעות פעילות</th>
          <th>אופן אספקה</th>
          <th>סטטוס ספק</th>
          <th>תאריך רישום</th>
          <th>עודכן בתאריך ע״י</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
          <order
            v-for="order in orders"
            :key="order.id"
            :order="order"
          />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ListOrders',
  props: ['order'],
  computed: {
    orders: {
      get() {
        return this.$store.getters.ordersFiltered
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  },
  components: {
    'order': require('@/components/Orders/Order.vue').default
  }
}
</script>