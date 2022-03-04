<template>
  <div>
    <nav-appbar :pname="' משתמש - ' + this.user.username">
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
          <span>עריכת משתמש</span>
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
                size="108px"
              >
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    color="#000"
                  >
                    <v-btn @click="openFile(user)">הוספה/שינוי תמונה</v-btn>
                  </v-overlay>
                </v-fade-transition>
                <v-img
                  :src="user.avatar"
                  lazy-src="/images/gravatar.jpg"
                  rounded
                ></v-img>
              </v-avatar>
            </v-hover>
          </v-col>
          <v-col cols="12" md="7" sm="7">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <p style="margin-bottom:0 !important;">{{ user.username }}</p>
          </v-col>
        </v-row>
        <v-row class="pa-3  pos-rel mb-2 grey lighten-4">
          <v-col cols="12">
            <h4>פרטי התקשרות</h4>
          </v-col>
          <v-col cols="6">
            <div class="user-information">
              <p class="spc-titles">טלפון</p> {{ user.phone }}
            </div>
            <div class="user-information">
              <p class="spc-titles">מייל</p> {{ user.email }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <dialog-edit
      v-if="dialogs.edit"
      @close = 'dialogs.edit = false'
      :user = 'user'
    />
    <dialog-image
      v-if="dialogs.image"
      :user = 'user'
      @close = 'dialogs.image = false'
    />
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
export default {
  name: 'User',
  data: () => ({
    overlay: false,
    pageName: '',
    fab: false,
    transition: 'slide-y-transition',
    dialogs: {
      edit: false,
      image: false    },
  }),
  methods: {
    openFileOrder (item) {
      this.order = JSON.parse(JSON.stringify(item))
      this.dialogs.order = true
    },
    openFile (user) {
      this.dialogs.image = true
    },
    clickOrder(order){
      this.$router.push({ name: 'User', params: { id : order.id }})
    }
  },
  computed: {
    user() {
      return this.$store.state.User.list.find(user => user.id === this.$route.params.id) || {name: ''}
    },
  },
  components: {
      'dialog-edit': require('@/components/Users/Dialogs/DialogEdit.vue').default,
      'dialog-create': require('@/components/Orders/Dialogs/DialogCreate.vue').default,
      'nav-appbar' : require('@/components/Global/AppBar.vue').default,
      'dialog-image': require('@/components/Users/Dialogs/DialogImage.vue').default,
      'dialog-order': require('@/components/Orders/Dialogs/DialogImage.vue').default
  }
}
</script>
