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
          <span>ספק חדש</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <list-suppliers v-if="$store.state.Supplier.list.length" />
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
      'nav-appbar': require('@/components/Global/AppBar.vue').default
    }
  }
</script>


