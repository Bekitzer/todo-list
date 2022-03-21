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
					here will the variation rates list
				</td>
			</template>
			<template v-slot:[`item.attribute`]="{ item, index }">
				וריאציה {{ index + 1 }}
			</template>
			<template v-for="(attribute, i) in attributes" v-slot:[`item.attribute_${i}`]="{ item }">
				{{ item[`_attr_${attribute.name}`] }}
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
		dialogs: {
			edit: false
		},
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
	},
	computed: {
		headers() {
			return [
				{ text: "מאפיינים", value: "attribute", width: "80px", sortable: false },
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
			const attributes = this.attributes.reduce((perms, { name, inputs }, i) => {
				console.log(i)
				perms[`_attr_${name}`] = inputs.map(({ text }) => text)
				perms[`_attr_${name}`] = inputs.map(({ text }) => text)
				return perms
			}, {})

			return combos(attributes).map((perm, id) => ({ ...perm, id }))
		}
	},
	components: {
		"dialog-edit": require("@/components/Variations/Dialogs/DialogEdit").default,
		"no-variations": require("@/components/Variations/NoVariations").default,
		"list-rates": require("@/components/Rates/ListRates").default
	}
}
</script>
