<template>
  <tr>
    <td>{{ client.name }}</td>
    <td>{{ client.phone }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.number }}</td>
    <td>{{ client.type }}</td>
    <td>{{ client.address }}</td>
    <td>{{ client.contactPerson }}</td>
    <td>{{ client.contactPersonPhone }}</td>
    <td>{{ client.clientCreationDate }}</td>
    <td>{{ client.clientUpdated }}</td>
    <td>
      <client-menu :client="client"/>
    </td>
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