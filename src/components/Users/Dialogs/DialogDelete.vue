<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      @click:outside='closeDialog'
      max-width="500"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>מחיקת משתמש</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק משתמש זה?</v-card-text>
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
            @click="userDelete"
            @keyup.enter="userDelete"
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
    props: ['user'],
    methods: {
      userDelete() {
        this.$store.dispatch('User/deleteUser', this.$route.params.id)
        this.closeDialog()
        this.$router.push('/users')
      },
      closeDialog() {
        this.$emit('close')
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