<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          dense
          :to="{ name: 'Accounting', params: { id : accounting.id }}"
        >
          <v-icon>
            mdi-account-settings
          </v-icon>
        </v-btn>
        <v-btn
          icon
          dense
          @click="dialogs.delete = true"
        >
          <v-icon>
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </template>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :accounting = 'accounting'
    />
  </div>
</template>

<script>
export default {
    props: ['accounting'],
    data: () => ({
      dialogs: {
        delete: false
      },
    }),
    components: {
        'dialog-delete': require('@/components/Accountings/Dialogs/DialogDelete.vue').default
    }
}
</script>