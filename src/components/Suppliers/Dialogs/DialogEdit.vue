<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h3 style="padding-bottom:0">עריכה ספק</h3>
            <h4>פרטי ספק</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.name" label="שם ספק" filled dense hide-details/>
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
                v-on:placechanged="getAddressData"
                country="il"
                v-model="form.address"
                label="כתובת"
                dense
                hide-details
            >
            </vuetify-google-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.addressAdditional" label="הוראות הגעה" filled dense hide-details rows="1"/>
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
          <v-col cols="12" md="6">
            <v-select
                v-model="form.paymentTerms"
                :items="paymentTermsList"
                label="תנאי תשלום"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
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
            <h4>הגדרות ספק</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.deliveryType"
                :items="deliveryTypeList"
                label="אופן אספקה"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.hours" label="שעות פעילות" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.status" :items="statusList" label="סטטוס ספק" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.newsletter" :items="newsletterList" label="דיוור" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
                item-text="username"
                return-object
                v-model="formUsers"
                :items="users"
                filled
                chips
                color="blue-grey lighten-2"
                label="משתמש"
                multiple
            >
              <template v-slot:selection="data">
                <v-chip close @click:close="remove(data.item)">
                  <v-avatar left>
                    <v-img :src="data.item.avatar" lazy-src="/images/gravatar.jpg"></v-img>
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
                    <v-img :src="data.item.avatar" lazy-src="/images/gravatar.jpg"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.firstname + ' ' + data.item.lastname"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.username"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.scope" :items="scopeList" label="תחום" filled dense hide-details/>
          </v-col>
          <v-col cols="12">
            <v-card-actions style="padding:0">
              <v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn :disabled="saving || formInvalid" :loading="saving" @click="save" color="green" large outlined>
                שמור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <dialog-delete
        v-if="dialogs.delete"
        v-model="dialogs.delete"
        @close="dialogs.delete = false"
        :supplier='supplier'
    />
  </v-row>
</template>

<script>
import {docRef} from '@/stores/utils';

export default {
  name: 'DialogEdit',
  props: ['supplier', 'value'],
  data: () => ({
    saving: false,
    address: '',
    dialogs: {
      delete: false
    },
    form: {},
    paymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
    paymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
    deliveryTypeList: ["איסוף עצמי", "מגיע למשרד"],
    statusList: ["פעיל", "לא פעיל", "מזדמן", "שת״פ"],
    newsletterList: ["כן", "לא"],
    scopeList: ["2", "1"],
    formUsers: []
  }),
  computed: {
    formInvalid() {
      return !this.form.name
    },
    users() {
      return this.$store.state.User.list
    },
    supplierUsers() {
      return this.users.filter(user => user.userSupplierRef?.id === this.supplier.id)
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
    remove(item) {
      this.formUsers = this.formUsers.filter(({id}) => id !== item.id)
    },
    save() {
      if (!this.formInvalid) {
        this.saving = true

        const connectSupplierUsers = this.formUsers
            .map(user => ({...user, userSupplierRef: docRef(`suppliers/${this.supplier.id}`), COLLECTION: 'users'}))

        const disconnectSupplierUsers = this.supplierUsers.filter(user => !this.formUsers.find(({id}) => id === user.id))
            .map(user => ({...user, userSupplierRef: null, COLLECTION: 'users'}))

        const payloads = [
          {...this.form, COLLECTION: 'suppliers'},
          ...connectSupplierUsers,
          ...disconnectSupplierUsers
        ]

        this.$store.dispatch('Supplier/upsert', payloads).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.supplier))
    this.formUsers = JSON.parse(JSON.stringify(this.supplierUsers))
  },
  components: {
    'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default
  }
}
</script>