<template>
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
    <td>{{ order.orderUpdated }}</td>
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
  }
}
</script>