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
        <v-card-title>עריכה</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי ספק</h3>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="supplierName"
                label="שם ספק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="supplierCompanyName"
                label="שם חברה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="supplierIdNumber"
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
            <v-col cols="12" md="4" sm="12">
              <v-text-field
                v-model="supplierContactName"
                label="איש קשר ראשי"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="supplierPhone"
                label="טלפון משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="supplierEmail"
                label="מייל משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <vuetify-google-autocomplete
                ref="address"
                id="map"
                filled
                v-on:placechanged="getAddressData"
                country="il"
                v-model="supplierAddress"
                label="כתובת"
                dense
                hide-details
              >
              </vuetify-google-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-textarea
                v-model="supplierAddressAdditional"
                label="הנחיות שילוח"
                filled
                dense
                hide-details
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="supplierWhatsapp"
                label="וואטסאפ"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="supplierWebsite"
                label="אתר אינטרנט"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="supplierFacebook"
                label="פייסבוק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="3" sm="6">
              <v-text-field
                v-model="supplierInstagram"
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
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>הגדרות ספק</h3>
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
            למחוק ספק זה?
          </v-btn>
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
            @click="saveSupplier"
            :disabled="supplierFieldInvalid"
            @keyup.enter="saveSupplier"
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
      :supplier = 'supplier'
    />
  </v-row>
</template>

<script>
import  firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import database from '@/firebase'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
  export default {
    props: ['supplier'],
    data: () => ({
      address: '',
      autoUpdate: true,
      isUpdating: false,
      dialog: false,
      dialogs: {
        delete: false
      },
      supplierName: '',
      supplierAvatar: '',
      supplierCompanyName:'',
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
      connectedUsersIds: [],
      removeUsersIds: []
    }),
    computed: {
      supplierFieldInvalid() {
        return
        !this.supplierName || this.supplierName === this.supplier.name
        !this.supplierStatus || this.supplierStatus === this.supplier.status
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
      saveSupplier() {
        if(!this.supplierFieldInvalid){
          let payload = {
            id: this.supplier.id,
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
            usersIds: this.connectedUsersIds,
            removeUsersIds: this.removeUsersIds,
            supplierUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          }
          this.$store.dispatch('updateSupplier', payload)
          this.closeDialog()
          this.$router.push('/suppliers')
        }
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      this.supplierName = this.supplier.name
      this.supplierCompanyName = this.supplier.companyName
      this.supplierContactName = this.supplier.contactName
      this.supplierPhone = this.supplier.phone
      this.supplierEmail = this.supplier.email
      this.supplierIdNumber = this.supplier.numberId
      this.supplierWebsite = this.supplier.website,
      this.supplierFacebook = this.supplier.facebook,
      this.supplierInstagram = this.supplier.instagram,
      this.supplierPaymentTerms = this.supplier.paymentTerms
      this.supplierPaymentMethod = this.supplier.paymentMethod
      this.supplierAddress = this.supplier.address
      this.supplierAddressAdditional = this.supplier.addressAditional,
      this.supplierWhatsapp = this.supplier.whatsapp
      this.supplierHours = this.supplier.workingHours
      this.supplierDeliveryType = this.supplier.deliveryType
      this.supplierStatus = this.supplier.status
      this.supplierNewsletter = this.supplier.newsletter
      this.connectedUsersIds = this.users.filter(user => user.supplierRef === this.supplier.id).map(user => user.id)

      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    },
    components: {
      'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default
    }
  }
</script>