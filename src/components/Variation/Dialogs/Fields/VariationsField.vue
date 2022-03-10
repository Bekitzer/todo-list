<template>
  <v-card>
    <v-card-text>
      //{{variations}}//
      <div v-for="(variation, i) in variations" :key="i">
        <variation-field v-model="variations[i]" @remove="handleRemove" :attributes="unusedVariations"/>
      </div>

      <v-btn color="primary" @click="handleAdd">
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
const defaultField = () => ({
  attribute: '',
  inputs: []
})

export default {
  name: 'Variations',
  props: {
    attributes: {
      default: () => ([])
    },
    value: {
      default: () => ([])
    }
  },
  methods: {
    handleAdd() {
      this.variations = this.variations.concat(defaultField())
    },
    handleRemove({name}) {
      this.variations = this.variations.filter(item => item.name !== name);
    }
  },
  computed: {
    variations: {
      get() {
        return this.value
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
    'variation-field': require('@/components/Variation/Dialogs/Fields/VariationField').default,
  }
}
</script>