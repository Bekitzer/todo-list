<template>
  <div class="pa-5">
    <h1>ספקים</h1>
    <list-suppliers v-if="$store.state.suppliers" />
    <no-suppliers v-else />
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
    name: 'Suppliers',
    hidden: false,
    data: () => ({
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-suppliers': require('@/components/Suppliers/ListSuppliers.vue').default,
      'no-suppliers': require('@/components/Suppliers/NoSuppliers.vue').default,
      'dialog-create': require('@/components/Suppliers/Dialogs/DialogCreate.vue').default
    }
  }
</script>
