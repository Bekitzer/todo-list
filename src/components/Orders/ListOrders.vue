<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th width="4%">#</th>
          <th width="10%">ת.הזמנה</th>
          <th width="16%">לקוח</th>
          <th width="12%">מוצר / שם עבודה</th>
          <th width="8%">ספק</th>
          <th width="10%">ת.אספקה</th>
          <th width="6%">אופן אספקה</th>
          <th width="8%">אחראי</th>
          <th width="4%">מכירה</th>
          <th width="4%">קניה</th>
          <th width="4%">רווח</th>
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
