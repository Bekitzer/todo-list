<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      persistent
      max-width="700"
    >
      <v-card
        elevation="8"
        shaped
      >
        <v-card-title>יצירת הזמנה</v-card-title>
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי ההזמנה</h3>
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
                    :value="computedDate"
                    clearable
                    filled
                    dense
                    hide-details
                    label="תאריך אספקה"
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
              <v-card-actions style="padding:0 !important">
                <v-btn
                  large
                  color="#ff9800"
                  @click="addDraft"
                >
                  שמור כטיוטה
                </v-btn>
              <v-spacer></v-spacer>
                <v-btn
                  fab
                  icon
                  outlined
                  large
                  color="red"
                  @click="closeDialog"
                  @keyup:esc="closeDialog"
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
                  @click="addOrder"
                  :disabled="orderFieldInvalid"
                >
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import emailjs from '@emailjs/browser';
  export default {
    name: 'DialogCreate',
    props: ['order'],
    data: () => ({
      dialog: false,
      orderClient: {},
      orderWorkTitle: '',
      orderWorkProducts: '',
      orderSupplier: {},
      orderDeliveryType: '',
      orderDeliveryTypeList: [ "משלוח > נאנו","משלוח > גט","משלוח > תפוז","עצמי > הרצליה","עצמי > משרד"],
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
      computedDate () {
        return this.orderDeliveryDate && parseISO(this.orderDeliveryDate).toISOString().substr(0, 10)
      },
      clients() {
          return this.$store.state.clients
      },
      suppliers() {
        return this.$store.state.suppliers
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
      }
    },
    methods:{
      addOrder() {
        if(!this.orderFieldInvalid){
          const orderFields = {
            clientName: this.orderClient.id,
            orderWorkTitle: this.orderWorkTitle,
            orderWork: this.orderWorkProducts,
            supplierName: this.orderSupplier.id,
            deliveryAgent: this.name,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            statusType: this.orderStatusType = 'בעבודה',
            deliveryDate: parseISO(this.orderDeliveryDate),
            deliveryType: this.orderDeliveryType,
          }

          this.$store.dispatch('addOrder', orderFields)
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
            },(error) => {
              console.log('FAILED...', error.text)
            })
        }
        this.closeDialog()
        setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
      },
      addDraft() {
          const orderFields = {
            clientName: this.orderClient.id,
            orderWorkTitle: this.orderWorkTitle,
            orderWork: this.orderWorkProducts,
            supplierName: this.orderSupplier.id,
            deliveryAgent: this.name,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            statusType: this.orderStatusType = 'טיוטה',
            deliveryDate: parseISO(this.orderDeliveryDate),
            deliveryType: this.orderDeliveryType,
          }

          this.$store.dispatch('addOrder', orderFields)
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
          this.closeDialog()
          setTimeout( () => this.$router.go({path: this.$router.path}), 3000)
      },
      closeDialog() {
        this.$emit('close')
      }
    },
    mounted() {
      if(this.order) {
        this.orderClient = this.clients.find(client => client.id === this.order.clientName)
        this.orderWorkTitle = this.order.orderWorkTitle
        this.orderWorkProducts = this.order.orderWork
        this.orderSupplier = this.suppliers.find(supplier => supplier.id === this.order.supplierName)
        this.orderDeliveryAgent = this.order.deliveryAgent
        this.orderSellPrice = this.order.sellPrice
        this.orderBuyPrice = this.order.buyPrice
      }
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
            this.$emit('close')
        }
      })
    }
  }
</script>