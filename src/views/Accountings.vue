<template>
  <div class="pa-5">
    <h1>הנהלת חשבונות</h1>
    <list-accountings v-if="$store.state.accountings.length" />
    <no-accountings v-else />
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
    name: 'Accountings',
    hidden: false,
    data: () => ({
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-accountings': require('@/components/Accountings/ListAccountings.vue').default,
      'no-accountings': require('@/components/Accountings/NoAccountings.vue').default,
      'dialog-create': require('@/components/Accountings/Dialogs/DialogCreate.vue').default
    }
  }
</script>
