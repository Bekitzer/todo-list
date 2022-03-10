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
                v-model="form.orderWorkTitle"
                label="שם עבודה"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea
                v-model="form.orderWork"
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
                v-model="form.statusType"
                :items="statusTypeList"
                label="סטטוס הזמנה"
                filled
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select
                v-model="form.deliveryType"
                :items="deliveryTypeList"
                label="אופן אספקה"
                filled
                hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
                type="number"
                v-model.number="form.sellPrice"
                label="מחיר מכירה"
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
                type="number"
                v-model.number="form.buyPrice"
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
                  :disabled="formInvalid"
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
import {docRef} from '@/stores/utils';

export default {
  name: 'DialogEdit',
  props: ['order', 'value'],
  data: () => ({
    dialogs: {
      delete: false
    },
    orderFile: '',
    form: {},
    orderClientId: '',
    orderSupplierId: '',
    orderDeliveryDate: '',
    deliveryTypeList: ["משלוח > נאנו", "משלוח > גט", "משלוח > תפוז", "עצמי > הרצליה", "עצמי > משרד"],
    orderMargin: '',
    statusTypeList: ["בעבודה", "מוכן - משרד", "מוכן - ספק", "במשלוח", "סופק"],
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
    formInvalid() {
      return !this.form.orderWorkTitle
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
          orderClientRef: docRef(`clients/${this.orderClientId}`),
          orderSupplierRef: docRef(`suppliers/${this.orderSupplierId}`),
          deliveryDate: this.$options.filters.formatDateReverse(this.orderDeliveryDate),
          margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
        }
        this.dialog = false
        this.$store.dispatch('Order/upsert', this.form, payload)
        this.$router.push('/orders')
      }
    }
  },
  mounted() {
    this.orderClientId = this.order.orderClientRef.id
    this.orderSupplierId = this.order.orderSupplierRef.id
    this.form = JSON.parse(JSON.stringify(this.order))
    this.orderDeliveryDate = this.$options.filters.formatDate(this.order.deliveryDate)
  },
  components: {
    'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default
  }
}
</script>