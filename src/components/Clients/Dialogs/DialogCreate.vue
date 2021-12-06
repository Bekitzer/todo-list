<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="900"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title text-center>יצירת לקוח</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי לקוח</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientName"
                label="שם לקוח"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientCompanyName"
                label="שם חברה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="clientIdNumber"
                label="ח.פ. / ע.מ."
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
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
                label="הנחיות שילוח"
                filled
                dense
                hide-details
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי התקשרות</h3>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientContactName"
                label="איש קשר ראשי"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientPhone"
                label="טלפון"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientEmail"
                label="מייל"
                filled
                dense
                hide-details
              />
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
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>הגדרות תשלום</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientPaymentTerms"
                :items="clientPaymentTermsList"
                label="תנאי תשלום"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientPaymentMethod"
                :items="clientPaymentMethodList"
                label="אמצעי התשלום"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>הגדרות לקוח</h3>
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
                v-model="clientLead"
                :items="clientLeadList"
                label="מקור הגעה"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="clientNewsletter"
                :items="clientNewsletterList"
                label="דיוור"
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
      clientName: '',
      clientCompanyName: '',
      clientContactName: '',
      clientPhone: '',
      clientEmail: '',
      clientIdNumber: '',
      clientWebsite: '',
      clientFacebook: '',
      clientInstagram: '',
      clientPaymentTerms: '',
      clientPaymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
      clientPaymentMethod: '',
      clientPaymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
      clientAddress: '',
      clientAddressAdditional: '',
      clientWhatsapp: '',
      clientDeliveryType: '',
      clientDeliveryTypeList: ["איסוף עצמי","משלוח","משתנה"],
      clientStatus: '',
      clientStatusList: ["פרטי","עסקי"],
      clientLead: '',
      clientLeadList: ["גוגל אורגני", "גוגל ממומן","גוגל ישן","פה לאוזן"],
      clientNewsletter: '',
      clientNewsletterList: ["כן","לא"]
    }),
    computed: {
      clientFieldInvalid() {
        return (
          !this.clientStatus ||
          !this.clientName
        )
      }
    },
    methods:{
      addClient() {
        if(!this.clientFieldInvalid){
          const clientFields = {
            name: this.clientName,
            companyName: this.clientCompanyName,
            contactName: this.clientContactName,
            phone: this.clientPhone,
            email: this.clientEmail,
            numberId: this.clientIdNumber,
            website: this.clientWebsite,
            facebook: this.clientFacebook,
            instagram: this.clientInstagram,
            paymentTerms: this.clientPaymentTerms,
            paymentMethod: this.clientPaymentMethod,
            address: this.clientAddress,
            addressAditional: this.clientAddressAdditional,
            whatsapp: this.clientWhatsapp,
            deliveryType: this.clientDeliveryType,
            status: this.clientStatus,
            lead: this.clientLead,
            newsletter: this.clientNewsletter
          }

          this.$store.dispatch('addClient', clientFields)
          this.clientName = ''
          this.clientCompanyName = ''
          this.clientContactName = ''
          this.clientPhone = ''
          this.clientEmail = ''
          this.clientIdNumber = ''
          this.clientWebsite = ''
          this.clientFacebook = ''
          this.clientInstagram = ''
          this.clientPaymentTerms = ''
          this.clientPaymentMethod = ''
          this.clientAddress = ''
          this.clientAddressAdditional = ''
          this.clientWhatsapp = ''
          this.clientDeliveryType = ''
          this.clientStatus = ''
          this.clientLead = ''
          this.clientNewsletter = ''
        }
        this.closeDialog()
        setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
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
<style lang="sass">
  .v-application .primary--text
    color: #036e86 !important
    caret-color: #036e86 !important
</style>
