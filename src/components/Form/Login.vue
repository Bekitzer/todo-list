<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
      </v-col>
      <v-col cols="12" md="4">
        <h1>Login Component</h1>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
                type="email"
                v-model="userData.email"
                :rules="[rules.required, rules.email]"
                label="מייל"
                required
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
                v-model="userData.password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPass ? 'text' : 'password'"
                label="סיסמא"
                @click:append="showPass = !showPass"
                required
            />
          </v-col>
          <v-btn color="primary" class="teststestse" text @click="loginUser" :disabled="saving" :loading="saving">
            היכנס
          </v-btn>
          {{ error }}

          test
          {{ test }}
        </v-row>
      </v-col>
      <v-col cols="12" md="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    error: '',
    test: '',
    ptest: '',
    saving: false,
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
    user() {
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
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.go({path: this.$router.path})
      }
    },
  },
  methods: {
    async loginUser() {
      if (!this.clientFieldInvalid) {
        const userFields = {
          email: this.userData.email,
          password: this.userData.password
        }

        this.saving = true
        console.log('000000000000000000000')
        return this.$store.dispatch('User/signIn', userFields)
            .then(() => {
              console.log('11111111111111111111')
              this.test = 'ssssssss'
            })
            .finally(() => {
              console.log('22222222222222222222')
              this.saving = false
              this.userData.email = ''
              this.userData.password = ''
            })
            .catch(e => {
              console.log('33333333333333333333')
              this.error = e
            })
      }
    }
  }
}
</script>