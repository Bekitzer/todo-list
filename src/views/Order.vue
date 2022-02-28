<template>
  <div>
    <nav-appbar :pname="'הזמנות - ' + this.order.number">
      <template v-slot:add-btn>
        <v-tooltip
          left
          content-class="normal tooltip-left"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              elevation="0"
              filled
              v-bind="attrs"
              v-on="on"
              class="spc-create"
              @click="dialogs.edit = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>עריכת הזמנה</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <v-row no-gutters>
      <v-col cols="12" md="3" sm="3">
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12" md="6" sm="6">
            <div>
              <small class="margin-bottom:0 !important;">שם לקוח</small>
              <h2 v-if="clientsMap">
                {{ clientsMap[order.clientName] }}
              </h2>
              <h2 v-else>
                empty
              </h2>
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <div>
              <small class="margin-bottom:0 !important;">שם ספק</small>
              <h2 v-if="suppliersMap">
                {{ suppliersMap[order.orderSupplierRef.id] }}
              </h2>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>פרטי הזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">מ.הזמנה</p> {{ order.number }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מכירה</p> {{ order.sellPrice }}
            </div>
            <div class="user-information">
              <p class="spc-titles">קנייה</p> {{ order.buyPrice }}
            </div>
            <div class="user-information">
              <p class="spc-titles">רווח</p> {{ order.margin }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">סוג משלוח</p> {{ order.deliveryType }}
            </div>
            <div class="user-information">
              <p class="spc-titles">אחראי</p> {{ order.deliveryAgent }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>ההזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-info">
              <p class="spc-titles">אודות ההזמנה</p> {{ order.orderWork }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">תאריך אספקה</p> {{ order.deliveryDate | formatDate }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>הגדרות הזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">ת.רישום</p> {{ order.orderCreationDate | formatDate }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">ת.עידכון</p> {{ order.orderUpdated | formatDate }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="4" sm="4">
        <v-img
          :src="order.file"
        ></v-img>
      </v-col>
    </v-row>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :order = 'order'
    />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";
export default {
  name: 'Order',
  data: () => ({
    pageName: '',
    fab: false,
    dialogs: {
      edit: false
    },
  }),
  computed: {
    order() {
      return this.$store.state.orders.find(order => order.id === this.$route.params.id) || {number: '', orderSupplierRef: {}}
    },
    clientsMap() {
      const clientsMap = {}
      this.$store.state.clients.forEach(client => {
        clientsMap[client.id] = client.name
        client = client.name
      })

      return clientsMap
    },
    suppliersMap() {
      const suppliersMap = {}
      this.$store.state.suppliers.forEach(supplier => {
        suppliersMap[supplier.id] = supplier.name
      })

      return suppliersMap
    }
  },
  components: {
      'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
  }
}
</script>