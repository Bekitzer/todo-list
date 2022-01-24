<template>
  <v-footer app inset>
    <v-row justify="center" no-gutters>
      <v-col class="py-1 text-right footer-link" cols="6">
          <router-link :to="{ name: 'Privacy' }">מדיניות פרטיות | </router-link>
          <router-link :to="{ name: 'Terms' }">תנאי שימוש</router-link>
      </v-col>
      <v-col class="py-1 text-left grey--text" cols="6">
        <p style="font-size:12px;margin:0;">{{ new Date().getFullYear() }} © JustPrint</p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
}
</script>
<style lang="sass" scoped>
  .footer-link a
    font-size: 12px !important
    margin: 0 !important
    text-decoration: none !important
    color: grey !important
</style>

