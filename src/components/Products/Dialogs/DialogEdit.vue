<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12">
						<h3>שינוי מוצר</h3>
					</v-col>
					<v-col cols="12" md="6">
						<v-text-field v-model="form.name" label="שם מוצר" filled dense hide-details />
					</v-col>
					<v-col cols="12" md="6">
						<v-select
							v-model="form.category"
							:items="categoryList"
							label="שם קטגוריה"
							filled
							dense
							hide-details
							small-chips
							multiple
						/>
					</v-col>
					<v-col cols="12" md="12">
						<tags-field v-model="form.tags" />
					</v-col>
					<v-col cols="12" md="6">
						<v-textarea v-model="form.productInfo" label="מפרט" filled dense hide-details></v-textarea>
					</v-col>
					<v-col cols="12" md="6">
						<v-textarea v-model="form.prices" label="מחירון ספקים" filled dense hide-details></v-textarea>
					</v-col>

					<v-divider class="mx-4"></v-divider>

					<v-col cols="12">
						<h3>מאפיינים</h3>
					</v-col>
					<v-col cols="12">
						<attributes-field v-model="form.attributes" />
					</v-col>

					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
								<v-icon>mdi-trash-can-outline</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn outlined large color="red" @click="dialog = false">ביטול</v-btn>
							<v-btn :disabled="saving || formInvalid" :loading="saving" @click="save" color="green" large outlined>
								שמירה
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
		<dialog-delete v-if="dialogs.delete" v-model="dialogs.delete" @close="dialogs.delete = false" :product="product" />
	</v-row>
</template>

<script>
import { deepCopy, OPERATIONS } from "@/stores/utils"

export default {
	name: "DialogEdit",
	props: ["product", "value"],
	data: () => ({
		dialogs: {
			delete: false
		},
		saving: false,
		form: {},
		categoryList: [
			"מיתוג ושיווק",
			"משרדי ואירגוני",
			"שילוט ותצוגה",
			"מתקנים ומעמדים",
			"מדבקות וטפטים",
			"מוצרי קד״מ"
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
		async save() {
			if (this.formInvalid) return null
			this.saving = true
			const payload = {
				...this.form,
				attributes: this.form.attributes.filter(attribute => attribute.OPERATION !== OPERATIONS.DELETE)
			}

			return this.$store.dispatch("Product/upsert", payload).finally(() => {
				this.saving = false
				this.dialog = false
			})
		}
	},
	created() {
		this.form = deepCopy(this.product)
	},
	components: {
		"dialog-delete": require("@/components/Products/Dialogs/DialogDelete").default,
		"attributes-field": require("@/components/Products/Dialogs/Fields/AttributesField").default,
		"tags-field": require("@/components/Products/Dialogs/Fields/TagsField").default
	}
}
</script>
