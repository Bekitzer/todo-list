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
        <v-card-title>יצירת מוצר</v-card-title>
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
            @click="addProduct"
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
export default {
  name: 'DialogCreate',
  props: ['product'],
  data: () => ({
    dialog: false,
    productNumber: '',
    productName: '',
    productCategory: '',
    productCategoryList: ['מיתוג ושיווק','משרדי ואירגוני','שילוט ותצוגה','מתקנים ומעמדים','מדבקות וטפטים','מוצרי קד״מ'],
    productInfo: '',
    supplierPrices: '',
  }),
  computed: {
    productFieldInvalid() {
      return (
        !this.productName
      )
    }
  },
  methods:{
    addProduct() {
      if(!this.productFieldInvalid){
        const productFields = {
          name: this.productName,
          category: this.productCategory,
          productInfo: this.productInfo,
          prices: this.supplierPrices
        }

        this.$store.dispatch('addProduct', productFields)
        this.productName = ''
        this.productCategory = ''
        this.productInfo = ''
        this.supplierPrices = ''
        this.attributeName = ''
        this.attributeValues = ''
      }
      this.closeDialog()
      setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
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