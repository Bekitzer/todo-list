<template>
  <v-row>
    <v-col cols="5">
      {{ attributes.map(a => a.name) }}
      <v-autocomplete
          :items="attributes"
          item-text="name"
          item-value="name"
          v-model="variation.attribute"
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
          :disabled="!variation.attribute"
          v-model="variation.inputs"
          :items="attribute.inputs"
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
      <v-btn small color="error" @click="removeField">
        <v-icon>
          mdi-minus
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VariationField',
  props: ['value', 'attributes'],
  mounted() {
    console.log(this.attributes)
  },
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
      return this.attributes.filter(attr => attr.name === this.variation.attribute)
    }
  },
  methods: {
    removeField() {
      this.$emit('remove', this.variation)
    }
  },
  // watch: {
  //   'variation.attribute'(val, prev) {
  //     this.attribute.filter(attr => attr.name === this.variation.attribute)
  //   }
  // }
}
</script>