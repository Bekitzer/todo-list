<template>
  <v-simple-table>
    <template v-slot:default>
      <thead
      >
        <tr>
          <th width="4%">#</th>
          <th width="8%">תאריך יצירת חשבון חייב</th>
          <th width="6%">מחיר יחידה</th>
          <th width="6%">כמות</th>
          <th width="6%">מחיר ספק</th>
          <th width="6%">רווח</th>
          <th width="30%"> </th>
          <th width="6%">מחיר ללא מע״מ</th>
          <th width="6%">מחיר כולל מע״מ</th>
          <th width="8%">תאריך תשלום</th>
          <th width="6%">פעולות</th>
          <th width="8%" class="spc-status-dot">סטטוס תשלום</th>
        </tr>
      </thead>
      <tbody>
        <accounting
          v-for="accounting in accountings"
          :key="accounting.id"
          :accounting="accounting"
        />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'ListAccountings',
  props: ['accounting'],
  computed: {
    accountings: {
      get() {
        return this.$store.getters.accountingsFiltered
      },
      set(value) {
        this.$store.dispatch('setAccountings', value)
      }
    }
  },
  components: {
    'accounting': require('@/components/Accountings/Accounting.vue').default
  }
}
</script>
<style lang="sass">
  th.spc-status-dot
    border-bottom: none !important
</style>