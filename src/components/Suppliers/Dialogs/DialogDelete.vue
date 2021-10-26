<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>מחיקת ספק</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק ספק זה?</v-card-text>
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
            @click="supplierDelete"
            @keyup.enter="supplierDelete"
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
    data () {
      return {
        dialog: false,
      }
    },
    props: ['supplier'],
    methods: {
      supplierDelete() {
        this.$store.dispatch('deleteSupplier', this.$route.params.id)
        this.closeDialog()
        this.$router.push('/suppliers')
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>