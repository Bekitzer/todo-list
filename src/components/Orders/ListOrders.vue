<template>
  <div>
    <v-data-table
      height='75vh'
      fixed-header
      :search='$store.state.search'
      :headers='headers'
      :items='orders'
      item-key='id'
      :sort-by="['deliveredAt', 'number']"
      :items-per-page='-1'
      hide-default-footer
      singleExpand: false
      sort-desc
      :expanded.sync='expanded'
      @click:row='clickRow'
      @current-items='getFiltered'
    >
      <template v-slot:expanded-item='{ headers, item }'>
        <td class='orderWorkInfo' :colspan='headers.length'>
          {{ item.orderWork }}
        </td>
      </template>
      <template v-slot:[`item.actions`]='{ item }'>
        <v-tooltip top content-class='normal tooltip-top'>
          <template v-slot:activator='{ on, attrs }'>
            <v-icon small class='ml-2' @click.stop='openFile(item)' v-bind='attrs' v-on='on'>mdi-file-image</v-icon>
          </template>
          <span>הצג תמונה</span>
        </v-tooltip>
        <v-tooltip top content-class='normal tooltip-top'>
          <template v-slot:activator='{ on, attrs }'>
            <v-icon small class='ml-2' @click.stop='duplicateItem(item)' v-bind='attrs' v-on='on'>
              mdi-content-duplicate
            </v-icon>
          </template>
          <span>שכפל הזמנה</span>
        </v-tooltip>
        <v-tooltip top content-class='normal tooltip-top'>
          <template v-slot:activator='{ on, attrs }'>
            <v-icon small @click.stop='clickOrder(item)' v-bind='attrs' v-on='on'>mdi-pencil-outline</v-icon>
          </template>
          <span>ערוך הזמנה</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.clientLink`]='{ item }'>
        <v-btn @click.stop='clickClient(item)' dense plain class='ngs-button'>
          {{ item.clientLink }}
        </v-btn>
      </template>
      <template v-slot:[`item.supplierLink`]='{ item }'>
        <v-btn @click.stop='clickSupplier(item)' dense plain class='ngs-button'>
          {{ item.supplierLink }}
        </v-btn>
      </template>
      <template v-slot:[`item.created`]='{ item }'>
        {{ item.createdAt | formatDate }}
      </template>
      <template v-slot:[`item.sell`]='{ item }'>
        {{ item.sellPrice | formatNumber }}
      </template>
      <template v-slot:[`item.buy`]='{ item }'>
        {{ item.buyPrice | formatNumber }}
      </template>
      <template v-slot:[`item.margins`]='{ item }'>
        {{ item.margin | formatNumber }}
      </template>
      <template v-slot:[`item.delivery`]='{ item }'>
        {{ item.deliveredAt | formatDate }}
      </template>
      <template v-slot:[`item.statusType`]='props'>
        <v-edit-dialog
          save-text='שמירה'
          cancel-text='בטל'
          :return-value.sync='props.item.statusType'
          @save='save(props)'
          large
          persistent
        >
          <v-icon :color='getColor(props.item.statusType)' class='spc-status-dot' size='60'>mdi-circle-small</v-icon>
          {{ props.item.statusType }}
          <template v-slot:input>
            <v-select :items='orderStatusTypeList' v-model='props.item.statusType' label='סטטוס' single-line />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:top>
        <v-row no-gutters class='mt-6 mb-6 text-center align-center'>
          <v-col cols='12' md='2' class='pl-2'>
            <v-select
              :items='orderDateList'
              clearable
              filled
              rounded
              v-model='orderDateFilter'
              label='סנן לפי תאריך הזמנה'
            />
          </v-col>
          <v-col cols='12' md='2'>
            <v-select
              :items='orderDeliveredAtList'
              clearable
              filled
              rounded
              v-model='deliveredAtFilter'
              label='סנן לפי תאריך אספקה'
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols='12' md='3' class='ml-2 rounded-pill'>
            <span>מכירה: {{ sumField('sellPrice')  | formatNumber }} | </span>
            <span>קניה: {{ sumField('buyPrice')  | formatNumber }} | </span>
            <span>רווח: {{ sumField('margin')  | formatNumber }}</span>
          </v-col>
          <v-col cols='12' md='1' sm='1'>
            <v-switch v-model='viewSuppliedOnly' inset label='פעילות/סופקו'></v-switch>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subDays,
  subMonths,
  addDays,
  addMonths
} from 'date-fns'

const filterDateEnum = {
  THIS_DAY: 'THIS_DAY',
  NEXT_3_DAYS: 'NEXT_3_DAYS',
  NEXT_DAY: 'NEXT_DAY',
  LAST_3_DAYS: 'LAST_3_DAYS',
  THIS_WEEK: 'THIS_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  NEXT_3_MONTH: 'NEXT_3_MONTH',
  LAST_3_MONTH: 'LAST_3_MONTH'
}

export default {
  name: 'ListOrders',
  data: () => ({
    editStatusType: '',
    expanded: [],
    viewSuppliedOnly: true,
    singleExpand: true,
    orderDateFilter: '',
    deliveredAtFilter: '',
    orderDeliveredAtList: [
      { text: 'היום', value: filterDateEnum.THIS_DAY },
      { text: 'מחר', value: filterDateEnum.NEXT_DAY },
      { text: '3 ימים הקרובים', value: filterDateEnum.NEXT_3_DAYS },
      { text: 'השבוע הקרוב', value: filterDateEnum.THIS_WEEK },
      { text: 'החודש הקרוב', value: filterDateEnum.THIS_MONTH },
      { text: '3 חודשים הקרובים', value: filterDateEnum.NEXT_3_MONTHS }
    ],
    orderDateList: [
      { text: 'היום', value: filterDateEnum.THIS_DAY },
      { text: '3 ימים אחרונים', value: filterDateEnum.LAST_3_DAYS },
      { text: 'השבוע', value: filterDateEnum.THIS_WEEK },
      { text: 'החודש', value: filterDateEnum.THIS_MONTH },
      { text: 'חודש שעבר', value: filterDateEnum.LAST_MONTH },
      { text: '3 חודשים אחרונים', value: filterDateEnum.LAST_3_MONTHS }
    ],
    orderStatusTypeList: [
      { text: 'טיוטה', value: 'טיוטה' },
      { text: 'בעבודה', value: 'בעבודה' },
      { text: 'מוכן - משרד', value: 'מוכן - משרד' },
      { text: 'מוכן - ספק', value: 'מוכן - ספק' },
      { text: 'במשלוח', value: 'במשלוח' },
      { text: 'סופק', value: 'סופק' }
    ],
    filteredItems: []
  }),
  methods: {
    getFiltered(e) {
      this.filteredItems = e
    },
    save(order) {
      return this.$store.dispatch('Order/upsert', { ...order.item, statusType: order.value })
    },
    duplicateItem(item) {
      this.$emit('duplicateOrder', item)
    },
    openFile(item) {
      this.$emit('openOrderFile', item)
    },
    clickOrder(order) {
      this.$router.push({ name: 'Order', params: { id: order.id } })
    },
    clickRow(item, event) {
      if (event.isExpanded) {
        const index = this.expanded.findIndex(i => i === item)
        this.expanded.splice(index, 1)
      } else {
        this.expanded.push(item)
      }
    },
    clickClient({ orderClientRef }) {
      this.$router.push({ name: 'Client', params: { id: orderClientRef.id } })
    },
    clickSupplier({ orderSupplierRef }) {
      this.$router.push({ name: 'Supplier', params: { id: orderSupplierRef.id } })
    },
    getColor(statusType) {
      if (statusType === 'טיוטה') return '#FF9800'
      else if (statusType === 'בעבודה') return '#2196F3'
      else if (statusType === 'מוכן - משרד') return '#4CAF50'
      else if (statusType === 'מוכן - ספק') return '#4CAF50'
      else if (statusType === 'במשלוח') return '#2196F3'
      else if (statusType === 'סופק') return '#9E9E9E'
      else return 'grey darken-1'
    },
    isDateInRange(date, range) {
      if (!date || !range) return true
      const { start, end } = range
      return date >= start && date <= end
    },
    dateEnumToRange(dateEnum) {
      const d = new Date()
      const {
        LAST_3_DAYS,
        NEXT_3_DAYS,
        THIS_DAY,
        NEXT_DAY,
        THIS_WEEK,
        THIS_MONTH,
        LAST_MONTH,
        LAST_3_MONTHS,
        NEXT_3_MONTHS
      } = filterDateEnum
      let start, end

      switch (dateEnum) {
        case THIS_DAY:
          start = startOfDay(d)
          end = endOfDay(d)
          break
        case NEXT_DAY:
          start = addDays(startOfDay(d), 1)
          end = addDays(endOfDay(d), 1)
          break
        case LAST_3_DAYS:
          start = subDays(startOfDay(d), 3)
          end = endOfDay(d)
          break
        case NEXT_3_DAYS:
          start = startOfDay(d)
          end = addDays(endOfDay(d), 3)
          break
        case THIS_WEEK:
          start = startOfWeek(d, { weekStartsOn: 0 })
          end = endOfWeek(d, { weekStartsOn: 0 })
          break
        case THIS_MONTH:
          start = startOfMonth(d)
          end = endOfMonth(d)
          break
        case LAST_MONTH:
          start = subMonths(startOfMonth(d), 1)
          end = subMonths(endOfMonth(d), 1)
          break
        case LAST_3_MONTHS:
          start = subMonths(startOfMonth(d), 3)
          end = endOfMonth(d)
          break
        case NEXT_3_MONTHS:
          start = startOfMonth(d)
          end = addMonths(endOfMonth(d), 3)
          break
        default:
          return null
      }

      return { start, end }
    },
    deliveredAt(date) {
      return date ? new Date(date.seconds * 1000) : null
    },
    orderDate(date) {
      return date ? new Date(date.seconds * 1000) : null
    },
    sumField(key) {
      return (this.filteredItems || this.orders).reduce((a, b) =>
        a + (b[key]), 0
      )
    }
  },
  computed: {
    headers() {
      return [
        { text: 'מס׳ הזמנה', value: 'number', align: 'start', width: '110px' },
        { text: 'תאריך הזמנה', value: 'created', width: '110px' },
        { text: 'לקוח', value: 'clientLink', 'sortable': false },
        { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', 'sortable': false },
        { text: 'תאריך אספקה', value: 'delivery', width: '110px' },
        { text: 'ספק', value: 'supplierLink', 'sortable': false },
        { text: 'אופן אספקה', value: 'deliveryType', 'sortable': false },
        { text: 'מכירה', value: 'sell', width: '60px', 'sortable': false },
        { text: 'קניה', value: 'buy', width: '60px', 'sortable': false },
        { text: 'רווח', value: 'margins', width: '60px', 'sortable': false },
        { text: 'פעולות', value: 'actions', width: '100px', 'sortable': false },
        { text: 'סטטוס הזמנה', value: 'statusType', width: '110px', 'sortable': true }
      ]
    },
    clientsMap() {
      const clientsMap = {}
      this.$store.state.Client.list.forEach(client => {
        clientsMap[client.id] = client
      })

      return clientsMap
    },
    suppliersMap() {
      const suppliersMap = {}
      this.$store.state.Supplier.list.forEach(supplier => {
        suppliersMap[supplier.id] = supplier
      })

      return suppliersMap
    },
    orders: {
      get() {
        return this.$store.state.Order.list.map(order => {
          const client = this.clientsMap[order.orderClientRef.id] || {}
          const supplier = this.suppliersMap[order.orderSupplierRef.id] || {}
          return {
            ...order,
            clientLink: client.name,
            supplierLink: supplier.name
          }
        }).filter(order => {
          const isValidOrderDate = this.isDateInRange(this.orderDate(order.createdAt), this.dateEnumToRange(this.orderDateFilter))
          const isValidDeliveredAt = this.isDateInRange(this.deliveredAt(order.deliveredAt), this.dateEnumToRange(this.deliveredAtFilter))

          return (this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק') && isValidOrderDate && isValidDeliveredAt
        })
      },
      set(value) {
        console.log('is this overwrite all clients? if so it\'s bad')
        console.log(value)
        debugger
        this.$store.dispatch('Order/upsert', value)
      }
    }
  }
}
</script>