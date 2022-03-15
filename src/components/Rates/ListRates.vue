<template>
  <v-card>
    <v-card-title>
      תעריף
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
        <span>עריכת תעריפים</span>
      </v-tooltip>
    </v-card-title>
    <v-list two-line>
      <template v-for="(rate, i) in rates">
        units:{{ rate.min_units }} - {{ rate.max_units }} / price:{{ rate.price }}
        <v-divider :key="'divider_' +i"></v-divider>
      </template>
    </v-list>
    <no-rates v-if="!rates.length"/>

    <dialog-edit
        v-if="dialogs.edit"
        v-model="dialogs.edit"
        @close="dialogs.edit = false"
        :variation='variation'
        :rates='rates'
    />
  </v-card>
</template>

<script>
export default {
  name: 'ListRates',
  props: ['variation'],
  data: () => ({
    dialogs: {
      edit: false,
    }
  }),
  computed: {
    rates() {
      return this.$store.state.Rate.list.filter(rate => rate.rateVariationRef.id === this.variation.id)
    }
  },
  components: {
    'dialog-edit': require('@/components/Rates/Dialogs/DialogEdit').default,
    'no-rates': require('@/components/Rates/NoRates').default
  }
}
</script>