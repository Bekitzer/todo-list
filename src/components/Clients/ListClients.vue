<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th>#</th>
          <th>שם ספק</th>
          <th>שם חברה</th>
          <th>טלפון משרד</th>
          <th>מייל משרד</th>
          <!-- <th>ח.פ.</th> -->
          <!-- <th>תנאי תשלום</th> -->
          <!-- <th>אופן תשלום</th> -->
          <th>כתובת</th>
          <!-- <th>וואטסאפ</th> -->
          <!-- <th>שעות פעילות</th> -->
          <th>אופן אספקה</th>
          <th>סטטוס לקוח</th>
          <!-- <th>תאריך רישום</th> -->
          <!-- <th>עודכן בתאריך ע״י</th> -->
          <th>פעולות</th>
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