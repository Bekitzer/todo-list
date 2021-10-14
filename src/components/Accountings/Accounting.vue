<template v-slot:[`accounting.paymentType`]="{ accounting }">
  <tr>
    <td>
      <v-btn
        icon
        dense
        :to="{ name: 'Accounting', params: { id : accounting.id }}"
      >
        {{ accounting.number}}
      </v-btn>
    </td>
    <td>{{ accounting.accountingCreationDate }}</td>
    <td>{{ accounting.clientName}}</td>
    <td> </td>
    <td>{{ accounting.paymentDate }}</td>
    <td>
      <accounting-menu :accounting="accounting"/>
    </td>
    <td class="spc-status-dot">
        <v-icon
          :color="getColor(accounting.paymentType)"
          size="60"
        >mdi-circle-small</v-icon>
         {{ accounting.paymentType }}
    </td>
  </tr>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Accounting',
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  props: ['accounting'],
  components: {
    'accounting-menu': require('@/components/Accountings/AccountingMenu.vue').default
  },
  methods: {
    getColor (statusType) {
      if (statusType === "מחכה לתשלום") return 'black'
      else if (statusType === "נשלח לתשלום") return 'green accent-2'
      else if (statusType === "תשלום מתעכב") return 'red darken-1'
      else if (statusType === "שולם") return 'green'
      else if (statusType === "לא שולם") return 'deep-orange lighten-2'
      else return 'grey darken-1'
    },
  }
}
</script>
<style lang="sass" scoped>
  .spc-status-dot
    position: relative !important
  .spc-status-dot i
    position: absolute !important
    right: 10px !important
    width: 10px
    height: 10px
    margin-top: 6px
  td.spc-status-dot
    border-bottom: none !important
    padding-right: 30px !important

</style>
