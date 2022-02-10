<template>
  <div>
    <nav-appbar :pname="'מוצרים - ' + this.product.name ">
      <template v-slot:add-btn>
        <v-tooltip
          left
          content-class="normal tooltip-left"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              elevation="0"
              filled
              v-bind="attrs"
              v-on="on"
              class="spc-create"
              @click="dialogs.edit = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>עריכת ספק</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <v-row no-gutters>
      <v-col cols="12" md="7" sm="7" class="pa-10 grey lighten-3 rounded-b-xl">
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab>
            מאפיינים
          </v-tab>
          <v-tab>
            מידע כללי
          </v-tab>
          <v-tab>
            וריאציות
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <repeater-field/>
          </v-tab-item>
          <v-tab-item>
            <v-card >
              <v-card-text>
                <p>שם מוצר: {{ product.name }}</p>
                <p>קטגוריות: {{ product.category }}</p>
                <p>תגיות: {{ product.attributes }}</p>
                <p>מפרט: {{ product.productInfo }}</p>
                <p>מחירון ספקים: {{ product.prices }}</p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card >
              <v-card-text>
                <p>שלום מאפיינים</p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card >
              <v-card-text>
                <p>שלום תגיות</p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12" md="5" sm="5">
        <v-img
          src="/images/radik.jpg"
          rounded
        ></v-img>
      </v-col>
    </v-row>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :product = 'product'
    />
  </div>
</template>

<script>
export default {
  name: 'Product',
  data: () => ({
    pageName: '',
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false,
      delete: false
    },
    tab: null,
    activator: null,
    attach: null,
    editing: null,
    editingIndex: -1,
    items: [
      { header: 'בחר או צור חדש' },
    ],
    nonce: 1,
    menu: false,
    attributeName: '',
    attributeValues: [],
    x: 0,
    search: null,
    y: 0,
  }),
  computed: {
    product() {
      return this.$store.state.products.find(product => product.id === this.$route.params.id) || {name: ""}
    }
  },
  watch: {
    attributeValues (val, prev) {
      if (val.length === prev.length) return

      this.attributeValues = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
          }
          this.items.push(v)

          this.nonce++
        }

        return v
      })
    },
  },
  methods:{
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    // addProduct() {
    //   if(!this.productFieldInvalid){
    //     const productFields = {
    //       name: this.productName,
    //       category: this.productCategory,
    //       Tags: this.productTags,
    //       productInfo: this.productInfo,
    //       prices: this.supplierPrices
    //     }

    //     this.$store.dispatch('addProduct', productFields)
    //     this.productName = ''
    //     this.productCategory = ''
    //     this.productTags = ''
    //     this.productInfo = ''
    //     this.supplierPrices = ''
    //     this.attributeName = ''
    //     this.attributeValues = ''
    //   }
    //   this.closeDialog()
    //   setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    // },
    // closeDialog() {
    //   this.$emit('close')
    // }
  },
  components: {
      'dialog-edit': require('@/components/Products/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Products/Dialogs/DialogDelete.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default,
      'repeater-field' : require('@/components/Products/Attributes/RepeaterField.vue').default
  }
}
</script>