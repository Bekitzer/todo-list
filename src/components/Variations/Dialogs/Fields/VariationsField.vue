<template>
  <v-card>
    <v-card-text>
      <div v-for="(variation, i) in variations" :key="i">
        <variation-field v-model="variations[i]" :attributes="unusedVariations"/>
      </div>

      <v-btn color="primary" @click="handleAdd">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import {docRef} from '@/stores/utils';

export default {
  name: 'VariationsField',
  props: ['product', 'attributes', 'value'],
  methods: {
    handleAdd() {
      this.variations = this.variations.concat({
        attribute: '',
        input: '',
        variationProductRef: docRef(`products/${this.product.id}`),
        variationSupplierRef: this.$store.getters.user?.userSupplierRef
      })
    }
  },
  computed: {
    variations: {
      get() {
        return this.value || []
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    unusedVariations() {
      return this.attributes.filter(attribute => {
        return !this.variations.find(variations => variations.attributes === attribute.name)
      })
    }
  },
  components: {
    'variation-field': require('@/components/Variations/Dialogs/Fields/VariationField').default
  }
}
</script>