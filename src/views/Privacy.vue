<template>
	<nav-appbar :pname="pageName" />
</template>

<script>
export default {
	name: 'About',
	hidden: false,
	data: () => ({
		pageName: 'מדיניות פרטיות'
	}),
	components: {
		'nav-appbar': require('@/components/Global/AppBar').default
	}
}
</script>
