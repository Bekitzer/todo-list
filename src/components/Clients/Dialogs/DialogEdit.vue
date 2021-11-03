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
        <v-card-title>עריכת לקוח</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12">
              <h3>פרטי לקוח</h3>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="clientName"
                label="שם לקוח"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="clientCompanyName"
                label="שם חברה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="clientIdNumber"
                label="ח.פ. / ע.מ."
                filled
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row class="pa-4">
            <v-col cols="12">
              <h3>פרטי התקשרות</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientPhone"
                label="טלפון משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientEmail"
                label="מייל משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                v-model="clientAddress"
                label="כתובת"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-textarea
                v-model="clientAddressAdditional"
                label="הוראות נוספות"
                filled
                dense
                hide-details
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientWhatsapp"
                label="וואטסאפ"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientWebsite"
                label="אתר אינטרנט"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientFacebook"
                label="פייסבוק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientInstagram"
                label="אינסטגרם"
                filled
                dense
                hide-details
              />
            </v-col>
          </v-row>
          <v-row class="pa-4">
            <v-col cols="12">
              <h3>תנאי פעילות</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientPaymentTerms"
                :items="clientPaymentTermsList"
                label="אופן התשלום"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientPaymentMethod"
                :items="clientPaymentMethodList"
                label="תנאי תשלום"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientDeliveryType"
                :items="clientDeliveryTypeList"
                label="אופן אספקה"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientHours"
                label="שעות פעילות"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientNumber"
                label="#"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientStatus"
                :items="clientStatusList"
                label="סטטוס לקוח"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientNewsletter"
                :items="clientNewsletterList"
                label="מאשר ניוזלטר?"
                filled
                dense
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
            @keyup.esc="closeDialog"
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
    data: () => ({
      clientNumber: '',
      clientName: '',
      clientCompanyName: '',
      clientPhone: '',
      clientEmail: '',
      clientIdNumber: '',
      clientWebsite: '',
      clientFacebook: '',
      clientInstagram: '',
      clientPaymentTerms: '',
      clientPaymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
      clientPaymentMethod: '',
      clientPaymentMethodList: ["אשראי", "העברה", "צ׳ק"],
      clientAddress: '',
      clientAddressAdditional: '',
      clientWhatsapp: '',
      clientHours: '',
      clientDeliveryType: '',
      clientStatus: '',
      clientDeliveryTypeList: ["איסוף עצמי","משלוח"],
      clientStatusList: ["קבוע","מזדמן","שת״פ"],
      clientNewsletter: '',
      clientNewsletterList: ["כן","לא"]
    }),
    computed: {
      clientFieldInvalid() {
        return
        !this.clientNumber || this.clientNumber === this.client.number
        !this.clientName || this.clientName === this.client.name
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
            website: this.clientWebsite,
            facebook: this.clientFacebook,
            instagram: this.clientInstagram,
            paymentTerms: this.clientPaymentTerms,
            paymentMethod: this.clientPaymentMethod,
            address: this.clientAddress,
            addressAdditional: this.clientAddressAdditional,
            whatsapp: this.clientWhatsapp,
            workingHours: this.clientHours,
            deliveryType: this.clientDeliveryType,
            status: this.clientStatus,
            newsletter: this.clientNewsletter,
            clientUpdated: format(new Date(Date.now()), 'EEEEE dd/MM/yy HH:mm', {locale: he})
          }
          this.$store.dispatch('updateClient', payload)
          this.closeDialog()
          this.$router.push('/clients')
        }
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
      this.clientName = this.client.name
      this.clientNumber = this.client.number
      this.clientCompanyName = this.client.companyName
      this.clientPhone = this.client.phone
      this.clientEmail = this.client.email
      this.clientIdNumber = this.client.numberId
      this.clientPaymentTerms = this.client.paymentTerms
      this.clientPaymentMethod = this.client.paymentMethod
      this.clientAddress = this.client.address
      this.clientAddressAdditional = this.client.addressAdditional
      this.clientWhatsapp = this.client.whatsapp
      this.clientHours = this.client.workingHours
      this.clientDeliveryType = this.client.deliveryType
      this.clientStatus = this.client.status
      this.clientNewsletter = this.client.newsletter
    }
  }
</script>