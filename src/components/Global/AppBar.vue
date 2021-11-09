
<template>
     <v-app-bar
      app
      flat
      :height="100"
    >
        <v-container>
          <v-row style="font-size:14px;" class="align-center">
            <v-col cols="5" lg="2" md="2" sm="3">
              <h2 style="text-align:right;font-weight:300;font-size:24px;color:#036e86">{{pname}}</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="3" md="3" sm="6">
              <search v-if="tableListSearch"/>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" lg="1" md="1" sm="3" class="d-none d-sm-flex">
              <live-date />
            </v-col>
            <v-col cols="5" lg="1" md="1" sm="2">
              <user-name />
            </v-col>
            <v-col cols="2" lg="1" md="1" sm="1">
              <user-avatar />
            </v-col>
          </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    pageName: 'הנהלת חשבונות',
    dialogs: {
      create: false
    },
  }),
  props: ['pname'],
  components: {
    'user-avatar': require('@/components/Profile/Avatar.vue').default,
    'user-name'  : require('@/components/Profile/Name.vue').default,
    'live-date'  : require('@/components/Tools/LiveDate.vue').default,
    'search'     : require('@/components/Tools/Search.vue').default
  },
  computed: {
    tableListSearch() {
      if(this.$route.path === '/clients'){
        return true
      }else if(this.$route.path === '/suppliers'){
        return true
      }else if(this.$route.path === '/orders'){
        return true
      }else if(this.$route.path === '/products'){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style lang="sass">
</style>

