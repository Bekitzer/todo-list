<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12">
            <h3>עדכון תעריפים</h3>
          </v-col>

          <v-col cols="12">
            <rates-field v-model="form" :rates="rates" :variation="variation"/>
          </v-col>

          <v-col cols="12">
            <v-card-actions style="padding:0">
              <v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
                שמירה
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {deepCopy, OPERATIONS} from '@/stores/utils';

export default {
  name: 'DialogEdit',
  props: ['variation', 'rates', 'value'],
  data: () => ({
    saving: false,
    dialogs: {
      delete: false
    },
    form: {}
  }),
  computed: {
    formInvalid() {
      //TODO: if empty attribute disable btn
      //TODO: if duplicate attribute disable btn
      //TODO: notify the user for the reason the form is invalid
      return !this.$store.getters.user?.userSupplierRef
    },
    dialog: {
      get() {
        return this.value
      },
      set() {
        this.$emit('close', false)
      }
    },
    dirtyPayloads() {
      return this.form.map(rate => {
        if (rate.OPERATION === OPERATIONS.DELETE) return rate

        const original = this.rates.find(({id}) => id === rate.id)

        if (!original || this.isChanged(original, rate)) return rate

        return null
      }).filter(Boolean)
    },
  },
  methods: {
    isChanged(original, current) {
      return original.id !== current.id
          || original.units !== current.units
          || original.price !== current.price
    },
    save() {
      if (!this.formInvalid) {
        this.saving = true

        this.$store.dispatch('Rate/write', this.dirtyPayloads).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  },
  created() {
    this.form = deepCopy(this.rates)
  },
  components: {
    'rates-field': require('@/components/Rates/Dialogs/Fields/RatesField').default
  }
}
</script>