<template>
  <div class="mr-16 ml-16">
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-btn
          fab
          small
          dark
          class="v-btn--example mr-4"
          @click="dialogs.create = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </nav-appbar>
    <list-clients v-if="$store.state.clients.length" />
    <no-clients v-else />
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
  </div>
</template>

<script>
  export default {
    name: 'Clients',
    hidden: false,
    data: () => ({
      pageName: 'לקוחות',
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-clients': require('@/components/Clients/ListClients.vue').default,
      'no-clients': require('@/components/Clients/NoClients.vue').default,
      'dialog-create': require('@/components/Clients/Dialogs/DialogCreate.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
