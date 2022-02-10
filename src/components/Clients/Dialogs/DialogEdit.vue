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
        <v-card-title class="pr-10 pl-10">עריכה</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי לקוח</h3>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientName"
                label="שם לקוח"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientCompanyName"
                label="שם חברה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="clientIdNumber"
                label="ח.פ. / ע.מ."
                filled
                dense
                hide-details
              />
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
            <v-col cols="12" md="12" sm="6">
            <vuetify-google-autocomplete
                ref="address"
                id="map"
                filled
                v-on:placechanged="getAddressData"
                country="il"
                v-model="clientAddress"
                label="כתובת"
                dense
                hide-details
              >
              </vuetify-google-autocomplete>
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
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="clientWhatsapp"
                label="וואטסאפ"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="clientWebsite"
                label="אתר אינטרנט"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="clientFacebook"
                label="פייסבוק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
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
                v-model="clientPaymentType"
                :items="clientPaymentTypeList"
                label="סוג תשלום"
                filled
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6" v-if="clientPaymentType !== 'מיידי'">
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
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                v-model="connectedUsersIds"
                :items="users"
                filled
                chips
                color="blue-grey lighten-2"
                label="משתמש"
                item-text="username"
                item-value="id"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar" lazy-src="https://www.gravatar.com/avatar/00000000000000000000000000000000"></v-img>
                    </v-avatar>
                    {{ data.item.username }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="(typeof data.item !== 'object')">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <v-img
                      :src="data.item.avatar"
                      lazy-src="https://www.gravatar.com/avatar/00000000000000000000000000000000"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.firstname + ' ' + data.item.lastname"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.username"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        <v-card-actions>
          <v-btn
            class="black--text"
            @click="dialogs.delete = true"
          >
            למחוק לקוח זה?
          </v-btn>
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
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :client = 'client'
    />
  </v-row>
</template>

<script>
import firebase from 'firebase/compat/app'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
export default {
  props: ['client'],
  data: () => ({
    address: '',
    dialog: false,
    dialogs: {
      delete: false
    },
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
    clientStatus: '',
    clientDeliveryTypeList: ["איסוף עצמי","משלוח","משתנה"],
    clientStatusList: ["פרטי","עסקי"],
    clientLead: '',
    clientLeadList: ["גוגל אורגני", "גוגל ממומן","גוגל ישן","פה לאוזן","היכרות אישית"],
    clientNewsletter: '',
    clientNewsletterList: ["כן","לא"],
    connectedUsersIds: [],
    removeUsersIds: []
  }),
  computed: {
    clientFieldInvalid() {
      return
      !this.clientName || this.clientName === this.client.name
      !this.clientStatus || this.clientStatus === this.client.status

    },
    users() {
      return this.$store.state.users
    },
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    },
    remove (item) {
      const index = this.connectedUsersIds.indexOf(item.id)
      if (index >= 0) {
        this.removeUsersIds.push(this.connectedUsersIds[index])
        this.connectedUsersIds.splice(index, 1)
      }
    },
    saveClient() {
      if(!this.clientFieldInvalid){
        let payload = {
          id: this.client.id,
          contactName: this.clientContactName,
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
          paymentType: this.clientPaymentType,
          address: this.clientAddress,
          addressAdditional: this.clientAddressAdditional,
          whatsapp: this.clientWhatsapp,
          deliveryType: this.clientDeliveryType,
          status: this.clientStatus,
          lead: this.clientLead,
          newsletter: this.clientNewsletter,
          usersIds: this.connectedUsersIds,
          removeUsersIds: this.removeUsersIds,
          clientUpdated: firebase.firestore.FieldValue.serverTimestamp(),
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
    this.clientName = this.client.name
    this.clientCompanyName = this.client.companyName
    this.clientContactName = this.client.contactName
    this.clientPhone = this.client.phone
    this.clientEmail = this.client.email
    this.clientIdNumber = this.client.numberId
    this.clientWebsite = this.client.website
    this.clientFacebook = this.client.facebook
    this.clientInstagram = this.client.instagram
    this.clientPaymentTerms = this.client.paymentTerms
    this.clientPaymentMethod = this.client.paymentMethod
    this.clientPaymentType = this.client.paymentType
    this.clientAddress = this.client.address
    this.clientAddressAdditional = this.client.addressAdditional
    this.clientWhatsapp = this.client.whatsapp
    this.clientDeliveryType = this.client.deliveryType
    this.clientStatus = this.client.status
    this.clientLead = this.client.lead
    this.clientNewsletter = this.client.newsletter
    this.connectedUsersIds = this.users.filter(user => user.clientRef === this.client.id).map(user => user.id)
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
          this.$emit('close')
      }
    })
  },
  components: {
    'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default
  }
}
</script>