<template>
  <div>
    <nav-appbar :pname="'מוצרים - ' + this.product.name ">
      <template v-slot:add-btn>
        <v-tooltip left content-class="normal tooltip-left">
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
      <v-col cols="8" class="pa-10 grey lighten-3 rounded-b-xl">
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab>וריאציות</v-tab>
          <v-tab>מאפיינים</v-tab>
          <v-tab>מידע כללי</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <list-variations :product="product"/>
          </v-tab-item>
          <v-tab-item>
            <list-attributes :attributes="product.attributes"></list-attributes>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <p>שם מוצר: {{ product.name }}</p>
                <p>קטגוריות: {{ product.category }}</p>
                <p>תגיות: {{ product.attributes }}</p>
                <p>מפרט: {{ product.productInfo }}</p>
                <p>מחירון ספקים: {{ product.prices }}</p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="4">
        <v-hover v-slot="{ hover }">
          <v-card>
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#000">
                <v-btn @click="openFile(product)">הוספה/שינוי תמונה</v-btn>
              </v-overlay>
            </v-fade-transition>
            <v-img height="370px" :src="product.avatar" lazy-src="/images/gravatar.jpg" rounded/>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <dialog-edit
        v-if="product.id && dialogs.edit"
        v-model="dialogs.edit"
        @close="dialogs.edit = false"
        :product='product'
    />
    <dialog-image
        v-if="dialogs.image"
        v-model="dialogs.image"
        @close="dialogs.image = false"
        :product='product'
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
    }
  }),
  computed: {
    product() {
      return this.$store.state.Product.list.find(product => {
        return product.id === this.$route.params.id
      }) || {attributes: []}
    },
  },
  methods: {
    openFile(product) {
      this.dialogs.image = true
    }
  },
  components: {
    'dialog-edit': require('@/components/Products/Dialogs/DialogEdit').default,
    'nav-appbar': require('@/components/Global/AppBar').default,
    'dialog-image': require('@/components/Products/Dialogs/DialogImage').default,
    'list-attributes': require('@/components/Products/ListAttributes').default,
    'list-variations': require('@/components/Variations/ListVariations').default,
  }
}
</script>