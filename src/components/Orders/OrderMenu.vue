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
          :to="{ name: 'Order', params: { id : order.id }}"
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
      :order = 'order'
    />
  </div>
</template>

<script>
export default {
    props: ['order'],
    data() {
        return{
          dialogs: {
            delete: false
          },
        }
    },
    components: {
        'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default
    }
}
</script>