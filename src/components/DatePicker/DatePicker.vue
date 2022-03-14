<template>
  <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field clearable filled dense readonly v-bind="attrs" v-on="on"
                    :value="datePretty" :label="lable" @click:clear="date = null"/>
    </template>
    <v-date-picker v-model="date" @change="menu = false" :first-day-of-week="0" locale="he-il"/>
  </v-menu>
</template>

<script>
import {format, parseISO} from 'date-fns';
import {Timestamp} from 'firebase/firestore';

export default {
  name: 'DatePicker',
  props: ['value', 'lable'],
  data: () => ({
    menu: false
  }),
  computed: {
    date: {
      get() {
        return this.value?.toDate?.() ? format(parseISO(this.value?.toDate?.().toISOString()), 'yyyy-MM-dd') : ''
      },
      set(val) {
        this.$emit('input', val ? Timestamp.fromDate(parseISO(val)) : '')
      }
    },
    datePretty() {
      return this.$options.filters.formatDate(this.value)
    }
  }
}
</script>