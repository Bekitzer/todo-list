<template>
    <div>{{ date }}</div>
</template>

<script>
import { format } from 'date-fns'
import { setTimeout } from 'timers'
import { he } from 'date-fns/locale'

export default {
    data() {
        return{
            date: ''
        }
    },
    methods: {
        getDate() {
            this.date = format(new Date(), 'EEEEE, dd/MM/yy HH:mm', {locale: he})
            setTimeout(this.getTime, 1000)
        }
    },
    mounted() {
        this.getDate()

    }
}
</script>

<style>

</style>
