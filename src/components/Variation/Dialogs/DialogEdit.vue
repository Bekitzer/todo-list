<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12">
            <h3>עדכון וריאציות</h3>
          </v-col>

          <v-col cols="12">
            <variations-field v-model="form" :attributes="attributes" :product="product"/>
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
                שמור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <dialog-delete
        v-if="dialogs.delete"
        v-model="dialogs.delete"
        @close="dialogs.delete = false"
        :variations='variations'
    />
  </v-row>
</template>

<script>
import {docRef, OPERATIONS} from '@/stores/utils';
import deepEqual from 'deep-equal';

export default {
  name: 'DialogEdit',
  props: ['variations', 'attributes', 'value', 'product'],
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
    }
  },
  methods: {
    isChanged(original, current) {
      // console.log(original.variationProductRef?.id, current.variationProductRef?.id)
      // console.log(original.variationSupplierRef?.id, current.variationSupplierRef?.id)
      return original.id !== current.id
          || original.attribute !== current.attribute
          || original.input !== current.input
          || original.number !== current.number
          || original.variationProductRef?.id !== current.variationProductRef?.id
          || original.variationSupplierRef?.id !== current.variationSupplierRef?.id
    },
    save() {
      if (!this.formInvalid) {
        this.saving = true

        const payloads = this.form.map(variation => {
          if (variation.OPERATION !== OPERATIONS.DELETE) {

            const original = this.variations.find(({id}) => id === variation.id)

            if (original && !this.isChanged(original, variation)) {
              return null
            }

            variation.OPERATION = OPERATIONS.SET
          }

          return variation
        }).filter(Boolean)

        this.$store.dispatch('Variation/write', payloads).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  },
  mounted() {
    this.form = this.variations.map(variation => {
      return {
        ...variation,
        variationProductRef: docRef(`products/${variation.variationProductRef?.id}`),
        variationSupplierRef: docRef(`suppliers/${variation.variationSupplierRef?.id}`),
      }
    });
  },
  components: {
    'dialog-delete': require('@/components/Variation/Dialogs/DialogDelete.vue').default,
    'variations-field': require('@/components/Variation/Dialogs/Fields/VariationsField.vue').default,
    'tags-field': require('@/components/Variation/Dialogs/Fields/TagsField.vue').default
  }
}
</script>