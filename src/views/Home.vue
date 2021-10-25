<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
    <location />
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