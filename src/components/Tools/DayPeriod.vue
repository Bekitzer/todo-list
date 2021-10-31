<template>
    <span style="color:white;">{{ dayPeriod }}</span>
</template>

<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'

export default {
    data: () => ({
      dayPeriod: '',
    }),
    methods: {
      getDate() {
        this.dayPeriod = format(new Date(), 'HH', {locale: he})
        if( this.dayPeriod >= 22 || this.dayPeriod < 6 ){
          this.dayPeriod = 'לילה טוב'
        }else if( this.dayPeriod >= 6 || this.dayPeriod < 12 ){
          this.dayPeriod = 'בוקר טוב'
        }else if( this.dayPeriod >= 12 || this.dayPeriod < 18 ){
          this.dayPeriod = 'צהריים טובים'
        }else if( this.dayPeriod >= 18 || this.dayPeriod < 22 ){
          this.dayPeriod = 'ערב טוב'
        }else{
          this.timeDay = 'משהו שבור'
        }
      },
    },
    mounted() {
      this.getDate()
    }
}
</script>

<style>

</style>
