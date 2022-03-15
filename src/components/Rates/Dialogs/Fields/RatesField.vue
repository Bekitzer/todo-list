<template>
  <v-card>
    <v-card-text>
      <div v-for="(rate, i) in rates" :key="i">
        <rate-field v-model="rates[i]"/>
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
  name: 'RatesField',
  props: ['variation', 'value'],
  methods: {
    handleAdd() {
      this.rates = this.rates.concat({
        min_units: '',
        max_units: '',
        price: '',
        rateVariationRef: docRef(`variations/${this.variation.id}`),
        rateSupplierRef: this.$store.getters.user?.userSupplierRef
      })
    }
  },
  computed: {
    rates: {
      get() {
        return this.value || []
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  components: {
    'rate-field': require('@/components/Rates/Dialogs/Fields/RateField').default
  }
}
</script>