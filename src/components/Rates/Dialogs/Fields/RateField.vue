<template>
  <v-row>
    <v-col cols="5">
      <v-text-field
          :class="{'red': rate.OPERATION === OPERATIONS.DELETE}"
          :disabled="rate.OPERATION === OPERATIONS.DELETE"
          v-model="rate.units" label="מספר יחידות"
      />
    </v-col>
    <v-col cols="5">
      <v-text-field
          :class="{'red': rate.OPERATION === OPERATIONS.DELETE}"
          :disabled="rate.OPERATION === OPERATIONS.DELETE"
          v-model="rate.price" label="מחיר"
      />
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
    <v-col cols="2">
      <v-switch @change="removeField" label="מחיקה" color="red" hide-details></v-switch>
    </v-col>
  </v-row>
</template>

<script>
import {OPERATIONS} from '@/stores/utils';

export default {
  name: 'RateField',
  props: ['value'],
  data: () => ({
    OPERATIONS
  }),
  computed: {
    rate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
  },
  methods: {
    removeField(val) {
      this.rate = {...this.rate, OPERATION: val ? OPERATIONS.DELETE : null}
    }
  }
}
</script>