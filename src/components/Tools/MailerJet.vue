<template>
	<validation-observer ref="observer" v-slot="{ invalid }">
		<form ref="form" @submit.prevent="sendEmail">
			<validation-provider v-slot="{ errors }" rules="required|max:10">
				<v-text-field
					v-model="user_name"
					name="user_name"
					:counter="10"
					:error-messages="errors"
					label="שם"
					required
				></v-text-field>
			</validation-provider>
			<validation-provider
				v-slot="{ errors }"
				:rules="{
					required: true,
					digits: 10,
					regex: '^(050|051|052|053|054|055|056|058|059|02|03|04|08|09)'
				}"
			>
				<v-text-field
					v-model="user_phone"
					name="user_phone"
					:counter="10"
					:error-messages="errors"
					label="טלפון"
					required
				></v-text-field>
			</validation-provider>
			<validation-provider v-slot="{ errors }" rules="required|email">
				<v-text-field
					v-model="user_email"
					name="user_email"
					:error-messages="errors"
					label="מייל"
					required
				></v-text-field>
			</validation-provider>
			<v-text-field v-model="user_message" name="message" label="הודעה"></v-text-field>
			<v-btn class="mr-4" type="submit" :disabled="invalid"> שלח </v-btn>
		</form>
	</validation-observer>
</template>

<script>
import emailjs from '@emailjs/browser'
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
	...digits,
	message: '{_field_} needs to be {length} digits. ({_value_})'
})

extend('required', {
	...required,
	message: '{_field_} can not be empty'
})

extend('max', {
	...max,
	message: '{_field_} may not be greater than {length} characters'
})

extend('regex', {
	...regex,
	message: '{_field_} {_value_} does not match {regex}'
})

extend('email', {
	...email,
	message: 'Email must be valid'
})
export default {
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data: () => ({
		user_name: '',
		user_phone: '',
		user_email: '',
		user_message: ''
	}),
	methods: {
		sendEmail() {
			this.$refs.observer.validate()
			emailjs.sendForm('just_print_mailerjet', 'in_work_template', this.$refs.form, 'user_WY0AoFCmkg7cZZV4XJciv').then(
				result => {
					console.log('SUCCESS!', result.text)
					this.user_name = ''
					this.user_phone = ''
					this.user_email = ''
					this.user_message = ''
				},
				error => {
					console.log('FAILED...', error.text)
				}
			)
		}
	}
}
</script>
