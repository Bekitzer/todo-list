<template>
	<div>
		<list-variations :product="product" :rates="rates"/>
		<list-expired-variations :product="product" :rates="rates"/>
	</div>
</template>

<script>
export default {
	name: "ListClientRates",
	props: ["product"],
	computed: {
		rates() {
			return this.$store.state.Rate.list
		}
	},
	components: {
		"list-variations": require("@/components/Variations/ListVariations").default,
		"list-expired-variations": require("@/components/Variations/ListExpiredVariations").default
	}
}
</script>
