<template>
  <div class="pa-10">
    <h1>Clients - {{ $store.state.appTitle }}</h1>
    <list-clients v-if="$store.state.clients.length" />
    <no-clients v-else />
  </div>
</template>

<script>
  export default {
    name: 'Clients',
    components: {      
      'list-clients': require('@/components/Clients/ListClients.vue').default,
      'no-clients': require('@/components/Clients/NoClients.vue').default
    }
  }
</script>
