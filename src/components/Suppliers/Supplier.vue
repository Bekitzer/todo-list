<template>
  <tr>
    <td>{{ supplier.number}}</td>
    <td>
      <v-btn
          icon
          dense
          :to="{ name: 'Supplier', params: { id : supplier.id }}"
        >
          {{ supplier.name }}
        </v-btn>
    </td>
    <td>{{ supplier.companyName}}</td>
    <td>{{ supplier.phone }}</td>
    <td>{{ supplier.email}}</td>
    <td>{{ supplier.numberId }}</td>
    <td>{{ supplier.paymentTerms }}</td>
    <td>{{ supplier.paymentMethod }}</td>
    <td>{{ supplier.address }}</td>
    <td>{{ supplier.whatsapp }}</td>
    <td>{{ supplier.workingHours }}</td>
    <td>{{ supplier.deliveryType }}</td>
    <td>{{ supplier.status }}</td>
    <td>{{ supplier.supplierCreationDate }}</td>
    <td>{{ supplier.supplierUpdated }}</td>
    <td>
      <supplier-menu :supplier="supplier"/>
    </td>
  </tr>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Supplier',
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['supplier'],
  components: {
    'supplier-menu': require('@/components/Suppliers/SupplierMenu.vue').default
  }
}
</script>