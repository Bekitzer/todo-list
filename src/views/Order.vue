<template>
  <v-container>
    <nav-appbar :pname="'מספר הזמנה > ' + this.order.number"/>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">          
          <v-col cols="12" md="6" sm="6">
            <div>
              <small class="margin-bottom:0 !important;">שם לקוח</small>
              <h2>{{ clientsMap[order.clientName].name }}</h2>
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <div>
              <small class="margin-bottom:0 !important;">שם ספק</small>
              <h2>{{ suppliersMap[order.supplierName].name }}</h2>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>פרטי הזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">מ.הזמנה:</p> {{ order.number }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מכירה:</p> {{ order.sellPrice }}
            </div>
            <div class="user-information">
              <p class="spc-titles">קנייה:</p> {{ order.buyPrice }}
            </div>
            <div class="user-information">
              <p class="spc-titles">רווח:</p> {{ order.margin }}
            </div>            
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">סוג משלוח:</p> {{ order.deliveryType }}
            </div>
            <div class="user-information">
              <p class="spc-titles">אחראי:</p> {{ order.deliveryAgent }}
            </div>            
          </v-col>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>ההזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-info">
              <p class="spc-titles">אודות ההזמנה:</p> {{ order.orderWork }}
            </div>
          </v-col> 
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">תאריך אספקה:</p> {{ order.deliveryDate }}
            </div>
          </v-col>                   
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>הגדרות הזמנה</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">ת.רישום:</p> {{ order.orderCreationDate }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">ת.עידכון:</p> {{ order.orderUpdated }}
            </div>
          </v-col>          
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="5" sm="5">
      </v-col>
    </v-row>
    <v-speed-dial
      v-model="fab"
      bottom
      left
      fixed
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="dialogs.edit = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="dialogs.delete = true"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :order = 'order'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :order = 'order'
    />
  </v-container>
</template>

<script>
export default {
  name: 'Order',
  data: () => ({
    pageName: '',
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false,
      delete: false
    },
  }),
  computed: {
    order() {
      return this.$store.state.orders.find(order => order.id === this.$route.params.id) || {number: ''}
    },
    clientsMap() {
      const clientsMap = {}
      this.$store.state.clients.forEach(client => {
        clientsMap[client.id] = client
      })

      return clientsMap
    },
    suppliersMap() {
      const suppliersMap = {}
      this.$store.state.suppliers.forEach(supplier => {
        suppliersMap[supplier.id] = supplier
      })

      return suppliersMap
    },
  },
  components: {
      'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default,
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