<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="חפש הזמנה..."
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="orders"
      :expanded="expanded"
      item-key="id"
      :search="search"
      :items-per-page="-1"
      sort-by="number"
      show-expand
      flat
      height="800px"
      fixed-header
      hide-default-footer
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td class="orderWorkInfo" :colspan="headers.length">
          {{ item.orderWork }}
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="clickOrder(item)" dense icon plain>
          <img
            width="26px"
            src="@/components/Icons/edit.svg"
          >
        </v-btn>
      </template>
      <template v-slot:item.clients="{ item }">
        <a @click="clickClient(item)" style="color:#006d7b;" dense plain text>
          {{ item.clientName }}
        </a>
      </template>
      <template v-slot:item.suppliers="{ item }">
        <a @click="clickSupplier(item)" style="color:#006d7b;" dense plain text>
          {{ item.supplierName }}
        </a>
      </template>
      <template v-slot:item.sell="{ item }">
          {{ item.sellPrice | formatNumber }}
      </template>
      <template v-slot:item.buy="{ item }">
          {{ item.buyPrice | formatNumber }}
      </template>
      <template v-slot:item.margins="{ item }">
          {{ item.margin | formatNumber }}
      </template>
      <template v-slot:[`item.statusType`]="{ item }">
        <v-icon :color="getColor(item.statusType)" class="spc-status-dot" size="60">
          mdi-circle-small
        </v-icon>
          {{ item.statusType }}
      </template>
    </v-data-table>
  </div>
</template>
<script>

export default {
  name: 'ListOrders',
  data: () => ({
    search: '',
    expanded: [],
    singleExpand: true,
    headers: [
      { text: '#', value: 'number', align: 'start', width: '3%' },
      { text: 'ת.הזמנה', value: 'orderCreationDate', width: '10%'},
      { text: 'לקוח', value: 'clientName', width: '10%' },
      { text: '', value: 'data-table-expand' },
      { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', width: '17%' },
      { text: 'ספק', value: 'supplierName', width: '10%' },
      { text: 'ת.אספקה', value: 'deliveryDate', width: '10%' },
      { text: 'אופן אספקה', value: 'deliveryType', width: '7%' },
      { text: 'אחראי', value: 'deliveryAgent', width: '5%' },
      { text: 'מכירה', value: 'sell', width: '5%' },
      { text: 'קניה', value: 'buy', width: '5%' },
      { text: 'רווח', value: 'margins', width: '5%' },
      { text: 'פעולות', value: 'actions', width: '5%' },
      { text: 'סטטוס הזמנה', value: 'statusType', width: '8%' },
    ],
  }),
  props: ['order'],
  // props: ['client'],
  // props: ['supplier'],
  methods: {
    clickOrder(order){
      this.$router.push({ name: 'Order', params: { id : order.id }})
    },
    clickClient(client){
      this.$router.push({ name: 'Client', params: { id : client.id }})
    },
    clickSupplier(supplier){
      this.$router.push({ name: 'Supplier', params: { id : supplier.id }})
    },

    getColor (statusType) {
      if (statusType === "הזמנה חדשה") return '#FF9800'
      else if (statusType === "בעבודה") return '#2196F3'
      else if (statusType === "מוכן - משרד") return '#4CAF50'
      else if (statusType === "מוכן - ספק") return '#4CAF50'
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
    background: transparent !important
  .orderWorkInfo
    padding: 20px !important
    white-space: pre-line !important
    border-radius: 20px !important
  .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
    box-shadow: none !important
    background: #fbfbfb !important
</style>