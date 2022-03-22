<template>
	<div>
		<v-data-table
			height="75vh"
			fixed-header
			:search="$store.state.search"
			:items="variations"
			:headers="headers"
			item-key="id"
			:items-per-page="-1"
			hide-default-footer
			sort-desc
			@click:row="clickRow"
			:expanded.sync="expanded"
		>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<v-simple-table>
						<template v-slot:default>
							<thead>
							<tr>
								<th>מינימום יח׳</th>
								<th>מקסימום יח׳</th>
								<th>מחיר ליח׳</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="item in rates(item)" :key="item.id">
								<td>{{ item.min_units }}</td>
								<td>{{ item.max_units }}</td>
								<td>{{ item.price }}</td>
							</tr>
							</tbody>
						</template>
					</v-simple-table>
				</td>
			</template>
			<template v-for="(attribute, i) in attributes" v-slot:[`item.attribute_${i}`]="{ item }">
				{{ item.attributes[attribute.name] }}
			</template>
			<template v-slot:[`item.actions`]="{ item, index }">
				<v-tooltip top content-class="normal tooltip-top">
					<template v-slot:activator="{ on, attrs }">
						<v-icon small @click.stop="editing = item" v-bind="attrs" v-on="on">mdi-pencil-outline</v-icon>
					</template>
					<span>ערוך תעריפים</span>
				</v-tooltip>
			</template>
		</v-data-table>

		<dialog-edit
			v-if="editing"
			v-model="editing"
			@close="editing = null"
			:product="product"
			:rates="rates(editing)"
		/>
	</div>
</template>

<script>
import combos from "combos"

export default {
	name: "ListVariations",
	props: ["product"],
	data: () => ({
		dialogs: {
			edit: false
		},
		editing: null,
		expanded: []
	}),
	methods: {
		clickRow(item, event) {
			if (event.isExpanded) {
				const index = this.expanded.findIndex(i => i === item)
				this.expanded.splice(index, 1)
			} else {
				this.expanded.push(item)
			}
		},
		rates(variation) {
			return this.$store.state.Rate.list.filter((rate) => {
				if (rate.rateProductRef?.id !== this.product.id) return false

				const mismatch = Object.entries(variation.attributes).find(([name, input]) => {
					return rate.variation.attributes[name] !== input
				})

				return !mismatch
			})
		}
	},
	computed: {
		headers() {
			return [
				...this.attributes.map((attribute, i) => {
					return { text: attribute.name, value: `attribute_${i}`, sortable: false }
				}),
				{ text: "פעולות", value: "actions", width: "100px", sortable: false }
			]
		},
		attributes() {
			return this.product?.attributes || []
		},
		supplierId() {
			return this.$store.getters.user?.userSupplierRef?.id
		},
		variations() {
			const attributes = this.attributes.reduce((perms, { name, inputs }) => {
				perms[name] = inputs.map(({ text }) => text)
				return perms
			}, {})

			return combos(attributes).map((attributes, i) => ({ attributes, id: i + 1 }))
		}
	},
	components: {
		"dialog-edit": require("@/components/Rates/Dialogs/DialogEdit").default,

		// "dialog-edit": require("@/components/Variations/Dialogs/DialogEdit").default,
		"no-variations": require("@/components/Variations/NoVariations").default,
		"list-rates": require("@/components/Rates/ListRates").default
	}
}
</script>
