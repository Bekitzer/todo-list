<template>
<v-row
  align-content= "center"
  no-gutters
>  
  <v-col
    sm="12"
    md="6"
  >
  </v-col>
  <v-col
    sm="12"
    md="3"
  >
    <live-date-time />
  </v-col>
  <v-col
    sm="12"
    md="2"
  >
    <client-name />
  </v-col>
  <v-col    
    sm="2"
    md="1"
  >
    <client-avatar />
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'ClientTopHeader',
  components: {
    'client-avatar': require('@/components/Clients/Profile/Avatar.vue').default,
    'client-name': require('@/components/Clients/Profile/Name.vue').default,
    'live-date-time': require('@/components/Tools/LiveDate.vue').default
  }
}
</script>
</script>

<style>
</style>
