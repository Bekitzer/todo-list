<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    :disabled="$store.state.sorting"
    placeholder="חיפוש..."
    prepend-inner-icon="mdi-magnify"
    outlined
    clearable
  ></v-text-field>
</template>
<style lang="sass">
  .v-text-field__details
    display: none !important
  .v-input__slot
    margin-bottom: 0 !important
</style>
