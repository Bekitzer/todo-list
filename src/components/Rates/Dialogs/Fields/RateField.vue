<template>
	<v-row>
		<v-col cols="3">
			<v-text-field
				:class="{ red: rate.OPERATION === OPERATIONS.DELETE }"
				:disabled="rate.OPERATION === OPERATIONS.DELETE"
				v-model.number="rate.min_units"
				type="number"
				:min="1"
				label="מספר יחידות"
				prefix="מ-"
				autocomplete="off"
			/>
		</v-col>
		<v-col cols="3">
			<v-text-field
				:class="{ red: rate.OPERATION === OPERATIONS.DELETE }"
				:disabled="rate.OPERATION === OPERATIONS.DELETE"
				v-model.number="rate.max_units"
				type="number"
				:label="rate.min_units ? `מינימום ${rate.min_units}` : ''"
				:min="rate.min_units"
				prefix="עד-"
				autocomplete="off"
			/>
		</v-col>
		<v-col cols="2">
			<v-text-field
				:class="{ red: rate.OPERATION === OPERATIONS.DELETE }"
				:disabled="rate.OPERATION === OPERATIONS.DELETE"
				v-model.number="package_price"
				type="number"
				:label="package_units ? `מחיר ל-${rate.max_units} יח׳`: 'מחיר לחבילה'"
				prefix="₪"
				autocomplete="off"
			/>
		</v-col>
		<v-col cols="2">
			<v-text-field
				:class="{ red: rate.OPERATION === OPERATIONS.DELETE }"
				:disabled="rate.OPERATION === OPERATIONS.DELETE"
				v-model.number="rounded_price"
				type="number"
				label="מחיר ליחידה"
				prefix="₪"
				autocomplete="off"
			/>
		</v-col>
		<!--
    variation1:
         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 0
          max_units: 1000
         }

         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 1000
          max_units: 2000
         }

         price field: {
          calculation: [fixed, increment fixed, increment percentage]
          supplierRef: optional id
          value: 99.9
         }
         amount field: {
          min_units: 2000
          max_units
         }

    -->
		<v-col cols="2">
			<v-switch @change="removeField" label="מחיקה" color="red" hide-details></v-switch>
		</v-col>
	</v-row>
</template>

<script>
import { OPERATIONS } from "@/stores/utils"

export default {
	name: "RateField",
	props: ["value"],
	data: () => ({
		OPERATIONS
	}),
	computed: {
		rate: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit("input", val)
			}
		},
		rounded_price: {
			get() {
				return this.rate.price ? +((this.rate.price).toFixed(2)) : null
			},
			set(rounded_price) {
				this.rate.price = rounded_price
			}
		},
		package_price: {
			get() {
				if (!this.rate.price || !this.package_units) return null
				return this.rate.price * this.package_units
			},
			set(package_price) {
				if (!package_price || !this.package_units) return this.rate.price = null
				return this.rate.price = package_price / this.package_units
			}
		},
		package_units() {
			return this.rate.max_units || this.rate.min_units
		}
	},
	methods: {
		removeField(val) {
			this.rate = { ...this.rate, OPERATION: val ? OPERATIONS.DELETE : null }
		}
	}
}
</script>
