<template>
  <v-row
    class="user-profile"
    no-gutters
  >
    <v-col
      sm="2"
      md="3"
    >
    </v-col>
    <v-col
      sm="2"
      md="1"
    >
    </v-col>
    <v-col
      sm="2"
      md="4"
    >
      <search />
    </v-col>
    <v-col
      sm="2"
      md="1"
    >
    </v-col>
    <v-col
      sm="2"
      md="1"
    >
      <live-date-time />
    </v-col>
    <v-col
      sm="12"
      md="1"
    >
      <user-name />
    </v-col>
    <v-col
      sm="12"
      md="1"
    >
      <user-avatar />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ClientTopHeader',
  components: {
    'user-avatar'     : require('@/components/Profile/Avatar.vue').default,
    'user-name'       : require('@/components/Profile/Name.vue').default,
    'live-date-time'  : require('@/components/Tools/LiveDate.vue').default,
    'search'          : require('@/components/Tools/Search.vue').default,
  }
}
</script>

<style lang="sass">

</style>
