<template>
  <v-row justify="center">
    <v-dialog
      ref="dialog"
      :value="true"
      :return-value.sync="supplierDate"
      persistent
      width="290px"
    >
      <v-date-picker
        v-model="supplierDate"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="saveSupplier"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['supplier'],
    data () {
      return {
        supplierDate: null
      }
    },
    methods: {
      saveSupplier() {
          let payload = {
            id: this.supplier.id,
            supplierCreationDate: this.supplierDate
          }
          this.$store.dispatch('updateSupplierCreationDate', payload)
          this.$emit('close')
        }
    },
    mounted() {
      if (this.supplier.supplierCreationDate) {
        this.supplierDate = this.supplier.supplierCreationDate
      }
    }
  }
</script>