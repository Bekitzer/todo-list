<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
          <v-col cols="12">
            <h3>שינוי הזמנה</h3>
            <h4>פרטי ההזמנה</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="clients"
                item-text="name"
                item-value="id"
                v-model="orderClientId"
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
                    dense
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
                v-model="orderSupplierId"
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
                  @click="saveOrder"
                  :disabled="orderFieldInvalid"
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
        :order='order'
    />
  </v-row>
</template>

<script>
import {parseISO} from 'date-fns'
import {doc} from 'firebase/firestore';
import {db} from '@/firebase';

export default {
  name: 'DialogEdit',
  props: ['order', 'value'],
  data: () => ({
    dialogs: {
      delete: false
    },
    orderClientId: '',
    orderWorkTitle: '',
    orderWorkProducts: '',
    orderSupplierId: '',
    orderFile: '',
    orderDeliveryType: '',
    orderDeliveryTypeList: ["משלוח > נאנו", "משלוח > גט", "משלוח > תפוז", "עצמי > הרצליה", "עצמי > משרד"],
    orderDeliveryDate: '',
    orderDeliveryAgent: '',
    orderSellPrice: '',
    orderBuyPrice: '',
    orderMargin: '',
    orderStatusType: '',
    orderStatusTypeList: ["בעבודה", "מוכן - משרד", "מוכן - ספק", "במשלוח", "סופק"],
    dateDialog: false,
  }),
  computed: {
    computedDate: {
      get() {
        return this.orderDeliveryDate && this.$options.filters.formatDateReverse(this.orderDeliveryDate).toISOString().substr(0, 10)
      },
      set(newValue) {
        const seconds = parseISO(newValue).getTime() / 1000
        this.orderDeliveryDate = this.$options.filters.formatDate({seconds})
      }
    },
    clients() {
      return this.$store.state.Client.list
    },
    suppliers() {
      return this.$store.state.Supplier.list
    },
    orderFieldInvalid() {
      return (!this.orderClientId || this.orderClientId === this.order.orderClientRef.id)
          && (!this.orderWorkTitle || this.orderWorkTitle === this.order.orderWorkTitle)
          && (!this.orderWorkProducts || this.orderWorkProducts === this.order.orderWork)
          && (!this.orderSupplierId || this.orderSupplierId === this.order.orderSupplierRef.id)
          && (!this.orderStatusType || this.orderStatusType === this.order.statusType)
          && (!this.orderDeliveryDate || this.orderDeliveryDate === this.order.deliveryDate)
          && (!this.orderDeliveryAgent || this.orderDeliveryAgent === this.order.deliveryAgent)
          && (!this.orderSellPrice || this.orderSellPrice === this.order.sellPrice)
          && (!this.orderBuyPrice || this.orderBuyPrice === this.order.buyPrice)
          && (!this.orderDeliveryType || this.orderDeliveryType === this.order.deliveryType)
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
    saveOrder() {
      if (!this.orderFieldInvalid) {
        let payload = {
          id: this.order.id,
          orderClientRef: doc(db, `clients/${this.orderClientId}`),
          orderWorkTitle: this.orderWorkTitle,
          orderWork: this.orderWorkProducts,
          orderSupplierRef: doc(db, `suppliers/${this.orderSupplierId}`),
          statusType: this.orderStatusType,
          deliveryDate: this.$options.filters.formatDateReverse(this.orderDeliveryDate),
          deliveryAgent: this.orderDeliveryAgent,
          sellPrice: this.orderSellPrice,
          buyPrice: this.orderBuyPrice,
          margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
          deliveryType: this.orderDeliveryType
        }
        this.dialog = false
        this.$store.dispatch('Order/upsert', payload)
        this.$router.push('/orders')
      }
    }
  },
  mounted() {
    this.orderClientId = this.order.orderClientRef.id
    this.orderWorkTitle = this.order.orderWorkTitle
    this.orderWorkProducts = this.order.orderWork
    this.orderSupplierId = this.order.orderSupplierRef.id
    this.orderStatusType = this.order.statusType
    this.orderDeliveryDate = this.$options.filters.formatDate(this.order.deliveryDate)
    this.orderDeliveryAgent = this.order.deliveryAgent
    this.orderSellPrice = this.order.sellPrice
    this.orderBuyPrice = this.order.buyPrice
    this.orderDeliveryType = this.order.deliveryType
  },
  components: {
    'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default
  }
}
</script>