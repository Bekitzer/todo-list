<template>
  <v-app-bar
    app
    flat
    :height="90"
    class="mr-9 ml-9"
  >
    <v-row style="font-size:14px;" class="align-center">
      <v-col cols="12" md="4" sm="6">
        <h2 style="text-align:right;font-weight:300;font-size:24px;color:#036e86"><a @click="$router.go(-1)">
          <v-icon
            large
            class="ml-2"
            color="#03616f"
          >
            mdi-chevron-right
          </v-icon>
        </a> {{pname}} </h2>
      </v-col>
      <v-col cols="12" md="2" sm="6">
        <search v-if="tableListSearch"/>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="1" sm="3" class="d-none d-sm-flex">
        <live-date />
      </v-col>
      <div>
        <profile />
      </div>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    pageName: 'הנהלת חשבונות',
  }),
  props: ['pname'],
  components: {
    'profile'  : require('@/components/Profile/Profile.vue').default,
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

