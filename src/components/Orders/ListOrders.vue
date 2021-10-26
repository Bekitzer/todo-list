<template>
  <v-data-table
    flat
    :headers="headers"
    :items="orders"
    fixed-header
    item-key="id"
    sort-by="number"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
          icon
          dense
          plain
          @click="handleClick(item)"
        >
          <img
            width="26px"
            src="@/components/Icons/edit.svg"
          >
      </v-btn>
    </template>
    <template v-slot:[`item.statusType`]="{ item }">
      <v-icon
          :color="getColor(item.statusType)"
          class="spc-status-dot"
          size="60"
        >mdi-circle-small</v-icon>
        {{ item.statusType }}
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'ListOrders',
  data: () => ({
    headers: [
      { text: '#', value: 'number', align: 'start', width: '3%' },
      { text: 'ת.הזמנה', value: 'orderCreationDate', width: '10%'},
      { text: 'לקוח', value: 'clientName', width: '10%' },
      { text: 'מוצר / שם עבודה', value: 'orderWork', width: '17%' },
      { text: 'ספק', value: 'supplierName', width: '10%' },
      { text: 'ת.אספקה', value: 'deliveryDate', width: '10%' },
      { text: 'אופן אספקה', value: 'deliveryType', width: '7%' },
      { text: 'אחראי', value: 'deliveryAgent', width: '5%' },
      { text: 'מכירה', value: 'sellPrice', width: '5%' },
      { text: 'קניה', value: 'buyPrice', width: '5%' },
      { text: 'רווח', value: 'margin', width: '5%' },
      { text: 'פעולות', value: 'actions', width: '5%' },
      { text: 'סטטוס הזמנה', value: 'statusType', width: '8%' },
    ],
  }),
  props: ['order'],
  methods: {
    handleClick(order){
      this.$router.push({ name: 'Order', params: { id : order.id }})
    },
    getColor (statusType) {
      if (statusType === "הזמנה חדשה") return '#FF9800'
      else if (statusType === "בעבודה") return '#2196F3'
      else if (statusType === "מוכן לאיסוף") return '#4CAF50'
      else if (statusType === "מוכן לשילוח") return '#4CAF50'
      else if (statusType === "סופק") return '#9E9E9E'
      else return 'grey darken-1'
    },
  },
  computed: {
    orders: {
      get() {
        return this.$store.getters.ordersFiltered
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  }
}
</script>
<style lang="sass">
  th.spc-status-dot
    border-bottom: none !important
  .v-application .elevation-1, .theme--light.v-data-table.v-data-table--fixed-header thead th
    box-shadow: none !important
  .theme--light.v-data-table .v-data-footer
    border-top: none !important
  .spc-status-dot
    width: 12px
    margin-left: 6px
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: transparent
</style>