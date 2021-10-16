<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th width="4%">#</th>
          <th width="10%">שם לקוח</th>
          <th width="16%">שם חברה</th>
          <th width="8%">טלפון משרד</th>
          <th width="10%">מייל משרד</th>
          <th width="26%">כתובת</th>
          <th width="6%">אופן אספקה</th>
          <th width="6%">סטטוס לקוח</th>
          <th width="6%">פעולות</th>
          <th width="8%">ה.פעילות</th>
        </tr>
      </thead>
      <tbody>
          <client
            v-for="client in clients"
            :key="client.id"
            :client="client"
          />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ListClients',
  props: ['client'],
  computed: {
    clients: {
      get() {
        return this.$store.getters.clientsFiltered
      },
      set(value) {
        this.$store.dispatch('setClients', value)
      }
    }
  },
  components: {
    'client': require('@/components/Clients/Client.vue').default
  }
}
</script>