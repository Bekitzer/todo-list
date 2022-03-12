<template>
  <v-card>
    <v-card-text>
      <div v-for="(attribute, i) in attributes" :key="i">
        <attribute-field v-model="attributes[i]" />
      </div>

      <v-btn color="primary" @click="handleAdd">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AttributesField',
  props: {
    value: {
      default: () => ([])
    }
  },
  methods: {
    handleAdd() {
      this.attributes = this.attributes.concat({
        name: '',
        inputs: [],
        items: []
      })
    }
  },
  computed: {
    attributes: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  components: {
    'attribute-field': require('@/components/Products/Dialogs/Fields/AttributeField.vue').default,
  }
}
</script>