<template>
	<v-row justify="center">
		<v-dialog v-model="variation" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12">
						<h3>תעריפים עבור:</h3>
						<h4> {{ description }}</h4>
					</v-col>

					<v-col cols="12">
						<rates-field v-model="form" :product="product" />
					</v-col>

					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-spacer></v-spacer>

							<v-btn outlined large color="red" @click="variation = null"> ביטול</v-btn>
							<v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
								שמירה
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { deepCopy, OPERATIONS } from "@/stores/utils"

export default {
	name: "DialogEdit",
	props: ["value", "product", "rates"],
	data: () => ({
		saving: false,
		form: {}
	}),
	computed: {
		description() {
			return Object.entries(this.variation.attributes).map(pair => pair.join(" - ")).join(", ")
		},
		formInvalid() {
			//TODO: if empty attribute disable btn
			//TODO: if duplicate attribute disable btn
			//TODO: notify the user for the reason the form is invalid
			return !this.$store.getters.user?.userSupplierRef
		},
		variation: {
			get() {
				return this.value
			},
			set() {
				this.$emit("close", null)
			}
		},
		dirtyPayloads() {
			return this.form
				.map(rate => {
					if (rate.OPERATION === OPERATIONS.DELETE) return rate

					const original = this.rates.find(({ id }) => id === rate.id)

					const { id, ...variation } = this.variation
					if (!original || this.isChanged(original, rate)) return { ...rate, variation }

					return null
				})
				.filter(Boolean)
		}
	},
	methods: {
		isChanged(original, current) {
			return original.id !== current.id
				|| original.max_units !== current.max_units
				|| original.min_units !== current.min_units
				|| original.price !== current.price
		},
		save() {
			if (!this.formInvalid) {
				this.saving = true

				console.log(this.dirtyPayloads)
				debugger
				this.$store.dispatch("Rate/write", this.dirtyPayloads).finally(() => {
					this.saving = false
					this.variation = false
				})
			}
		}
	},
	created() {
		this.form = deepCopy(this.rates)
	},
	components: {
		"rates-field": require("@/components/Rates/Dialogs/Fields/RatesField").default
	}
}
</script>
