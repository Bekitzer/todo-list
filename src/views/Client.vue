<template>
  <div>
    <nav-appbar :pname="'לקוחות - ' + this.client.name">
      <template v-slot:add-btn>
        <v-tooltip
          bottom
          content-class="normal tooltip-bottom"
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
          <span>עריכת ספק</span>
        </v-tooltip>
      </template>
      <template v-slot:create-btn>
        <v-tooltip
          bottom
          content-class="normal tooltip-bottom"
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
              @click="dialogs.create = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>הזמנה חדשה</span>
        </v-tooltip>
      </template>
    </nav-appbar>
    <v-row no-gutters>
      <v-col cols="12" md="3" sm="3">
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12" md="5" sm="5">
            <v-hover v-slot="{ hover }">
              <v-avatar
                class="profile"
                size="150px"
              >
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    color="#000"
                  >
                    <v-btn @click="openFile(client)">הוספה/שינוי תמונה</v-btn>
                  </v-overlay>
                </v-fade-transition>
                <v-img
                  :src="client.avatar"
                  lazy-src="/images/gravatar.jpg"
                  rounded
                ></v-img>
              </v-avatar>
            </v-hover>
          </v-col>
          <v-col cols="12" md="7" sm="7">
            <h2>{{ client.name }}</h2>
            <p style="margin-bottom:0 !important;">{{ client.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. / ע.מ. {{ client.numberId }}</p>
            <p style="margin-bottom:0 !important;">{{ client.address }}</p>
            <div>
              <a :href="'http://' + client.website" style="text-decoration:none;color:#03616f;" target="_blank">{{client.website}}</a>
              <!-- <a :href="supplier.facebook" style="text-decoration:none;"><v-icon>mdi-facebook</v-icon></a>
              <a :href="supplier.instagram" style="text-decoration:none;"><v-icon>mdi-instagram</v-icon></a> -->
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">איש קשר ראשי</p> {{ client.contactName }}
            </div>
            <div class="user-information">
              <p class="spc-titles">טלפון</p> {{ client.phone }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מייל</p> {{ client.email }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">וואטסאפ</p> {{ client.whatsapp }}
            </div>
            <div class="user-information">
              <p class="spc-titles">כתובת</p> {{ client.address }}
            </div>
            <div class="user-information">
              <p class="spc-titles">הנחיות שילוח</p> {{ client.addressAdditional }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">סוג תשלום</p> {{ client.paymentType }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">תנאי תשלום</p> {{ client.paymentTerms }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אמצעי תשלום</p> {{ client.paymentMethod }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>הגדרות לקוח</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אופן אספקה</p> {{ client.deliveryType }}
            </div>
            <div class="user-information">
              <p class="spc-titles">סוג לקוח</p> {{ client.status }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">מקור הגעה</p> {{ client.lead }}
            </div>
            <div class="user-information">
              <p class="spc-titles">דיוור</p> {{ client.newsletter }}
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
                      <p class="spc-titles">תאריך יצירת לקוח</p> {{ client.clientCreationDate }}
                    </div>
                    <div class="user-information">
                      <p class="spc-titles">תאריך עידכון</p> {{ client.clientUpdated }}
                    </div>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="">אופן אספקה <br />{{ client.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="">אופן אספקה <br />{{ client.paymentTerms }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
      <v-col cols="12" md="9" sm="9" class="pr-10">
        <v-col cols="12">
          <h4>הזמנות</h4>
          <v-switch v-model="viewSuppliedOnly" inset label="פעילות/סופקו"></v-switch>
        </v-col>
        <v-data-table
          height="68vh"
          fixed-header
          :search="$store.state.search"
          :headers="headers"
          :items="processing"
          item-key="id"
          sort-by="deliveryDate"
          :items-per-page="-1"
          hide-default-footer
          sort-desc
          no-data-text="אין הזמנות פעילות"
        >
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
            {{ item.orderCreationDate | formatDate }}
          </template>
          <template v-slot:item.delivery="{ item }">
            {{ item.deliveryDate | formatDate }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip
              top
              content-class="normal tooltip-top"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                small
                class="ml-2"
                @click.stop="openFileOrder(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-file-image
              </v-icon>
              </template>
              <span>הצג תמונה</span>
            </v-tooltip>
            <v-tooltip
              top
              content-class="normal tooltip-top"
            >
              <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="ml-2"
                @click.stop="duplicateOrder(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-content-duplicate
              </v-icon>
              </template>
              <span>שכפל הזמנה</span>
            </v-tooltip>
            <v-tooltip
              top
              content-class="normal tooltip-top"
            >
              <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                @click.stop="clickOrder(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil-outline
              </v-icon>
              </template>
              <span>ערוך הזמנה</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :client = 'client'
    />
    <dialog-create
      v-if="dialogs.create"
      :order="order"
      @close = 'dialogs.create = false'
    />
    <dialog-image
      v-if="dialogs.image"
      :client = 'client'
      @close = 'dialogs.image = false'
    />
    <dialog-order
      v-if="dialogs.order"
      :order = 'order'
      @close = 'dialogs.order = false'
    />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
export default {
  name: 'Client',
  data: () => ({
    pageName: '',
    overlay: false,
    order: null,
    fab: false,
    transition: 'slide-y-transition',
    viewSuppliedOnly: true,
    dialogs: {
      edit: false,
      create: false,
      image: false,
      order: false
    },
  }),
  watch: {
    'dialogs.create': function (val) {
      if(!val) {
        this.order = null
      }
    }
  },
  methods: {
    openFileOrder (item) {
      this.order = JSON.parse(JSON.stringify(item))
      this.dialogs.order = true
    },
    openFile (client) {
      this.dialogs.image = true
    },
    duplicateOrder(item) {
      this.order = JSON.parse(JSON.stringify(item))
      this.dialogs.create = true
    },
    clickOrder(order){
      this.$router.push({ name: 'Order', params: { id : order.id }})
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
    client() {
      return this.$store.state.clients.find(client => client.id === this.$route.params.id) || {name: ''}
    },
    headers () {
      return [
        { text: 'מס׳ הזמנה', value: 'number', align: 'start', width: '110px' },
        { text: 'תאריך הזמנה', value: 'created', width: '110px', 'sortable': false },
        { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', 'sortable': false,  },
        { text: 'ספק', value: 'supplierLink', 'sortable': false },
        { text: 'מכירה', value: 'sell', width: '60px', 'sortable': false  },
        { text: 'תאריך אספקה', value: 'delivery', width: '110px', 'sortable': false  },
        { text: 'פעולות', value: 'actions', width: '100px', 'sortable': false  },
        { text: 'סטטוס הזמנה', value: 'statusType', width: '110px','sortable': true}
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
          return order.clientName == this.client.id && (this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק')
        })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  },
  components: {
      'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default,
      'dialog-image': require('@/components/Clients/Dialogs/DialogImage.vue').default,
      'dialog-order': require('@/components/Orders/Dialogs/DialogImage.vue').default
  }
}
</script>
