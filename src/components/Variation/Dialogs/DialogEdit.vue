<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12">
            <h3>עדכון וריאציות</h3>
          </v-col>

          <v-col cols="12">
            <variations-field v-model="form" :attributes="attributes"/>
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
              <v-btn outlined large color="green" @click="saveProduct" :disabled="formInvalid">
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
export default {
  name: 'DialogEdit',
  props: ['variations', 'attributes', 'value'],
  data: () => ({
    dialogs: {
      delete: false
    },
    form: {}
  }),
  computed: {
    formInvalid() {
      //TODO: if empty attribute disable btn
      //TODO: if duplicate attribute disable btn
      return true
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
    saveProduct() {
      if (!this.formInvalid) {
        this.dialog = false
        this.$store.dispatch('Product/upsert', this.form)
        //this.$router.push('/products')
      }
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.variations))
  },
  components: {
    'dialog-delete': require('@/components/Variation/Dialogs/DialogDelete.vue').default,
    'variations-field': require('@/components/Variation/Dialogs/Fields/VariationsField.vue').default,
    'tags-field': require('@/components/Variation/Dialogs/Fields/TagsField.vue').default
  }
}
</script>