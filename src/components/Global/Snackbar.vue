<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      :timeout="$store.state.snackbar.timeout"
    >
    {{ $store.state.snackbar.text }}
  </v-snackbar>
</template>