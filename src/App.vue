<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      :mobile-breakpoint="800"
      app
    >
      <nav-avatar />
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to= "item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
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
      :height="$route.path === '/' ? '230px' : '140px' "
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
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>            
            <v-spacer></v-spacer>      
            <search />
          </v-row>
          <v-row>
            <v-app-bar-title 
              class="ml-4 text-h5 remove-hidden"              
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
        { title: 'To Do', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'About', icon: 'mdi-information-outline', to: '/about' },
      ],    
    }),
    mounted() {
      this.$store.dispatch('getTasks')
    },
    components: {
      'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
      'snackbar'      : require('@/components/Global/Snackbar.vue').default,
      'search'        : require('@/components/Tools/Search.vue').default, 
      'live-date-time': require('@/components/Tools/LiveDate.vue').default,
      'nav-avatar'    : require('@/components/Global/NavDrawer.vue').default
    }
  }
</script>

<style lang="sass">
  .remove-hidden
    .v-app-bar-title__content
      overflow: visible !important
  .header-container
    max-width: none !important
</style>
