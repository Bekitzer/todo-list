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
      <v-col cols="12" md="12" sm="12" class="pa-10 grey lighten-3 rounded-b-xl">
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
            <repeater-field @change="handleAttributeChange" v-model="product.attributes"/>
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
        <v-hover v-slot="{ hover }">
          <div>
            <v-fade-transition>
                <v-overlay v-if="hover" color="#000" absolute>
                  <v-btn @click="openFile(product)">הוספה/שינוי תמונה</v-btn>
                </v-overlay>
              </v-fade-transition>
            <v-img
              :src="product.file"
              lazy-src="/images/gravatar.jpg"
            ></v-img>
          </div>
        </v-hover>
      </v-col>
    </v-row>
    <dialog-edit
      v-if="dialogs.edit"
      v-model="dialogs.edit"
      @close="dialogs.edit = false"
      :product = 'product'
    />
    <dialog-image
      v-if="dialogs.image"
      v-model="dialogs.image"
      @close="dialogs.image = false"
      :product = 'product'
    />
  </div>
</template>

<script>
export default {
  name: 'Product',
  data: () => ({
    tab: null,
    dialogs: {
      edit: false,
      image: false
    },
  }),
  computed: {
    product() {
      return this.$store.state.Product.list.find(product => product.id === this.$route.params.id) || {name: ""}
    }
  },
  methods:{
    openFile (product) {
      this.dialogs.image = true
    },
    handleAttributeChange(attributes) {
      this.$store.dispatch('Product/update', {id: this.product.id, attributes})
    }
  },
  components: {
    'dialog-edit': require('@/components/Products/Dialogs/DialogEdit.vue').default,
    'nav-appbar' : require('@/components/Global/AppBar.vue').default,
    'dialog-image': require('@/components/Products/Dialogs/DialogImage.vue').default,
    'repeater-field' : require('@/components/Products/Attributes/RepeaterField.vue').default
  }
}
</script>