<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th width="2%">#</th>
          <th width="8%">תאריך הזמנה</th>
          <th width="6%">לקוח</th>
          <th width="50%">מוצר / שם עבודה</th>
          <th width="6%">ספק</th>
          <th width="8%">תאריך אספקה</th>
          <th width="6%">אופן אספקה</th>
          <th width="6%">פעולות</th>
          <th width="8%" class="spc-status-dot">סטטוס הזמנה</th>
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
<style lang="sass">
  th.spc-status-dot
    border-bottom: none !important
</style>
