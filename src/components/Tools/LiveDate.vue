<template>
	<div>{{ date | formatDatetime }}</div>
</template>

<script>
import { setTimeout } from 'timers'

export default {
	data() {
		return {
			date: '',
			timer: null
		}
	},
	methods: {
		getDate() {
			this.date = new Date()

			clearTimeout(this.timer)

			this.timer = setTimeout(this.getDate, 1000)
		}
	},
	created() {
		this.getDate()
	}
}
</script>

<style></style>
