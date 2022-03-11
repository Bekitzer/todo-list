<template>
  <v-card>
    <v-card-text>
      <div v-for="(variationAmount, i) in variationsAmount" :key="i">
        <v-row>
          <v-col cols="5">
            <v-text-field v-model="amount" label="כמות" dense />
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="price" label="מחיר" dense />
          </v-col>
          <v-col cols="2">
            <v-switch label="מחיקה" color="red" hide-details></v-switch>
          </v-col>
        </v-row>
      </div>
      <v-btn color="primary" @click="handleAdd">
        הוסף כמות/מחיר
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
// import {OPERATIONS} from '@/stores/utils';

export default {
  name: 'VariationFieldAmounts',
  props: ['value'],
  data: () => ({
    // OPERATIONS
    variationsAmount
  }),
  computed: {
    // variation: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {
    //     this.$emit('input', val)
    //   }
    // },
    // attribute() {
    //   return this.attributes.find(attr => attr.name === this.variation.attribute) || {}
    // }
  },
  methods: {
    handleAdd() {
      this.variationsAmount = this.variationsAmount.concat({
        amount: '',
        price: '',
      })
    },
    // removeField(val) {
    //   this.variation = {...this.variation, OPERATION: val ? OPERATIONS.DELETE : null}
    // }
  }
}
</script>