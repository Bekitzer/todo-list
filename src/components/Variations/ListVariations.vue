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
	</div>
</template>

<script>
import combos from "combos"

export default {
	name: "ListVariations",
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
		"list-rates": require("@/components/Rates/ListRates").default
	}
}
</script>
