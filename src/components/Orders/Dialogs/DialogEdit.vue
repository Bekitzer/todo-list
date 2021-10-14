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
        <v-card-title class="text-h5 text-center">עריכת הזמנה</v-card-title>
          <v-row class="pa-4">
            <!-- <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderNumber"
                label="#"
                outlined
                hide-details
              />
            </v-col> -->
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderClientName"
                disabled
                label="לקוח"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-textarea
                v-model="orderWorkName"
                label="מוצר / שם עבודה"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderSupplierName"
                disabled
                label="ספק"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="orderDeliveryDate"
                label="תאריך אספקה"
                outlined
                hide-details
              />
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
            @keyup.enter="saveOrder"
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
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
  export default {
    data () {
      return {

      }
    },
    props: ['order'],
    data() {
      return {
        dialog: false,
        // orderNumber: '',
        orderSupplierName: '',
        orderWorkName: '',
        orderClientName: '',
        orderDeliveryDate: '',
        orderDeliveryType: '',
        orderDeliveryTypeList: ["משלוח","איסוף עצמי"],
      }
    },
    computed: {
      orderFieldInvalid() {
        return
        // !this.orderNumber || this.orderNumber === this.order.number
        !this.orderSupplierName || this.orderSupplierName === this.order.supplierName
        !this.orderWorkName || this.orderWorkName === this.order.orderWork
        !this.orderClientName || this.orderClientName === this.order.clientName
        !this.orderDeliveryDate || this.orderDeliveryDate === this.order.deliveryDate
        !this.orderDeliveryType || this.orderDeliveryType === this.order.deliveryType
      }
    },
    methods: {
      saveOrder() {
        if(!this.orderFieldInvalid){
          let payload = {
            id: this.order.id,
            // number: this.orderNumber,
            clientName: this.orderClientName,
            orderWork: this.orderWorkName,
            supplierName: this.orderSupplierName,
            deliveryDate: this.orderDeliveryDate,
            deliveryType: this.orderDeliveryType,
            orderUpdated: format(new Date(Date.now()), 'EEE dd/MM/yyyy', {locale: he})
          }
          this.$store.dispatch('updateOrder', payload)
          this.$emit('close')
        }
      }
    },
    mounted() {
      // this.orderNumber = this.order.number
      this.orderClientName = this.order.clientName
      this.orderWorkName = this.order.orderWork
      this.orderSupplierName = this.order.supplierName
      this.orderDeliveryDate = this.order.deliveryDate
      this.orderDeliveryType = this.order.deliveryType
    }
  }
</script>