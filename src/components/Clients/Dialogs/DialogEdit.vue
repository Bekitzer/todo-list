<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pl-5 pr-5">
          <v-col cols="12" style="padding-bottom:0">
            <h3 style="padding-bottom:0">עריכה לקוח</h3>
            <h4>פרטי לקוח</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.name"
                label="שם לקוח"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.companyName"
                label="שם חברה"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.numberId"
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
                v-on:placechanged="getAddressData"
                country="il"
                v-model="form.address"
                label="כתובת"
                dense
                hide-details
            >
            </vuetify-google-autocomplete>
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea
                v-model="form.addressAdditional"
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
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.phone"
                label="טלפון"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.email"
                label="מייל"
                filled
                dense
                hide-details
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.whatsapp"
                label="וואטסאפ"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.website"
                label="אתר אינטרנט"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.facebook"
                label="פייסבוק"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.instagram"
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
          <v-col cols="12" md="6">
            <v-select
                v-model="form.paymentType"
                :items="paymentTypeList"
                label="סוג תשלום"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" v-if="form.paymentType !== 'מיידי'">
            <v-select
                v-model="form.paymentTerms"
                :items="paymentTermsList"
                label="תנאי תשלום"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.paymentMethod"
                :items="paymentMethodList"
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
          <v-col cols="12" md="6">
            <v-select
                v-model="form.deliveryType"
                :items="deliveryTypeList"
                label="אופן אספקה"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.status"
                :items="statusList"
                label="סוג לקוח"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.lead"
                :items="leadList"
                label="מקור הגעה"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
                v-model="form.newsletter"
                :items="newsletterList"
                label="דיוור"
                filled
                dense
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
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
                    <v-img :src="data.item.avatar"
                           lazy-src="https://www.gravatar.com/avatar/00000000000000000000000000000000"></v-img>
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
          <v-col cols="12">
            <v-card-actions
                style="padding:0"
            >
              <v-btn
                  icon
                  color="red"
                  class="black--text"
                  @click="dialogs.delete = true"
              >
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
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
                  @click="saveClient"
                  :disabled="formInvalid"
              >
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
        :client='client'
    />
  </v-row>
</template>

<script>
export default {
  name: 'DialogEdit',
  props: ['client', 'value'],
  data: () => ({
    address: '',
    dialogs: {
      delete: false
    },
    form: {},
    paymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
    paymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
    paymentTypeList: ["מיידי", "הסדר חברה"],
    deliveryTypeList: ["איסוף עצמי", "משלוח", "משתנה"],
    statusList: ["פרטי", "עסקי"],
    leadList: ["גוגל אורגני", "גוגל ממומן", "גוגל ישן", "פה לאוזן", "היכרות אישית"],
    newsletterList: ["כן", "לא"],
    connectedUsersIds: [],
    removeUsersIds: []
  }),
  computed: {
    formInvalid() {
      return !this.form.name

    },
    users() {
      return this.$store.state.User.list
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
      const index = this.connectedUsersIds.indexOf(item.id)
      if (index >= 0) {
        this.removeUsersIds.push(this.connectedUsersIds[index])
        this.connectedUsersIds.splice(index, 1)
      }
    },
    saveClient() {
      if (!this.formInvalid) {
        let payload = {
          usersIds: this.connectedUsersIds,
          removeUsersIds: this.removeUsersIds
        }
        this.dialog = false
        this.$store.dispatch('Client/upsert', this.form, payload)
        // this.$router.push('/clients')
      }
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.client))
    this.connectedUsersIds = this.users.filter(user => user.userClientRef?.id === this.client.id).map(user => user.id)

  },
  components: {
    'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default
  }
}
</script>