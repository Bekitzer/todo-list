<template>
    <v-text-field
      :value="$store.state.search"
      @input="$store.commit('setSearch', $event)"
      prepend-inner-icon="mdi-magnify"
      placeholder="חפש..."
      clearable
      hide-details
    ></v-text-field>
</template>

<script>
export default {

}
</script>

<style lang="sass">
    .expanding-search
        transition: max-width .3s
        .v-input__slot
            cursor: pointer !important
            &:before, &:after
                border: none !important
        &.closed
            max-width: 45px
            .v-input__slot
                background: transparent !important
</style>