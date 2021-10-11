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
        <v-card-title class="text-h5 text-center">יצירת הזמנה</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderNumber"
                label="#"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderName"
                label="שם לקוח"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderCompanyName"
                label="שם חברה"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderPhone"
                label="טלפון משרד"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderEmail"
                label="מייל משרד"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderIdNumber"
                label="ח.פ."
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderPaymentTerms"
                label="תנאי תשלום"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderPaymentMethod"
                label="אופן תשלום"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderAddress"
                label="כתובת"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderWhatsapp"
                label="וואטסאפ"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderHours"
                label="שעות פעילות"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderDeliveryType"
                label="אופן אספקה"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderStatus"
                label="סטטוס ספק"
                outlined
                hide-details
              />
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
            @click="addOrder"
            :disabled="orderFieldInvalid"
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
      orderNumber: '',
      orderName: '',
      orderCompanyName: '',
      orderPhone: '',
      orderEmail: '',
      orderIdNumber: '',
      orderPaymentTerms: '',
      orderPaymentMethod: '',
      orderAddress: '',
      orderWhatsapp: '',
      orderHours: '',
      orderDeliveryType: '',
      orderStatus: '',
    }),
    computed: {
      orderFieldInvalid() {
        return (
          !this.orderNumber ||
          !this.orderName ||
          !this.orderCompanyName ||
          !this.orderPhone ||
          !this.orderEmail ||
          !this.orderIdNumber ||
          !this.orderPaymentTerms ||
          !this.orderPaymentMethod ||
          !this.orderAddress ||
          !this.orderWhatsapp ||
          !this.orderHours ||
          !this.orderDeliveryType ||
          !this.orderStatus
        )
      }
    },
    methods:{
      addOrder() {
        if(!this.orderFieldInvalid){
          const orderFields = {
            number: this.orderNumber,
            name: this.orderName,
            companyName: this.orderCompanyName,
            phone: this.orderPhone,
            email: this.orderEmail,
            numberId: this.orderIdNumber,
            paymentTerms: this.orderPaymentTerms,
            paymentMethod: this.orderPaymentMethod,
            address: this.orderAddress,
            whatsapp: this.orderWhatsapp,
            workingHours: this.orderHours,
            deliveryType: this.orderDeliveryType,
            status: this.orderStatus
          }

          this.$store.dispatch('addOrder', orderFields)
          this.orderNumber = ''
          this.orderName = ''
          this.orderCompanyName = ''
          this.orderPhone = ''
          this.orderEmail = ''
          this.orderIdNumber = ''
          this.orderPaymentTerms = ''
          this.orderPaymentMethod = ''
          this.orderAddress = ''
          this.orderWhatsapp = ''
          this.orderHours = ''
          this.orderDeliveryType = ''
          this.orderStatus = ''
        }
        this.orderCloseDialog()
      },
      orderCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>