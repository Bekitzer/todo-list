<template>
  <div>
    <v-btn
      :to="{ name: 'Accountings' }"
    >
      חזרה להנהלת חשבונות
    </v-btn>
    <p>{{ accounting.number }}</p>
    <p>{{ accounting.clientName }}</p>
    <p>{{ accounting.orderWork }}</p>
    <p>{{ accounting.supplierName }}</p>
    <p>{{ accounting.paymentDate }}</p>
    <p>{{ accounting.paymentType }}</p>
    <p>{{ accounting.accountingCreationDate }}</p>
    <p>{{ accounting.accountingUpdated }}</p>
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
      :accounting = 'accounting'
    />
  </div>
</template>

<script>
export default {
  name: 'Accounting',
  data: () => ({
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
      'dialog-edit': require('@/components/Accountings/Dialogs/DialogEdit.vue').default
  }
}
</script>