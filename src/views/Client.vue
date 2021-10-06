<template>
  <div>
    <v-btn
      :to="{ name: 'Clients' }"
    >
      back to clients
    </v-btn>
    <p>{{ client.name }}</p>
    <p>{{ client.phone }}</p>
    <p>{{ client.email }}</p>
    <p>{{ client.number }}</p>
    <p>{{ client.type }}</p>
    <p>{{ client.address }}</p>
    <p>{{ client.contactPerson }}</p>
    <p>{{ client.contactPersonPhone }}</p>
    <p>{{ client.clientCreationDate }}</p>
    <p>{{ client.clientUpdated }}</p>
  </div>
</template>

<script>
export default {
  name: 'Client',
  computed: {
    client() {
      return this.$store.state.clients.find(client => client.id === this.$route.params.id)
    }
  }
}
</script>