<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
          <v-col cols="12">
            <h3>יצירת הזמנה</h3>
            <h4>פרטי ההזמנה</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="clients"
                item-text="name"
                return-object
                v-model="orderClient"
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
                    label="תאריך אספקה"
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
                return-object
                v-model="orderSupplier"
                label="ספק"
                clearable
                filled
                dense
                hide-details
            ></v-autocomplete>
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
                  outlined
                  large
                  color="black"
                  @click="addDraft"
              >
                צור כטיוטה
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
                  @click="addOrder"
                  :disabled="orderFieldInvalid"
              >
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
import {parseISO} from 'date-fns'
import {getAuth} from 'firebase/auth'
import emailjs from '@emailjs/browser';
import {docRef} from '@/stores/utils';

export default {
  name: 'DialogCreate',
  props: ['client', 'supplier', 'value'],
  data: () => ({
    orderClient: {},
    orderWorkTitle: '',
    orderWorkProducts: '',
    orderSupplier: {},
    orderDeliveryType: '',
    orderDeliveryTypeList: ["משלוח > נאנו", "משלוח > גט", "משלוח > תפוז", "עצמי > הרצליה", "עצמי > משרד"],
    orderDeliveryDate: '',
    orderDeliveryAgent: '',
    orderSellPrice: '',
    orderBuyPrice: '',
    orderMargin: '',
    orderStatusType: '',
    dateDialog: false,
  }),
  created() {
    const user = getAuth().currentUser;
    if (user !== null) {
      this.name = user.displayName
    }
  },
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
      return (
          !this.orderClient.id ||
          !this.orderWorkTitle ||
          !this.orderWorkProducts ||
          !this.orderSupplier.id ||
          !this.orderDeliveryDate ||
          !this.orderDeliveryType ||
          !this.orderSellPrice ||
          !this.orderBuyPrice
      )
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
    addOrder() {
      if (!this.orderFieldInvalid) {
        const orderFields = {
          orderClientRef: docRef(`clients/${this.orderClient.id}`),
          orderWorkTitle: this.orderWorkTitle,
          orderWork: this.orderWorkProducts,
          orderSupplierRef: docRef(`suppliers/${this.orderSupplier.id}`),
          deliveryAgent: this.name,
          sellPrice: this.orderSellPrice,
          buyPrice: this.orderBuyPrice,
          margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
          statusType: this.orderStatusType = 'בעבודה',
          deliveryDate: this.$options.filters.formatDateReverse(this.orderDeliveryDate),
          deliveryType: this.orderDeliveryType,
        }

        this.$store.dispatch('Order/upsert', orderFields)
        const mailFields = {
          clientName: this.orderClient.name,
          clientEmail: this.orderClient.email,
          orderWorkTitle: this.orderWorkTitle,
          orderWork: this.orderWorkProducts,
          supplierName: this.orderSupplier.name,
          supplierEmail: this.orderSupplier.email,
          statusType: this.orderStatusType = 'בעבודה',
          deliveryDate: parseISO(this.orderDeliveryDate),
          deliveryType: this.orderDeliveryType,
        }
        this.orderClient = {}
        this.orderWorkTitle = ''
        this.orderWorkProducts = ''
        this.orderSupplier = {}
        this.orderDeliveryAgent = ''
        this.orderSellPrice = ''
        this.orderBuyPrice = ''
        this.orderMargin = ''
        this.orderStatusType = ''
        this.orderDeliveryDate = ''
        this.orderDeliveryType = ''

        emailjs.send('just_print_mailerjet', 'in_work_template', mailFields, 'user_gq2TvX9pNJXFE2gjlLtY5')
            .then((result) => {
              console.log('SUCCESS!', result.text)
            }, (error) => {
              console.log('FAILED...', error.text)
            })
      }
      this.dialog = false
    },
    addDraft() {
      const orderFields = {
        orderClientRef: docRef(`clients/${this.orderClient.id}`),
        orderWorkTitle: this.orderWorkTitle,
        orderWork: this.orderWorkProducts,
        orderSupplierRef: docRef(`suppliers/${this.orderSupplier.id}`),
        deliveryAgent: this.name,
        sellPrice: this.orderSellPrice,
        buyPrice: this.orderBuyPrice,
        margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
        statusType: this.orderStatusType = 'טיוטה',
        deliveryDate: this.$options.filters.formatDateReverse(this.orderDeliveryDate),
        deliveryType: this.orderDeliveryType,
      }

      this.$store.dispatch('Order/upsert', orderFields)
      this.orderClient = {}
      this.orderWorkTitle = ''
      this.orderWorkProducts = ''
      this.orderSupplier = {}
      this.orderDeliveryAgent = ''
      this.orderSellPrice = ''
      this.orderBuyPrice = ''
      this.orderMargin = ''
      this.orderStatusType = ''
      this.orderDeliveryDate = ''
      this.orderDeliveryType = ''
      this.dialog = false
      setTimeout(() => this.$router.go({path: this.$router.path}), 3000)
    }
  },
  mounted() {
    if (this.client) {
      this.orderClient = this.client
    }
    if (this.supplier) {
      this.orderSupplier = this.supplier
    }
  }
}
</script>