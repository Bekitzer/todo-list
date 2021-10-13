<template>
  <tr>
    <td>{{ client.number}}</td>
    <td>
      <v-btn
          icon
          dense
          :to="{ name: 'Client', params: { id : client.id }}"
        >
          {{ client.name }}
        </v-btn>
    </td>
    <td>{{ client.companyName}}</td>
    <td>{{ client.phone }}</td>
    <td>{{ client.email }}</td>
    <!-- <td>{{ client.numberId }}</td> -->
    <!-- <td>{{ client.paymentTerms }}</td> -->
    <!-- <td>{{ client.paymentMethod }}</td> -->
    <td>{{ client.address }}</td>
    <!-- <td>{{ client.whatsapp }}</td> -->
    <!-- <td>{{ client.workingHours }}</td> -->
    <td>{{ client.deliveryType }}</td>
    <td>{{ client.status }}</td>
    <!-- <td>{{ client.clientCreationDate }}</td> -->
    <!-- <td>{{ client.clientUpdated }}</td> -->
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