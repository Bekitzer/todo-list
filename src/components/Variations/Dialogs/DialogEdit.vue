<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" max-width="700">
			<v-card elevation="8" shaped>
				<v-row class="pt-5 pl-5 pr-5">
					<v-col cols="12">
						<h3>עדכון וריאציות</h3>
					</v-col>

					<v-col cols="12">
						<variations-field v-model="form" :attributes="attributes" :product="product" />
					</v-col>

					<v-col cols="12">
						<v-card-actions style="padding: 0">
							<v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
								<v-icon>mdi-trash-can-outline</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn outlined large color="red" @click="dialog = false">ביטול </v-btn>
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
import { deepCopy, OPERATIONS } from '@/stores/utils'

export default {
	name: 'DialogEdit',
	props: ['variations', 'attributes', 'value', 'product'],
	data: () => ({
		saving: false,
		dialogs: {
			delete: false
		},
		form: {}
	}),
	computed: {
		isDupVariations() {
			return !!this.form.find(
				variation =>
					this.form.filter(({ attribute, input }) => variation.attribute === attribute && variation.input === input)
						.length > 1
			)
		},
		isEmptyVariation() {
			return !!this.form.find(({ attribute, input }) => !attribute || !input)
		},
		formInvalid() {
			return !this.$store.getters.user?.userSupplierRef || this.isDupVariations || this.isEmptyVariation
		},
		dialog: {
			get() {
				return this.value
			},
			set() {
				this.$emit('close', false)
			}
		},
		dirtyPayloads() {
			return this.form
				.map(variation => {
					if (variation.OPERATION === OPERATIONS.DELETE) return variation

					const original = this.variations.find(({ id }) => id === variation.id)

					if (!original || this.isChanged(original, variation)) return variation

					return null
				})
				.filter(Boolean)
		}
	},
	methods: {
		isChanged(original, current) {
			return (
				original.id !== current.id ||
				original.attribute !== current.attribute ||
				original.input !== current.input ||
				original.number !== current.number
			)
		},
		save() {
			if (!this.formInvalid) {
				this.saving = true

				this.$store.dispatch('Variation/write', this.dirtyPayloads).finally(() => {
					this.saving = false
					this.dialog = false
				})
			}
		}
	},
	created() {
		this.form = deepCopy(this.variations)
	},
	components: {
		'variations-field': require('@/components/Variations/Dialogs/Fields/VariationsField').default
	}
}
</script>
