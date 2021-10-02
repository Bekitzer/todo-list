<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      permanent
      expand-on-hover
      :right="$vuetify.rtl"
      :mobile-breakpoint="800"
      app
    >
      <nav-logo />
      <v-list
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to= "item.to"

          link
        >
          <v-list-item-icon>
            <v-icon size="30px" >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color=primary
      dark
      :height="$route.path === '/' || $route.path === '/clients' ? '350px' : '140px' "
      src="images/mountains.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.7), rgba(0,0,0,.9)"
        ></v-img>
      </template>      
        <v-container class="header-container pa-1">
          <v-row>
            <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
            <search />
            <v-spacer></v-spacer>      
            <client-profile />
            
          </v-row>
          <v-row>
            <v-app-bar-title 
              class="mr-4 text-h5 remove-hidden"              
            >
              {{ $store.state.appTitle }}
            </v-app-bar-title>
          </v-row>
          <v-row >
            <live-date-time />
          </v-row>
          <v-row v-if="$route.path === '/'">
            <field-add-task />
          </v-row>
          <v-row v-if="$route.path === '/clients'">
            <field-add-client />
          </v-row>
        </v-container>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>    
  </v-app>
</template>


<script>
  export default {        
    data: () => ({
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'About', icon: 'mdi-information-outline', to: '/about' },
        { title: 'Orders', icon: 'mdi-format-list-checks', to: '/orders' },
        { title: 'Clients', icon: 'mdi-account', to: '/clients' },
        { title: 'Suppliers', icon: 'mdi-information-outline', to: '/suppliers' },
      ],    
    }),
    mounted() {
      this.$store.dispatch('getTasks'),
      this.$store.dispatch('getClients')
    },
    components: {
      'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
      'field-add-client': require('@/components/Clients/FieldAddClient.vue').default,
      'snackbar'      : require('@/components/Global/Snackbar.vue').default,
      'search'        : require('@/components/Tools/Search.vue').default, 
      'live-date-time': require('@/components/Tools/LiveDate.vue').default,
      'nav-logo'    : require('@/components/Global/NavDrawer.vue').default,
      'client-profile' : require('@/components/Clients/Profile/ClientTopHeader.vue').default
    },
    created () {
       this.$vuetify.rtl = true;
    }
  }
</script>

<style lang="sass">
  .v-list.v-list--nav
    padding: 0
    padding: 0
    justify-content: center
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    align-content: center
    align-items: stretch
  a.v-list-item.v-list-item--link
    justify-content: center
  .remove-hidden
    .v-app-bar-title__content
      overflow: visible !important
  .header-container
    max-width: none !important
  .v-application .justify-center
    margin: 0
</style>
