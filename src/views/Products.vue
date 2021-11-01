<template>
  <div class="pr-16 pt-10 pl-16">
    <nav-appbar :pname="pageName"/>
    <v-row>
      <list-products
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </v-row>
    <v-fab-transition>
      <v-btn
        fab
        large
        fixed
        dark
        bottom
        left
        class="v-btn--example"
        @click="dialogs.create = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <dialog-create
      v-if="dialogs.create"
      @close = 'dialogs.create = false'
    />
  </div>
</template>

<script>
export default {
  name: 'Products',
  hidden: false,
  data: () => ({
    pageName: 'מוצרים',
    dialogs: {
      create: false
    },
  }),
  components: {
    'list-products': require('@/components/Products/ListProducts.vue').default,
    'dialog-create': require('@/components/Products/Dialogs/DialogCreate.vue').default,
    'nav-appbar'          : require('@/components/Global/AppBar.vue').default
  },
  computed: {
    products: {
      get() {
        return this.$store.getters.productsFiltered
      },
      set(value) {
        this.$store.dispatch('setProducts', value)
      }
    }
  }
}
</script>
<style lang="sass">
@media (max-width: 800px)
  .v-application .pl-16
    padding-left: 20px !important
  .v-application .pr-16
    padding-right: 20px !important
  .v-application .pt-10
    padding-top: 0px !important
</style>

