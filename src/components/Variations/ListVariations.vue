<template>
  <v-card>
    <v-card-title>
      <v-tooltip bottom content-class="normal tooltip-bottom">
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
        <span>עריכת וריאציה</span>
      </v-tooltip>
    </v-card-title>
    <v-list two-line>
      <template v-for="(variation, i) in variations">
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-html="variation.attribute"></v-list-item-title>
              <v-list-item-subtitle v-html="variation.input"></v-list-item-subtitle>
            </v-list-item-content>
          </template>

          <list-rates :variation="variation"/>

        </v-list-group>
        <v-divider :key="'divider_' +i"></v-divider>
      </template>
    </v-list>
    <no-variations v-if="!variations.length"/>

    <dialog-edit
        v-if="dialogs.edit"
        v-model="dialogs.edit"
        @close="dialogs.edit = false"
        :attributes='attributes'
        :variations='variations'
        :product='product'
    />
  </v-card>
</template>

<script>
export default {
  name: 'ListVariations',
  props: ['product'],
  data: () => ({
    dialogs: {
      edit: false,
    }
  }),
  computed: {
    attributes() {
      return this.product?.attributes || []
    },
    supplierId() {
      return this.$store.getters.user?.userSupplierRef?.id
    },
    variations() {
      return this.$store.state.Variation.list.filter(variation =>
          variation.variationProductRef.id === this.product.id && variation.variationSupplierRef.id === this.supplierId)
    }
  },
  components: {
    'dialog-edit': require('@/components/Variations/Dialogs/DialogEdit').default,
    'no-variations': require('@/components/Variations/NoVariations').default,
    'list-rates': require('@/components/Rates/ListRates').default
  }
}
</script>