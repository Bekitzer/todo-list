<template>
  <v-combobox
    id="map"
    v-model="location"
    :items="searchResults"
    label="כתובת"
    outlined
  ></v-combobox>
</template>

<script>
  export default {
    data: () => ({
      location: '',
      searchResults: [],
      service: null,
    }),
    methods: {
      metaInfo () {
        return {
          script: [{
            src: `https://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=places&key=AIzaSyBPTgcGTdaYE3FEEL-j61IEB_76BI84_90`,
            async: true,
            defer: true,
            callback: () => this.MapsInit() // will declare it in methods
          }]
        }
      },
      MapsInit () {
        this.service = new window.google.maps.places.AutocompleteService()
      },
      displaySuggestions (predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          this.searchResults = []
          return
        }
        this.searchResults = predictions.map(prediction => prediction.description)
      }
    },
    watch: {
      location (newValue) {
        if (newValue) {
          this.service.getPlacePredictions({
            input: this.location,
            types: ['(cities)']
            // input: 'Brisbane',
            // componentRestrictions: {country: 'il'},
          }, this.displaySuggestions)
        }debugger
      }
    }
  }
</script>