<template>
  <v-container>
    <nav-appbar :pname="'שם לקוח > ' + this.client.name"/>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
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
            <p style="margin-bottom:0 !important;">{{ client.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. {{ client.numberId }}</p>
            <p style="margin-bottom:0 !important;">{{ client.website }} | {{ client.facebook }} | {{ client.instagram }}</p>
          </v-col>
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <p style="margin-bottom:0 !important;">
              טלפון: {{ client.phone }}
            </p>
            <p style="margin-bottom:0 !important;">
              וואטסאפ: {{ client.whatsapp }}
            </p>
            <p style="margin-bottom:0 !important;">
              הערות: {{ client.addressAdditional }}
            </p>
            <p style="margin-bottom:0 !important;">
              תאריך עידכון: {{ client.clientUpdated }}
            </p>
          </v-col>
          <v-col cols="6">

            <p style="margin-bottom:0 !important;">
              אימייל: {{ client.email }}
            </p>
            <p style="margin-bottom:0 !important;">
              כתובת: {{ client.address }}
            </p>
            <p style="margin-bottom:0 !important;">
              תאריך יצירת לקוח: {{ client.clientCreationDate }}
            </p>
          </v-col>
        </v-row>
        <v-row class="pa-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>הגדרות תשלום</h4>
          </v-col>
          <v-col cols="6">
            <p style="margin-bottom:0 !important;">
              תנאי תשלום: {{ client.paymentTerms }}
            </p>
          </v-col>
          <v-col cols="6">
            <p style="margin-bottom:0 !important;">
              אופן תשלום: {{ client.paymentMethod }}
            </p>
          </v-col>
        </v-row>
        <v-row class="pa-3 lighten-3 pos-rel mb-2 grey lighten-3">
          <v-col cols="12">
            <h4>הגדרות לקוח</h4>
          </v-col>
          <p style="margin-bottom:0 !important;">
              מקור הגעה: {{ client.lead }}
            </p>
          <v-col cols="6">
            <p style="margin-bottom:0 !important;">
              שעות פעילות: {{ client.workingHours }}
            </p>
            <p style="margin-bottom:0 !important;">
              דיוור: {{ client.newsletter }}
            </p>
          </v-col>
          <v-col cols="6">
            <p style="margin-bottom:0 !important;">
              אופן אספקה: {{ client.deliveryType }}
            </p>
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
                    <p style="">אופן אספקה <br />{{ client.paymentTerms }}</p>
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
  </v-container>
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
      return this.$store.state.clients.find(client => client.id === this.$route.params.id) || {name: ''}
    }
  },
  components: {
      'dialog-edit': require('@/components/Clients/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Clients/Dialogs/DialogDelete.vue').default,
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
</style>
