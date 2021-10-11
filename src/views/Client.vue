<template>
  <div>
    <v-btn
      :to="{ name: 'Clients' }"
    >
      חזרה לכל הלקוחות
    </v-btn>
    <p>{{ client.name }}</p>
    <p>{{ client.number }}</p>
    <p>{{ client.companyName }}</p>
    <p>{{ client.phone }}</p>
    <p>{{ client.email }}</p>
    <p>{{ client.numberId }}</p>
    <p>{{ client.paymentTerms }}</p>
    <p>{{ client.paymentMethod }}</p>
    <p>{{ client.address }}</p>
    <p>{{ client.whatsapp }}</p>
    <p>{{ client.workingHours }}</p>
    <p>{{ client.deliveryType }}</p>
    <p>{{ client.status }}</p>
    <p>{{ client.clientCreationDate }}</p>
    <p>{{ client.clientUpdated }}</p>
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :client = 'client'
    />
  </div>
</template>

<script>
export default {
  name: 'Client',
  data: () => ({
    dialogs: {
      edit: false
    },
  }),
  computed: {
    client() {
      return this.$store.state.clients.find(client => client.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default
  }
}
</script>