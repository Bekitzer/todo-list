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
        <v-list-item :key="'item_' + i">
          <v-list-item-content>
            <v-list-item-title v-html="variation.attribute"></v-list-item-title>
            <v-list-item-subtitle v-html="variation.input"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

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