<template>
    <v-text-field
        :value="$store.state.search"
        @input="$store.commit('setSearch', $event)"
        prepend-inner-icon="mdi-magnify"
        placeholder="חפש..."
        clearable
        @keydown.esc.prevent="clearMe"
        hide-details
    ></v-text-field>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    clearMe() {
      this.$store.state.search = '';
    }
  }
}
</script>