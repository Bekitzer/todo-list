<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          dense
          @click="$store.dispatch('clientProfile', client.id)"
        >
          mdi-account-settings
        </v-icon>        
        <v-icon
          dense
          @click="dialogs.delete = true"
        >
          mdi-trash-can-outline
        </v-icon>
        <v-icon
          dense
          @click="dialogs.edit = true"
        >
          mdi-pencil
        </v-icon>
      </template>      
    </v-menu>
    <dialog-delete 
      v-if="dialogs.delete" 
      @close = 'dialogs.delete = false'
      :client = 'client'
    />
    <dialog-edit 
      v-if="dialogs.edit" 
      @close = 'dialogs.edit = false'
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
            edit: false,
            delete: false
          },          
        }
    },
    components: {
        'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default,
        'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default
    }
}
</script>