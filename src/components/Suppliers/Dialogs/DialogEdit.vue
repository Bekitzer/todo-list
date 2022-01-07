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
                :items="users"
                item-text="username"
                item-value="uid"
                v-model="supplierConnected"
                label="משתמש"
                clearable
                filled
                dense
                hide-details
              ></v-autocomplete>
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
    <div>
          <div>
            <v-btn @click="click1">choose photo</v-btn>
            <input type="file" ref="input1"
              style="display: none"
              @change="previewImage" accept="image/*" >
          </div>
          <div v-if="imageData!=null">
            <img class="preview" height="268" width="356" :src="supplierLogo">
          <v-text-field
            solo
            v-model="caption"
            label="Caption goes here">
          </v-text-field>
          <v-btn color="pink" @click="create">upload</v-btn>
          </div>
        </div>
  </v-row>
</template>

<script>
import  firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import database from '@/firebase'
export default {
    props: ['supplier'],
    data: () => ({
      dialog: false,
      dialogs: {
        delete: false
      },
      caption : '',
      supplierLogo: '',
      imageData: null,
      supplierName: '',
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
      supplierConnected: '',
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
            user: this.supplierConnected,
            supplierUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          }
          this.$store.dispatch('updateSupplier', payload)
          this.closeDialog()
          this.$router.push('/suppliers')
        }
      },
      closeDialog() {
        this.$emit('close')
      },
      create () {
        const post = {
          photo: this.supplierLogo,
          caption: this.caption
        }
        firebase.database().ref('userLogoImages').push(post)
        .then((response) => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      },
      click1() {
        this.$refs.input1.click()
      },
      previewImage(event) {
        this.uploadValue=0;
        this.supplierLogo=null;
        this.imageData = event.target.files[0];
        this.onUpload()
      },
      onUpload(){
        this.supplierLogo=null;
        const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.supplierLogo =url;
                console.log(this.supplierLogo)
              });
            }
          );
      },
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
      this.supplierConnected = this.supplier.user
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