<template>
     <v-app-bar
      app
      :height="height"
      color="#f1f1f1"
      class="pr-10 pl-10"
      src="/images/stars.jpeg"
      style="background-size:cover;background-size: cover !important;background-position: center top !important;padding: 0 !important;"
    >
        <v-container class="header-container pa-1">
          <v-row>
            <v-row style="font-size:16px;text-align:center;" no-gutters>
              <v-col
                xs="12"
                md="4"
                cols="2"
              >
                <h2 style="color:white;text-align:right;">{{pname}}</h2>
              </v-col>
              <v-spacer></v-spacer>
              <v-col

                xs="12"
                md="4"
                cols="12"
              >
                <search v-if="tableList"/>
              </v-col>
              <v-col
                xs="6"
                md="1"
                cols="6"
              >
              </v-col>
              <v-col
                xs="6"
                md="1"
                cols="6"
              >
              <live-date />
              </v-col>
              <v-col
                xs="6"
                md="1"
                cols="6"
              >
                <user-name />
              </v-col>
              <v-col
                xs="6"
                md="1"
                cols="6"
              >
                <user-avatar />
              </v-col>
            </v-row>
          </v-row>
          <v-row v-if="$route.path === '/'">
            <!-- <field-add-task /> -->
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
    'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
    'user-avatar': require('@/components/Profile/Avatar.vue').default,
    'user-name'  : require('@/components/Profile/Name.vue').default,
    'live-date'  : require('@/components/Tools/LiveDate.vue').default,
    'search'     : require('@/components/Tools/Search.vue').default
  },
  computed: {
    tableList() {
      if(this.$route.path === '/clients'){
        return true
      }else if(this.$route.path === '/suppliers'){
        return true
      }else if(this.$route.path === '/accountings'){
        return true
      }else if(this.$route.path === '/orders'){
        return true
      }else{
        return false
      }


    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 150
        case 'sm': return 86
        case 'md': return 86
        case 'lg': return 86
        case 'xl': return 86
      }
    },
  }
}
</script>

<style lang="sass">
  </style>

