<template>
	<div>
		<v-data-table
			fixed-header
			:search="$store.state.search"
			:items="variations"
			:headers="headers"
			item-key="id"
			:items-per-page="-1"
			hide-default-footer
			sort-desc
			:item-class="rowBackground"
			@click:row="clickRow"
			:single-expand="true"
			:expanded.sync="expanded"
		>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length" style="padding: 0 !important;">
					<list-rates :variation="item" :product="product" />
				</td>
			</template>
			<template v-for="(attribute, i) in attributes" v-slot:[`item.attribute_${i}`]="{ item }">
				{{ item.attributes[attribute.name] }}
			</template>
		</v-data-table>

		<v-subheader>וריאציות לא בתוקף</v-subheader>
		<v-data-table
			fixed-header
			:search="$store.state.search"
			:headers="expiredRates.headers"
			:items="expiredRates.items"
			item-key="id"
			:items-per-page="-1"
			hide-default-footer
			sort-desc
			:item-class="rowBackground"
			@click:row="expiredClickRow"
			:single-expand="true"
			:expanded.sync="expiredExpanded"
		>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length" style="padding: 0 !important;">
					<list-rates :variation="item" :product="product" />
				</td>
			</template>
			<template v-for="(header, i) in expiredRates.headers" v-slot:[`item.attribute_${i}`]="{ item }">
				{{ item.attributes[header.text] }}
			</template>
		</v-data-table>
	</div>
</template>

<script>
import combos from "combos"

export default {
	name: "ListVariations",
	props: ["product"],
	data: () => ({
		expanded: [],
		expiredExpanded: []
	}),
	methods: {
		rowBackground: function(item) {
			const [active] = this.expanded
			return item.id === active?.id ? "v-data-table__selected" : ""
		},
		clickRow(item, event) {
			this.expanded = event.isExpanded ? [] : [item]
		},
		expiredClickRow(item, event) {
			this.expiredExpanded = event.isExpanded ? [] : [item]
		},
		getVariationHeaders(variations) {
			const headers = {}

			variations.forEach(({ attributes }) => {
				Object.keys(attributes).forEach(key => {
					headers[key] = true
				})
			})

			return Object.keys(headers).map((text, i) => ({ text, value: `attribute_${i}`, sortable: false }))
		}
	},
	computed: {
		rates() {
			return this.$store.state.Rate.list
		},
		expiredRates() {

			// if even one attribute expired return this variation
			const items = this.rates.filter((rate) => {
				const invalid = Object.entries(rate.variation.attributes).find(([name, input]) => {
					const valid = this.attributes.find(attribute => {
						return attribute.name === name && attribute.inputs.find(({ text }) => text === input)
					})
					return !valid
				})
				return invalid
			}).map(({ variation: { attributes } }, i) => ({ attributes, id: i + 1 }))

			const headers = this.getVariationHeaders(items)

			return { headers, items }
		},
		headers() {
			return [
				...this.attributes.map((attribute, i) => {
					return { text: attribute.name, value: `attribute_${i}`, sortable: false }
				})
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
		"list-rates": require("@/components/Rates/ListRates").default
	}
}
</script>
