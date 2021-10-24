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
        <v-card-title class="text-h5 text-center">יצירת לקוח</v-card-title>
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
              <v-select
                v-model="clientDeliveryType"
                :items="clientDeliveryTypeList"
                label="אופן אספקה"
                outlined
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientStatus"
                :items="clientStatusList"
                label="סטטוס לקוח"
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
            @click="addClient"
            :disabled="clientFieldInvalid"
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
      clientStatus: '',
      clientDeliveryTypeList: ["איסוף עצמי","משלוח"],
      clientStatusList: ["קבוע","מזדמן","שת״פ"],
    }),
    computed: {
      clientFieldInvalid() {
        return (
          !this.clientNumber ||
          !this.clientName ||
          !this.clientCompanyName ||
          !this.clientPhone ||
          !this.clientEmail ||
          !this.clientIdNumber ||
          !this.clientPaymentTerms ||
          !this.clientPaymentMethod ||
          !this.clientAddress ||
          !this.clientWhatsapp ||
          !this.clientHours ||
          !this.clientDeliveryType ||
          !this.clientStatus
        )
      }
    },
    methods:{
      addClient() {
        if(!this.clientFieldInvalid){
          const clientFields = {
            number: this.clientNumber,
            name: this.clientName,
            companyName: this.clientCompanyName,
            phone: this.clientPhone,
            email: this.clientEmail,
            numberId: this.clientIdNumber,
            paymentTerms: this.clientPaymentTerms,
            paymentMethod: this.clientPaymentMethod,
            address: this.clientAddress,
            whatsapp: this.clientWhatsapp,
            workingHours: this.clientHours,
            deliveryType: this.clientDeliveryType,
            status: this.clientStatus
          }

          this.$store.dispatch('addClient', clientFields)
          this.clientNumber = ''
          this.clientName = ''
          this.clientCompanyName = ''
          this.clientPhone = ''
          this.clientEmail = ''
          this.clientIdNumber = ''
          this.clientPaymentTerms = ''
          this.clientPaymentMethod = ''
          this.clientAddress = ''
          this.clientWhatsapp = ''
          this.clientHours = ''
          this.clientDeliveryType = ''
          this.clientStatus = ''
        }
        this.clientCloseDialog()
      },
      clientCloseDialog() {
        this.$emit('close')
      }
    }
    // ,
    // components: {
    //   'location': require('@/components/Tools/Places.vue').default
    // }
  }
</script>
<style lang="sass">
  @-moz-keyframes loader
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
  @-webkit-keyframes loader
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
  @-o-keyframes loader
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
  @keyframes loader
    from
      transform: rotate(0)
    to
      transform: rotate(360deg)
</style>
