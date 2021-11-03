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
                label="הערות"
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
                v-model="clientPaymentTerms"
                :items="clientPaymentTermsList"
                label="אופן התשלום"
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
      clientLead: '',
      clientLeadList: ["גוגל אורגני", "גוגל ממומן","גוגל ישן","פה לאוזן"],
      clientNewsletter: '',
      clientNewsletterList: ["כן","לא"]
    }),
    computed: {
      clientFieldInvalid() {
        return (
          !this.clientStatus ||
          !this.clientNumber ||
          !this.clientName
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
            website: this.clientWebsite,
            facebook: this.clientFacebook,
            instagram: this.clientInstagram,
            paymentTerms: this.clientPaymentTerms,
            paymentMethod: this.clientPaymentMethod,
            address: this.clientAddress,
            addressAditional: this.clientAddressAdditional,
            whatsapp: this.clientWhatsapp,
            workingHours: this.clientHours,
            deliveryType: this.clientDeliveryType,
            status: this.clientStatus,
            lead: this.clientLead,
            newsletter: this.clientNewsletter
          }

          this.$store.dispatch('addClient', clientFields)
          this.clientNumber = ''
          this.clientName = ''
          this.clientCompanyName = ''
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
          this.clientHours = ''
          this.clientDeliveryType = ''
          this.clientStatus = ''
          this.clientLead = ''
          this.clientNewsletter = ''
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
<style lang="sass">
  .v-application .primary--text
    color: #036e86 !important
    caret-color: #036e86 !important
</style>
