<template>
  <div>
    <nav-appbar :pname="this.supplier.name"/>
    <v-row v-if="!user.isAdmin">
      <v-col cols="12" md="3" sm="3">
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12" md="4" sm="4">
            <v-avatar
              style="border:1px solid black"
              class="profile"
              size="100px"
            >
              <v-img
                :src="supplier.avatar"
                rounded
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8" sm="8">
            <h2>{{ supplier.name }}</h2>
            <p style="margin-bottom:0 !important;">{{ supplier.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. / ע.מ. {{ supplier.numberId }}</p>
            <div>
              <a :href="supplier.website" style="text-decoration:none;"><v-icon>mdi-web</v-icon></a> |
              <a :href="supplier.facebook" style="text-decoration:none;"><v-icon>mdi-facebook</v-icon></a> |
              <a :href="supplier.instagram" style="text-decoration:none;"><v-icon>mdi-instagram</v-icon></a>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">איש קשר ראשי</p> {{ supplier.contactName }}
            </div>
            <div class="user-information">
              <p class="spc-titles">טלפון</p> {{ supplier.phone }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מייל</p> {{ supplier.email }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">וואטסאפ</p> {{ supplier.whatsapp }}
            </div>
            <div class="user-information">
              <p class="spc-titles">כתובת</p> {{ supplier.address }}
            </div>
            <div class="user-information">
              <p class="spc-titles">הוראות הגעה</p> {{ supplier.addressAditional }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="9" sm="9" class="pr-10">
        <v-col cols="12">
          <h4>הזמנות</h4>
          <v-switch v-model="viewSuppliedOnly" inset label="פעילות/סופקו"></v-switch>
        </v-col>
        <v-data-table
          height="75vh"
          fixed-header
          :headers="headers"
          :items="processing"
          item-key="id"
          sort-by="deliveryDate"
          :items-per-page="-1"
          hide-default-footer
          sort-desc
          no-data-text="אין הזמנות פעילות"
        >
          <template v-slot:item.clientLink="{ item }">
              {{ item.clientLink }}
          </template>
          <template v-slot:item.supplierLink="{ item }">
              {{ item.supplierLink }}
          </template>
          <template v-slot:item.buy="{ item }">
              {{ item.buyPrice | formatNumber }}
          </template>
          <template v-slot:item.statusType="props">
            <v-icon :color="getColor(props.item.statusType)" class="spc-status-dot" size="60">
              mdi-circle-small
            </v-icon>
            {{ props.item.statusType }}
          </template>
          <template v-slot:item.created="{ item }">
            {{ item.orderCreationDate | formatDate }}
          </template>
          <template v-slot:item.delivery="{ item }">
            {{ item.deliveryDate | formatDate }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth";
import db from '@/firebase'
export default {
  name: "Dashboard",
  data: () => ({
    pageName: 'לוח בקרה',
    viewSuppliedOnly: true
  }),
  methods: {
    getColor (statusType) {
      if (statusType === "טיוטה") return '#FF9800'
      else if (statusType === "בעבודה") return '#2196F3'
      else if (statusType === "מוכן - משרד") return '#4CAF50'
      else if (statusType === "מוכן - ספק") return '#4CAF50'
      else if (statusType === "במשלוח") return '#2196F3'
      else if (statusType === "סופק") return '#9E9E9E'
      else return 'grey darken-1'
    }
  },
  components: {
    'nav-appbar' : require('@/components/Global/AppBar.vue').default
  },
  computed: {
    supplier() {
      if(!this.$store.state.user) return {name: ''}
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$store.state.user.supplierRef) || {name: ''}
    },
    headers () {
      return [
        { text: 'מס׳ הזמנה', value: 'number', align: 'start' },
        { text: 'תאריך הזמנה', value: 'created', 'sortable': false },
        { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', 'sortable': false,  },
        { text: 'ספק', value: 'supplierLink', 'sortable': false },
        { text: 'מכירה', value: 'buy', 'sortable': false  },
        { text: 'תאריך אספקה', value: 'delivery' },
        { text: 'סטטוס הזמנה', value: 'statusType' }
      ]
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
    processing: {
      get() {
        return this.$store.state.orders.map(order => {
          const client = this.clientsMap[order.clientName] || {}
          const supplier = this.suppliersMap[order.supplierName] || {}
          return {
            ...order,
            clientLink: client.name,
            supplierLink: supplier.name
          }
        })
        .filter(order => {
          return order.supplierName == this.supplier.id && (this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק')
         })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    },
    user() {
      return this.$store.state.user || {name: ''}
    }
  }
}
</script>