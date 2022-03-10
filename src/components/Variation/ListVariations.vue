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
      edit: true,
    }
  }),
  computed: {
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
  }
}
</script>