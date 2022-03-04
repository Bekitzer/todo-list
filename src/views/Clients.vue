<template>
  <div>
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-tooltip
          bottom
          content-class="normal tooltip-bottom"
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            elevation="0"
            filled
            v-bind="attrs"
            v-on="on"
            class="spc-btn"
            @click="dialogs.create = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          </template>
          <span>לקוח חדש</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <list-clients v-if="$store.state.Client.list.length" />
    <no-clients v-else />
    <dialog-create
        v-if="dialogs.create"
        v-model="dialogs.create"
        @close="dialogs.create = false"
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