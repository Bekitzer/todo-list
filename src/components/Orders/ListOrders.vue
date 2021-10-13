<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th>#</th>
          <th>תאריך הזמנה</th>
          <th>לקוח</th>
          <th>מוצר / שם עבודה</th>
          <th>ספק</th>
          <th>תאריך אספקה</th>
          <th>אופן אספקה</th>
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