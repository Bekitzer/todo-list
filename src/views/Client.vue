<template>
  <div class="pr-6 pl-10">
    <nav-appbar :pname="pageName"/>
    <v-row>
      <v-col cols="12" md="3" sm="3">
        <v-row class="pa-6 lighten-3 pos-rel mt-3 grey lighten-3">
          <v-col cols="12" md="4" sm="4">
            <v-icon
              :color="getColor(client.status)"
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
              <h2>{{ client.name }}</h2>
            </div>
            <p style="font-size:14px;">{{ client.companyName }} / ח.פ. {{ client.numberId }}</p>
            <p style="font-size:14px;">{{ client.website }} | {{ client.facebook }} | {{ client.instagram }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-expansion-panels flat style="border:1px solid 0 1px 1px 1px">
            <v-expansion-panel>
              <v-expansion-panel-header>
                פרטי התקשרות
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12">
                    <p>
                      <v-icon color="#006D7B" small>mdi-phone-outline</v-icon> {{ client.phone }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-email-outline</v-icon> {{ client.email }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-whatsapp</v-icon> {{ client.whatsapp }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-map-marker-outline</v-icon> {{ client.address }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-map-marker-outline</v-icon> {{ client.addressAdditional }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-calendar-plus</v-icon> {{ client.clientCreationDate }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-calendar-edit</v-icon> {{ client.clientUpdated }}
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                תנאי פעילות
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12">
                    <p>
                      <v-icon color="#006D7B" small>mdi-cash-multiple</v-icon> אופן תשלום > {{ client.paymentTerms }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-cash-fast</v-icon> תנאי תשלום > {{ client.paymentMethod }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-store-clock</v-icon> שעות פעילות > {{ client.workingHours }}
                    </p>
                    <p>
                      <v-icon color="#006D7B" small>mdi-moped</v-icon> אופן אספקה > {{ client.deliveryType }}
                    </p>
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
                    <p style="font-size:14px;">אופן אספקה <br />{{ client.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="font-size:14px;">אופן אספקה <br />{{ client.paymentTerms }}</p>
                  </v-col>
                  <v-col cols="4" md="4" sm="4">
                    <p style="font-size:14px;">אופן אספקה <br />{{ client.paymentTerms }}</p>
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
        :to="{ name: 'Clients' }"
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
      :client = 'client'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :client = 'client'
    />
  </div>
</template>

<script>
export default {
  name: 'Client',
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
      if (statusType === "קבוע") return 'green'
      else if (statusType === "מזדמן") return 'blue'
      else if (statusType === "שת״פ") return 'orange'
    },
  },
  computed: {
    client() {
      return this.$store.state.clients.find(client => client.id === this.$route.params.id)
    }
  },
  components: {
      'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default
  },
  mounted() {
    this.pageName = this.client.name
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
</style>
