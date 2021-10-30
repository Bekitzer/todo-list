<template>
    <span style="color:white;">{{ timeOfDay }}</span>
</template>

<script>
import { format } from 'date-fns'
import { he } from 'date-fns/locale'

export default {
    data() {
        return{
            timeOfDay: ''
        }
    },
    methods: {
      getDate() {
        this.timeOfDay = format(new Date(), 'HH', {locale: he})
        if(this.timeOfDay >= 0 && this.timeOfDay < 6){
          this.timeOfDay = 'לילה טוב'
        }else if(this.timeOfDay >= 6 && this.timeOfDay < 12){
          this.timeOfDay = 'בוקר טוב'
        }else if(this.timeOfDay >= 12 && this.timeOfDay < 18){
          this.timeOfDay = 'צהריים טובים'
        }else if(this.timeOfDay >= 18 && this.timeOfDay < 0){
          this.timeOfDay = 'ערב טוב'
        }
      }
    },
    mounted() {
      this.getDate()
    }
}
</script>

<style>

</style>
