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
          :to="{ name: 'Supplier', params: { id : supplier.id }}"
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
      :supplier = 'supplier'
    />
  </div>
</template>

<script>
export default {
    props: ['supplier'],
    data: () => ({
      dialogs: {
        delete: false
      },
    }),
    components: {
        'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default,
        'dialog-create': require('@/components/Suppliers/Dialogs/DialogCreate.vue').default
    }
}
</script>