<template v-slot:[`order.statusType`]="{ order }">
  <tr>
    <td>
      <v-btn
        icon
        dense
        :to="{ name: 'Order', params: { id : order.id }}"
      >
        {{ order.number}}
      </v-btn>
    </td>
    <td>{{ order.orderCreationDate }}</td>
    <td>{{ order.clientName}}</td>
    <td>{{ order.orderWork }}</td>
    <td>{{ order.supplierName }}</td>
    <td>{{ order.deliveryDate }}</td>
    <td>{{ order.deliveryType }}</td>
    <td class="spc-status-dot">
        <v-icon
          :color="getColor(order.statusType)"
          size="60"
        >mdi-circle-small</v-icon>
         {{ order.statusType }}
    </td>
    <td>
      <order-menu :order="order"/>
    </td>
  </tr>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Order',
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['order'],
  components: {
    'order-menu': require('@/components/Orders/OrderMenu.vue').default
  },
  methods: {
    getColor (statusType) {
      if (statusType === "עבודה חדשה") return 'black'
      else if (statusType === "בעבודה") return 'green accent-2'
      else if (statusType === "נשלח לספק") return 'deep-orange lighten-2'
      else if (statusType === "מחכה לספק") return 'deep-orange accent-4'
      else if (statusType === "במשלוח") return 'green darken-4'
      else if (statusType === "משלוח מתעכב") return 'red darken-1'
      else if (statusType === "סופק") return 'green'
      else return 'grey darken-1'
    },
  }
}
</script>
<style lang="sass">
  .spc-status-dot
    position: relative !important
  .spc-status-dot i
    position: absolute !important
    right: 0 !important
    width: 10px
    height: 10px
    margin-top: 6px
</style>
