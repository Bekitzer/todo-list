<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    placeholder="חיפוש..."
    prepend-inner-icon="mdi-magnify"
    solo
    clearable
  ></v-text-field>
  <!-- <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    placeholder="חיפוש..."
    prepend-inner-icon="mdi-magnify"
    solo
    clearable
  ></v-text-field> -->
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    search: '',
  }),
  props: ['order'],
  props: ['client'],
  props: ['supplier'],
}
</script>

<style lang="sass">
  .v-input.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--placeholder
    border-radius: 10px
  .v-text-field__details
    display: none !important
  .v-input__slot
    margin-bottom: 0 !important
</style>
