<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :expanded="expanded"
    item-key="id"
    :search="search"
    :items-per-page="-1"
    sort-by="number"
    show-expand
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
      <v-btn @click="clickOrder(item)" dense plain>
        <img
          width="26px"
          src="@/components/Icons/edit.svg"
        >
      </v-btn>
    </template>
    <template v-slot:item.clients="{ item }">
      <v-btn @click="clickClient(item)" dense plain style="color:#006d7b;">
        {{ item.clientName }}
      </v-btn>
    </template>
    <template v-slot:item.suppliers="{ item }">
      <v-btn @click="clickSupplier(item)" dense plain style="color:#006d7b;">
        {{ item.supplierName }}
      </v-btn>
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
    <template v-slot:item.statusType="{ item }">
      <v-icon :color="getColor(item.statusType)" class="spc-status-dot" size="60">
        mdi-circle-small
      </v-icon>
        {{ item.statusType }}
    </template>
    <template >
      <!-- v-slot:top -->
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="2" sm="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="חפש הזמנה..."
                hide-details
                clearable
              ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="2" sm="6">
              <v-select
                :items="orderStatusTypeList"
                v-model="statusesFilterValue"
                label="סנן לפי סטטוס..."
                clearable
                multiple
                small-chips
              >
              </v-select>
          </v-col>

        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>
<script>

export default {
  name: 'ListOrders',
  data: () => ({
    statusesFilterValue: null,
    search: '',
    expanded: [],
    singleExpand: true,
    orderStatusTypeList: [
      {text: "הזמנה חדשה", value: "הזמנה חדשה"},
      {text: "בעבודה", value: "בעבודה"},
      {text: "מוכן - משרד", value: "מוכן - משרד"},
      {text: "מוכן - ספק", value: "מוכן - ספק"},
      {text: "סופק", value: "סופק"}
    ],
  }),
  // props: ['order'],
  // props: ['client'],
  // props: ['supplier'],
  methods: {
    statusesFilter(item) {
      if (!this.statusesFilterValue) {
        return true;
      }
      return item === this.statusesFilterValue;
    },
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
    headers () {
      return [
      { text: '#', value: 'number', align: 'start', width: '3%' },
      { text: 'תאריך הזמנה', value: 'orderCreationDate', width: '10%' },
      { text: 'לקוח', value: 'clientName', width: '10%' },
      { text: '', value: 'data-table-expand', 'sortable': false,  },
      { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', width: '17%', 'sortable': false,  },
      { text: 'ספק', value: 'supplierName', width: '10%' },
      { text: 'תאריך אספקה', value: 'deliveryDate', width: '10%' },
      { text: 'אופן אספקה', value: 'deliveryType', width: '7%', 'sortable': false,  },
      // { text: 'אחראי', value: 'deliveryAgent', width: '5%', 'sortable': false,  },
      { text: 'מכירה', value: 'sell', width: '5%', 'sortable': false  },
      { text: 'קניה', value: 'buy', width: '5%', 'sortable': false  },
      { text: 'רווח', value: 'margins', width: '5%', 'sortable': false  },
      { text: 'פעולות', value: 'actions', width: '5%', 'sortable': false,  },
      { text: 'סטטוס הזמנה', value: 'statusType', width: '8%','sortable': true, filter: this.statusesFilter},
    ]
    } ,
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
  .v-list-item__content
    padding: 12px 0 !important
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
  @media only screen and (max-width:800px)
    .v-data-table__wrapper
      height: 200px !important
  @media only screen and (max-width:600px)
    .v-data-table__wrapper
      height: 420px !important
</style>