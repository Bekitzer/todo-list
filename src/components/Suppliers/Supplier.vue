<template>
  <tr>
    <td width="4%">{{ supplier.number}}</td>
    <td>{{ supplier.name }}</td>
    <td>{{ supplier.companyName}}</td>
    <td>{{ supplier.phone }}</td>
    <td>{{ supplier.email}}</td>
    <td>{{ supplier.address }}</td>
    <td>{{ supplier.deliveryType }}</td>
    <td>{{ supplier.status }}</td>
    <td>
      <supplier-menu :supplier="supplier"/>
    </td>
    <td>מספר</td>
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