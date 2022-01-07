<template>
    <span>{{ dayPeriod }}</span>
</template>

<script>
import { format } from 'date-fns'
import { setTimeout } from 'timers'

export default {
    data: () => ({
      dayPeriod: '',
    }),
    methods: {
      getDate() {
        this.dayPeriod = parseInt(format(new Date(), 'H'))
        if( this.dayPeriod <= 23 && this.dayPeriod > 18){
          this.dayPeriod = 'ערב טוב'
        }else if( this.dayPeriod <= 18 && this.dayPeriod > 12){
          this.dayPeriod = 'צהריים טובים'
        }else if( this.dayPeriod <= 12 && this.dayPeriod > 6){
          this.dayPeriod = 'בוקר טוב'
        }else if( this.dayPeriod <= 6){
          this.dayPeriod = 'לילה טוב'
        }else{
          this.timeDay = 'משהו שבור'
        }
        setTimeout(this.getTime, 1000)
      },
    },
    mounted() {
      this.getDate()
    }
}
</script>

<style>

</style>
