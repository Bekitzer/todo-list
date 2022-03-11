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
            <v-text-field v-model="form.firstname" label="שם פרטי" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.lastname" label="שם משפחה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.username" label="שם משתמש" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.email" label="מייל" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.phone" label="טלפון" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.position" :items="positionList" label="תפקיד" filled dense hide-details required/>
          </v-col>
          <v-col cols="12">
            <v-card-actions style="padding:0">
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
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
    saving: false,
    form: {},
    positionList: ['בעלים','הנהלת חשבונות','מזכירות','עובד יצור'],
    }),
  computed: {
    formInvalid() {
      return !this.form.firstname
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
    save() {
      if(!this.formInvalid){
        this.saving = true
        const payload = {
          ...this.form
        }
        this.$store.dispatch('User/upsert', payload).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  }
}
</script>