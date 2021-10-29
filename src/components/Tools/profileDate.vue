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
            this.timeOfDay = format(new Date(), 'a', {locale: he})
        }
    },
    mounted() {
        this.getDate()

    }
}
</script>

<style>

</style>
