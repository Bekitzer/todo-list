<template>
    <div
        class="ml-4 text-subtitle-1"            
    >
        {{ date }}
    </div>
</template>

<script>
import { format } from 'date-fns'
import { setTimeout } from 'timers';
export default {
    data() {
        return{
            date: ''
        }
    },
    methods: {
        getDate() {
            this.date = format(new Date(), 'MMMM d - EEE H:mm:ss')
            setTimeout(this.getDate, 1000)
        }
    },
    mounted() {
        this.getDate()

    }
}
</script>

<style>

</style>
