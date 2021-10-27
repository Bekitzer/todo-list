<template>
  <v-form @submit.prevent="login()">
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
                v-model="email"
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
                v-model="password"
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
      name: 'Login',
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
          email: '',
          password: '',
          successMessage: '',
          errorMessage: ''
        }
      },
      methods: {
        login(){
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
            console.log(user);
            this.$router.push('/orders')
          })
          .catch(err => {
            this.errorMessage = err.message
          });
        }
      }
   }
</script>