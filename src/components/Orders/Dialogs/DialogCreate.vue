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
        <v-card-title class="text-h5 text-center">יצירת הזמנה</v-card-title>
          <v-row class="pa-4">
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="orderNumber"
                label="#"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
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
            <v-col cols="12" md="12" sm="12">
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
            </v-col>
            <v-col cols="12" md="12" sm="12">
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
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="orderWorkName"
                label="מוצר / שם עבודה"
                outlined
              ></v-textarea>
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
  export default {
    name: 'DialogCreate',
    props: ['order'],
    data: () => ({
      dialog: false,
      orderNumber: '',
      orderClientName: '',
      orderWorkName: '',
      orderSupplierName: '',
      orderDeliveryType: '',
      orderDeliveryDate: '',
      orderDeliveryAgent: '',
      orderStatusType: 'עבודה חדשה',
      dateDialog: false,
      orderDeliveryTypeList: ["משלוח","איסוף עצמי"],
    }),
    computed: {
      computedDate () {
        return this.orderDeliveryDate ? format(parseISO(this.orderDeliveryDate), 'EEE, dd.MM.yy', {locale: he}) : ''
      },
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
        return (
          !this.orderNumber ||
          !this.orderClientName ||
          !this.orderWorkName ||
          !this.orderSupplierName ||
          !this.orderDeliveryDate ||
          !this.orderDeliveryType ||
          !this.orderStatusType ||
          !this.orderDeliveryAgent
        )
      }
    },
    methods:{
      addOrder() {
        if(!this.orderFieldInvalid){
          const orderFields = {
            number: this.orderNumber,
            clientName: this.orderClientName,
            orderWork: this.orderWorkName,
            supplierName: this.orderSupplierName,
            deliveryAgent: this.orderDeliveryAgent,
            statusType: this.orderStatusType,
            deliveryDate: format(new Date(this.orderDeliveryDate), 'EEE, dd.MM.yy', {locale: he}),
            deliveryType: this.orderDeliveryType,
          }

          this.$store.dispatch('addOrder', orderFields)
          this.orderNumber = ''
          this.orderClientName = ''
          this.orderWorkName = ''
          this.orderSupplierName = ''
          this.orderDeliveryAgent = ''
          this.orderStatusType = ''
          this.orderDeliveryDate = ''
          this.orderDeliveryType = ''
        }
        this.orderCloseDialog()
      },
      orderCloseDialog() {
        this.$emit('close')
      }
    }
  }
</script>