<template>
  <v-data-table
    height="75vh"
    fixed-header
    :search="$store.state.search"
    :headers="headers"
    :items="orders"
    item-key="id"
    sort-by="number"
    :items-per-page="-1"
    hide-default-footer
    singleExpand: false
    sort-desc
    :expanded.sync="expanded"
    @click:row="clickRow"

  >
    <template v-slot:expanded-item="{ headers, item }">
      <td class="orderWorkInfo" :colspan="headers.length">
        {{ item.orderWork }}{{$store.state.search}}
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="ml-2"
        @click.stop="a"
      >
        mdi-file-image
      </v-icon>
      <v-icon
        small
        class="ml-2"
        @click.stop="duplicateItem(item)"
      >
        mdi-content-duplicate
      </v-icon>
      <v-icon
        small
        @click.stop="clickOrder(item)"
      >
        mdi-pencil-outline
      </v-icon>
    </template>
    <template v-slot:item.clientLink="{ item }">
      <v-btn @click.stop="clickClient(item)" dense plain class="ngs-button">
        {{ item.clientLink }}
      </v-btn>
    </template>
    <template v-slot:item.supplierLink="{ item }">
      <v-btn @click.stop="clickSupplier(item)" dense plain class="ngs-button">
        {{ item.supplierLink }}
      </v-btn>
    </template>
    <template v-slot:item.created="{ item }">
        {{format(new Date(item.orderCreationDate.seconds * 1000), 'EEEEE, dd/MM/yy', {locale: he})}}
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
    <template v-slot:item.statusType="props">
      <v-edit-dialog
          :return-value.sync="props.item.statusType"
          @save="save(props)"
          large
          persistent
        >
        <v-icon :color="getColor(props.item.statusType)" class="spc-status-dot" size="60">
          mdi-circle-small
        </v-icon>
          {{ props.item.statusType }}
          <template v-slot:input>
            <v-select
              :items="orderStatusTypeList"
              v-model="props.item.statusType"
              label="סטטוס"
              single-line
            ></v-select>
          </template>
        </v-edit-dialog>
    </template>
    <template v-slot:top>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4" sm="6">
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
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>
<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
import { getAuth } from 'firebase/auth'
export default {
  name: 'ListOrders',
  data: () => ({
    statusesFilterValue:["טיוטה","בעבודה","מוכן - משרד","מוכן - ספק","במשלוח"],
    editStatusType: '',
    expanded: [],
    format,
    he,
    singleExpand: true,
    orderStatusTypeList:[
      {text: "טיוטה", value: "טיוטה"},
      {text: "בעבודה", value: "בעבודה"},
      {text: "מוכן - משרד", value: "מוכן - משרד"},
      {text: "מוכן - ספק", value: "מוכן - ספק"},
      {text: "במשלוח", value: "במשלוח"},
      {text: "סופק", value: "סופק"}
    ]
  }),
  methods: {
    save (order) {
      let payload = {
        id: order.item.id,
        statusType: order.value,
        orderUpdated: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}) + ' > ' + this.name
      }
      this.$store.dispatch('updateOrder', payload)
    },
    duplicateItem (item) {
      this.$emit('duplicateOrder', item)
    },
    statusesFilter(item) {
      if (!this.statusesFilterValue || !this.statusesFilterValue.length) {
        return true;
      }
      return this.statusesFilterValue.includes(item)
    },
    clickOrder(order){
      this.$router.push({ name: 'Order', params: { id : order.id }})
    },
    clickRow(item, event) {
      if(event.isExpanded) {
        const index = this.expanded.findIndex(i => i === item);
        this.expanded.splice(index, 1)
      } else {
        this.expanded.push(item);
      }
    },
    clickClient(client){
      this.$router.push({ name: 'Client', params: { id : client.clientName }})
    },
    clickSupplier(supplier){
      this.$router.push({ name: 'Supplier', params: { id : supplier.supplierName }})
    },
    getColor (statusType) {
      if (statusType === "טיוטה") return '#FF9800'
      else if (statusType === "בעבודה") return '#2196F3'
      else if (statusType === "מוכן - משרד") return '#4CAF50'
      else if (statusType === "מוכן - ספק") return '#4CAF50'
      else if (statusType === "במשלוח") return '#2196F3'
      else if (statusType === "סופק") return '#9E9E9E'
      else return 'grey darken-1'
    }
  },
  created() {
    const user = getAuth().currentUser;
    if (user !== null) {
      this.name = user.displayName
      this.email = user.email
      this.photoURL = user.photoURL
      this.emailVerified = user.emailVerified
      this.uid = user.uid
    }
  },
  computed: {
    headers () {
      return [
      { text: '#', value: 'number', align: 'start', width: '3%' },
      { text: 'תאריך הזמנה', value: 'created', width: '10%'},
      { text: 'לקוח', value: 'clientLink', width: '10%', 'sortable': false },
      { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', width: '16%', 'sortable': false,  },
      { text: 'ספק', value: 'supplierLink', width: '10%', 'sortable': false },
      { text: 'תאריך אספקה', value: 'deliveryDate', width: '10%' },
      { text: 'אופן אספקה', value: 'deliveryType', width: '10%', 'sortable': false,  },
      { text: 'מכירה', value: 'sell', width: '5%', 'sortable': false  },
      { text: 'קניה', value: 'buy', width: '5%', 'sortable': false  },
      { text: 'רווח', value: 'margins', width: '5%', 'sortable': false  },
      { text: 'פעולות', value: 'actions', width: '6%', 'sortable': false  },
      { text: 'סטטוס הזמנה', value: 'statusType', width: '10%','sortable': true, filter: this.statusesFilter},
    ]
    },
    clientsMap() {
      const clientsMap = {}
      this.$store.state.clients.forEach(client => {
        clientsMap[client.id] = client
      })

      return clientsMap
    },
    suppliersMap() {
      const suppliersMap = {}
      this.$store.state.suppliers.forEach(supplier => {
        suppliersMap[supplier.id] = supplier
      })

      return suppliersMap
    },
    orders: {
      get() {
        return this.$store.state.orders.map(order => {
          const client = this.clientsMap[order.clientName] || {}
          const supplier = this.suppliersMap[order.supplierName] || {}
          return {
            ...order,
            clientLink: client.name,
            supplierLink: supplier.name
          }
        })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  },
  components: {
    'icon-edit': require('@/components/Icons/IconEdit.vue').default
  }
}
</script>
<style lang="sass">
  .ngs-button
    opacity: 1 !important
    letter-spacing: 0 !important
    color:#006d7b !important
    height: auto !important
    min-width: auto !important
    padding: 0 !important
  .v-list-item__content
    padding: 12px 0 !important
  th.spc-status-dot
    border-bottom: none !important
  .v-application .elevation-1, .theme--light.v-data-table.v-data-table--fixed-header thead th
    box-shadow: none !important
  .theme--light.v-data-table .v-data-footer
    border-top: none !important
  .spc-status-dot
    width: 12px !important
    margin-left: 6px !important
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: transparent !important
  .orderWorkInfo
    padding: 20px !important
    white-space: pre-line !important
    border-radius: 20px !important
  .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
    box-shadow: none !important
    background: #fbfbfb !important
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th
    font-size: 0.875rem !important
  @media only screen and (max-width:800px)
    .v-data-table__wrapper
      height: 200px !important
  @media only screen and (max-width:600px)
    .v-data-table__wrapper
      height: 420px !important
</style>