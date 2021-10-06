<template>
  <tr>
    <td>{{ supplier.name }}</td>
    <td>{{ supplier.phone }}</td>
    <td>{{ supplier.email }}</td>
    <td>{{ supplier.number }}</td>
    <td>{{ supplier.type }}</td>
    <td>{{ supplier.address }}</td>
    <td>{{ supplier.contactPerson }}</td>
    <td>{{ supplier.contactPersonPhone }}</td>
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
      debugger
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['supplier'],
  components: {
    'supplier-menu': require('@/components/Suppliers/SupplierMenu.vue').default
  }
}
</script>