<template>
  <div>
    <nav-appbar :pname="pageName"/>
    <!-- <location /> -->
    <mailer />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    pageName: 'עמוד הבית',
  }),
  components: {
    'nav-appbar': require('@/components/Global/AppBar.vue').default,
    'location': require('@/components/Tools/Places.vue').default,
    'mailer': require('@/components/Tools/MailerJet.vue').default
  }
}
</script>