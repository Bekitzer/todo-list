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
    <list-suppliers v-if="$store.state.suppliers.length" />
    <no-suppliers v-else />
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
  </div>
</template>

<script>
  export default {
    name: 'Suppliers',
    hidden: false,
    data: () => ({
      pageName: 'ספקים',
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-suppliers': require('@/components/Suppliers/ListSuppliers.vue').default,
      'no-suppliers': require('@/components/Suppliers/NoSuppliers.vue').default,
      'dialog-create': require('@/components/Suppliers/Dialogs/DialogCreate.vue').default,
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    },
    computed: {
    padding () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 150
        case 'sm': return 86
        case 'md': return 86
        case 'lg': return 86
        case 'xl': return 86
      }
    },
  },
  }
</script>
