<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :right="$vuetify.rtl"
      :mobile-breakpoint="800"
      permanent
      width="70"
      app
    >
      <v-list-item
        class="spc-logo"
        :to="{ name: 'Home' }"
      >
        <v-img
          src="/images/logojp.png"
          class="spc-img"
        ></v-img>
      </v-list-item>
      <v-list nav >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to= "item.to"
        >
          <v-list-item-content>
            <v-list-item-icon>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="white--text" style="z-index: 1;font-size:12px">{{ item.title }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="dialogs.exit = true"
        >
        <v-list-item-content>
          <v-list-item-icon>
          <v-icon color="white">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle class="white--text" style="z-index: 1;font-size:12px">התנתק</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
      </v-list>
      <dialog-exit
        v-if="dialogs.exit"
        @close = 'dialogs.exit = false'
      />
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    mini: true,
    dialogs: {
      exit: false
    },
    items: [
      { title: 'הזמנות', icon: 'mdi-format-list-checks', to: '/orders' },
      { title: 'ספקים', icon: 'mdi-account-multiple-outline', to: '/suppliers' },
      { title: 'לקוחות', icon: 'mdi-account', to: '/clients' },
      { title: 'לוח בקרה', icon: 'mdi-view-dashboard', to: '/dashboard' },

    ],
  }),
  components: {
    'dialog-exit': require('@/components/Global/Dialogs/DialogExit.vue').default,
  }
}
</script>

<style lang="sass">
  .v-image.v-responsive.spc-img.theme--light .v-image__image, .v-image__placeholder
    background-size: 30px!important

  .v-navigation-drawer__content .v-list-item
    padding: 0 !important

  .v-image.v-responsive.spc-img.theme--light .v-responsive__sizer
    padding-bottom: 86px !important

  .v-list--nav
    padding-left: 0px !important
    padding-right: 0px !important
  .v-application--is-rtl .v-list-item__icon:first-child
    margin-right: 23px !important
    margin-left: auto !important
  .v-navigation-drawer__content
    background: #626262 !important
  .v-list--nav .v-list-item, .v-list--nav .v-list-item:before
    border-radius: 0px !important
  .v-list-item--link:hover:before
    opacity: 1 !important
    background: #026e85 !important
  .v-list--nav .v-list-item:not(:last-child):not(:only-child)
    margin-bottom: 0px !important
  .v-list .v-list-item--active
    opacity: 1 !important
    background: #026e85 !important
</style>

