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
          plain
          :to="{ name: 'Client', params: { id : client.id }}"
        >
          <img
            width="26px"
            src="@/components/Icons/edit.svg"
          >
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
      :client = 'client'
    />
  </div>
</template>

<script>
export default {
    props: ['client'],
    data() {
      return{
        dialogs: {
          delete: false
        },
      }
    },
    components: {
        'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default
    }
}
</script>