<template>
  <vuetify-google-autocomplete
      ref="address"
      id="map"
      filled
      append-icon="mdi-map-search-outline"
      v-on:placechanged="getAddressData"
      country="il"
      label="כתובת"
      dense
      hide-details
  >
  </vuetify-google-autocomplete>
</template>

<script>
export default {
  data: () => ({
    address: ''
  }),
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
    }
  }
}
</script>