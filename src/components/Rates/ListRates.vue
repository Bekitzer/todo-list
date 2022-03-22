<template>
	<v-card>
		<v-simple-table dark v-if="rates.length">
			<template v-slot:default>
				<thead>
				<tr>
					<th style="color: rgba(255, 255, 255, 0.7); background: #1E1E1E;">יח׳</th>
					<th style="color: rgba(255, 255, 255, 0.7); background: #1E1E1E;">מחיר ליח׳</th>
					<th style="color: rgba(255, 255, 255, 0.7); background: #1E1E1E; width: 32px">
						<v-tooltip top content-class="normal tooltip-top">
							<template v-slot:activator="{ on, attrs }">
								<v-icon small @click.stop="dialogs.edit = true" v-bind="attrs" v-on="on">mdi-pencil-outline</v-icon>
							</template>
							<span>ערוך תעריפים</span>
						</v-tooltip>
					</th>
				</tr>
				</thead>
				<tbody>

				<tr style="height: auto !important;">
					<td :colspan="3" style="height: 32px">Supplier XXX</td>
				</tr>

				<tr v-for="item in rates" :key="item.id" style="height: auto !important;">
					<td style="height: 32px">
						<span>{{ item.min_units }}</span>
						<span v-if="item.min_units !== item.max_units">{{ `-${item.max_units}` }}</span>
					</td>
					<td style="height: 32px">{{ item.price }}₪</td>
					<td style="height: 32px"></td>
				</tr>

				<tr style="height: auto !important;">
					<td :colspan="3" style="height: 32px">Supplier YYY</td>
				</tr>

				<tr v-for="item in rates" :key="'temp_'+item.id" style="height: auto !important;">
					<td style="height: 32px">
						<span>{{ item.min_units }}</span>
						<span v-if="item.min_units !== item.max_units">{{ `-${item.max_units}` }}</span>
					</td>
					<td style="height: 32px">{{ item.price }}₪</td>
					<td style="height: 32px"></td>
				</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-alert v-else dark class="ma-0">
			<span>אין עדיין תעריפים לוריאציה זו</span>
			<v-tooltip left content-class="normal tooltip-left">
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon x-small @click="dialogs.edit = true" v-bind="attrs" v-on="on" class="mr-2">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
				<span>הוספת תעריפים</span>
			</v-tooltip>
		</v-alert>

		<dialog-edit
			v-if="dialogs.edit"
			v-model="dialogs.edit"
			@close="dialogs.edit = false"
			:product="product"
			:rates="rates"
			:variation="variation"
		/>
	</v-card>
</template>

<script>
export default {
	name: "ListRates",
	props: ["product", "variation"],
	data: () => ({
		dialogs: {
			edit: false
		}
	}),
	computed: {
		rates() {
			return this.$store.state.Rate.list.filter((rate) => {
				if (rate.rateProductRef?.id !== this.product.id) return false

				const mismatch = Object.entries(this.variation.attributes).find(([name, input]) => {
					return rate.variation.attributes[name] !== input
				})

				return !mismatch
			})
		}
	},
	components: {
		"dialog-edit": require("@/components/Rates/Dialogs/DialogEdit").default,
		"no-rates": require("@/components/Rates/NoRates").default
	}
}
</script>
