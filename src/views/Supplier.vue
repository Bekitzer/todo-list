<template>
  <div class="pr-10 pl-10">
    <nav-appbar :pname="pageName"/>
    <v-row>
      <v-col cols="12" md="7" sm="7">
        <v-row class="pa-10 grey lighten-3 rounded-b-xl pos-rel">
          <v-icon
            :color="getColor(supplier.status)"
            class="spc-status-dot pos-abs"
            size="60"
          >mdi-circle-small</v-icon>
          <v-col cols="2" md="2" sm="2">
            <v-avatar
              class="profile"
              size="100px"
            >
              <v-img
                src="/images/marcus.jpg"
                rounded
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="4" md="4" sm="4">
            <h2>{{ supplier.name }}</h2>
            <p style="font-size:14px;">{{ supplier.companyName }} / ח.פ. {{ supplier.numberId }}</p>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <p>
              <v-icon color="#006D7B" small>mdi-phone-outline</v-icon> {{ supplier.phone }}
            </p>
            <p>
              <v-icon color="#006D7B" small>mdi-email-outline</v-icon> {{ supplier.email }}
            </p>
            <p>
              <v-icon color="#006D7B" small>mdi-whatsapp</v-icon> {{ supplier.whatsapp }}
            </p>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <p>
              <v-icon color="#006D7B" small>mdi-map-marker-outline</v-icon> {{ supplier.address }}
            </p>
              <v-row>
                <v-col cols="6" md="6" sm="6">
                  <p style="font-size:14px;">ת.רישום <br />{{ supplier.supplierCreationDate }}</p>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <p style="font-size:14px;">ת.עידכון <br />{{ supplier.supplierUpdated }}</p>
                </v-col>
              </v-row>
          </v-col>
        </v-row>
        <v-row class="pt-6">
          <v-expansion-panels flat style="border:1px solid 0 1px 1px 1px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                תנאי פעילות
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="3" md="3" sm="3">
                    <p style="font-size:14px;">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="3" md="3" sm="3">
                    <p style="font-size:14px;">תנאי תשלום <br />{{ supplier.paymentMethod }}</p>
                  </v-col>
                  <v-col cols="3" md="3" sm="3">
                    <p style="font-size:14px;">שעות פעילות <br />{{ supplier.workingHours }}</p>
                  </v-col>
                  <v-col cols="3" md="3" sm="3">
                    <p style="font-size:14px;">סוג משלוח<br />{{ supplier.deliveryType }}</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                אנשי קשר
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="4" md="4" sm="4">
                    <p style="font-size:14px;">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="font-size:14px;">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="font-size:14px;">אופן אספקה <br />{{ supplier.paymentTerms }}</p>
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
        :to="{ name: 'Suppliers' }"
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
      :supplier = 'supplier'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :supplier = 'supplier'
    />
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data: () => ({
    pageName: '',
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false,
      delete: false
    },
  }),
  methods: {
    getColor (statusType) {
      if (statusType === "פעיל") return 'green'
      else if (statusType === "לא פעיל") return 'red'
      else if (statusType === "מזדמן") return 'blue'
      else if (statusType === "שת״פ") return 'orange'
    },
  },
  computed: {
    supplier() {
      return this.$store.state.suppliers.find(supplier => supplier.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Suppliers/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Suppliers/Dialogs/DialogDelete.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
  },
  mounted() {
    this.pageName = this.supplier.name
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
    right: 0
    display: block
  .pos-rel
    position: relative !important
</style>