<template>
  <div class="pa-10">
    <p>{{ client.id }}</p>
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

    <v-speed-dial
      v-model="fab"
      bottom
      left
      fixed
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        :to="{ name: 'Clients' }"
      >
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="dialogs.delete = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :client = 'client'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :order = 'client'
    />
  </div>
</template>

<script>
export default {
  name: 'Client',
  data: () => ({
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false,
      delete: false
    },
  }),
  computed: {
    client() {
      return this.$store.state.clients.find(client => client.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default
  }
}
</script>