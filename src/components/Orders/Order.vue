<template>
  <tr>
    <td>{{ order.number}}</td>
    <td>
      <v-btn
          icon
          dense
          :to="{ name: 'Order', params: { id : order.id }}"
        >
          {{ order.name }}
        </v-btn>
    </td>
    <td>{{ order.companyName}}</td>
    <td>{{ order.phone }}</td>
    <td>{{ order.email }}</td>
    <td>{{ order.numberId }}</td>
    <td>{{ order.paymentTerms }}</td>
    <td>{{ order.paymentMethod }}</td>
    <td>{{ order.address }}</td>
    <td>{{ order.whatsapp }}</td>
    <td>{{ order.workingHours }}</td>
    <td>{{ order.deliveryType }}</td>
    <td>{{ order.status }}</td>
    <td>{{ order.orderCreationDate }}</td>
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