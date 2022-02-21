<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      @click:outside='closeDialog'
      max-width="700"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>שינוי הזמנה</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי ההזמנה</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                :items="clients"
                item-text="name"
                item-value="id"
                v-model="orderClientName"
                label="לקוח"
                clearable
                filled
                dense
                hide-details
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderWorkTitle"
                label="שם עבודה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="orderWorkProducts"
                label="מפרט"
                filled
                dense
                hide-details
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="orderDeliveryDate"
                    clearable
                    filled
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
                  width="496"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                :items="suppliers"
                item-text="name"
                item-value="id"
                v-model="orderSupplierName"
                label="ספק"
                clearable
                filled
                dense
                hide-details
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="orderStatusType"
                :items="orderStatusTypeList"
                label="סטטוס הזמנה"
                filled
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select
                v-model="orderDeliveryType"
                :items="orderDeliveryTypeList"
                label="אופן אספקה"
                filled
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                type="number"
                v-model.number="orderSellPrice"
                label="מחיר מכירה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                type="number"
                v-model.number="orderBuyPrice"
                label="מחיר קנייה"
                filled
                dense
                hide-details
              />
            </v-col>
          </v-row>
        <v-card-actions>
          <v-btn
            class="black--text"
            @click="dialogs.delete=true"
          >
            למחוק הזמנה זו?
          </v-btn>
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
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :order = 'order'
    />
  </v-row>
</template>

<script>
import { format, parseISO, parse } from 'date-fns'
import { he } from 'date-fns/locale'
import  firebase from 'firebase/compat/app'
  export default {
    name: 'DialogEdit',
    props: ['order'],
    data: () => ({
      dialogs: {
        delete: false
      },
      // orderNumber: '',
      orderClientName: '',
      orderWorkTitle: '',
      orderWorkProducts: '',
      orderSupplierName: '',
      orderFile: '',
      orderDeliveryType: '',
      orderDeliveryTypeList: [ "משלוח > נאנו","משלוח > גט","משלוח > תפוז","עצמי > הרצליה","עצמי > משרד"],
      orderDeliveryDate: '',
      orderDeliveryAgent: '',
      orderSellPrice: '',
      orderBuyPrice: '',
      orderMargin: '',
      orderStatusType: '',
      orderStatusTypeList: ["בעבודה","מוכן - משרד","מוכן - ספק","במשלוח","סופק"],
      dateDialog: false,
    }),
    computed: {
      computedDate: {
        get() {
          return this.orderDeliveryDate && this.$options.filters.formatDateReverse(this.orderDeliveryDate).toISOString().substr(0, 10)
        },
        set(newValue) {
          const seconds = parseISO(newValue).getTime()/1000
          this.orderDeliveryDate = this.$options.filters.formatDate({seconds})
        }
      },
      clients() {
        return this.$store.state.clients
      },
      suppliers() {
          return this.$store.state.suppliers
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
            deliveryDate: this.$options.filters.formatDateReverse(this.orderDeliveryDate),
            deliveryAgent: this.orderDeliveryAgent,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            deliveryType: this.orderDeliveryType,
            orderUpdated: firebase.firestore.FieldValue.serverTimestamp(),
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
      this.orderWorkTitle = this.order.orderWorkTitle
      this.orderWorkProducts = this.order.orderWork
      this.orderSupplierName = this.order.supplierName
      this.orderStatusType = this.order.statusType
      this.orderDeliveryDate = this.$options.filters.formatDate(this.order.deliveryDate)
      this.orderDeliveryAgent = this.order.deliveryAgent
      this.orderSellPrice = this.order.sellPrice
      this.orderBuyPrice = this.order.buyPrice
      this.orderDeliveryType = this.order.deliveryType
      document.addEventListener("keyup", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    },
    components: {
        'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default
    }
  }
</script>