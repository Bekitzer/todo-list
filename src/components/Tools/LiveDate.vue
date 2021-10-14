<template>
    <div
        class="mr-4 text-subtitle-1"
    >
        {{ date }}
    </div>
</template>

<script>
import { format } from 'date-fns'
// import { setTimeout } from 'timers';
import { he } from 'date-fns/locale'

export default {
    data() {
        return{
            date: ''
        }
    },
    methods: {
        getDate() {
            this.date = format(new Date(), 'EEE H:mm:ss', {locale: he})
        }
    },
    mounted() {
        this.getDate()

    }
}
</script>