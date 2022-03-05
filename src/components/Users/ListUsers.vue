<template>
  <v-data-table
    height="82vh"
    fixed-header
    :search="$store.state.search"
    :headers="headers"
    :items="users"
    item-key="id"
    sort-by="number"
    @click:row="handleClick"
    :items-per-page="-1"
    hide-default-footer
  >
    <template v-slot:[`item.connected`]="{ item }">
      <span v-if="item.clientLink || item.supplierLink">
        {{ item.clientLink }}{{ item.supplierLink }}
      </span>
      <span v-else >
        <v-icon>mdi-close</v-icon>
      </span>
    </template>
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
  name: 'ListUsers',
  props: ['user'],
  data: () => ({
    headers: [
      { text: 'מס׳ משתמש', value: 'number'},
      { text: 'שם משתמש', value: 'username'},
      { text: 'שם פרטי', value: 'firstname', 'sortable': false },
      { text: 'שם פרטי', value: 'lastname', 'sortable': false },
      { text: 'טלפון', value: 'phoneLink', width: '100px', 'sortable': false },
      { text: 'מייל', value: 'emailLink', 'sortable': false },
      { text: 'תפקיד', value: 'position', 'sortable': false },
      { text: 'מחובר?', value: 'connected', 'sortable': false },
    ],
  }),
  methods: {
    handleClick(user){
      this.$router.push({ name: 'User', params: { id : user.id }})
    }
  },
  computed: {
    clientsMap() {
      const clientsMap = {}
      this.$store.state.Client.list.forEach(client => {
        clientsMap[client.id] = client
      })

      return clientsMap
    },
    suppliersMap() {
      const suppliersMap = {}
      this.$store.state.Supplier.list.forEach(supplier => {
        suppliersMap[supplier.id] = supplier
      })

      return suppliersMap
    },
    users: {
      get() {
        return this.$store.state.User.list.map(user => {
          const client = this.clientsMap[user.userClientRef] || {}
          const supplier = this.suppliersMap[user.userSupplierRef?.id] || {}
          return {
            ...user,
            clientLink: client.name,
            supplierLink: supplier.name
          }
        })
      }
    }
  },
  components: {
    'icon-edit': require('@/components/Icons/IconEdit.vue').default
  }
}
</script>