<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5 text-center">מחיקת לקוח</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק לקוח זה?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="clientCloseDialog"
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
            @keyup.enter="clientDelete"
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
        this.clientCloseDialog()
        this.$router.push('/clients')
      },
      clientCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>