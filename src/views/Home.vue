<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
      <div class="text-center">
        <v-btn
          color="primary"
          :to="{ name: 'Login' }"
        >
          Login
        </v-btn>
        <!-- <v-btn
          color="primary"
          :to="{ name: 'Register' }"
        >
          Register
        </v-btn> -->
      </div>
    <!-- <location /> -->
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      pageName: 'לוח בקרה',
    }),
    components: {
      'nav-appbar' : require('@/components/Global/AppBar.vue').default,
      'location' : require('@/components/Tools/Places.vue').default
    }
  }
</script>