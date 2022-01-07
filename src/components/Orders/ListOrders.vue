<template>
  <v-data-table
    height="75vh"
    fixed-header
    :search="$store.state.search"
    :headers="headers"
    :items="orders"
    item-key="id"
    sort-by="deliveryDate"
    :items-per-page="-1"
    hide-default-footer
    singleExpand: false
    sort-desc
    :expanded.sync="expanded"
    @click:row="clickRow"
  >
    <template v-slot:expanded-item="{ headers, item }">
      <td class="orderWorkInfo" :colspan="headers.length">
        {{ item.orderWork }}
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip
        top
        content-class="normal tooltip-top"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
          small
          class="ml-2"
          @click.stop="a"
          v-bind="attrs"
          v-on="on"
        >
          mdi-file-image
        </v-icon>
        </template>
        <span>הצג תמונה</span>
      </v-tooltip>
      <v-tooltip
        top
        content-class="normal tooltip-top"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-icon
          small
          class="ml-2"
          @click.stop="duplicateItem(item)"
          v-bind="attrs"
          v-on="on"
        >
          mdi-content-duplicate
        </v-icon>
        </template>
        <span>שכפל הזמנה</span>
      </v-tooltip>
      <v-tooltip
        top
        content-class="normal tooltip-top"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-icon
          small
          @click.stop="clickOrder(item)"
          v-bind="attrs"
          v-on="on"
        >
          mdi-pencil-outline
        </v-icon>
        </template>
        <span>ערוך הזמנה</span>
      </v-tooltip>
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
      {{ item.orderCreationDate | formatDate }}
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
    <template v-slot:item.delivery="{ item }">
        {{ item.deliveryDate | formatDate }}
    </template>
    <template v-slot:item.statusType="props">
      <v-edit-dialog
          save-text="שמור"
          cancel-text="בטל"
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
          <v-col cols="12" md="2" sm="11">
            <v-select
              :items="orderDateList"
              label="סנן לפי תאריך"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="1" sm="1">
            <v-switch v-model="viewSuppliedOnly" inset label="סופק/בתהליך"></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>
