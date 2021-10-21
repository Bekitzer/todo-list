<template>
  <div class="about pa-5">
    <nav-appbar :pname="pageName"/>
  </div>
</template>

<script>
  export default {
    name: 'About',
    hidden: false,
    data: () => ({
      pageName: 'אודות',
    }),
    components: {
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
