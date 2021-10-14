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
        <v-card-title class="text-h5 text-center">יצירת הנהלת חשבון</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete
                :items="orders"
                item-text="number"
                item-value="number"
                v-model="accountingNumber"
                label="בחר הזמנה"
                clearable
                hide-selected
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete
                :items="clients"
                item-text="name"
                item-value="name"
                v-model="accountingClientName"
                label="בחר לקוח"
                clearable
                hide-selected
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete
                :items="suppliers"
                item-text="name"
                item-value="name"
                v-model="accountingSupplierName"
                label="בחר ספק"
                clearable
                hide-selected
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="computedDate"
                    clearable
                    outlined
                    label="בחר תאריך תשלום"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="accountingPaymentDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="accountingPaymentDate"
                  @change="dateDialog = false"
                  :first-day-of-week="0"
                  locale="he-il"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="accountingWorkName"
                label="מוצר / שם עבודה"
                outlined
              ></v-textarea>
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
            @click="addAccounting"
            :disabled="accountingFieldInvalid"
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
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
  export default {
    name: 'DialogCreate',
    data: () => ({
      dialog: false,
      accountingNumber: '',
      accountingClientName: '',
      accountingWorkName: '',
      accountingSupplierName: '',
      accountingPaymentType: 'מחכה לתשלום',
      accountingPaymentDate: '',
      dateDialog: false,
    }),
    computed: {
      computedDate () {
        return this.accountingPaymentDate ? format(parseISO(this.accountingPaymentDate), 'EEE, dd/MM/yyyy', {locale: he}) : ''
      },
      orders: {
        get() {
          return this.$store.getters.ordersFiltered
        },
        set(value) {
          this.$store.dispatch('setOrders', value)
        }
      },
      clients: {
        get() {
          return this.$store.getters.clientsFiltered
        },
        set(value) {
          this.$store.dispatch('setClients', value)
        }
      },
      suppliers: {
        get() {
          return this.$store.getters.suppliersFiltered
        },
        set(value) {
          this.$store.dispatch('setSuppliers', value)
        }
      },
      accountingFieldInvalid() {
        return (
          !this.accountingNumber ||
          !this.accountingClientName ||
          !this.accountingWorkName ||
          !this.accountingSupplierName ||
          !this.accountingPaymentDate
        )
      }
    },
    methods:{
      addAccounting() {
        if(!this.accountingFieldInvalid){
          const accountingFields = {
            number: this.accountingNumber,
            clientName: this.accountingClientName,
            orderWork: this.accountingWorkName,
            supplierName: this.accountingSupplierName,
            statusType: this.accountingStatusType,
            paymentDate: format(new Date(this.accountingPaymentDate), 'EEE dd/MM/yyyy', {locale: he}),
            paymentType: this.accountingPaymentType,
          }

          this.$store.dispatch('addAccounting', accountingFields)
          this.accountingNumber = ''
          this.accountingClientName = ''
          this.accountingWorkName = ''
          this.accountingSupplierName = ''
          this.accountingStatusType = ''
          this.accountingPaymentDate = ''
          this.accountingPaymentType = ''
        }
        this.accountingCloseDialog()
      },
      accountingCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>