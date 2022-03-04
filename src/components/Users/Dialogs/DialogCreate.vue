<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
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
              v-model="userEmail"
              label="מייל"
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
                @click="addUser"
                :disabled="userFieldInvalid"
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
export default {
  name: 'DialogCreate',
  props: ['user', 'value'],
  data: () => ({
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
      return (
        !this.userFirstName ||
        !this.userLastName ||
        !this.userUsername
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
    addUser() {
      if(!this.userFieldInvalid){
        const userFields = {
          firstname: this.userFirstName,
          lastname: this.userLastName,
          phone: this.userPhone,
          email: this.userEmail,
          username: this.userUsername,
          position: this.userPosition,
        }

        this.$store.dispatch('User/addUser', userFields)
        this.userFirstName = ''
        this.userLastName = ''
        this.userPhone = ''
        this.userEmail = ''
        this.userUsername = ''
        this.userPosition = ''
      }
      this.dialog = false
      setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
    }
  }
}
</script>