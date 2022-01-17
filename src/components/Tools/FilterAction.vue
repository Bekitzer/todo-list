<template>
    <v-row>
    <v-col cols="12" md="2" sm="2">
        <v-select
        :items="orderDateList"
        filled
        rounded
        v-model="orderDateFilter"
        label="סנן לפי תאריך הזמנה"
        ></v-select>
    </v-col>
    <v-col cols="12" md="2" sm="2">
        <v-select
        :items="orderDeliveryDateList"
        filled
        rounded
        v-model="deliveryDateFilter"
        label="סנן לפי תאריך אספקה"
        ></v-select>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" md="1" sm="1">
        <v-switch v-model="viewSuppliedOnly" inset label="פעילות/סופקו"></v-switch>
    </v-col>
    </v-row>
</template>
<script>
import { getAuth } from 'firebase/auth'
import endOfMinute,{ startOfDay,endOfDay,startOfMonth,endOfMonth,startOfWeek,endOfWeek,subDays,subMonths,addDays,addMonths } from 'date-fns'
import startOfDecade from 'date-fns';

const filterDateEnum = {
  THIS_DAY: "THIS_DAY",
  NEXT_3_DAYS: "NEXT_3_DAYS",
  NEXT_DAY: "NEXT_DAY",
  LAST_3_DAYS: "LAST_3_DAYS",
  THIS_WEEK: "THIS_WEEK",
  THIS_MONTH: "THIS_MONTH",
  LAST_MONTH: "LAST_MONTH",
  NEXT_3_MONTH: "NEXT_3_MONTH",
  LAST_3_MONTH: "LAST_3_MONTH"
}

export default {
  name: 'FilterAction',
  data: () => ({
    viewSuppliedOnly: true,
    orderDateFilter: "",
    deliveryDateFilter: "",
    orderDeliveryDateList:[
      {text: "היום", value: filterDateEnum.THIS_DAY},
      {text: "מחר", value: filterDateEnum.NEXT_DAY},
      {text: "3 ימים הקרובים", value: filterDateEnum.NEXT_3_DAYS},
      {text: "השבוע הקרוב", value: filterDateEnum.THIS_WEEK},
      {text: "החודש הקרוב", value: filterDateEnum.THIS_MONTH},
      {text: "3 חודשים הקרובים", value: filterDateEnum.NEXT_3_MONTHS},
      {text: "הכל", value: ""}
    ],
    orderDateList:[
      {text: "היום", value: filterDateEnum.THIS_DAY},
      {text: "3 ימים אחרונים", value: filterDateEnum.LAST_3_DAYS},
      {text: "השבוע", value: filterDateEnum.THIS_WEEK},
      {text: "החודש", value: filterDateEnum.THIS_MONTH},
      {text: "חודש שעבר", value: filterDateEnum.LAST_MONTH},
      {text: "3 חודשים אחרונים", value: filterDateEnum.LAST_3_MONTHS},
      {text: "הכל", value: ""}
    ]
  }),
  methods: {
    isDateInRange(date, range) {
      if(!date || !range) return true
      const {start, end} = range
      return date >= start && date <= end
    },
    dateEnumToRange(dateEnum) {
      const d = new Date()
      const {LAST_3_DAYS, NEXT_3_DAYS, THIS_DAY, NEXT_DAY, THIS_WEEK, THIS_MONTH, LAST_MONTH, LAST_3_MONTHS, NEXT_3_MONTHS} = filterDateEnum
      let start, end;

      switch (dateEnum) {
        case THIS_DAY:
          start = startOfDay(d)
          end = endOfDay(d)
          break;
        case NEXT_DAY:
          start = addDays(startOfDay(d),1)
          end = addDays(endOfDay(d), 1)
          break;
        case LAST_3_DAYS:
          start = subDays(startOfDay(d), 3)
          end = endOfDay(d)
          break;
        case NEXT_3_DAYS:
          start = startOfDay(d)
          end = addDays(endOfDay(d), 3)
          break;
        case THIS_WEEK:
          start = startOfWeek(d, {weekStartsOn: 0})
          end = endOfWeek(d, {weekStartsOn: 0})
          break;
        case THIS_MONTH:
          start = startOfMonth(d)
          end = endOfMonth(d)
          break;
        case LAST_MONTH:
          start = subMonths(startOfMonth(d), 1)
          end  = subMonths(endOfMonth(d), 1)
          break;
        case LAST_3_MONTHS:
          start = subMonths(startOfMonth(d), 3)
          end  = endOfMonth(d)
          break;
        case NEXT_3_MONTHS:
          start = startOfMonth(d)
          end = addMonths(endOfMonth(d), 3)
          break;
        default:
          return null
      }

      return {start, end}
    },
    deliveryDate(date) {
      return date ? new Date(date.seconds * 1000) : null
    },
    orderDate(date) {
      return date ? new Date(date.seconds * 1000) : null
    }
  },
  computed: {
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
          const isValidOrderDate = this.isDateInRange(this.orderDate(order.orderCreationDate), this.dateEnumToRange(this.orderDateFilter))
          const isValidDeliveryDate = this.isDateInRange(this.deliveryDate(order.deliveryDate), this.dateEnumToRange(this.deliveryDateFilter))

          return (this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק') && isValidOrderDate && isValidDeliveryDate
        })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  }
}
</script>