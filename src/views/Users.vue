<template>
  <div>
    <nav-appbar :pname="pageName">
      <template v-slot:add-btn>
        <v-tooltip
          bottom
          content-class="normal tooltip-left"
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
          <span>משתמש חדש</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <list-users v-if="$store.state.User.list.length" />
    <no-users v-else />
    <dialog-create
        v-if="dialogs.create"
        v-model="dialogs.create"
        @close="dialogs.create = false"
    />
  </div>
</template>

<script>
  export default {
    name: 'Users',
    data: () => ({
      pageName: 'משתמשים',
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-users': require('@/components/Users/ListUsers').default,
      'no-users': require('@/components/Users/NoUsers').default,
      'dialog-create': require('@/components/Users/Dialogs/DialogCreate').default,
      'nav-appbar': require('@/components/Global/AppBar').default
    }
  }
</script>


