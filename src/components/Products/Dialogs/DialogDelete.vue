<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      @click:outside='closeDialog'
      max-width="500"
    >
      <v-card>
        <v-card-title>מחיקת מוצר</v-card-title>
        <v-card-text>אתה בטוח שאתה רוצה למחוק מוצר זה?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="closeDialog"
            @keyup.esc="closeDialog"
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
            @click="productDelete"
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
    props: ['product'],
    methods: {
      productDelete() {
        this.$store.dispatch('deleteProduct', this.$route.params.id)
        this.closeDialog()
        this.$router.push('/products')
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