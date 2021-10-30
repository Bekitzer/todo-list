<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <h1>Register component</h1>
        <v-form>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="userData.firstname"
                label="שם פרטי"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="userData.lastname"
                label="שם משפחה"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="userData.username"
                label="כינוי"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="userData.email"
                :rules="[rules.required, rules.email]"
                label="אימייל"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="userData.password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPass ? 'text' : 'password'"
                label="בחר סיסמא"
                @click:append="showPass = !showPass"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-btn
                color="primary"
                @click="registerUser"
                :disabled="clientFieldInvalid"
              >
                הירשם
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    showPass: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
    userData: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    },
    successMessage: '',
    errorMessage: ''
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    clientFieldInvalid() {
      return (
        !this.userData.firstname ||
        !this.userData.lastname ||
        !this.userData.username ||
        !this.userData.email ||
        !this.userData.password
      )
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.go({path: this.$router.path})
      }
    },
  },
  methods:{
    registerUser(){
      if(!this.clientFieldInvalid){
        const userFields = {
          firstname: this.userData.firstname,
          lastname: this.userData.lastname,
          username: this.userData.username,
          email: this.userData.email,
          password: this.userData.password
        }

        this.$store.dispatch('signUserUp', userFields)
        this.userData.firstname = '',
        this.userData.lastname = '',
        this.userData.username = '',
        this.userData.email = '',
        this.userData.password = ''
      }
    }
  }
}
</script>

