<template>
  <v-footer app inset>
    <v-row justify="center" no-gutters>
      <v-col
        class="py-1 text-right grey--text"
        color="#f1f1f1"
        cols="6"
      >
        <p style="font-size:12px;margin:0;">מדיניות פרטיות | תנאי שימוש</p>
      </v-col>
      <v-col
        class="py-1 text-left grey--text"
        color="#f1f1f1"
        cols="6"
      >
        <p style="font-size:12px;margin:0;">{{ new Date().getFullYear() }} © JustPrint</p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
}
</script>
