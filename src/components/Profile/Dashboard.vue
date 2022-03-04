<template>
  <div>
    <nav-appbar :pname="this.clientOrSupplier.name"/>
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
                :src="clientOrSupplier.avatar"
                rounded
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8" sm="8">
            <h2>{{ clientOrSupplier.name }}</h2>
            <p style="margin-bottom:0 !important;">{{ clientOrSupplier.companyName }}</p>
            <p style="margin-bottom:0 !important;">ח.פ. / ע.מ. {{ clientOrSupplier.numberId }}</p>
            <div>
              <a :href="clientOrSupplier.website" style="text-decoration:none;"><v-icon>mdi-web</v-icon></a> |
              <a :href="clientOrSupplier.facebook" style="text-decoration:none;"><v-icon>mdi-facebook</v-icon></a> |
              <a :href="clientOrSupplier.instagram" style="text-decoration:none;"><v-icon>mdi-instagram</v-icon></a>
            </div>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">איש קשר ראשי</p> {{ clientOrSupplier.contactName }}
            </div>
            <div class="user-information">
              <p class="spc-titles">טלפון</p> {{ clientOrSupplier.phone }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מייל</p> {{ clientOrSupplier.email }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">וואטסאפ</p> {{ clientOrSupplier.whatsapp }}
            </div>
            <div class="user-information">
              <p class="spc-titles">כתובת</p> {{ clientOrSupplier.address }}
            </div>
            <div class="user-information">
              <p class="spc-titles">הוראות הגעה</p> {{ clientOrSupplier.addressAditional }}
            </div>
          </v-col>
        </v-row>
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
    pageName: 'לוח בקרה'
  }),
  components: {
    'nav-appbar' : require('@/components/Global/AppBar.vue').default
  },
  computed: {
    userId() {
      return this.$store.state.user?.userClientRef?.id
    },
    client() {
      return this.$store.state.Client.list.find(item => item.id = this.userId)
    },
    clientOrSupplier() {
      return this.$store.state.supplier || this.client || {name: ''}
    },
    user() {
      return this.$store.state.user || {name: ''}
    }
  }
}
</script>