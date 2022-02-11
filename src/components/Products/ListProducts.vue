<template>
  <v-col cols="12" md="2" sm="6" class="pl-2">
    <v-card
      @click="handleClick(product)"
    >
      <v-img
        :src="product.file"
        height="174"
        lazy-src="/images/gravatar.jpg"
      ></v-img>

      <v-card-title>
        {{product.name}}
      </v-card-title>
      <v-card-subtitle
        v-for="category in product.category"
        :key="category"
      >
        {{category}}
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'ListProducts',
  data: () => ({
    show: false
  }),
  props: ['product'],
  methods: {
    handleClick(porduct){
      this.$router.push({ name: 'Product', params: { id : porduct.id }})
    }
  }
}
</script>