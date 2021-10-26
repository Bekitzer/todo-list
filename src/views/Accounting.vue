<template>
  <div class="pa-10">
    <p>{{ accounting.number }}</p>
    <p>{{ accounting.clientName }}</p>
    <p>{{ accounting.paymentDate }}</p>
    <p>{{ accounting.paymentType }}</p>
    <p>{{ accounting.accountingCreationDate }}</p>
    <p>{{ accounting.accountingUpdated }}</p>
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
        :to="{ name: 'Accountings' }"
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
      :accounting = 'accounting'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :accounting = 'accounting'
    />
  </div>
</template>

<script>
export default {
  name: 'Accounting',
  pageName: '',
  data: () => ({
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false
    },
  }),
  computed: {
    accounting() {
      return this.$store.state.accountings.find(accounting => accounting.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Accountings/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Accountings/Dialogs/DialogDelete.vue').default
  },
  mounted() {
    this.pageName = this.accounting.number
  }
}
</script>