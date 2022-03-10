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
          filled
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
          filled
          dense
          hide-details
          autocomplete="off"
      ></v-autocomplete>
    </v-col>
    <!--
    variation1:
         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 0
          max_units: 1000
         }

         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 1000
          max_units: 2000
         }

         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 2000
          max_units
         }

    -->
    <v-spacer></v-spacer>
    <v-col cols="1">
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
      console.log(val, this.variation)
    }
  }
}
</script>