<template>
  <div class="pa-10">
    <h1>Suppliers - {{ $store.state.appTitle }}</h1>
    <list-suppliers v-if="$store.state.suppliers.length" />
    <no-suppliers v-else />
  </div>
</template>

<script>
  export default {
    name: 'Suppliers',
    components: {
      'list-suppliers': require('@/components/Suppliers/ListSuppliers.vue').default,
      'no-suppliers': require('@/components/Suppliers/NoSuppliers.vue').default
    }
  }
</script>
