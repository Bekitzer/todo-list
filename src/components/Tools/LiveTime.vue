<template>
    <div style="color:white;">{{ time }}</div>
</template>

<script>
import { format } from 'date-fns'
import { setTimeout } from 'timers';
import { he } from 'date-fns/locale'

export default {
    data() {
        return{
            time: ''
        }
    },
    methods: {
        getTime() {
            this.time = format(new Date(), 'H:mm'),

            setTimeout(this.getTime, 1000)
        }
    },
    mounted() {
        this.getTime()

    }
}
</script>

<style>

</style>
