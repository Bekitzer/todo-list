<template>
  <div class="mr-16 ml-16">
    <nav-appbar :pname="'הזמנות - ' + this.order.number"/>
    <v-row>
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
                {{ suppliersMap[order.supplierName] }}
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
    </v-row>
    <v-row>
      <v-col cols="12" md="9" sm="9">
      </v-col>
    </v-row>
      <v-btn
        bottom
        left
        fixed
        fab
        elevation="2"
        large
        color="#03616f"
        class="white--text"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
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
      return this.$store.state.orders.find(order => order.id === this.$route.params.id) || {number: ''}
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
<style lang="sass" scoped>
  .v-expansion-panel
    border-radius: 0px 0px 20px 20px !important
  .theme--light.v-expansion-panels .v-expansion-panel
    border-width: 0px 1px 1px 1px !important
    border-style: solid !important
    border-color: #dbdbdb !important
  .pos-abs
    position: absolute !important
    bottom: 0
    display: block
    right: 0
  .pos-rel
    position: relative !important
  .user-information
    height: 60px
  .spc-titles
    margin-bottom: 0
    text-decoration: underline
  .user-info
      white-space: pre-line
</style>