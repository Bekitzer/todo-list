<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th>שם לקוח/חברה</th>
          <th>טלפון</th>
          <th>אימייל</th>
          <th>מספר עוסק</th>
          <th>סוג חברה</th>
          <th>כתובת</th>
          <th>איש קשר</th>
          <th>טלפון איש הקשר</th>
          <th>תאריך יצירה</th>
          <th>תאריך עדכון</th>
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