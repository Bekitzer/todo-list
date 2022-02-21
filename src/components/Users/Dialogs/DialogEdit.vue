<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      @click:outside='closeDialog'
      max-width="700"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-row class="pr-10 pl-10">
          <v-col cols="12">
            <h3>יצירת משתמש</h3>
            <h4>פרטי המשתמש</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userFirstName"
              label="שם פרטי"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userLastName"
              label="שם משפחה"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userUsername"
              label="שם משתמש"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userPhone"
              label="טלפון"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userEmail"
              label="מייל"
              filled
              dense
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="userPosition"
              :items="userPositionList"
              label="תפקיד"
              filled
              dense
              hide-details
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-card-actions
              style="padding:0"
            >
              <!-- <v-btn
                icon
                color="red"
                class="black--text"
                @click="dialogs.delete = true"
              >
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn> -->
              <v-spacer></v-spacer>
              <v-btn
                outlined
                large
                color="red"
                @click="closeDialog"
                @keyup:esc="closeDialog"
              >
                ביטול
              </v-btn>
              <v-btn
                outlined
                large
                color="green"
                @click="saveUser"
                :disabled="userFieldInvalid"
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
      @close = 'dialogs.delete = false'
      :user = 'user'
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
    props: ['user'],
    data: () => ({
      dialog: false,
      dialogs: {
        delete: false
      },
      userFirstName: '',
      userLastName: '',
      userUsername: '',
      userPhone: '',
      userEmail: '',
      userPosition: '',
      userPositionList: ['בעלים','הנהלת חשבונות','מזכירות','עובד יצור'],
    }),
    computed: {
      userFieldInvalid() {
        return
        !this.userFirstName || this.userFirstName === this.user.firstname
        !this.userLastName || this.userLastName === this.user.lastname
      },
      users() {
        return this.$store.state.users
      },
    },
    methods: {
      saveUser() {
        if(!this.userFieldInvalid){
          let payload = {
            id: this.user.id,
            firstname: this.userFirstName,
            lastname: this.userLastName,
            phone: this.userPhone,
            email: this.userEmail,
            username: this.userUsername,
            position: this.userPosition,
          }
          this.$store.dispatch('updateUser', payload)
          this.closeDialog()
          this.$router.push('/users')
        }
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      this.userFirstName = this.user.firstname
      this.userLastName = this.user.lastname
      this.userPhone = this.user.phone
      this.userEmail = this.user.email
      this.userUsername = this.user.username
      this.userPosition = this.user.position
      document.addEventListener("keyup", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    },
    components: {
      'dialog-delete': require('@/components/Users/Dialogs/DialogDelete.vue').default
    }
  }
</script>