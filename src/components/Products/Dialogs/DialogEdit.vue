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
              <v-select
                v-model="productCategory"
                :items="productCategoryList"
                label="שם קטגוריה"
                outlined
                chips
                multiple
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="productInfo"
                label="מפרט"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="supplierPrices"
                label="מחירון ספקים"
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
      productCategoryList: ['מיתוג ושיווק','משרדי ואירגוני','שילוט ותצוגה','מתקנים ומעמדים','מדבקות וטפטים','מוצרי קד״מ'],
      productInfo: '',
      supplierPrices: '',
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
            prices: this.supplierPrices,
            productUpdated: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he})
          }
          this.$store.dispatch('updateProduct', payload)
          this.closeDialog()
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
      this.supplierPrices = this.product.prices
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>