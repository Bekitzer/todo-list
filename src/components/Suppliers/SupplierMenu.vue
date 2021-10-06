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
        <v-btn
          icon
          dense
          @click="dialogs.edit = true"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
      </template>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :supplier = 'supplier'
    />
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :supplier = 'supplier'
    />
  </div>
</template>

<script>
export default {
    props: ['supplier'],
    data() {
        return{
          dialogs: {
            edit: false,
            delete: false
          },
        }
    },
    components: {
        'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default,
        'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default
    }
}
</script>