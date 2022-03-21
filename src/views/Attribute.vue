<template>
	<div>
		<nav-appbar :pname="'תעריף מאפיין - ' + this.attribute.name + ' - ' + this.input.text">
			<template v-slot:add-btn>
				<v-tooltip left content-class="normal tooltip-left">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							fab
							small
							elevation="0"
							filled
							v-bind="attrs"
							v-on="on"
							class="spc-create"
							@click="dialogs.edit = true",
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span>עריכת תעריף</span>
				</v-tooltip>
			</template>
		</nav-appbar>
<!--		<list-rates :variation="variation" />-->
<!--		<no-rates v-else />-->
	</div>
</template>

<script>
export default {
	name: "Attribute",
	data: () => ({
		dialogs: {
			edit: false
		}
	}),
	computed: {
		product() {
			return (
				this.$store.state.Product.list.find(product => {
					return product.id === this.$route.params.id
				}) || { attributes: [] }
			)
		},
		attribute() {
			return this.product.attributes.find(attribute => attribute.name === this.$route.params.attribute)
		},
		input() {
			return this.attribute.inputs.find(input => input.text === this.$route.params.input)
		}
	},
	components: {
		"nav-appbar": require("@/components/Global/AppBar").default,
		'list-rates': require('@/components/Rates/ListRates').default,
		'no-rates': require('@/components/Rates/NoRates').default
	}
}
</script>
