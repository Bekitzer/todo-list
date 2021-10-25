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
            <!-- <v-col cols="12" md="12" sm="12">
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
                    label="בחר תאריך אספקה"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="orderDeliveryDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="orderDeliveryDate"
                  @change="dateDialog = false"
                  :first-day-of-week="0"
                  locale="he-il"
                ></v-date-picker>
              </v-menu>
            </v-col> -->
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
              <v-text-field
                v-model="orderDeliveryAgent"
                label="אחראי"
                outlined
                hide-details
              />
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
      // orderDeliveryDate: '',
      orderDeliveryAgent: '',
      orderSellPrice: '',
      orderBuyPrice: '',
      orderMargin: '',
      orderDeliveryTypeList: ["משלוח","איסוף עצמי"],
      orderStatusType: '',
      orderStatusTypeList: ["בעבודה","נשלח לספק","מחכה לספק","במשלוח","משלוח מתעכב","סופק"],
      dateDialog: false,
    }),
    computed: {
      // computedDate () {
      //   // return this.orderDeliveryDate ? format(parseISO(this.orderDeliveryDate), 'EEE, dd/MM/yy HH:mm', {locale: he}) : ''
      // },
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
          this.$emit('close')
          this.$router.push('/orders')
        }
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
    }
  }
</script>