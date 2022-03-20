<template>
	<v-snackbar v-model="$store.state.snackbar.show" :timeout="$store.state.snackbar.timeout">
		{{ $store.state.snackbar.text }}
	</v-snackbar>
</template>

<script>
export default {
	name: 'Snackbar'
}
</script>

<style lang="sass">
.v-snack:not(.vsnack--absolute)
  height: 100%
</style>
