<template>
  <div class="pa-10">
    <nav-appbar :pname="pageName"/>
    <list-clients v-if="$store.state.clients.length" />
    <no-clients v-else />
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.create = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
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
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
