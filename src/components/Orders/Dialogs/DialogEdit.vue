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
        <v-card-title class="text-h5 text-center">עריכת לקוח</v-card-title>
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
            @click="saveOrder"
            :disabled="orderFieldInvalid"
            @keyup.enter="saveOrder"
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
    props: ['order'],
    data() {
      return {
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
        orderStatus: ''
      }
    },
    computed: {
      orderFieldInvalid() {
        return
        !this.orderNumber || this.orderNumber === this.order.number
        !this.orderName || this.orderName === this.order.name
        !this.orderCompanyName || this.orderCompanyName === this.order.companyName
        !this.orderPhone || this.orderPhone === this.order.phone
        !this.orderEmail || this.orderEmail === this.order.email
        !this.orderIdNumber || this.orderIdNumber === this.order.numberId
        !this.orderPaymentTerms || this.orderPaymentTerms === this.order.paymentTerms
        !this.orderPaymentMethod || this.orderPaymentMethod === this.order.paymentMethod
        !this.orderAddress || this.orderAddress === this.order.address
        !this.orderWhatsapp || this.orderWhatsapp === this.order.whatsapp
        !this.orderHours || this.orderHours === this.order.workingHours
        !this.orderDeliveryType || this.orderDeliveryType === this.order.deliveryType
        !this.orderStatus || this.orderStatus === this.order.status
      }
    },
    methods: {
      saveOrder() {
        if(!this.orderFieldInvalid){
          let payload = {
            id: this.order.id,
            number: this.orderNumber,
            phone: this.orderPhone,
            email: this.orderEmail,
            name: this.orderName,
            companyName: this.orderCompanyName,
            numberId: this.orderIdNumber,
            paymentTerms: this.orderPaymentTerms,
            paymentMethod: this.orderPaymentMethod,
            address: this.orderAddress,
            whatsapp: this.orderWhatsapp,
            workingHours: this.orderHours,
            deliveryType: this.orderDeliveryType,
            status: this.orderStatus,
            orderUpdated: format(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss' )
          }
          this.$store.dispatch('updateOrder', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.orderName = this.order.name
      this.orderNumber = this.order.number
      this.orderCompanyName = this.order.companyName
      this.orderPhone = this.order.phone
      this.orderEmail = this.order.email
      this.orderIdNumber = this.order.numberId
      this.orderPaymentTerms = this.order.paymentTerms
      this.orderPaymentMethod = this.order.paymentMethod
      this.orderAddress = this.order.address
      this.orderWhatsapp = this.order.whatsapp
      this.orderHours = this.order.workingHours
      this.orderDeliveryType = this.order.deliveryType
      this.orderStatus = this.order.status
    }
  }
</script>