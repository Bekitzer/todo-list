<template>
<v-data-table
    flat
    :headers="headers"
    :items="clients"
    fixed-header
    :items-per-page="-1"
    hide-default-footer
    item-key="id"
    sort-by="number"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
          icon
          dense
          plain
          @click="handleClick(item)"
        >
          <img
            width="26px"
            src="@/components/Icons/edit.svg"
          >
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ListClients',
  props: ['client'],
  data: () => ({
    headers: [
      { text: '#', value: 'number', align: 'start', width: '3%' },
      { text: 'שם לקוח', value: 'name', width: '10%'},
      { text: 'שם חברה', value: 'companyName', width: '10%' },
      { text: 'טלפון משרד', value: 'phone', width: '17%' },
      { text: 'מייל משרד', value: 'email', width: '10%' },
      { text: 'כתובת', value: 'address', width: '10%' },
      { text: 'אופן אספקה', value: 'deliveryType', width: '7%' },
      { text: 'ס.לקוח', value: 'status', width: '5%' },
      { text: 'פעולות', value: 'actions', width: '5%' },
      { text: 'ה.פעילות', value: '', width: '8%' },
    ],
  }),
  methods: {
    handleClick(client){
      this.$router.push({ name: 'Client', params: { id : client.id }})
    }
  },
  computed: {
    clients: {
      get() {
        return this.$store.getters.clientsFiltered
      },
      set(value) {
        this.$store.dispatch('setClients', value)
      }
    }
  }
}
</script>
<style lang="sass">
  th.spc-status-dot
    border-bottom: none !important
  .v-application .elevation-1, .theme--light.v-data-table.v-data-table--fixed-header thead th
    box-shadow: none !important
  .theme--light.v-data-table .v-data-footer
    border-top: none !important
  .spc-status-dot
    width: 12px
    margin-left: 6px
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: transparent
</style>