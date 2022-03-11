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
            <v-text-field v-model="form.name" label="שם לקוח" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.companyName" label="שם חברה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.numberId" label="ח.פ. / ע.מ." filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <vuetify-google-autocomplete
              ref="address"
              id="map"
              filled
              v-if="getAddressData"
              v-on:placechanged="getAddressData"
              country="il"
              v-model="form.address"
              label="כתובת"
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea v-model="form.addressAdditional" label="הוראות הגעה" filled rows="1" dense hide-details/>
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.phone" label="טלפון משרד" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.email" label="מייל משרד" filled dense hide-details/>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="form.whatsapp" label="וואטסאפ משרד" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.website" label="אתר אינטרנט" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.facebook" label="פייסבוק" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.instagram" label="אינסטגרם" filled dense hide-details/>
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="form.paymentType"
              :items="paymentTypeList"
              label="סוג תשלום"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6" v-if="form.paymentType !== 'מיידי'">
            <v-select
              v-model="form.paymentTerms"
              :items="paymentTermsList"
              label="תנאי תשלום"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
              v-model="form.paymentMethod"
              :items="paymentMethodList"
              label="אמצעי תשלום"
              filled
              dense
              hide-details
            />
          </v-col>
        </v-row>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h4>הגדרות לקוח</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.deliveryType" :items="deliveryTypeList" label="אופן אספקה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.status" :items="statusList" label="סוג לקוח" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.lead" :items="leadList" label="מקור הגעה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.newsletter" :items="newsletterList" label="דיוור" filled dense hide-details/>
          </v-col>
          <v-col cols="12">
            <v-card-actions style="padding:0">
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
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
export default {
  name: 'DialogCreate',
  props: ['client', 'value'],
  data: () => ({
    saving: false,
    address: '',
    form: {},
    paymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
    paymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
    paymentTypeList: ["מיידי","הסדר חברה"],
    deliveryTypeList: ["איסוף עצמי","משלוח","משתנה"],
    statusList: ["פרטי","עסקי"],
    leadList: ["גוגל אורגני", "גוגל ממומן","גוגל ישן","פה לאוזן","היכרות אישית"],
    newsletterList: ["כן","לא"]
  }),
  computed: {
    formInvalid() {
      return !this.form.name
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
    save() {
      if(!this.formInvalid){
        this.saving = true
        console.log(this.form)

        this.$store.dispatch('Client/upsert', this.form).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  }
}
</script>