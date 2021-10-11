<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title class="text-h5 text-center">עריכת ספק</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierNumber"
                label="#"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierName"
                label="שם ספק"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierCompanyName"
                label="שם חברה"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierPhone"
                label="טלפון משרד"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierEmail"
                label="מייל משרד"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierIdNumber"
                label="ח.פ."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierPaymentTerms"
                label="תנאי תשלום"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierPaymentMethod"
                label="אופן תשלום"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierAddress"
                label="כתובת"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierWhatsapp"
                label="וואטסאפ"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierHours"
                label="שעות פעילות"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierDeliveryType"
                label="אופן אספקה"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierStatus"
                label="סטטוס ספק"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="$emit('close')"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            large
            color="green"
            @click="saveSupplier"
            :disabled="supplierFieldInvalid"
            @keyup.enter="saveSupplier"
          >
            <v-icon>
              mdi-check
            </v-icon>
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
        supplierNumber: '',
        supplierName: '',
        supplierCompanyName:'',
        supplierPhone: '',
        supplierEmail: '',
        supplierIdNumber: '',
        supplierPaymentTerms: '',
        supplierPaymentMethod: '',
        supplierAddress: '',
        supplierWhatsapp: '',
        supplierHours: '',
        supplierDeliveryType: '',
        supplierStatus: '',
      }
    },
    computed: {
      supplierFieldInvalid() {
        return
        !this.supplierNumber || this.supplierNumber === this.supplier.number
        !this.supplierName || this.supplierName === this.supplier.name
        !this.supplierCompanyName || this.supplierCompanyName === this.supplier.companyName
        !this.supplierPhone || this.supplierPhone === this.supplier.phone
        !this.supplierEmail || this.supplierEmail === this.supplier.email
        !this.supplierIdNumber || this.supplierIdNumber === this.supplier.numberId
        !this.supplierPaymentTerms || this.supplierPaymentTerms === this.supplier.paymentTerms
        !this.supplierPaymentMethod || this.supplierPaymentMethod === this.supplier.paymentMethod
        !this.supplierAddress || this.supplierAddress === this.supplier.address
        !this.supplierWhatsapp || this.supplierWhatsapp === this.supplier.whatsapp
        !this.supplierHours || this.supplierHours === this.supplier.workingHours
        !this.supplierDeliveryType || this.supplierDeliveryType === this.supplier.deliveryType
        !this.supplierStatus || this.supplierStatus === this.supplier.status
      }
    },
    methods: {
      saveSupplier() {
        if(!this.supplierFieldInvalid){
          let payload = {
            id: this.supplier.id,
            number: this.supplier.number,
            phone: this.supplierPhone,
            email: this.supplierEmail,
            name: this.supplierName,
            companyName: this.supplierCompanyName,
            numberId: this.supplierIdNumber,
            paymentTerms: this.supplierPaymentTerms,
            paymentMethod: this.supplierPaymentMethod,
            address: this.supplierAddress,
            whatsapp: this.supplierWhatsapp,
            workingHours: this.supplierHours,
            deliveryType: this.supplierDeliveryType,
            status: this.supplierStatus,
            supplierUpdated: format(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss' )
          }
          this.$store.dispatch('updateSupplier', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.supplierName = this.supplier.name
      this.supplierNumber = this.supplier.number
      this.supplierCompanyName = this.supplier.companyName
      this.supplierPhone = this.supplier.phone
      this.supplierEmail = this.supplier.email
      this.supplierIdNumber = this.supplier.numberId
      this.supplierPaymentTerms = this.supplier.paymentTerms
      this.supplierPaymentMethod = this.supplier.paymentMethod
      this.supplierAddress = this.supplier.address
      this.supplierWhatsapp = this.supplier.whatsapp
      this.supplierHours = this.supplier.workingHours
      this.supplierDeliveryType = this.supplier.deliveryType
      this.supplierStatus = this.supplier.status
    }
  }
</script>