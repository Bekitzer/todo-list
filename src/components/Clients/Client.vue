<template>
  <tr>
    <td width="4%">{{ client.number}}</td>
    <td>{{ client.name }}</td>
    <td>{{ client.companyName}}</td>
    <td>{{ client.phone }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.address }}</td>
    <td>{{ client.deliveryType }}</td>
    <td>{{ client.status }}</td>
    <td>
      <client-menu :client="client"/>
    </td>
    <td>מספר</td>
  </tr>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Client',
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['client'],
  components: {
    'client-menu': require('@/components/Clients/ClientMenu.vue').default
  }
}
</script>