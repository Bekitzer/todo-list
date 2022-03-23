<template>
	<div>
		<v-subheader>וריאציות לא בתוקף</v-subheader>
		<v-data-table
			fixed-header
			:search="$store.state.search"
			:headers="headers"
			:items="variations"
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
			<template v-for="(header, i) in headers" v-slot:[`item.attribute_${i}`]="{ item }">
				{{ item.attributes[header.text] }}
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	name: "ListExpiredVariations",
	props: ["product", "rates"],
	data: () => ({
		expanded: []
	}),
	methods: {
		rowBackground: function(item) {
			const [active] = this.expanded
			return item.id === active?.id ? "v-data-table__selected" : ""
		},
		clickRow(item, event) {
			this.expanded = event.isExpanded ? [] : [item]
		}
	},
	computed: {
		variations() {
			// if even one attribute expired return this variation
			return this.rates.filter((rate) => {
				const invalid = Object.entries(rate.variation.attributes).find(([name, input]) => {
					const valid = this.attributes.find(attribute => {
						return attribute.name === name && attribute.inputs.find(({ text }) => text === input)
					})
					return !valid
				})
				return invalid
			}).map(({ variation: { attributes } }, i) => ({ attributes, id: i + 1 }))
		},
		headers() {
			const headers = {}

			this.variations.forEach(({ attributes }) =>
				Object.keys(attributes).forEach(key =>
					headers[key] = true))

			return Object.keys(headers).map((text, i) => ({ text, value: `attribute_${i}`, sortable: false }))
		},
		attributes() {
			return this.product?.attributes || []
		},
		supplierId() {
			return this.$store.getters.user?.userSupplierRef?.id
		}
	},
	components: {
		"list-rates": require("@/components/Rates/ListRates").default
	}
}
</script>
