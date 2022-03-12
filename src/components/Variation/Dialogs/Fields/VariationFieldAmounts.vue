<template>
  <v-card>
    <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-text-field
              :class="{'red': amounts.OPERATION === OPERATIONS.DELETE}"
              :disabled="amounts.OPERATION === OPERATIONS.DELETE"
              v-model.number="amounts.amount"
              :items="amounts"
              item-text="amount"
              item-value="amount"
              label="מחירון"
              clearable
              dense
              hide-details
              type="number"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              :class="{'red': amounts.OPERATION === OPERATIONS.DELETE}"
              :disabled="amounts.OPERATION === OPERATIONS.DELETE"
              v-model.number="amounts.price"
              :items="amounts"
              item-text="price"
              item-value="price"
              label="מחירון"
              clearable
              dense
              hide-details
              type="number"
            />
          </v-col>
          <v-col cols="2">
            <v-switch @change="removeField" label="מחיקה" color="red" hide-details></v-switch>
          </v-col>
        </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {OPERATIONS} from '@/stores/utils';

export default {
  name: 'VariationFieldAmounts',
  props: ['value', 'amounts'],
  data: () => ({
    OPERATIONS
  }),
  computed: {
    amount: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    variation() {
      return this.variations.find(variation => variation.name === this.amount.amount) || {}
    }
  },
  methods: {
    removeField(val) {
      this.amount = {...this.amount, OPERATION: val ? OPERATIONS.DELETE : null}
    }
  }
}
</script>