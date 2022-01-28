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
      <v-col cols="12" md="7" sm="7">
        <v-row class="pa-10 grey lighten-3 rounded-b-xl">
          <v-col cols="12" md="12" sm="12">
            <h2><small>מוצר</small></h2>
            <h1>{{ product.name }}</h1>
            <small>{{ product.category }}</small>
            <small>{{ product.attributes }}</small>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <h2>מפרט</h2>
            <p style="white-space: pre;">{{ product.productInfo }}</p>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <h2>מחירון ספקים</h2>
            <p style="white-space: pre;">{{ product.prices }}</p>
          </v-col>
        </v-row>
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
  }),
  computed: {
    product() {
      return this.$store.state.products.find(product => product.id === this.$route.params.id) || {name: ""}
    }
  },
  components: {
      'dialog-edit': require('@/components/Products/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Products/Dialogs/DialogDelete.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
  }
}
</script>