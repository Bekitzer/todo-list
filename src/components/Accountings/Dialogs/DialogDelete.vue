<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5 text-center">מחיקת הנהלת חשבון</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק הנהלת חשבון זו?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="accountingCloseDialog"
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
            @click="accountingDelete"
            @keyup.enter="accountingDelete"
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
    props: ['accounting'],
    methods: {
      accountingDelete() {
        this.$store.dispatch('deleteAccounting', this.$route.params.id)
        this.accountingCloseDialog()
        this.$router.push('/accountings')
      },
      accountingCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>