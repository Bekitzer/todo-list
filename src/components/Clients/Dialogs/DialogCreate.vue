<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h3 style="padding-bottom:0">יצירת לקוח</h3>
            <h4>פרטי לקוח</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientName"
              label="שם לקוח"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientCompanyName"
              label="שם חברה"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientIdNumber"
              label="ח.פ. / ע.מ."
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <vuetify-google-autocomplete
              ref="address"
              id="map"
              filled
              v-if="getAddressData"
              v-on:placechanged="getAddressData"
              country="il"
              v-model="clientAddress"
              label="כתובת"
              dense
              hide-details
            >
            </vuetify-google-autocomplete>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="clientAddressAdditional"
              label="הוראות הגעה"
              filled
              rows="1"
              dense
              hide-details
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <!-- <v-col cols="12" md="4" sm="6">
            <v-text-field
              v-model="clientContactName"
              label="איש קשר ראשי"
              filled
              dense
              hide-details
            />
          </v-col> -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientPhone"
              label="טלפון משרד"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientEmail"
              label="מייל משרד"
              filled
              dense
              hide-details
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientWhatsapp"
              label="וואטסאפ משרד"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientWebsite"
              label="אתר אינטרנט"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientFacebook"
              label="פייסבוק"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="clientInstagram"
              label="אינסטגרם"
              filled
              dense
              hide-details
            />
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="clientPaymentType"
              :items="clientPaymentTypeList"
              label="סוג תשלום"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col
            cols="12" md="6" sm="6"
            v-if="clientPaymentType !== 'מיידי'"
          >
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
              label="אמצעי תשלום"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>הגדרות לקוח</h4>
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
              label="סוג לקוח"
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
          <v-col cols="12">
            <v-card-actions
              style="padding:0"
            >
              <v-spacer></v-spacer>
              <v-btn
                outlined
                large
                color="red"
                @click="dialog = false"
              >
                ביטול
              </v-btn>
              <v-btn
                outlined
                large
                color="green"
                @click="addClient"
                :disabled="clientFieldInvalid"
              >
                צור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
export default {
  name: 'DialogCreate',
  props: ['client', 'value'],
  data: () => ({
    address: '',
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
    clientPaymentType: '',
    clientPaymentTypeList: ["מיידי","הסדר חברה"],
    clientAddress: '',
    clientAddressAdditional: '',
    clientWhatsapp: '',
    clientDeliveryType: '',
    clientDeliveryTypeList: ["איסוף עצמי","משלוח","משתנה"],
    clientStatus: '',
    clientStatusList: ["פרטי","עסקי"],
    clientLead: '',
    clientLeadList: ["גוגל אורגני", "גוגל ממומן","גוגל ישן","פה לאוזן","היכרות אישית"],
    clientNewsletter: '',
    clientNewsletterList: ["כן","לא"]
  }),
  computed: {
    clientFieldInvalid() {
      return (
        !this.clientName
      )
    },
    dialog: {
      get() {
        return this.value
      },
      set() {
        this.$emit('close', false)
      }
    },
  },
  methods:{
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    },
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
          paymentType: this.clientPaymentType,
          address: this.clientAddress,
          addressAditional: this.clientAddressAdditional,
          whatsapp: this.clientWhatsapp,
          deliveryType: this.clientDeliveryType,
          status: this.clientStatus,
          lead: this.clientLead,
          newsletter: this.clientNewsletter
        }

        this.$store.dispatch('Client/create', clientFields)
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
        this.clientPaymentType = ''
        this.clientStatus = ''
        this.clientLead = ''
        this.clientNewsletter = ''
      }
      this.dialog = false
      setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    }
  }
}
</script>