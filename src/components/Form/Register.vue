<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit }">
          <v-card class="elevation-12">
            <v-toolbar dark color="normal">
              <v-toolbar-title>טופס הרשמה</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                        v-model="userData.firstname"
                        :counter="20"
                        label="שם פרטי"
                        hint="השם הפרטי שלך"
                        rules="required|max:20"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                        v-model="userData.lastname"
                        :counter="20"
                        label="שם משפחה"
                        hint="שם המשפחה שלך"
                        rules="required|max:20"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                        v-model="userData.username"
                        :counter="20"
                        label="שם העסק"
                        hint="שם העסק שלך"
                        rules="required|max:20"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                        v-model="userData.email"
                        label="מייל"
                        hint="הדואר האלקטרוני שלך"
                        rules="required|email"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextFieldWithValidation
                        v-model="userData.phone"
                        :counter="10"
                        label="טלפון"
                        hint="מספר הטלפון שלך"
                        rules="required|max:10"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VSelectWithValidation
                        v-model="userData.position"
                        :items="userData.positionList"
                        label="תפקיד"
                        rules="required"
                    />
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                        rules="required"
                        v-slot="{ errors, invalid, validated }"
                    >
                      <v-text-field
                          v-model="userData.password"
                          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPass ? 'text' : 'password'"
                          label="בחר סיסמא"
                          @click:append="showPass = !showPass"
                          hint="הכנס סיסמא חזקה"
                          :error="invalid && validated"
                          :error-message="errors[0]"
                          autocomplete="on"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions>
                      <v-btn
                          color="primary"
                          @click="handleSubmit(registerUser)"
                          :disabled="invalid || !validated"
                      >
                        הירשם
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="clear">נקה</v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </ValidationObserver>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: 'Register',
  data: () => ({
    showPass: false,
    userData: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phone: '',
      position: '',
      positionList: ['בעלים', 'הנהלת חשבונות', 'מזכירות', 'עובד יצור'],
      password: ''
    },
  }),
  methods: {
    async clear() {
      this.userData.firstname = ''
      this.userData.lastname = ''
      this.userData.username = ''
      this.userData.email = ''
      this.userData.phone = ''
      this.userData.position = ''
      this.userData.password = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset();
      });
    },
    registerUser() {
      const userFields = {
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        username: this.userData.username,
        email: this.userData.email,
        phone: this.userData.phone,
        position: this.userData.position,
        password: this.userData.password
      }

      this.$store.dispatch('User/signUp', userFields)
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.go({path: this.$router.path})
      }
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    'VTextFieldWithValidation': require('@/components/Form/Inputs/VTextFieldWithValidation.vue').default,
    'VSelectWithValidation': require('@/components/Form/Inputs/VSelectWithValidation.vue').default,
  },
}
</script>

