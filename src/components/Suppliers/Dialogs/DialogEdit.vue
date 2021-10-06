<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">Edit Supplier</v-card-title>
        <v-card-text>
          Edit the title of this supplier
          <v-text-field
            v-model="supplierName"
          />
          <v-text-field
            v-model="supplierPhone"
          />
          <v-text-field
            v-model="supplierEmail"
          />
          <v-text-field
            v-model="supplierNumber"
          />
          <v-text-field
            v-model="supplierType"
          />
          <v-text-field
            v-model="supplierAddress"
          />
          <v-text-field
            v-model="supplierContactPerson"
          />
          <v-text-field
            v-model="supplierContactPersonPhone"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="saveSupplier"
            :disabled="supplierFieldInvalid"
            @keyup.enter="saveSupplier"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns'
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: ['supplier'],
    data() {
      return {
        supplierName: '',
        supplierPhone: '',
        supplierEmail: '',
        supplierNumber: '',
        supplierType: '',
        supplierAddress: '',
        supplierContactPerson: '',
        supplierContactPersonPhone: ''
      }
    },
    computed: {
      supplierFieldInvalid() {
        return
        !this.supplierName || this.supplierName === this.supplier.name
        !this.supplierPhone || this.supplierPhone === this.supplier.phone
        !this.supplierEmail || this.supplierEmail === this.supplier.email
        !this.supplierNumber || this.supplierNumber === this.supplier.number
        !this.supplierType || this.supplierType === this.supplier.type
        !this.supplierAddress || this.supplierAddress === this.supplier.address
        !this.supplierContactPerson || this.supplierContactPerson === this.supplier.contactPerson
        !this.supplierContactPersonPhone || this.supplierContactPersonPhone === this.supplier.contactPersonPhone
      }
    },
    methods: {
      saveSupplier() {
        if(!this.supplierFieldInvalid){
          let payload = {
            id: this.supplier.id,
            phone: this.supplierPhone,
            email: this.supplierEmail,
            name: this.supplierName,
            number: this.supplierNumber,
            type: this.supplierType,
            address: this.supplierAddress,
            contactPerson: this.supplierContactPerson,
            contactPersonPhone: this.supplierContactPersonPhone,
            supplierUpdated: format(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss' )
          }
          this.$store.dispatch('updateSupplier', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.supplierName = this.supplier.name
      this.supplierPhone = this.supplier.phone
      this.supplierEmail = this.supplier.email
      this.supplierNumber = this.supplier.number
      this.supplierType = this.supplier.type
      this.supplierAddress = this.supplier.address
      this.supplierContactPerson = this.supplier.contactPerson
      this.supplierContactPersonPhone = this.supplier.contactPersonPhone
    }
  }
</script>