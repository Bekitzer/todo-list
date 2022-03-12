<template>
  <v-card>
    <v-card-title>
      <v-tooltip bottom content-class="normal tooltip-bottom">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              small
              elevation="0"
              filled
              v-bind="attrs"
              v-on="on"
              class="spc-create"
              @click="dialogs.edit = true"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>עריכת וריאציה</span>
      </v-tooltip>
    </v-card-title>
    <v-list two-line>
      <template v-for="(variation, i) in variations">
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-html="variation.attribute"></v-list-item-title>
              <v-list-item-subtitle v-html="variation.input"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <v-list-item :key="'item_' + i">
            <div v-for="(amounts, i) in amounts" :key="i">
              <variation-field-amounts v-model="amounts[i]" />
            </div>
            <v-btn color="primary" @click="handleAddAmount">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-group>
        <v-divider :key="'divider_' +i"></v-divider>
      </template>
    </v-list>
    <no-variations v-if="!variations.length"/>

    <dialog-edit
        v-if="dialogs.edit"
        v-model="dialogs.edit"
        @close="dialogs.edit = false"
        :attributes='attributes'
        :variations='variations'
        :product='product'
    />
  </v-card>
</template>

<script>
export default {
  name: 'ListVariations',
  props: ['product'],
  data: () => ({
    dialogs: {
      edit: false,
    }
  }),
  methods: {
    handleAddAmount() {
      this.amounts = this.amounts.concat({
        amount: '',
        price: ''
      })
    },
  },
  computed: {
    amounts: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    // unusedAmounts() {
    //   return this.amounts.filter(amount => {
    //     return !this.amounts.find(amounts => amounts.variations === amount.amount)
    //   })
    // },
    attributes() {
      return this.product?.attributes || []
    },
    variations() {
      return this.$store.state.Variation.list.filter(variation => variation.variationProductRef.id === this.product.id)
    }
  },
  components: {
    'dialog-edit': require('@/components/Variation/Dialogs/DialogEdit.vue').default,
    'no-variations': require('@/components/Variation/NoVariations.vue').default,
    "variation-field-amounts": require('@/components/Variation/Dialogs/Fields/VariationFieldAmounts').default,
  }
}
</script>