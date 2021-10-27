<template>
  <v-form @submit.prevent="registerUser()">
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
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="userData.firstname"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="userData.lastname"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="userData.username"
                label="Username"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="userData.email"
                :rules="[rules.required, rules.email]"
                label="Email"
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
                label="Choose a password"
                @click:append="showPass = !showPass"
                required
              ></v-text-field>
            </v-col>
            <v-btn
              color="primary"
              text
              type="submit"
            >
              Submit
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
  </v-form>
</template>

<script>
import firebase from 'firebase/compat/app'

export default {
  name: 'Register',
  data(){
      return{
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
      }
  },
  methods:{
    registerUser(){
      firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password).then(() => {
        firebase.auth().currentUser.updateProfile({
            displayName: this.userData.username
        }).then(() => {
          db.collection('users').add({
            firstname: this.userData.firstname,
            lastname: this.userData.lastname,
            username: this.userData.username,
            email: this.userData.email,
          }).then(() => {
            this.$router.replace('home');
          }).catch(err => {
            this.errorMessage = err.message;
          })
        }).catch(err => {
            this.errorMessage = err.message;
        })
      }).catch(err => {
        this.errorMessage = err.message
      })
    }
  }
}
</script>