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
        <v-card-title>יצירת הנהלת חשבון</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model.number="accountingNumber"
                type="number"
                label="מספר חשבון"
                clearable
                hide-selected
                outlined
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-autocomplete
                :items="orders"
                item-text="number"
                item-value="number"
                v-model.number="accountingOrderNumber"
                type="number"
                label="בחר מספר הזמנה"
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
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="accountingUnitPrice"
                type="number"
                label="מחיר יחידה"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model.number="accountingUnitAmount"
                type="number"
                label="כמות"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model.number="accountingUnitSubtotal"
                type="number"
                label="מחיר סופי לפני מע״מ"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
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
          </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            fab
            icon
            outlined
            large
            color="red"
            @click="closeDialog"
            @keyup.esc="closeDialog"
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
      accountingOrderNumber: '',
      accountingPaymentType: 'לתשלום',
      accountingPaymentDate: '',
      accountingSupplierName: '',
      accountingClientName: '',
      dateDialog: false,
      accountingUnitPrice: '',
      accountingUnitAmount: '',
      accountingUnitMargin: '',
      accountingUnitSupplierAmount: '',
      accountingPaymentTax: 1.17,
      accountingUnitSubtotal: '',
      accountingUnitTotal: '',
    }),
    computed: {
      computedDate () {
        return this.accountingPaymentDate ? format(parseISO(this.accountingPaymentDate), 'EEE, dd/MM/yy HH:mm', {locale: he}) : ''
      },
      orders() {
          return this.$store.state.orders
      },
      clients() {
          return this.$store.state.clients
      },
      suppliers() {
          return this.$store.state.suppliers
      },
      accountingFieldInvalid() {
        return (
          !this.accountingNumber ||
          !this.accountingOrderNumber ||
          !this.accountingPaymentDate ||
          !this.accountingClientName ||
          !this.accountingSupplierName ||
          !this.accountingUnitPrice ||
          !this.accountingUnitAmount ||
          !this.accountingUnitSubtotal
        )
      }
    },
    methods:{
      addAccounting() {
        if(!this.accountingFieldInvalid){
          const accountingFields = {
            number: this.accountingNumber,
            orderNumber: this.accountingOrderNumber,
            clientName: this.accountingClientName,
            supplierName: this.accountingSupplierName,
            unitPrice: this.accountingUnitPrice,
            unitAmount: this.accountingUnitAmount,
            unitSupplierAmount: this.accountingUnitSupplierAmount = (this.accountingUnitPrice * this.accountingUnitAmount),
            unitMargin: this.accountingUnitMargin = (this.accountingUnitSubtotal - this.accountingUnitSupplierAmount),
            unitSubtotal: this.accountingUnitSubtotal,
            unitTotal: this.accountingUnitTotal = (this.accountingUnitSubtotal * this.accountingPaymentTax),
            paymentDate: format(new Date(this.accountingPaymentDate), 'EEE, dd/MM/yy HH:mm', {locale: he}),
            paymentType: this.accountingPaymentType
          }

          this.$store.dispatch('addAccounting', accountingFields)
            this.accountingNumber = ''
            this.accountingOrderNumber = ""
            this.accountingClientName = ''
            this.accountingSupplierName = ''
            this.accountingUnitPrice = ''
            this.accountingUnitAmount = ''
            this.accountingUnitMargin = ''
            this.accountingUnitSupplierAmount =
            this.accountingUnitSubtotal = ''
            this.accountingUnitTotal = ''
            this.accountingPaymentDate = ''
            this.accountingPaymentType = ''
        }
        this.closeDialog()
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>