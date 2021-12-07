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
        <h1>Login Component</h1>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="userData.email"
              :rules="[rules.required, rules.email]"
              label="מייל"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="userData.password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPass ? 'text' : 'password'"
              label="סיסמא"
              @click:append="showPass = !showPass"
              required
            ></v-text-field>
          </v-col>
          <v-btn
            color="primary"
            text
            @click="loginUser"
          >
            היכנס
          </v-btn>
        </v-row>
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
import firebase from 'firebase/compat/app'
   export default {
      name: 'Login',
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
      methods: {
        loginUser(){
          if(!this.clientFieldInvalid){
            const userFields = {
              email: this.userData.email,
              password: this.userData.password
            }

            this.$store.dispatch('signUserIn', userFields)
            this.userData.email = '',
            this.userData.password = ''
          }
        }
      }
   }
</script>