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
                v-model="clientNumber"
                label="#"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientName"
                label="שם לקוח"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientCompanyName"
                label="שם חברה"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientPhone"
                label="טלפון משרד"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientEmail"
                label="מייל משרד"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientIdNumber"
                label="ח.פ."
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientPaymentTerms"
                label="תנאי תשלום"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientPaymentMethod"
                label="אופן תשלום"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientAddress"
                label="כתובת"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientWhatsapp"
                label="וואטסאפ"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientHours"
                label="שעות פעילות"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientDeliveryType"
                label="אופן אספקה"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientStatus"
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
            @click="saveClient"
            :disabled="clientFieldInvalid"
            @keyup.enter="saveClient"
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
import { he } from 'date-fns/locale'
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: ['client'],
    data() {
      return {
        clientNumber: '',
        clientName: '',
        clientCompanyName: '',
        clientPhone: '',
        clientEmail: '',
        clientIdNumber: '',
        clientPaymentTerms: '',
        clientPaymentMethod: '',
        clientAddress: '',
        clientWhatsapp: '',
        clientHours: '',
        clientDeliveryType: '',
        clientStatus: ''
      }
    },
    computed: {
      clientFieldInvalid() {
        return
        !this.clientNumber || this.clientNumber === this.client.number
        !this.clientName || this.clientName === this.client.name
        !this.clientCompanyName || this.clientCompanyName === this.client.companyName
        !this.clientPhone || this.clientPhone === this.client.phone
        !this.clientEmail || this.clientEmail === this.client.email
        !this.clientIdNumber || this.clientIdNumber === this.client.numberId
        !this.clientPaymentTerms || this.clientPaymentTerms === this.client.paymentTerms
        !this.clientPaymentMethod || this.clientPaymentMethod === this.client.paymentMethod
        !this.clientAddress || this.clientAddress === this.client.address
        !this.clientWhatsapp || this.clientWhatsapp === this.client.whatsapp
        !this.clientHours || this.clientHours === this.client.workingHours
        !this.clientDeliveryType || this.clientDeliveryType === this.client.deliveryType
        !this.clientStatus || this.clientStatus === this.client.status
      }
    },
    methods: {
      saveClient() {
        if(!this.clientFieldInvalid){
          let payload = {
            id: this.client.id,
            number: this.clientNumber,
            phone: this.clientPhone,
            email: this.clientEmail,
            name: this.clientName,
            companyName: this.clientCompanyName,
            numberId: this.clientIdNumber,
            paymentTerms: this.clientPaymentTerms,
            paymentMethod: this.clientPaymentMethod,
            address: this.clientAddress,
            whatsapp: this.clientWhatsapp,
            workingHours: this.clientHours,
            deliveryType: this.clientDeliveryType,
            status: this.clientStatus,
            clientUpdated: format(new Date(Date.now()), 'EEE dd/MM/yyyy', {locale: he})
          }
          this.$store.dispatch('updateClient', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      this.clientName = this.client.name
      this.clientNumber = this.client.number
      this.clientCompanyName = this.client.companyName
      this.clientPhone = this.client.phone
      this.clientEmail = this.client.email
      this.clientIdNumber = this.client.numberId
      this.clientPaymentTerms = this.client.paymentTerms
      this.clientPaymentMethod = this.client.paymentMethod
      this.clientAddress = this.client.address
      this.clientWhatsapp = this.client.whatsapp
      this.clientHours = this.client.workingHours
      this.clientDeliveryType = this.client.deliveryType
      this.clientStatus = this.client.status
    }
  }
</script>