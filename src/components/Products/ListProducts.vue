<template>
	<v-col cols="12" md="2" sm="6" class="pl-2">
		<v-card @click="handleClick(product)" color="#f1f1f1">
			<v-img :src="product.file"></v-img>

			<v-card-title>
				{{ product.name }}
			</v-card-title>
			<v-card-subtitle v-for="category in product.category" :key="category">
				{{ category }}
			</v-card-subtitle>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: 'ListProducts',
	props: ['product'],
	methods: {
		handleClick(product) {
			this.$router.push({ name: 'Product', params: { id: product.id } })
		}
	}
}
</script>
