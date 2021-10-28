<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      max-width="600"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>יצירת הזמנה</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                :items="clients"
                item-text="name"
                item-value="name"
                v-model="orderClientName"
                label="בחר לקוח"
                clearable
                hide-selected
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                :items="suppliers"
                item-text="name"
                item-value="name"
                v-model="orderSupplierName"
                label="בחר ספק"
                clearable
                hide-selected
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="orderWorkName"
                label="מוצר / שם עבודה"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" sm="12">
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="orderStatusType"
                :items="orderStatusTypeList"
                label="סטטוס הזמנה"
                outlined
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="orderDeliveryType"
                :items="orderDeliveryTypeList"
                label="אופן אספקה"
                outlined
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="orderDeliveryAgent"
                :items="orderDeliveryAgentList"
                label="אחראי"
                outlined
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="4" md="4" sm="4">
              <v-text-field
                v-model="orderSellPrice"
                label="מחיר מכירה"
                outlined
              />
            </v-col>
            <v-col cols="4" md="4" sm="4">
              <v-text-field
                v-model="orderBuyPrice"
                label="מחיר קנייה"
                outlined
              />
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
            @keyup:esc="closeDialog"
            @click="closeDialog"
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
            @click="saveOrder"
            :disabled="orderFieldInvalid"
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
    name: 'DialogEdit',
    props: ['order'],
    data: () => ({
      dialog: false,
      // orderNumber: '',
      orderClientName: '',
      orderWorkName: '',
      orderSupplierName: '',
      orderDeliveryType: '',
      orderDeliveryTypeList: ["משלוח נאנו","משלוח גט","משלוח תפוז","איסוף משרד","איסוף הרצליה"],
      // orderDeliveryDate: '',
      orderDeliveryAgent: '',
      orderSellPrice: '',
      orderBuyPrice: '',
      orderMargin: '',
      orderDeliveryAgentList: ["יניב","רדיק"],
      orderStatusType: '',
      orderStatusTypeList: [ "בעבודה" , "מוכן - משרד" , "מוכן - ספק" , "סופק" ],
      dateDialog: false,
    }),
    computed: {
      clients: {
        get() {
          return this.$store.getters.clientsFiltered
        }
      },
      suppliers: {
        get() {
          return this.$store.getters.suppliersFiltered
        }
      },
      orderFieldInvalid() {
        return
        // !this.orderNumber || this.orderNumber === this.order.number
        !this.orderClientName || this.orderClientName === this.order.clientName
        !this.orderWorkName || this.orderWorkName === this.order.orderWork
        !this.orderSupplierName || this.orderSupplierName === this.order.supplierName
        !this.orderStatusType || this.orderStatusType === this.order.statusType
        // !this.orderDeliveryDate || this.orderDeliveryDate === this.order.deliveryDate
        !this.orderDeliveryAgent || this.orderDeliveryAgent === this.order.deliveryAgent
        !this.orderSellPrice || this.orderSellPrice === this.order.sellPrice
        !this.orderBuyPrice || this.orderBuyPrice === this.order.buyPrice
        !this.orderDeliveryType || this.orderDeliveryType === this.order.deliveryType
      }
    },
    methods: {
      saveOrder() {
        if(!this.orderFieldInvalid){
          let payload = {
            id: this.order.id,
            clientName: this.orderClientName,
            orderWork: this.orderWorkName,
            supplierName: this.orderSupplierName,
            statusType: this.orderStatusType,
            // deliveryDate: this.orderDeliveryDate,
            deliveryAgent: this.orderDeliveryAgent,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            deliveryType: this.orderDeliveryType,
            orderUpdated: format(new Date(Date.now()), 'EEE, dd/MM/yy HH:mm', {locale: he})
          }
          this.$store.dispatch('updateOrder', payload)
          this.closeDialog()
          this.$router.push('/orders')
        }
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      // this.orderNumber = this.order.number
      this.orderClientName = this.order.clientName
      this.orderWorkName = this.order.orderWork
      this.orderSupplierName = this.order.supplierName
      this.orderStatusType = this.order.statusType
      // this.orderDeliveryDate = this.order.deliveryDate
      this.orderDeliveryAgent = this.order.deliveryAgent
      this.orderSellPrice = this.order.sellPrice
      this.orderBuyPrice = this.order.buyPrice
      this.orderDeliveryType = this.order.deliveryType
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>