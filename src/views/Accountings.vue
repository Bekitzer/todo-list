<template>
  <div class="pa-10">
    <nav-appbar :pname="pageName"/>
    <list-accountings v-if="$store.state.accountings" />
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
      pageName: 'הנהלת חשבונות',
      dialogs: {
        create: false
      },
    }),
    components: {
      'list-accountings': require('@/components/Accountings/ListAccountings.vue').default,
      'no-accountings': require('@/components/Accountings/NoAccountings.vue').default,
      'dialog-create': require('@/components/Accountings/Dialogs/DialogCreate.vue').default,
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
