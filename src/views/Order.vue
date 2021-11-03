<template>
  <v-container>
    <nav-appbar :pname="pageName"/>
    <v-row>
      <v-col cols="12" md="7" sm="7">
        <v-row class="pa-10 grey lighten-3 rounded-b-xl">
          <v-col cols="3" md="3" sm="3">
            <h2>לקוח</h2>
            <h3>{{ order.clientName }}</h3>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <h2>ספק</h2>
            <h3>{{ order.supplierName }}</h3>
          </v-col>
          <v-col cols="2" md="2" sm="2">
            <p>
              מ.הזמנה > {{ order.number }}
            </p>
            <p>
              מכירה > {{ order.sellPrice }}
            </p>
            <p>
              קנייה > {{ order.buyPrice }}
            </p>
            <p>
              רווח > {{ order.margin }}
            </p>
          </v-col>
          <v-col cols="4" md="4" sm="4">
            <p>
              סוג משלוח > {{ order.deliveryType }}
            </p>
            <p>
              אחראי > {{ order.deliveryAgent }}
            </p>
              <v-row>
                <v-col cols="6" md="6" sm="6">
                  <p style="font-size:14px;">ת.רישום <br />{{ order.orderCreationDate }}</p>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <p style="font-size:14px;">ת.עידכון <br />{{ order.orderUpdated }}</p>
                </v-col>
              </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-6">
          <v-expansion-panels flat style="border:1px solid 0 1px 1px 1px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                מוצר
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="6" md="6" sm="6">
                    <p style="font-size:14px;">אודות ההזמנה <br />{{ order.orderWork }}</p>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <p style="font-size:14px;">תאריך אספקה <br />{{ order.deliveryDate }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
        color="indigo"
        :to="{ name: 'Orders' }"
      >
        <v-icon>mdi-backburger</v-icon>
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
      return this.$store.state.orders.find(order => order.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Orders/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
  },
  mounted() {
    this.pageName = 'מספר הזמנה > ' + this.order.number
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

</style>