<script>
import { getAuth } from 'firebase/auth'
export default {
  name: 'ListOrders',
  data: () => ({
    editStatusType: '',
    expanded: [],
    viewSuppliedOnly: true,
    singleExpand: true,
    orderDateList:[
      {text: "היום", value: "טיוטה"},
      {text: "3 ימים", value: "בעבודה"},
      {text: "שבוע", value: "מוכן - משרד"},
      {text: "חודש", value: "מוכן - ספק"},
      {text: "3 חודשים", value: "במשלוח"},
      {text: "הכל", value: "סופק"}
    ],
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
        orderUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      }
      this.$store.dispatch('updateOrder', payload)
    },
    duplicateItem (item) {
      this.$emit('duplicateOrder', item)
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
  computed: {
    headers () {
      return [
      { text: 'מס׳ הזמנה', value: 'number', align: 'start', width: '90px' },
      { text: 'תאריך הזמנה', value: 'created'},
      { text: 'לקוח', value: 'clientLink','sortable': false },
      { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', 'sortable': false,  },
      { text: 'ספק', value: 'supplierLink', 'sortable': false },
      { text: 'תאריך אספקה', value: 'delivery', width: '110px' },
      { text: 'אופן אספקה', value: 'deliveryType', 'sortable': false,  },
      { text: 'מכירה', value: 'sell', width: '50px', 'sortable': false  },
      { text: 'קניה', value: 'buy', width: '50px', 'sortable': false  },
      { text: 'רווח', value: 'margins', width: '50px', 'sortable': false  },
      { text: 'פעולות', value: 'actions', width: '80px', 'sortable': false  },
      { text: 'סטטוס הזמנה', value: 'statusType', width: '110px','sortable': true, filter: this.statusesFilter},
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
        }).filter(order => {
          return this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק'
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
  .v-data-table__wrapper tr
    height: 60px !important
  .theme--dark.v-btn--has-bg:hover
    background-color: #006D7B !important
  .theme--dark.v-btn--has-bg:hover .v-icon
    transform: scale(1.2)
    transform: rotate(90deg)
  .v-text-field__details
    display: none !important
  .v-menu__content
    max-width: 8% !important
  .v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content
    opacity:1 !important
  .v-btn--plain:focus .v-btn__content, .v-btn--plain:hover .v-btn__content
    opacity:.62 !important
  .ngs-button
    letter-spacing: 0 !important
    color:#006d7b !important
    height: auto !important
    min-width: auto !important
    padding: 0 !important
  .ngs-button:focus:hover
    opacity: .62 !important
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
    line-height: 0.1 !important
  .orderWorkInfo
    padding: 20px !important
    white-space: pre-line !important
    border-radius: 20px !important
  .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
    box-shadow: none !important
    background: #fbfbfb !important
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th
    font-size: 0.875rem !important
  .tooltip-top::before
    border-right: solid 8px transparent
    border-left: solid 8px transparent
    transform: translateX(-50%)
    position: absolute
    z-index: -21
    content: ''
    top: 100%
    left: 50%
    height: 0
    width: 0
  .tooltip-top.error::before
    border-top: solid 8px #ff6060
  .tooltip-top.success::before
    border-top: solid 8px #1B5E20
  .tooltip-top.secondary::before
    border-top: solid 8px #3f3f3f
  .tooltip-top.primary::before
    border-top: solid 8px #246fb3
  .tooltip-top.normal::before
    border-top: solid 8px #616161e6
  .tooltip-top.info::before
    border-top: solid 8px #2196f3
  .tooltip-bottom::before
    border-right: solid 8px transparent
    border-left: solid 8px transparent
    transform: translateX(-50%)
    position: absolute
    z-index: -21
    content: ''
    bottom: 100%
    left: 50%
    height: 0
    width: 0
  .tooltip-bottom.error::before
    border-bottom: solid 8px #ff6060
  .tooltip-bottom.success::before
    border-bottom: solid 8px #1B5E20
  .tooltip-bottom.secondary::before
    border-bottom: solid 8px #3f3f3f
  .tooltip-bottom.primary::before
    border-bottom: solid 8px #246fb3
  .tooltip-bottom.normal::before
    border-bottom: solid 8px #616161e6
  .tooltip-bottom.info::before
    border-bottom: solid 8px #2196f3
  .tooltip-right::before
    content: " "
    position: absolute
    top: 50%
    right: 100%
    margin-top: -8px
    border-width: 8px
    border-style: solid
    border-top: solid 8px transparent
    border-bottom: solid 8px transparent
    border-left: solid 8px transparent
  .tooltip-right.error::before
    border-right: solid 8px #ff6060 !important
  .tooltip-right.success::before
    border-right: solid 8px #1B5E20 !important
  .tooltip-right.secondary::before
    border-right: solid 8px #3f3f3f !important
  .tooltip-right.primary::before
    border-right: solid 8px #246fb3 !important
  .tooltip-right.normal::before
    border-right: solid 8px #616161e6 !important
  .tooltip-right.info::before
    border-right: solid 8px #2196f3 !important
  .tooltip-left::before
    content: " "
    position: absolute
    top: 50%
    left: 100%
    margin-top: -8px
    border-width: 8px
    border-style: solid
    border-top: solid 8px transparent
    border-bottom: solid 8px transparent
    border-right: solid 8px transparent
  .tooltip-left.error::before
    border-left: solid 8px #ff6060 !important
  .tooltip-left.success::before
    border-left: solid 8px #1B5E20 !important
  .tooltip-left.secondary::before
    border-left: solid 8px #3f3f3f !important
  .tooltip-left.primary::before
    border-left: solid 8px #246fb3 !important
  .tooltip-left.normal::before
    border-left: solid 8px #616161e6 !important
  .tooltip-left.info::before
    border-left: solid 8px #2196f3 !important
  @media only screen and (max-width:800px)
    .v-data-table__wrapper
      height: 200px !important
  @media only screen and (max-width:600px)
    .v-data-table__wrapper
      height: 420px !important
</style>