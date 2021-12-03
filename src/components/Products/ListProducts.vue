<template>
  <v-col cols="12" md="2" sm="6">
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
        {{format(new Date(product.productCreationDate.seconds * 1000), 'EEEEE, dd/MM/yy', {locale: he})}}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click="handleClick(product)" color="orange lighten-2" text>
          Explore
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
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { he } from 'date-fns/locale'
export default {
  name: 'ListProducts',
  data: () => ({
    show: false,
    format,
    he
  }),
  props: ['product'],
  methods: {
    handleClick(porduct){
      this.$router.push({ name: 'Product', params: { id : porduct.id }})
    }
  }
}
</script>
<style lang="sass">
  .v-list-item__content
    padding: 12px 0 !important
  th.spc-status-dot
    border-bottom: none !important
  .v-application .elevation-1, .theme--light.v-data-table.v-data-table--fixed-header thead th
    box-shadow: none !important
  .theme--light.v-data-table .v-data-footer
    border-top: none !important
  .spc-status-dot
    width: 12px
    margin-left: 6px
  .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
    background: transparent !important
  .orderWorkInfo
    padding: 20px !important
    white-space: pre-line !important
    border-radius: 20px !important
  .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
    box-shadow: none !important
    background: #fbfbfb !important
  @media only screen and (max-width:800px)
    .v-data-table__wrapper
      height: 200px !important
  @media only screen and (max-width:600px)
    .v-data-table__wrapper
      height: 420px !important
</style>