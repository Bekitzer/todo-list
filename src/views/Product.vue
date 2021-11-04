<template>
  <v-container>
    <nav-appbar :pname="'שם מוצר > ' + this.product.name"/>
    <v-row>
      <v-col cols="12" md="7" sm="7">
        <v-row class="pa-10 grey lighten-3 rounded-b-xl">
          <v-col cols="3" md="3" sm="3">
            <h2>מוצר</h2>
            <h3>{{ product.name }}</h3>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <h2>מספר</h2>
            <h3>{{ product.number }}</h3>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <h2>תאריך יצירה</h2>
            <h3>{{ product.productCreationDate }}</h3>
          </v-col>
          <v-col cols="3" md="3" sm="3">
            <h2>תאריך שינוי</h2>
            <h3>{{ product.productUpdated }}</h3>
          </v-col>
        </v-row>
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
        :to="{ name: 'Products' }"
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
      :product = 'product'
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close = 'dialogs.delete = false'
      :product = 'product'
    />
  </v-container>
</template>

<script>
export default {
  name: 'Product',
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
    product() {
      return this.$store.state.products.find(product => product.id === this.$route.params.id) || {name: ""}
    }
  },
  components: {
      'dialog-edit': require('@/components/Products/Dialogs/DialogEdit.vue').default,
      'dialog-delete': require('@/components/Products/Dialogs/DialogDelete.vue').default,
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

</style>