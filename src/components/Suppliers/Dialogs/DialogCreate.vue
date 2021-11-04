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
          <v-card-title>יצירת ספק</v-card-title>
            <v-row class="pa-4">
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
                <v-select
                  v-model="supplierDeliveryType"
                  :items="supplierDeliveryTypeList"
                  label="אופן אספקה"
                  outlined
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-select
                  v-model="supplierStatus"
                  :items="supplierStatusList"
                  label="סטטוס ספק"
                  outlined
                  hide-details
                ></v-select>
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
              @click="closeDialog"
              @keyup:esc="closeDialog"
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
              @click="addSupplier"
              :disabled="supplierFieldInvalid"
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
    name: 'DialogCreate',
    data: () => ({
      dialog: false,
      supplierName: '',
      supplierCompanyName: '',
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
      supplierStatusList: ["פעיל", "לא פעיל", "מזדמן","שת״פ"],
      supplierDeliveryTypeList: ["איסוף עצמי","מגיע למשרד"],
     }),
    computed: {
      supplierFieldInvalid() {
        return (
          !this.supplierName ||
          !this.supplierCompanyName ||
          !this.supplierPhone ||
          !this.supplierEmail ||
          !this.supplierIdNumber ||
          !this.supplierPaymentTerms ||
          !this.supplierPaymentMethod ||
          !this.supplierAddress ||
          !this.supplierWhatsapp ||
          !this.supplierHours ||
          !this.supplierDeliveryType ||
          !this.supplierStatus
        )
      }
    },
    methods: {
      addSupplier() {
        if(!this.supplierFieldInvalid){
          const supplierFields = {
            name: this.supplierName,
            companyName: this.supplierCompanyName,
            phone: this.supplierPhone,
            email: this.supplierEmail,
            numberId: this.supplierIdNumber,
            paymentTerms: this.supplierPaymentTerms,
            paymentMethod: this.supplierPaymentMethod,
            address: this.supplierAddress,
            whatsapp: this.supplierWhatsapp,
            workingHours: this.supplierHours,
            deliveryType: this.supplierDeliveryType,
            status: this.supplierStatus,
          }

          this.$store.dispatch('addSupplier', supplierFields)
          this.supplierName = ''
          this.supplierCompanyName= ''
          this.supplierPhone = ''
          this.supplierEmail = ''
          this.supplierIdNumber = ''
          this.supplierPaymentTerms = ''
          this.supplierPaymentMethod = ''
          this.supplierAddress = ''
          this.supplierWhatsapp = ''
          this.supplierHours = ''
          this.supplierDeliveryType= ''
          this.supplierStatus= ''
        }
        this.closeDialog()
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>