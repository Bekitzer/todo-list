<template>
  <div>{{ date | formatDatetime }}</div>
</template>

<script>
import {setTimeout} from 'timers'

export default {
  data() {
    return {
      date: ''
    }
  },
  methods: {
    getDate() {
      this.date = new Date()
      // TODO: check for memory leaks before re-enable
      // setTimeout(this.getDate, 1000)
    }
  },
  created() {
    this.getDate()
  }
}
</script>

<style>

</style>
