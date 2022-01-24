<template>
  <nav-appbar :pname="pageName"/>
</template>

<script>
  export default {
    name: 'About',
    hidden: false,
    data: () => ({
      pageName: 'תנאי שימוש',
    }),
    components: {
      'nav-appbar'          : require('@/components/Global/AppBar.vue').default
    }
  }
</script>
