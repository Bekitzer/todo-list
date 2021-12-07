<template>
  <v-data-table
    height="72vh"
    fixed-header
    :search="$store.state.search"
    :headers="headers"
    :items="suppliers"
    item-key="id"
    sort-by="number"
    @click:row="handleClick"
    :items-per-page="-1"
    hide-default-footer
  >
  <template v-slot:item.emailLink="{ item }">
      <div @click.stop>
        <a :href="'mailto:' + item.email" style="text-decoration:none;">{{item.email}}</a>
      </div>
    </template>
    <template v-slot:item.phoneLink="{ item }">
      <div @click.stop>
        <a :href="'tel:' + item.phone" style="text-decoration:none;">{{item.phone}}</a>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'Listuppliers',
  props: ['supplier'],
  data: () => ({
    headers: [
      { text: '#', value: 'number', align: 'start', width: '5%' },
      { text: 'שם ספק', value: 'name', width: '10%'},
      { text: 'שם חברה', value: 'companyName', width: '16%', 'sortable': false },
      { text: 'ח.פ.', value: 'numberId', width: '10%', 'sortable': false },
      { text: 'איש קשר', value: 'contactName', width: '7%', 'sortable': false },
      { text: 'טלפון', value: 'phoneLink', width: '10%', 'sortable': false },
      { text: 'מייל', value: 'emailLink', width: '10%', 'sortable': false },
      { text: 'כתובת', value: 'address', width: '12%', 'sortable': false },
      { text: 'אופן אספקה', value: 'deliveryType', width: '10%', 'sortable': false },
      { text: 'ה.פעילות', value: 'orders', width: '6%' },
    ],
  }),
  methods: {
    handleClick(supplier){
      this.$router.push({ name: 'Supplier', params: { id : supplier.id }})
    }
  },
  computed: {
    suppliers: {
      get() {
        const ordersMap = {}

        this.$store.state.orders.forEach(order => {
          if( order.statusType !== 'סופק'){
            ordersMap[order.supplierName] = ordersMap[order.supplierName] || 0
            ordersMap[order.supplierName]++
          }
        })

        return this.$store.state.suppliers.map(supplier => {
          supplier.orders = ordersMap[supplier.id] || 0
          return supplier
        })
      },
      set(value) {
        this.$store.dispatch('setSuppliers', value)
      }
    }
  },
  components: {
    'icon-edit': require('@/components/Icons/IconEdit.vue').default
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
  .v-data-table > .v-data-table__wrapper > table > thead > tr > th
    font-size: 0.875rem !important
</style>