<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="500">
			<v-card elevation="8" shaped>
				<v-card-title>מחיקת משתמש</v-card-title>
				<v-card-text>אתה בטוח שאתה רוצה למחוק משתמש זה?</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn fab icon outlined large color="red" @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-btn fab icon outlined large color="green" @click="userDelete" @keyup.enter="userDelete">
						<v-icon>mdi-check</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	props: ['user', 'value'],
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
		userDelete() {
			this.dialog = false
			this.$store.dispatch('User/remove', { id: this.$route.params.id })
			this.$router.push('/users')
		}
	}
}
</script>
