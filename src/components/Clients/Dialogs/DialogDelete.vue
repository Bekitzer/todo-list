<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
    >
      <v-card>
        <v-card-title>מחיקת לקוח</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק לקוח זה?</v-card-text>
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
            @click="clientDelete"
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
        id: null,
        dialog: false,
      }
    },
    props: ['client'],
    methods: {
      clientDelete() {
        this.$store.dispatch('deleteClient', this.$route.params.id)
        this.closeDialog()
        this.$router.push('/clients')
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