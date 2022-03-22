<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pt-5 pr-5 pl-5">
					<v-col cols="12" md="12">
						<h3>יצירת מוצר</h3>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.name" label="שם מוצר" clearable filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-select
							v-model="form.category"
							:items="categoryList"
							label="שם קטגוריה"
							clearable
							filled
							dense
							hide-details
							chips
							multiple
						/>
					</v-col>
					<v-col cols="12" md="12">
						<tags-field v-model="form.tags" />
					</v-col>
					<v-col cols="12" md="6">
						<v-textarea v-model="form.productInfo" label="מפרט" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-textarea v-model="form.prices" label="מחירון ספקים" filled dense hide-details />
					</v-col>
					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-spacer></v-spacer>
							<v-btn outlined large color="red" @click="dialog = false">ביטול</v-btn>
							<v-btn
								outlined
								large
								color="green"
								@click="addProduct"
								:disabled="formInvalid || saving"
								:loading="saving"
							>
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
	props: ["product", "value"],
	data: () => ({
		saving: false,
		form: {
			attributes: []
		},
		categoryList: [
			'מיתוג ושיווק',
			'משרדי ואירגוני',
			'שילוט ותצוגה',
			'מתקנים ומעמדים',
			'מדבקות וטפטים',
			'מוצרי קד״מ'
		]
	}),
	computed: {
		isDupAttributes() {
			return !!this.form.attributes.find(
				attribute => this.form.attributes.filter(({ name }) => attribute.name === name).length > 1
			)
		},
		isEmptyAttribute() {
			return !!this.form.attributes.find(({ name }) => !name)
		},
		formInvalid() {
			return !this.form.name || this.isDupAttributes || this.isEmptyAttribute
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
		addProduct() {
			if (!this.formInvalid) {
				const payload = {
					...this.form
				}

				this.saving = true
				this.$store.dispatch("Product/upsert", payload).finally(() => {
					this.saving = false
					this.dialog = false
				})
			}
		}
	},
	components: {
		"tags-field": require("@/components/Products/Dialogs/Fields/TagsField").default
	}
}
</script>
