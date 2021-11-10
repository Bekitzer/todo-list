<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>שינוי מוצר</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="productName"
                label="שם מוצר"
                outlined
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="productCategory"
                label="שם קטגוריה"
                outlined
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="productInfo"
                label="מידע על המוצר"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @keyup:esc="closeDialog"
            @click="closeDialog"
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
            @click="saveProduct"
            :disabled="productFieldInvalid"
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
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
  export default {
    name: 'DialogEdit',
    props: ['product'],
    data: () => ({
      dialog: false,
      productName: '',
      productCategory: '',
      productInfo: '',
    }),
    computed: {
      productFieldInvalid() {
        return
        !this.productName || this.productName === this.product.name
      }
    },
    methods: {
      saveProduct() {
        if(!this.productFieldInvalid){
          let payload = {
            id: this.product.id,
            name: this.productName,
            category: this.productCategory,
            productInfo: this.productInfo,
            productUpdated: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he})
          }
          this.$store.dispatch('updateProduct', payload)
          this.closeDialog()
          this.$router.push('/products')
        }
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      this.productName = this.product.name
      this.productCategory = this.product.category
      this.productInfo = this.product.productInfo
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>