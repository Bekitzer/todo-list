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
			:item-class="rowBackground"
			@click:row="clickRow"
			:single-expand="true"
			:expanded.sync="expanded"
		>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length" style="padding: 0 !important;">
					<v-simple-table dark v-if="rates(item).length">
						<template v-slot:default>
							<thead>
							<tr>
								<th style="color: rgba(255, 255, 255, 0.7); background: #1E1E1E;">יח׳</th>
								<th style="color: rgba(255, 255, 255, 0.7); background: #1E1E1E;">מחיר ליח׳</th>
							</tr>
							</thead>
							<tbody>

							<tr style="height: auto !important;">
								<td :colspan="headers.length" style="height: 32px">Supplier XXX</td>
							</tr>

							<tr v-for="item in rates(item)" :key="item.id" style="height: auto !important;">
								<td style="height: 32px">
									<span>{{ item.min_units }}</span>
									<span v-if="item.min_units !== item.max_units">{{ `-${item.max_units}` }}</span>
								</td>
								<td style="height: 32px">{{ item.price }}₪</td>
							</tr>

							<tr style="height: auto !important;">
								<td :colspan="headers.length" style="height: 32px">Supplier YYY</td>
							</tr>

							<tr v-for="item in rates(item)" :key="'temp_'+item.id" style="height: auto !important;">
								<td style="height: 32px">
									<span>{{ item.min_units }}</span>
									<span v-if="item.min_units !== item.max_units">{{ `-${item.max_units}` }}</span>
								</td>
								<td style="height: 32px">{{ item.price }}₪</td>
							</tr>
							</tbody>
						</template>
					</v-simple-table>
					<v-alert v-else dark class="ma-0">
						<span>אין עדיין תעריפים לוריאציה זו</span>
						<v-tooltip left content-class="normal tooltip-left">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon x-small @click="editing = item" v-bind="attrs" v-on="on" class="mr-2">
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</template>
							<span>הוספת תעריפים</span>
						</v-tooltip>
					</v-alert>
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
		rowBackground: function(item) {
			const [active] = this.expanded
			return item.id === active?.id ? "v-data-table__selected" : ""
		},
		clickRow(item, event) {
			this.expanded = event.isExpanded ? [] : [item]
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
		"dialog-edit": require("@/components/Rates/Dialogs/DialogEdit").default
	}
}
</script>
