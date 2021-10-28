<template>
  <v-data-table
    flat
    :headers="headers"
    :items="accountings"
    fixed-header
    :items-per-page="-1"
    item-key="id"
    sort-by="number"
    class="elevation-1"
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
    <template v-slot:[`item.paymentType`]="{ item }">
      <v-icon
          :color="getColor(item.paymentType)"
          class="spc-status-dot"
          size="60"
        >mdi-circle-small</v-icon>
        {{ item.paymentType }}
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: 'ListAccountings',
  data: () => ({
    headers: [
      { text: '#', align: 'start', value: 'number'},
      { text: 'מספר הזמנה', value: 'orderNumber'},
      { text: 'ת.חשבון', value: 'accountingCreationDate' },
      { text: 'לקוח', value: 'clientName' },
      { text: 'ספק', value: 'supplierName' },
      { text: 'מחיר יחידה', value: 'unitPrice' },
      { text: 'כמות', value: 'unitAmount' },
      { text: 'מחיר ספק', value: 'unitSupplierAmount' },
      { text: 'רווח', value: 'unitMargin' },
      { text: 'מחיר ללא מע״מ', value: 'unitSubtotal' },
      { text: 'מחיר כולל מע״מ', value: 'unitTotal' },
      { text: 'ת.תשלום', value: 'paymentDate' },
      { text: 'פעולות', value: 'actions' },
      { text: 'סטטוס תשלום', value: 'paymentType' },
    ],
  }),
  props: ['accounting'],
  methods: {
    handleClick(accounting){
      this.$router.push({ name: 'Accounting', params: { id : accounting.id }})
    },
    getColor (paymentType) {
      if (paymentType === "לתשלום") return 'black'
      else if (paymentType === "נשלח לתשלום") return 'green accent-2'
      else if (paymentType === "תשלום מתעכב") return 'red darken-1'
      else if (paymentType === "שולם") return 'green'
      else if (paymentType === "לא שולם") return 'deep-orange lighten-2'
      else return 'grey darken-1'
    },
  },
  computed: {
    accountings: {
      get() {
        return this.$store.getters.accountingsFiltered
      },
      set(value) {
        this.$store.dispatch('setAccountings', value)
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