<template>
  <v-list      
    class="pt-0"
    flat
  >
    <draggable
      v-model="clients"
      handle=".handle"
    >
      <client
        v-for="client in clients"
        :key="client.id"
        :client="client"
      />        
    </draggable>  
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: 'ListClients',
  components: {
    draggable,
    'client': require('@/components/Clients/Client.vue').default
  },
  computed: {
    clients: {
      get() {
        return this.$store.getters.clientsFiltered
      },
      set(value) {
        this.$store.dispatch('setClients', value)
      }
    }
  }
}
</script>