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
        <v-card-title>שינוי הזמנה</v-card-title>
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
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="orderDeliveryDate"
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
                  v-model="computedDate"
                  @change="dateDialog = false"
                  :first-day-of-week="0"
                  locale="he-il"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="orderWorkTitle"
                label="שם עבודה"
                outlined
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="orderWorkProducts"
                label="מוצרים"
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
            <v-col cols="4" md="6" sm="6">
              <v-text-field
                v-model="orderSellPrice"
                label="מחיר מכירה"
                outlined
              />
            </v-col>
            <v-col cols="4" md="6" sm="6">
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
import { format, parseISO, parse } from 'date-fns'
import { he } from 'date-fns/locale'
import { getAuth } from 'firebase/auth'
  export default {
    name: 'DialogEdit',
    props: ['order'],
    data: () => ({
      dialog: false,
      // orderNumber: '',
      orderClientName: '',
      orderWorkTitle: '',
      orderWorkProducts: '',
      orderSupplierName: '',
      orderDeliveryType: '',
      orderDeliveryTypeList: [ "משלוח > נאנו","משלוח > גט","משלוח > תפוז","עצמי > הרצליה","עצמי > משרד"],
      orderDeliveryDate: '',
      orderDeliveryAgent: '',
      orderSellPrice: '',
      orderBuyPrice: '',
      orderMargin: '',
      orderStatusType: '',
      orderStatusTypeList: [ "בעבודה" , "מוכן - משרד" , "מוכן - ספק" , "סופק" ],
      dateDialog: false,
    }),
    created() {
      const user = getAuth().currentUser;
      if (user !== null) {
        this.name = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
        this.emailVerified = user.emailVerified;
        this.uid = user.uid;
      }
    },
    computed: {
      computedDate: {
        get() {
          return this.orderDeliveryDate && parse(this.orderDeliveryDate, 'EEEEE, dd/MM/yy', new Date(), {locale: he}).toISOString().substr(0, 10)
        },
        set(newValue) {
          this.orderDeliveryDate = format(parseISO(newValue), 'EEEEE, dd/MM/yy', {locale: he})
        }
      },
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
        !this.orderClientName || this.orderClientName === this.order.clientName
        !this.orderWorkTitle || this.orderWorkTitle === this.order.orderWorkTitle
        !this.orderWorkProducts || this.orderWorkProducts === this.order.orderWork
        !this.orderSupplierName || this.orderSupplierName === this.order.supplierName
        !this.orderStatusType || this.orderStatusType === this.order.statusType
        !this.orderDeliveryDate || this.orderDeliveryDate === this.order.deliveryDate
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
            orderWorkTitle: this.orderWorkTitle,
            orderWork: this.orderWorkProducts,
            supplierName: this.orderSupplierName,
            statusType: this.orderStatusType,
            deliveryDate: this.orderDeliveryDate,
            deliveryAgent: this.orderDeliveryAgent,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            deliveryType: this.orderDeliveryType,
            orderUpdated: format(new Date(Date.now()), 'EEEEE, dd/MM/yy HH:mm', {locale: he}) + ' > ' + this.name
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
      this.orderClientName = this.order.clientName
      this.orderWorkTitle = this.order.orderWorkTitle,
      this.orderWorkProducts = this.order.orderWork
      this.orderSupplierName = this.order.supplierName
      this.orderStatusType = this.order.statusType
      this.orderDeliveryDate = this.order.deliveryDate
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