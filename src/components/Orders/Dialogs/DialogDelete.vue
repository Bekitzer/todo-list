<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-title>מחיקת הזמנה</v-card-title>
				<v-card-text>אתה בטוח שאתה רוצה למחוק הזמנה זו?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn fab icon outlined large color="red" @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-btn fab icon outlined large color="green" @click="orderDelete">
						<v-icon>mdi-check</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	props: ['order', 'value'],
	computed: {
		dialog: {
			get() {
				return this.value
			},
			set() {
				this.$emit('close', false)
			}
		}
	},
	methods: {
		orderDelete() {
			this.dialog = false
			this.$store.dispatch('Order/remove', { id: this.$route.params.id })
			this.$router.push('/orders')
		}
	}
}
</script>
