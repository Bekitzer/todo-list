<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      max-width="290"
    >
      <v-card>
        <v-card-title>מחיקת הזמנה</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק הזמנה זו?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="orderCloseDialog"
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
            @click="orderDelete"
            @keyup.enter="orderDelete"
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
    props: ['order'],
    methods: {
      orderDelete() {
        this.$store.dispatch('deleteOrder', this.$route.params.id)
        this.orderCloseDialog()
        this.$router.push('/orders')
      },
      orderCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>