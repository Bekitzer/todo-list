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
        <v-card-title>יצירת ספק</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי ספק</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierName"
                label="שם ספק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierCompanyName"
                label="שם חברה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierIdNumber"
                label="ח.פ. / ע.מ."
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierAddress"
                label="כתובת"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-textarea
                v-model="supplierAddressAdditional"
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
                v-model="supplierPhone"
                label="טלפון משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierEmail"
                label="מייל משרד"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierWhatsapp"
                label="וואטסאפ"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierWebsite"
                label="אתר אינטרנט"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="supplierFacebook"
                label="פייסבוק"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
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
                label="אופן התשלום"
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
  </v-row>
</template>

<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
export default {
    props: ['supplier'],
    data() {
      return {
        dialog: false,
        supplierName: '',
        supplierCompanyName:'',
        supplierPhone: '',
        supplierEmail: '',
        supplierIdNumber: '',
        supplierWebsite: '',
        supplierFacebook: '',
        supplierInstagram: '',
        supplierPaymentTerms: '',
        supplierPaymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
        supplierPaymentMethod: '',
        supplierPaymentMethodList: ["אשראי", "העברה", "צ׳ק"],
        supplierAddress: '',
        supplierAddressAdditional: '',
        supplierWhatsapp: '',
        supplierHours: '',
        supplierDeliveryType: '',
        supplierDeliveryTypeList: ["איסוף עצמי","מגיע למשרד"],
        supplierStatus: '',
        supplierStatusList: ["פעיל", "לא פעיל", "מזדמן","שת״פ"]
      }
    },
    computed: {
      supplierFieldInvalid() {
        return
        !this.supplierName || this.supplierName === this.supplier.name
        !this.supplierStatus || this.supplierStatus === this.supplier.status
      }
    },
    methods: {
      saveSupplier() {
        if(!this.supplierFieldInvalid){
          let payload = {
            id: this.supplier.id,
            name: this.supplierName,
            companyName: this.supplierCompanyName,
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
            supplierUpdated: format(new Date(Date.now()), 'EEEEE dd/MM/yy HH:mm', {locale: he})
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
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>