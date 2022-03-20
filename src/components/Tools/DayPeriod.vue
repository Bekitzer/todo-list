<template>
	<span>{{ dayPeriod }}</span>
</template>

<script>
import { format } from 'date-fns'
import { setTimeout } from 'timers'

export default {
	data: () => ({
		dayPeriod: '',
		timer: null
	}),
	methods: {
		getDate() {
			this.dayPeriod = parseInt(format(new Date(), 'H'))
			if (this.dayPeriod <= 23 && this.dayPeriod > 18) {
				this.dayPeriod = 'ערב טוב'
			} else if (this.dayPeriod <= 18 && this.dayPeriod > 12) {
				this.dayPeriod = 'צהריים טובים'
			} else if (this.dayPeriod <= 12 && this.dayPeriod > 6) {
				this.dayPeriod = 'בוקר טוב'
			} else if (this.dayPeriod <= 6) {
				this.dayPeriod = 'לילה טוב'
			} else {
				console.error('משהו שבור')
			}

			clearTimeout(this.timer)

			this.timer = setTimeout(this.getDate, 1000 * 60 * 60)
		}
	},
	created() {
		this.getDate()
	}
}
</script>

<style></style>
