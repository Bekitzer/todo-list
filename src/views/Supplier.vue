<template>
  <v-container>
    <nav-appbar :pname="'שם ספק > ' + this.supplier.name"/>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12" md="4" sm="4">
            <v-icon
              :color="getColor(supplier.status)"
              class="spc-status-dot pos-abs"
              size="60"
            >mdi-circle-small</v-icon>
            <v-avatar
              style="border:1px solid black"
              class="profile"
              size="100px"
            >
              <v-img
                src="/images/marcus.jpg"
                rounded
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8" sm="8">
            <div>
              <small class="margin-bottom:0 !important;">שם חברה</small>
              <h2>{{ supplier.name }}</h2>
            </div>
            <p style="margin-bottom:0 !important;">{{ supplier.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. {{ supplier.numberId }}</p>
            <div>
              <a :href="supplier.website" style="text-decoration:none;"><v-icon>mdi-web</v-icon></a> |
              <a :href="supplier.facebook" style="text-decoration:none;"><v-icon>mdi-facebook</v-icon></a> |
              <a :href="supplier.instagram" style="text-decoration:none;"><v-icon>mdi-instagram</v-icon></a>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">טלפון:</p> {{ supplier.phone }}
            </div>
            <div class="user-information">
              <p class="spc-titles">וואטסאפ:</p> {{ supplier.whatsapp }}
            </div>
            <div class="user-information">
              <p class="spc-titles">הנחיות שילוח:</p> {{ supplier.addressAdditional }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אימייל:</p> {{ supplier.email }}
            </div>
            <div class="user-information">
              <p class="spc-titles">כתובת:</p> {{ supplier.address }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">תנאי תשלום:</p> {{ supplier.paymentTerms }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אמצעי תשלום:</p> {{ supplier.paymentMethod }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>הגדרות ספק</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">שעות פעילות:</p> {{ supplier.workingHours }}
            </div>
            <div class="user-information">
              <p class="spc-titles">דיוור:</p> {{ supplier.newsletter }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אופן אספקה:</p> {{ supplier.deliveryType }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-expansion-panels flat style="border:1px solid 0 1px 1px 1px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                אנשי קשר
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="4" md="4" sm="4">
                    <div class="user-information">
                      <p class="spc-titles">תאריך יצירת לקוח:</p> {{ supplier.supplierCreationDate }}
                    </div>
                    <div class="user-information">
                      <p class="spc-titles">תאריך עידכון:</p> {{ supplier.supplierUpdated }}
                    </div>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <v-col cols="12">
          <h4>הזמנות - בתהליך</h4>
        </v-col>
        <v-data-table
          height="20vh"
          fixed-header
          :headers="headers"
          :items="processing"
          item-key="id"
          sort-by="number"
          :items-per-page="-1"
          hide-default-footer
          sort-desc
        >
          <template v-slot:item.clientLink="{ item }">
              {{ item.clientLink }}
          </template>
          <template v-slot:item.supplierLink="{ item }">
              {{ item.supplierLink }}
          </template>
          <template v-slot:item.sell="{ item }">
              {{ item.sellPrice | formatNumber }}
          </template>
          <template v-slot:item.buy="{ item }">
              {{ item.buyPrice | formatNumber }}
          </template>
          <template v-slot:item.margins="{ item }">
              {{ item.margin | formatNumber }}
          </template>
          <template v-slot:item.statusType="props">
            <v-icon :color="getColor(props.item.statusType)" class="spc-status-dot" size="60">
              mdi-circle-small
            </v-icon>
            {{ props.item.statusType }}
          </template>
          <template v-slot:item.created="{ item }">
              {{format(new Date(item.orderCreationDate.seconds * 1000), 'EEEEE, dd/MM/yy', {locale: he})}}
          </template>
        </v-data-table>
        <v-col cols="12">
          <h4>הזמנות - סופק</h4>
        </v-col>
        <v-data-table
          height="20vh"
          fixed-header
          :headers="headers"
          :items="delivered"
          item-key="id"
          sort-by="number"
          :items-per-page="-1"
          hide-default-footer
          sort-desc
        >
          <template v-slot:item.clientLink="{ item }">
              {{ item.clientLink }}
          </template>
          <template v-slot:item.supplierLink="{ item }">
              {{ item.supplierLink }}
          </template>
          <template v-slot:item.sell="{ item }">
              {{ item.sellPrice | formatNumber }}
          </template>
          <template v-slot:item.buy="{ item }">
              {{ item.buyPrice | formatNumber }}
          </template>
          <template v-slot:item.margins="{ item }">
              {{ item.margin | formatNumber }}
          </template>
          <template v-slot:item.statusType="props">
            <v-icon :color="getColor(props.item.statusType)" class="spc-status-dot" size="60">
              mdi-circle-small
            </v-icon>
            {{ props.item.statusType }}
          </template>
          <template v-slot:item.created="{ item }">
              {{format(new Date(item.orderCreationDate.seconds * 1000), 'EEEEE, dd/MM/yy', {locale: he})}}
          </template>
        </v-data-table>
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
      :supplier = 'supplier'
    />
  </v-container>
</template>

<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'
export default {
  name: 'Supplier',
  data: () => ({
    pageName: '',
    fab: false,
    format,
    he,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false
    },
  }),
  methods: {
    getColor (statusType) {
      if (statusType === "פעיל") return 'green'
      else if (statusType === "לא פעיל") return 'red'
      else if (statusType === "מזדמן") return 'blue'
      else if (statusType === "שת״פ") return 'orange'
    },
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
  computed: {
    supplier() {
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$route.params.id) || {name: ''}
    },
    headers () {
      return [
        { text: '#', value: 'number', align: 'start', width: '3%' },
        { text: 'תאריך הזמנה', value: 'created', width: '10%', 'sortable': false },
        { text: 'לקוח', value: 'clientLink', width: '10%', 'sortable': false },
        // { text: '', value: 'data-table-expand', 'sortable': false },
        { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', width: '18%', 'sortable': false,  },
        { text: 'ספק', value: 'supplierLink', width: '10%', 'sortable': false },
        // { text: 'תאריך אספקה', value: 'deliveryDate', width: '10%' },
        // { text: 'אופן אספקה', value: 'deliveryType', width: '7%', 'sortable': false,  },
        { text: 'מכירה', value: 'sell', width: '5%', 'sortable': false  },
        { text: 'קניה', value: 'buy', width: '5%', 'sortable': false  },
        { text: 'רווח', value: 'margins', width: '5%', 'sortable': false  },
        { text: 'סטטוס הזמנה', value: 'statusType', width: '11%','sortable': true}
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
          return order.supplierName == this.supplier.id && order.statusType !== 'סופק'
         })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    },
    delivered: {
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
          return order.supplierName == this.supplier.id && order.statusType === 'סופק'
         })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  },
  components: {
      'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default,
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
    font-size: 12px
</style>
