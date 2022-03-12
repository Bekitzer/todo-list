<template>
  <v-row>
    <v-col cols="5">
      <v-autocomplete
          :class="{'red': variation.OPERATION === OPERATIONS.DELETE}"
          :disabled="variation.OPERATION === OPERATIONS.DELETE"
          v-model="variation.attribute"
          :items="attributes"
          item-text="name"
          item-value="name"
          label="מאפיין"
          clearable
          dense
          hide-details
          autocomplete="off"
      ></v-autocomplete>
    </v-col>
    <v-col cols="5">
      <v-autocomplete
          :class="{'red': variation.OPERATION === OPERATIONS.DELETE}"
          :disabled="!variation.attribute || variation.OPERATION === OPERATIONS.DELETE"
          v-model="variation.input"
          :items="attribute.inputs"
          item-text="text"
          item-value="text"
          label="וראציות"
          clearable
          dense
          hide-details
          autocomplete="off"
      />
    </v-col>
    <v-col cols="2">
      <v-switch @change="removeField" label="מחיקה" color="red" hide-details></v-switch>
    </v-col>
  </v-row>
</template>

<script>
import {OPERATIONS} from '@/stores/utils';

export default {
  name: 'VariationField',
  props: ['value', 'attributes'],
  data: () => ({
    OPERATIONS
  }),
  computed: {
    variation: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attribute() {
      return this.attributes.find(attr => attr.name === this.variation.attribute) || {}
    }
  },
  methods: {
    removeField(val) {
      this.variation = {...this.variation, OPERATION: val ? OPERATIONS.DELETE : null}
    }
  }
}
</script>