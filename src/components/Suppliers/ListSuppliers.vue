<template>
  <v-data-table
    height="82vh"
    fixed-header
    :search="$store.state.search"
    :headers="headers"
    :items="suppliers"
    item-key="id"
    sort-by="orders"
    sort-desc
    @click:row="handleClick"
    :items-per-page="-1"
    hide-default-footer
  >
  <template v-slot:[`item.emailLink`]="{ item }">
      <div @click.stop>
        <a :href="'mailto:' + item.email" style="text-decoration:none;">{{item.email}}</a>
      </div>
    </template>
    <template v-slot:[`item.phoneLink`]="{ item }">
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
      { text: 'מס׳ ספק', value: 'number', align: 'start', width: '80px' },
      { text: 'שם ספק', value: 'name'},
      { text: 'שם חברה', value: 'companyName', 'sortable': false },
      { text: 'ח.פ. / ע.מ.', value: 'numberId', width: '80px', 'sortable': false },
      { text: 'איש קשר', value: 'contactName', width: '100px', 'sortable': false },
      { text: 'טלפון', value: 'phoneLink', width: '100px', 'sortable': false },
      { text: 'מייל', value: 'emailLink', 'sortable': false },
      { text: 'כתובת', value: 'address', 'sortable': false },
      { text: 'אופן אספקה', value: 'deliveryType', width: '80px', 'sortable': false },
      { text: 'ה.פעילות', value: 'orders', width: '80px' },
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
        this.$store.state.Order.list.forEach(order => {
          if( order.statusType !== 'סופק'){
            ordersMap[order.orderSupplierRef.id] = ordersMap[order.orderSupplierRef.id] || 0
            ordersMap[order.orderSupplierRef.id]++
          }
        })

        return this.$store.state.Supplier.list.map(supplier => {
          supplier.orders = ordersMap[supplier.id] || 0
          return supplier
        })
      },
      set(value) {
        this.$store.dispatch('Supplier/upsert', value)
      }
    }
  },
  components: {
    'icon-edit': require('@/components/Icons/IconEdit.vue').default
  }
}
</script>