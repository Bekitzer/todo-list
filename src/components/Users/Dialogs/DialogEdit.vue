<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pr-10 pl-10">
          <v-col cols="12">
            <h3>יצירת משתמש</h3>
            <h4>פרטי המשתמש</h4>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.firstname"
                label="שם פרטי"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.lastname"
                label="שם משפחה"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
                v-model="form.username"
                label="שם משתמש"
                filled
                dense
                hide-details
            />
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
            <v-select
                v-model="form.position"
                :items="positionList"
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
        v-model="dialogs.delete"
        @close="dialogs.delete = false"
        :user='user'
    />
  </v-row>
</template>

<script>
export default {
  props: ['user', 'value'],
  data: () => ({
    dialogs: {
      delete: false
    },
    form: {},
    positionList: ['בעלים', 'הנהלת חשבונות', 'מזכירות', 'עובד יצור'],
  }),
  computed: {
    userFieldInvalid() {
      return
      !this.userFirstName || this.userFirstName === this.user.firstname
      !this.userLastName || this.userLastName === this.user.lastname
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
    saveUser() {
      if (!this.userFieldInvalid) {
        this.dialog = false
        this.$store.dispatch('User/upsert', this.form)
        this.$router.push('/users')
      }
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.user))
  },
  components: {
    'dialog-delete': require('@/components/Users/Dialogs/DialogDelete.vue').default
  }
}
</script>