<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500">
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
              @click="dialog = false"
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
export default {
  data: () => ({
    id: null,
  }),
  props: ['value'],
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set() {
        this.$emit('close', false)
      }
    },
  },
  methods: {
    logout() {
      this.dialog = false

      this.$store.dispatch('User/signOut')
          .then(() => this.$router.go({path: this.$router.path}))
    }
  }
}
</script>