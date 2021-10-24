<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title class="text-h5 text-center">עריכת הנהלת חשבון</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="accountingClientName"
                disabled
                label="לקוח"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="accountingPaymentDate"
                label="תאריך תשלום"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="accountingPaymentType"
                :items="accountingPaymentTypeList"
                label="סטטוס תשלום"
                outlined
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="$emit('close')"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            outlined
            large
            color="green"
            @click="saveAccounting"
            :disabled="accountingFieldInvalid"
            @keyup.enter="saveAccounting"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
export default {
    props: ['accounting'],
    data() {
      return {
        dialog: false,
        accountingClientName: '',
        accountingPaymentDate: '',
        accountingPaymentType: '',
        accountingPaymentTypeList: ["נשלח לתשלום","תשלום מתעכב","שולם","לא שולם"],
      }
    },
    computed: {
      accountingFieldInvalid() {
        return
        !this.accountingClientName || this.accountingClientName === this.accounting.clientName
        !this.accountingPaymentDate || this.accountingPaymentDate === this.accounting.paymentDate
        !this.accountingPaymentType || this.accountingPaymentType === this.accounting.paymentType
      }
    },
    methods: {
      saveAccounting() {
        if(!this.accountingFieldInvalid){
          let payload = {
            id: this.accounting.id,
            clientName: this.accountingClientName,
            paymentDate: this.accountingPaymentDate,
            paymentType: this.accountingPaymentType,
            accountingUpdated: format(new Date(Date.now()), 'EEE dd/MM/yyyy', {locale: he})
          }
          this.$store.dispatch('updateAccounting', payload)
          this.$emit('close')
          this.$router.push('/accountings')
        }
      }
    },
    mounted() {
      // this.accountingNumber = this.accounting.number
      this.accountingClientName = this.accounting.clientName
      this.accountingPaymentDate = this.accounting.paymentDate
      this.accountingPaymentType = this.accounting.paymentType
    }
  }
</script>