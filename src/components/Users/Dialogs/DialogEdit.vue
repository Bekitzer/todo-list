<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pr-10 pl-10">
					<v-col cols="12">
						<h3>יצירת משתמש</h3>
						<h4>פרטי המשתמש</h4>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.firstname" label="שם פרטי" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.lastname" label="שם משפחה" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.username" label="שם משתמש" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.phone" label="טלפון" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.email" label="מייל" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-select v-model="form.position" :items="positionList" label="תפקיד" filled dense hide-details required />
					</v-col>
					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
								<v-icon>mdi-trash-can-outline</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn outlined large color="red" @click="dialog = false">ביטול </v-btn>
							<v-btn :disabled="saving || formInvalid" :loading="saving" @click="save" outlined large color="green">
								שמירה
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
		<dialog-delete v-if="dialogs.delete" v-model="dialogs.delete" @close="dialogs.delete = false" :user="user" />
	</v-row>
</template>

<script>
import { deepCopy } from '@/stores/utils'

export default {
	props: ['user', 'value'],
	data: () => ({
		dialogs: {
			delete: false
		},
		saving: false,
		form: {},
		positionList: ['בעלים', 'הנהלת חשבונות', 'מזכירות', 'עובד יצור']
	}),
	computed: {
		formInvalid() {
			return !this.form.firstname || !this.form.lastname
		},
		users() {
			return this.$store.state.User.list
		},
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
		save() {
			if (!this.formInvalid) {
				this.saving = true
				this.$store.dispatch('User/upsert', this.form).finally(() => {
					this.saving = false
					this.dialog = false
				})
			}
		}
	},
	created() {
		this.form = deepCopy(this.user)
	},
	components: {
		'dialog-delete': require('@/components/Users/Dialogs/DialogDelete').default
	}
}
</script>
