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
          <v-row class="pr-10 pl-10">
            <v-col cols="12">
              <h3>פרטי ההזמנה</h3>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                :items="clients"
                item-text="name"
                item-value="name"
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
              <v-autocomplete
                :items="suppliers"
                item-text="name"
                item-value="name"
                v-model="orderSupplierName"
                label="ספק"
                clearable
                filled
                dense
                hide-details
              ></v-autocomplete>
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
                ></v-date-picker>
              </v-menu>
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
                v-model="orderSellPrice"
                label="מחיר מכירה"
                filled
                dense
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderBuyPrice"
                label="מחיר קנייה"
                filled
                dense
                hide-details
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
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { he } from 'date-fns/locale'
import { getAuth } from 'firebase/auth'
  export default {
    name: 'DialogCreate',
    props: ['order'],
    data: () => ({
      dialog: false,
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
      orderStatusType: 'טיוטה',
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
      computedDate () {
        return this.orderDeliveryDate ? format(parseISO(this.orderDeliveryDate), 'EEEEE, dd/MM/yy', {locale: he}) : ''
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
        return (
          !this.orderClientName ||
          !this.orderWorkTitle ||
          !this.orderWorkProducts ||
          !this.orderSupplierName ||
          !this.orderDeliveryDate ||
          !this.orderDeliveryType ||
          !this.orderStatusType ||
          !this.orderSellPrice ||
          !this.orderBuyPrice
        )
      }
    },
    methods:{
      addOrder() {
        if(!this.orderFieldInvalid){
          const orderFields = {
            clientName: this.orderClientName,
            orderWorkTitle: this.orderWorkTitle,
            orderWork: this.orderWorkProducts,
            supplierName: this.orderSupplierName,
            deliveryAgent: this.name,
            sellPrice: this.orderSellPrice,
            buyPrice: this.orderBuyPrice,
            margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
            statusType: this.orderStatusType,
            deliveryDate: format(new Date(this.orderDeliveryDate), 'EEEEE, dd/MM/yy', {locale: he}),
            deliveryType: this.orderDeliveryType,
          }

          this.$store.dispatch('addOrder', orderFields)
          this.orderClientName = ''
          this.orderWorkTitle = ''
          this.orderWorkProducts = ''
          this.orderSupplierName = ''
          this.orderDeliveryAgent = ''
          this.orderSellPrice = ''
          this.orderBuyPrice = ''
          this.orderMargin = ''
          this.orderStatusType = ''
          this.orderDeliveryDate = ''
          this.orderDeliveryType = ''
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