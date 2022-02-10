<template>
  <div>
    <nav-appbar :pname="' ספקים - ' + this.supplier.name">
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
            class="spc-btn"
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
                      <v-btn @click="openFile(supplier)">הוספה/שינוי תמונה</v-btn>
                    </v-overlay>
                  </v-fade-transition>
                <v-img
                  :src="supplier.avatar"
                  lazy-src="/images/gravatar.jpg"
                  rounded
                ></v-img>
              </v-avatar>
            </v-hover>
          </v-col>
          <v-col cols="12" md="7" sm="7">
            <h2>{{ supplier.name }}</h2>
            <p style="margin-bottom:0 !important;">{{ supplier.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. / ע.מ. {{ supplier.numberId }}</p>
            <p style="margin-bottom:0 !important;">{{ supplier.address }}</p>
            <div>
              <a :href="'http://' + supplier.website" style="text-decoration:none;color:#03616f;" target="_blank">{{supplier.website}}</a>
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
              <p class="spc-titles">הנחיות שילוח</p> {{ supplier.addressAditional }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>אנשי קשר</h4>
          </v-col>
          <v-expansion-panels>
            <v-expansion-panel v-for="user in users" :key="user.id">
              <v-expansion-panel-header>
                {{user.firstname}} {{user.lastname}} - {{user.position}}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12">
                    מייל: {{user.email}}<br>
                    טלפון: {{user.phone}}<br>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">תנאי תשלום</p> {{ supplier.paymentTerms }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אמצעי תשלום</p> {{ supplier.paymentMethod }}
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>הגדרות ספק</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">אופן אספקה</p> {{ supplier.deliveryType }}
            </div>
            <div class="user-information">
              <p class="spc-titles">סטטוס ספק</p> {{ supplier.status }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">שעות פעילות</p> {{ supplier.workingHours }}
            </div>
            <div class="user-information">
              <p class="spc-titles">דיוור</p> {{ supplier.newsletter }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="9" sm="9" class="pr-10">
        <v-col cols="12">
          <h4>הזמנות</h4>
          <v-switch v-model="viewSuppliedOnly" inset label="פעילות/סופקו"></v-switch>
        </v-col>
         <v-data-table
          height="68vh"
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
      :supplier = 'supplier'
    />
    <dialog-create
      v-if="dialogs.create"
      :order="order"
      @close = 'dialogs.create = false'
    />
    <dialog-image
      v-if="dialogs.image"
      :supplier = 'supplier'
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
  name: 'Supplier',
  data: () => ({
    overlay: false,
    order: null,
    pageName: '',
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
    openFile (supplier) {
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
    users() {
      return this.$store.state.users.filter(user => user.supplierRef === this.supplier.id)
    },
    supplier() {
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$route.params.id) || {name: ''}
    },
    headers () {
      return [
        { text: 'מס׳ הזמנה', value: 'number', align: 'start', width: '110px' },
        { text: 'תאריך הזמנה', value: 'created', width: '110px', 'sortable': false },
        { text: 'לקוח', value: 'clientLink', 'sortable': false },
        { text: 'מוצר / שם עבודה', value: 'orderWorkTitle', 'sortable': false,  },
        { text: 'קניה', value: 'buy',  width: '60px', 'sortable': false  },
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
          return order.supplierName == this.supplier.id && (this.viewSuppliedOnly ? order.statusType !== 'סופק' : order.statusType === 'סופק')
         })
      },
      set(value) {
        this.$store.dispatch('setOrders', value)
      }
    }
  },
  components: {
      'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default,
      'dialog-image': require('@/components/Suppliers/Dialogs/DialogImage.vue').default,
      'dialog-order': require('@/components/Orders/Dialogs/DialogImage.vue').default
  }
}
</script>
