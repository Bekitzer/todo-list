<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12" style="padding-bottom: 0">
						<h3 style="padding-bottom: 0">יצירת ספק</h3>
						<h4>פרטי ספק</h4>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.name" label="שם ספק" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.companyName" label="שם חברה" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.numberId" label="ח.פ. / ע.מ." filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<vuetify-google-autocomplete
							ref="address"
							id="map"
							filled
							v-if="getAddressData"
							v-on:placechanged="getAddressData"
							country="il"
							v-model="form.address"
							label="כתובת"
							dense
							hide-details
						/>
					</v-col>
					<v-col cols="12" md="12">
						<v-textarea v-model="form.addressAdditional" label="הערות" filled rows="1" dense hide-details />
					</v-col>
				</v-row>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12" style="padding-bottom: 0">
						<h4>פרטי התקשרות</h4>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.phone" label="טלפון משרד" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.email" label="מייל משרד" filled dense hide-details />
					</v-col>

					<v-col cols="12" md="6">
						<v-text-field v-model="form.whatsapp" label="וואטסאפ משרד" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.website" label="אתר אינטרנט" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.facebook" label="פייסבוק" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.instagram" label="אינסטגרם" filled dense hide-details />
					</v-col>
				</v-row>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12" style="padding-bottom: 0">
						<h4>הגדרות תשלום</h4>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select
							v-model="form.paymentTerms"
							:items="paymentTermsList"
							label="תנאי תשלום"
							filled
							dense
							hide-details
						/>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select
							v-model="form.paymentMethod"
							:items="paymentMethodList"
							label="אמצעי תשלום"
							filled
							dense
							hide-details
						/>
					</v-col>
				</v-row>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12" style="padding-bottom: 0">
						<h4>הגדרות ספק</h4>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select
							v-model="form.deliveryType"
							:items="deliveryTypeList"
							label="אופן אספקה"
							dense
							filled
							hide-details
						/>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-text-field v-model="form.workingHours" label="שעות פעילות" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select v-model="form.status" :items="statusList" label="סטטוס ספק" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select v-model="form.newsletter" :items="newsletterList" label="דיוור" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-select v-model="form.scope" :items="scopeList" label="תחום" filled dense hide-details />
					</v-col>
					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-spacer></v-spacer>
							<v-btn outlined large color="red" @click="dialog = false">ביטול</v-btn>
							<v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
								צור
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	name: "DialogCreate",
	props: ["supplier", "value"],
	data: () => ({
		saving: false,
		address: "",
		form: {},
		paymentTermsList: ["מיידי", "באספקה", "שוטף + 30", "שוטף + 45", "שוטף + 60"],
		paymentMethodList: ["אשראי", "העברה", "צ׳ק", "Bit", "PayBox"],
		deliveryTypeList: ["איסוף עצמי", "מגיע למשרד"],
		statusList: ["פעיל", "לא פעיל", "מזדמן", "שת״פ"],
		newsletterList: ["כן", "לא"],
		scopeList: ["2", "1"]
	}),
	computed: {
		formInvalid() {
			return !this.form.name
		},
		dialog: {
			get() {
				return this.value
			},
			set() {
				this.$emit("close", false)
			}
		}
	},
	methods: {
		getAddressData: function(addressData, placeResultData, id) {
			this.address = addressData
		},
		async save() {
			if (this.formInvalid) return null
			this.saving = true
			return this.$store.dispatch("Supplier/upsert", this.form).finally(() => {
				this.saving = false
				this.dialog = false
			})
		}
	}
}
</script>
