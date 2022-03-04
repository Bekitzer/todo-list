<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card
        elevation="8"
        shaped
      >
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h3 style="padding-bottom:0">יצירת ספק</h3>
            <h4>פרטי ספק</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierName"
              label="שם ספק"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierCompanyName"
              label="שם חברה"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierIdNumber"
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
              v-model="supplierAddress"
              label="כתובת"
              dense
              hide-details
            >
            </vuetify-google-autocomplete>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="supplierAddressAdditional"
              label="הערות"
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
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierPhone"
              label="טלפון משרד"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierEmail"
              label="מייל משרד"
              filled
              dense
              hide-details
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierWhatsapp"
              label="וואטסאפ משרד"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierWebsite"
              label="אתר אינטרנט"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierFacebook"
              label="פייסבוק"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="supplierInstagram"
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
              v-model="supplierPaymentTerms"
              :items="supplierPaymentTermsList"
              label="תנאי תשלום"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="supplierPaymentMethod"
              :items="supplierPaymentMethodList"
              label="אמצעי תשלום"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>הגדרות ספק</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="supplierDeliveryType"
              :items="supplierDeliveryTypeList"
              label="אופן אספקה"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model="supplierHours"
              label="שעות פעילות"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="supplierStatus"
              :items="supplierStatusList"
              label="סטטוס ספק"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="supplierNewsletter"
              :items="supplierNewsletterList"
              label="דיוור"
              filled
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="supplierScope"
              :items="supplierScopeList"
              label="תחום"
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
                @click="addSupplier"
                :disabled="supplierFieldInvalid"
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
  props: ['supplier','value'],
  data: () => ({
    address: '',
    supplierName: '',
    supplierCompanyName: '',
    supplierContactName: '',
    supplierPhone: '',
    supplierEmail: '',
    supplierIdNumber: '',
    supplierWebsite: '',
    supplierFacebook: '',
    supplierInstagram: '',
    supplierPaymentTerms: '',
    supplierPaymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
    supplierPaymentMethod: '',
    supplierPaymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
    supplierAddress: '',
    supplierAddressAdditional: '',
    supplierWhatsapp: '',
    supplierHours: '',
    supplierDeliveryType: '',
    supplierDeliveryTypeList: ["איסוף עצמי","מגיע למשרד"],
    supplierStatus: '',
    supplierStatusList: ["פעיל", "לא פעיל", "מזדמן","שת״פ"],
    supplierNewsletter: '',
    supplierNewsletterList: ["כן","לא"],
    supplierScope: '',
    supplierScopeList: ["2","1"],
    }),
  computed: {
    supplierFieldInvalid() {
      return (
        !this.supplierName ||
        !this.supplierStatus
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
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    },
    addSupplier() {
      if(!this.supplierFieldInvalid){
        const supplierFields = {
          name: this.supplierName,
          companyName: this.supplierCompanyName,
          contactName: this.supplierContactName,
          phone: this.supplierPhone,
          email: this.supplierEmail,
          numberId: this.supplierIdNumber,
          website: this.supplierWebsite,
          facebook: this.supplierFacebook,
          instagram: this.supplierInstagram,
          paymentTerms: this.supplierPaymentTerms,
          paymentMethod: this.supplierPaymentMethod,
          address: this.supplierAddress,
          addressAditional: this.supplierAddressAdditional,
          whatsapp: this.supplierWhatsapp,
          workingHours: this.supplierHours,
          deliveryType: this.supplierDeliveryType,
          status: this.supplierStatus,
          newsletter: this.supplierNewsletter,
          scope: this.supplierScope,
        }

        this.$store.dispatch('Supplier/addSupplier', supplierFields)
        this.supplierName = ''
        this.supplierCompanyName = ''
        this.supplierContactName = ''
        this.supplierPhone = ''
        this.supplierEmail = ''
        this.supplierIdNumber = ''
        this.supplierWebsite = ''
        this.supplierFacebook = ''
        this.supplierInstagram = ''
        this.supplierPaymentTerms = ''
        this.supplierPaymentMethod = ''
        this.supplierAddress = ''
        this.supplierAddressAdditional = ''
        this.supplierWhatsapp = ''
        this.supplierHours = ''
        this.supplierDeliveryType = ''
        this.supplierStatus = ''
        this.supplierNewsletter = ''
        this.supplierScope = ''
      }
      this.dialog = false
      setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    }
  }
}
</script>