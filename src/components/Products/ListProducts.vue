<template>
  <v-col cols="12" md="2" sm="6" class="pl-2">
    <v-card>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="100px"
      ></v-img>

      <v-card-title>
        {{product.name}}
      </v-card-title>
      <v-card-subtitle>
        {{product.category}}<br>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click="handleClick(product)" color="white" >
          קרא עוד
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="show = !show" icon>
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text style="white-space:pre-line;">
            {{product.productInfo}}
          </v-card-text>
        </div>
      </v-expand-transition>
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