<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title>יציאה מהמערכת</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה לצאת?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="closeDialog"
            @keyup:esc="closeDialog"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            large
            color="green"
            @click.prevent.stop="logout"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase/compat/app'
export default {
  data: () => ({
    id: null,
    dialog: false,
  }),
  props: ['client'],
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    logout(){
      firebase.auth().signOut().then(() => {
          this.$router.go({path: this.$router.path})
      })
    }
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode == 27) {
          this.$emit('close')
      }
    })
  }
}
</script>